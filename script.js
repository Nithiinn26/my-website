const menuButton = document.getElementById("menuButton");

const navigation = document.getElementById("navigation");

// =====================================================

// 1. MOBILE NAVIGATION MENU

// =====================================================

if (menuButton && navigation) {

  menuButton.setAttribute("aria-expanded", "false");

  menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    menuButton.setAttribute(

      "aria-expanded",

      navigation.classList.contains("open") ? "true" : "false"

    );

  });

}

// =====================================================

// 2. MAIN DROPDOWN MENUS

// =====================================================

const dropdowns = document.querySelectorAll(".nav-dropdown");

dropdowns.forEach((dropdown) => {

  const trigger = dropdown.querySelector(".nav-trigger");

  if (!trigger) return;

  trigger.setAttribute("aria-expanded", "false");

  trigger.addEventListener("click", (event) => {

    event.stopPropagation();

    const shouldOpen = !dropdown.classList.contains("open");

    dropdowns.forEach((item) => {

      item.classList.remove("open");

      const itemTrigger = item.querySelector(".nav-trigger");

      if (itemTrigger) {

        itemTrigger.setAttribute("aria-expanded", "false");

      }

      const nested = item.querySelector(".submenu-parent");

      if (nested) {

        nested.classList.remove("open");

        const nestedTrigger = nested.querySelector(".submenu-trigger");

        if (nestedTrigger) {

          nestedTrigger.setAttribute("aria-expanded", "false");

        }

      }

    });

    if (shouldOpen) {

      dropdown.classList.add("open");

      trigger.setAttribute("aria-expanded", "true");

    }

  });

});

// =====================================================

// 3. LEGACY UPLOAD TEMPLATES SUBMENU

// =====================================================

document.querySelectorAll(".submenu-trigger").forEach((trigger) => {

  trigger.setAttribute("aria-expanded", "false");

  trigger.addEventListener("click", (event) => {

    event.stopPropagation();

    const parent = trigger.closest(".submenu-parent");

    if (!parent) return;

    const shouldOpen = !parent.classList.contains("open");

    parent.classList.toggle("open", shouldOpen);

    trigger.setAttribute(

      "aria-expanded",

      shouldOpen ? "true" : "false"

    );

  });

});

// =====================================================

// 4. CLOSE MENUS WHEN CLICKING OUTSIDE

// =====================================================

document.addEventListener("click", () => {

  dropdowns.forEach((dropdown) => {

    dropdown.classList.remove("open");

    const trigger = dropdown.querySelector(".nav-trigger");

    if (trigger) {

      trigger.setAttribute("aria-expanded", "false");

    }

    const nested = dropdown.querySelector(".submenu-parent");

    if (nested) {

      nested.classList.remove("open");

      const nestedTrigger = nested.querySelector(".submenu-trigger");

      if (nestedTrigger) {

        nestedTrigger.setAttribute("aria-expanded", "false");

      }

    }

  });

});

// =====================================================

// 5. CLOSE DROPDOWNS AFTER SELECTING AN ITEM

// =====================================================

document.querySelectorAll(".dropdown-menu a, .submenu a").forEach((link) => {

  link.addEventListener("click", () => {

    dropdowns.forEach((dropdown) => {

      dropdown.classList.remove("open");

      const trigger = dropdown.querySelector(".nav-trigger");

      if (trigger) {

        trigger.setAttribute("aria-expanded", "false");

      }

      const nested = dropdown.querySelector(".submenu-parent");

      if (nested) {

        nested.classList.remove("open");

        const nestedTrigger = nested.querySelector(".submenu-trigger");

        if (nestedTrigger) {

          nestedTrigger.setAttribute("aria-expanded", "false");

        }

      }

    });

    if (navigation) {

      navigation.classList.remove("open");

    }

    if (menuButton) {

      menuButton.setAttribute("aria-expanded", "false");

    }

  });

});

// =====================================================

// 6. PAGE NAVIGATION

// =====================================================

const pageSelectors = [

  ".trainee-card",

  "#raise-grievance",

  "#check-status",

  "#marksheet",

  "#certificate",

  "#verification-marksheet",

  "#verification-certificate",

  "#iti-search"

];

const pageLinkTargets = pageSelectors

  .slice(1)

  .map((selector) => selector.slice(1));

function showPage(pageId) {

  const pageMap = {

    "trainee-details": ".trainee-card",

    "raise-grievance": "#raise-grievance",

    "check-status": "#check-status",

    "marksheet": "#marksheet",

    "certificate": "#certificate",

    "verification-marksheet": "#verification-marksheet",

    "verification-certificate": "#verification-certificate",

    "iti-search": "#iti-search"

  };

  const selectedSelector = pageMap[pageId];

  if (!selectedSelector) return;

  pageSelectors.forEach((selector) => {

    const page = document.querySelector(selector);

    if (page) {

      page.hidden = selector !== selectedSelector;

    }

  });

  const note = document.querySelector(".page-note");

  if (note) {

    note.hidden = pageId !== "trainee-details";

  }

  if (pageId !== "trainee-details") {

    window.location.hash = pageId;

  } else {

    history.replaceState(

      null,

      "",

      window.location.pathname + window.location.search

    );

  }

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}

// Navigation links for implemented pages

document.querySelectorAll(".dropdown-menu a, .submenu a").forEach((link) => {

  const targetId = link.getAttribute("href")?.slice(1);

  if (!targetId || !pageLinkTargets.includes(targetId)) return;

  link.addEventListener("click", (event) => {

    event.preventDefault();

    showPage(targetId);

  });

});

// Open the official DGT examination result page.
document.querySelectorAll('a[href="#result"], a[href="#exam-result"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "https://dgt.skillindiadigital.gov.in/result";
  });
});

// Open the correct page if a supported URL hash is present

function openPageFromHash() {

  const pageId = window.location.hash.slice(1);

  if (pageId && pageLinkTargets.includes(pageId)) {

    showPage(pageId);

  } else if (!pageId) {

    showPage("trainee-details");

  }

}

window.addEventListener("hashchange", openPageFromHash);

openPageFromHash();

// =====================================================

// 7. GRIEVANCE STATUS SEARCH TOGGLE

// =====================================================

const statusSearchInputs = document.querySelectorAll(

  'input[name="statusSearchType"]'

);

const prnSearchFields = document.getElementById("prnSearchFields");

const grievanceIdFields = document.getElementById("grievanceIdFields");

const statusAdmissionYear = document.getElementById("statusAdmissionYear");

const statusPRN = document.getElementById("statusPRN");

const statusDOB = document.getElementById("statusDOB");

const grievanceId = document.getElementById("grievanceId");

function updateStatusSearchFields() {

  const selected = document.querySelector(

    'input[name="statusSearchType"]:checked'

  );

  if (!selected) return;

  const usePRN = selected.value === "prn";

  if (prnSearchFields) {

    prnSearchFields.hidden = !usePRN;

  }

  if (grievanceIdFields) {

    grievanceIdFields.hidden = usePRN;

  }

  [statusAdmissionYear, statusPRN, statusDOB].forEach((field) => {

    if (!field) return;

    field.disabled = !usePRN;

    field.required = usePRN;

  });

  if (grievanceId) {

    grievanceId.disabled = usePRN;

    grievanceId.required = !usePRN;

  }

}

statusSearchInputs.forEach((input) => {

  input.addEventListener("change", updateStatusSearchFields);

});

updateStatusSearchFields();

// =====================================================

// 8. REUSABLE VERIFICATION SEARCH TOGGLE

// =====================================================

function configureSearchToggle(

  radioName,

  firstFieldsId,

  secondFieldsId,

  firstInputId,

  secondInputId

) {

  const radios = document.querySelectorAll(

    `input[name="${radioName}"]`

  );

  const firstFields = document.getElementById(firstFieldsId);

  const secondFields = document.getElementById(secondFieldsId);

  const firstInput = document.getElementById(firstInputId);

  const secondInput = document.getElementById(secondInputId);

  function update() {

    const selected = document.querySelector(

      `input[name="${radioName}"]:checked`

    );

    if (!selected) return;

    const useFirst = selected.value === "prn";

    if (firstFields) {

      firstFields.hidden = !useFirst;

    }

    if (secondFields) {

      secondFields.hidden = useFirst;

    }

    if (firstInput) {

      firstInput.disabled = !useFirst;

      firstInput.required = useFirst;

    }

    if (secondInput) {

      secondInput.disabled = useFirst;

      secondInput.required = !useFirst;

    }

  }

  radios.forEach((radio) => {

    radio.addEventListener("change", update);

  });

  update();

}

// Verification marksheet search toggle

configureSearchToggle(

  "verificationSearchType",

  "verificationPRNFields",

  "verificationCertificateFields",

  "verificationPRN",

  "verificationCertificateNo"

);

// Verification certificate search toggle

configureSearchToggle(

  "certificateVerificationSearchType",

  "certificateVerificationPRNFields",

  "certificateVerificationNoFields",

  "certificateVerificationPRN",

  "certificateVerificationNo"

);

// =====================================================

// 9. LOCAL DEMO FORM RESPONSES

// =====================================================

// These forms display local demo messages only.

// No official trainee, marksheet, grievance or certificate

// database is connected.

const demoForms = [

  [

    "grievanceForm",

    "grievanceMessage",

    "Form details entered. Official trainee verification is not connected yet."

  ],

  [

    "statusForm",

    "statusMessage",

    "Form submitted locally. Official grievance status lookup is not connected yet."

  ],

  [

    "marksheetForm",

    "marksheetMessage",

    "Details entered. Official marksheet retrieval is not connected yet."

  ],

  [

    "certificateForm",

    "certificateMessage",

    "Details entered. Official certificate retrieval is not connected yet."

  ],

  [

    "verificationMarksheetForm",

    "verificationMarksheetMessage",

    "Details entered. Official marksheet verification is not connected yet."

  ],

  [

    "verificationCertificateForm",

    "verificationCertificateMessage",

    "Details entered. Official certificate verification is not connected yet."

  ]

];

demoForms.forEach(([formId, messageId, messageText]) => {

  const form = document.getElementById(formId);

  if (!form) return;

  form.addEventListener("submit", (event) => {

    event.preventDefault();

    const message = document.getElementById(messageId);

    if (message) {

      message.textContent = messageText;

    }

  });

});

// =====================================================
// EXAMINATION RESULT FORM (LOCAL DEMO ONLY)
// =====================================================
const examResultForm = document.getElementById("examResultForm");
const resultPRN = document.getElementById("resultPRN");
const resultDOB = document.getElementById("resultDOB");
const resultPRNError = document.getElementById("resultPRNError");
const resultDOBError = document.getElementById("resultDOBError");
const examResultMessage = document.getElementById("examResultMessage");

if (examResultForm) {
  examResultForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const prnMissing = !resultPRN || !resultPRN.value.trim();
    const dobMissing = !resultDOB || !resultDOB.value;

    if (resultPRNError) resultPRNError.hidden = !prnMissing;
    if (resultDOBError) resultDOBError.hidden = !dobMissing;

    if (prnMissing || dobMissing) {
      if (examResultMessage) examResultMessage.textContent = "Please enter the required details.";
      return;
    }

    if (examResultMessage) {
      examResultMessage.textContent = "Details submitted locally. Official examination results are not connected to this demo.";
    }
  });

  examResultForm.addEventListener("reset", () => {
    window.setTimeout(() => {
      if (resultPRNError) resultPRNError.hidden = false;
      if (resultDOBError) resultDOBError.hidden = true;
      if (examResultMessage) examResultMessage.textContent = "";
    }, 0);
  });
}

// =====================================================

// 10. ITI SEARCH PAGE

// =====================================================

const itiSearchForm = document.getElementById("itiSearchForm");

const itiSearchMessage = document.getElementById("itiSearchMessage");

const itiState = document.getElementById("itiState");

const itiDistrict = document.getElementById("itiDistrict");

const itiName = document.getElementById("itiName");

const itiTrade = document.getElementById("itiTrade");

const itiWomen = document.getElementById("itiWomen");

const itiType = document.getElementById("itiType");

const itiLocation = document.getElementById("itiLocation");

const itiStatus = document.getElementById("itiStatus");

const itiCSS = document.getElementById("itiCSS");

const exportToggle = document.getElementById("exportToggle");

const exportMenu = document.getElementById("exportMenu");

const exportExcel = document.getElementById("exportExcel");

// District choices for the local demo interface.

// These are filter options, not official search results.

const itiDistrictsByState = {

  Karnataka: [

    "Bagalkot",

    "Ballari",

    "Belagavi",

    "Bengaluru Rural",

    "Bengaluru Urban",

    "Bidar",

    "Chamarajanagar",

    "Chikkaballapur",

    "Chikkamagaluru",

    "Chitradurga",

    "Dakshina Kannada",

    "Davanagere",

    "Dharwad",

    "Gadag",

    "Hassan",

    "Haveri",

    "Kalaburagi",

    "Kodagu",

    "Kolar",

    "Koppal",

    "Mandya",

    "Mysuru",

    "Raichur",

    "Ramanagara",

    "Shivamogga",

    "Tumakuru",

    "Udupi",

    "Uttara Kannada",

    "Vijayapura",

    "Yadgir"

  ],

  Maharashtra: [

    "Ahmednagar",

    "Akola",

    "Amravati",

    "Aurangabad",

    "Kolhapur",

    "Mumbai",

    "Nagpur",

    "Nashik",

    "Pune",

    "Solapur"

  ],

  "Tamil Nadu": [

    "Chennai",

    "Coimbatore",

    "Madurai",

    "Salem",

    "Tiruchirappalli",

    "Tirunelveli",

    "Vellore"

  ],

  Telangana: [

    "Hyderabad",

    "Karimnagar",

    "Khammam",

    "Nalgonda",

    "Rangareddy",

    "Warangal"

  ],

  "Andhra Pradesh": [

    "Anantapur",

    "Guntur",

    "Kurnool",

    "Nellore",

    "Vijayawada",

    "Visakhapatnam"

  ],

  Kerala: [

    "Ernakulam",

    "Kannur",

    "Kollam",

    "Kozhikode",

    "Thiruvananthapuram",

    "Thrissur"

  ],

  "Uttar Pradesh": [

    "Agra",

    "Kanpur",

    "Lucknow",

    "Meerut",

    "Prayagraj",

    "Varanasi"

  ],

  "Delhi": [

    "Central Delhi",

    "East Delhi",

    "New Delhi",

    "North Delhi",

    "South Delhi",

    "West Delhi"

  ]

};

// Populate the district dropdown when the state changes.

function updateITIDistricts() {

  if (!itiState || !itiDistrict) return;

  const selectedState = itiState.value;

  const previousDistrict = itiDistrict.value;

  const districts = itiDistrictsByState[selectedState] || [];

  itiDistrict.replaceChildren();

  const defaultOption = document.createElement("option");

  defaultOption.value = "";

  defaultOption.textContent = "Select District";

  itiDistrict.appendChild(defaultOption);

  districts.forEach((district) => {

    const option = document.createElement("option");

    option.value = district;

    option.textContent = district;

    itiDistrict.appendChild(option);

  });

  if (districts.includes(previousDistrict)) {

    itiDistrict.value = previousDistrict;

  }

}

if (itiState && itiDistrict) {

  itiState.addEventListener("change", updateITIDistricts);

  updateITIDistricts();

}

// Read the current ITI search filters.

function getITIFilters() {

  return {

    State: itiState?.value || "",

    District: itiDistrict?.value || "",

    ITI: itiName?.value.trim() || "",

    Trade: itiTrade?.value || "",

    "Women Category": itiWomen?.value || "",

    "ITI Type": itiType?.value || "",

    "ITI Location": itiLocation?.value || "",

    Status: itiStatus?.value || "",

    "CSS Scheme": itiCSS?.value || ""

  };

}

// Find or create a message element for ITI Search.

function showITIMessage(message, isError = false) {

  if (!itiSearchMessage) return;

  itiSearchMessage.textContent = message;

  itiSearchMessage.setAttribute(

    "role",

    isError ? "alert" : "status"

  );

  itiSearchMessage.style.color = isError ? "#b42318" : "";

}

// Search button handler.

// The page is currently a local frontend demo and has no official

// ITI records or live DGT database connection.

if (itiSearchForm) {

  itiSearchForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const filters = getITIFilters();

    const hasFilter = Object.values(filters).some(

      (value) => value !== ""

    );

    if (!hasFilter) {

      showITIMessage(

        "Please select or enter at least one search filter.",

        true

      );

      return;

    }

    showITIMessage(

      "Your search filters have been applied locally. Live ITI records are not available because the official database is not connected."

    );

  });

}

// Reset the ITI filters and status message.

if (itiSearchForm) {

  const resetButton = itiSearchForm.querySelector(

    'button[type="reset"], input[type="reset"], #itiReset'

  );

  if (resetButton) {

    resetButton.addEventListener("click", () => {

      window.setTimeout(() => {

        if (itiState) itiState.value = "";

        updateITIDistricts();

        if (itiDistrict) itiDistrict.value = "";

        if (itiName) itiName.value = "";

        if (itiTrade) itiTrade.value = "";

        if (itiWomen) itiWomen.value = "";

        if (itiType) itiType.value = "";

        if (itiLocation) itiLocation.value = "";

        if (itiStatus) itiStatus.value = "";

        if (itiCSS) itiCSS.value = "";

        showITIMessage("");

      }, 0);

    });

  }

}

// =====================================================

// 11. ITI EXPORT MENU

// =====================================================

if (exportToggle && exportMenu) {

  exportToggle.setAttribute("aria-expanded", "false");

  exportMenu.hidden = true;

  exportToggle.addEventListener("click", (event) => {

    event.stopPropagation();

    const shouldOpen = exportMenu.hidden;

    exportMenu.hidden = !shouldOpen;

    exportToggle.setAttribute(

      "aria-expanded",

      shouldOpen ? "true" : "false"

    );

  });

  exportMenu.addEventListener("click", (event) => {

    event.stopPropagation();

  });

  document.addEventListener("click", () => {

    exportMenu.hidden = true;

    exportToggle.setAttribute("aria-expanded", "false");

  });

}

// =====================================================

// 12. EXPORT ITI FILTERS TO EXCEL-COMPATIBLE CSV

// =====================================================

// CSV can be opened using Microsoft Excel.

// Since official ITI records are not connected, this exports

// the current filter criteria rather than actual search results.

function escapeCSV(value) {

  const textValue = String(value ?? "");

  return '"' + textValue.replace(/"/g, '""') + '"';

}

function downloadCSV(filename, rows) {

  const csvContent = rows

    .map((row) => row.map(escapeCSV).join(","))

    .join("\r\n");

  // UTF-8 BOM helps Excel display text correctly.

  const blob = new Blob(

    ["\uFEFF" + csvContent],

    { type: "text/csv;charset=utf-8;" }

  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = filename;

  link.style.display = "none";

  document.body.appendChild(link);

  link.click();

  link.remove();

  URL.revokeObjectURL(url);

}

if (exportExcel) {

  exportExcel.addEventListener("click", (event) => {

    event.preventDefault();

    const filters = getITIFilters();

    const rows = [

      ["ITI Search Filter", "Selected Value"],

      ...Object.entries(filters)

    ];

    downloadCSV("iti-search.csv", rows);

    if (exportMenu) {

      exportMenu.hidden = true;

    }

    if (exportToggle) {

      exportToggle.setAttribute("aria-expanded", "false");

    }

    showITIMessage(

      "The current ITI search filters were exported to iti-search.csv. Live ITI results are not included."

    );

  });

}


/* QUICK INSTRUCTOR REGISTRATION POPUP */

document.addEventListener("DOMContentLoaded", function () {
  const instructorRegisterBtn = document.getElementById("instructorRegisterBtn");
  const instructorModal = document.getElementById("instructorModal");
  const instructorCancel = document.getElementById("instructorCancel");
  const instructorBackdrop = document.querySelector(".instructor-modal-backdrop");
  const instructorMobile = document.getElementById("instructorMobile");
  const instructorSendOtp = document.getElementById("instructorSendOtp");
  const instructorModalMessage = document.getElementById("instructorModalMessage");

  if (!instructorRegisterBtn || !instructorModal) {
    console.error("Instructor button or popup HTML is missing.");
    return;
  }

  function openInstructorModal(event) {
    if (event) event.preventDefault();
    instructorModal.hidden = false;
    instructorModal.style.display = "block";
    document.body.style.overflow = "hidden";
    if (instructorModalMessage) instructorModalMessage.textContent = "";
    if (instructorMobile) instructorMobile.focus();
  }

  function closeInstructorModal() {
    instructorModal.hidden = true;
    instructorModal.style.display = "none";
    document.body.style.overflow = "";
  }

  instructorRegisterBtn.addEventListener("click", openInstructorModal);

  if (instructorCancel) {
    instructorCancel.addEventListener("click", closeInstructorModal);
  }

  if (instructorBackdrop) {
    instructorBackdrop.addEventListener("click", closeInstructorModal);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !instructorModal.hidden) {
      closeInstructorModal();
    }
  });

  if (instructorSendOtp) {
    instructorSendOtp.addEventListener("click", function () {
      const mobile = instructorMobile ? instructorMobile.value.trim() : "";

      if (!/^[6-9]\d{9}$/.test(mobile)) {
        if (instructorModalMessage) {
          instructorModalMessage.textContent =
            "Please enter a valid 10-digit mobile number.";
        }
        return;
      }

      if (instructorModalMessage) {
        instructorModalMessage.textContent =
          "OTP sending is not connected in this local demo.";
      }
    });
  }
});
