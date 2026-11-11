/* ==========================================================================
   BCS 213: WEB DESIGN AND DEVELOPMENT
   EXTERNAL JAVASCRIPT FILE: script.js
   ========================================================================== */

/* ==========================================================================
   QUESTION FIVE: JAVASCRIPT PROGRAMMING (7 MARKS)
   ========================================================================== */

/**
 * QUESTION FIVE (a) [2 MARKS]:
 * Declare three JavaScript variables representing a student's name,
 * registration number, and academic programme. Display their values using console.log().
 */
const sampleStudentName = "Samuel Bundi";
const sampleRegNumber = "COM/B/01-07632/2025";
const sampleProgramme = "Bachelor of Science in Computer Science";

console.log("=== QUESTION FIVE (a): Student Details ===");
console.log("Student Name: " + sampleStudentName);
console.log("Registration Number: " + sampleRegNumber);
console.log("Academic Programme: " + sampleProgramme);


/**
 * QUESTION FIVE (b) [3 MARKS]:
 * Write a JavaScript function named calculateGrade() that accepts a student's
 * examination score and returns the corresponding grade using the following grading system:
 * 
 * Score       Grade
 * 70–100      A
 * 60–69       B
 * 50–59       C
 * 40–49       D
 * Below 40    E
 * 
 * @param {number} score - The examination mark (0 to 100)
 * @returns {string} - The calculated grade letter ('A', 'B', 'C', 'D', 'E' or 'Invalid Score')
 */
function calculateGrade(score) {
  // Convert score to a numeric value in case string is passed
  const numericScore = Number(score);

  // Validate range boundary
  if (isNaN(numericScore) || numericScore < 0 || numericScore > 100) {
    return "Invalid Score (Must be between 0 and 100)";
  }

  if (numericScore >= 70 && numericScore <= 100) {
    return "A";
  } else if (numericScore >= 60 && numericScore < 70) {
    return "B";
  } else if (numericScore >= 50 && numericScore < 60) {
    return "C";
  } else if (numericScore >= 40 && numericScore < 50) {
    return "D";
  } else {
    // Below 40
    return "E";
  }
}


/**
 * QUESTION FIVE (c) [2 MARKS]:
 * Call the function with a score of 75 and display the returned grade using alert().
 */
const examScore = 75;
const returnedGrade = calculateGrade(examScore);
alert("Question 5 (c) - Result of calculateGrade(" + examScore + "):\nGrade: " + returnedGrade);


/* ==========================================================================
   QUESTION SIX: DOM MANIPULATION AND EVENT HANDLING (6 MARKS)
   QUESTION SEVEN: JAVASCRIPT FORM VALIDATION AND TESTING (4 MARKS)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  /**
   * QUESTION SIX (a) [1 MARK]:
   * Use JavaScript DOM manipulation to retrieve the student registration form
   * from the HTML document.
   */
  const registrationForm = document.getElementById("studentRegistrationForm");

  // Input elements
  const fullNameInput = document.getElementById("fullName");
  const regNumberInput = document.getElementById("regNumber");
  const emailInput = document.getElementById("email");
  const programmeSelect = document.getElementById("programme");

  // Error message small tags
  const fullNameError = document.getElementById("fullNameError");
  const regNumberError = document.getElementById("regNumberError");
  const emailError = document.getElementById("emailError");
  const programmeError = document.getElementById("programmeError");

  // Feedback banners & display elements
  const statusMessage = document.getElementById("statusMessage");
  const emptyPlaceholder = document.getElementById("emptyDisplayPlaceholder");
  const submittedDetailsCard = document.getElementById("submittedDetailsCard");
  const displayName = document.getElementById("displayName");
  const displayReg = document.getElementById("displayReg");
  const displayEmail = document.getElementById("displayEmail");
  const displayGender = document.getElementById("displayGender");
  const displayProgramme = document.getElementById("displayProgramme");
  const displayTimestamp = document.getElementById("displayTimestamp");

  // Table element to also append the new student
  const studentTableBody = document.querySelector("#studentTable tbody");

  /**
   * Helper function: Validate email format using Regular Expression (Question 7 b)
   * Pattern ensures standard user@domain.tld structure.
   */
  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  /**
   * Clear error states
   */
  function clearErrors() {
    fullNameError.textContent = "";
    regNumberError.textContent = "";
    emailError.textContent = "";
    programmeError.textContent = "";

    fullNameInput.classList.remove("is-invalid");
    regNumberInput.classList.remove("is-invalid");
    emailInput.classList.remove("is-invalid");
    programmeSelect.classList.remove("is-invalid");

    statusMessage.style.display = "none";
    statusMessage.className = "status-banner";
  }

  /**
   * QUESTION SIX (b) [2 MARKS]:
   * Add an event listener to the form that responds when the user submits
   * the registration form.
   */
  if (registrationForm) {
    registrationForm.addEventListener("submit", function (event) {
      // Prevent default form submission behavior (page refresh)
      event.preventDefault();

      clearErrors();

      // Retrieve trimmed input values
      const fullName = fullNameInput.value.trim();
      const regNumber = regNumberInput.value.trim();
      const email = emailInput.value.trim();
      const selectedGenderInput = document.querySelector('input[name="gender"]:checked');
      const gender = selectedGenderInput ? selectedGenderInput.value : "Not specified";
      const programme = programmeSelect.value;

      let isValid = true;

      /**
       * QUESTION SEVEN (a) [2 MARKS]:
       * Write JavaScript code to ensure that the student's full name and
       * registration number are not empty before submission.
       */
      if (fullName === "") {
        fullNameError.textContent = "Full name is required and cannot be empty.";
        fullNameInput.classList.add("is-invalid");
        isValid = false;
      }

      if (regNumber === "") {
        regNumberError.textContent = "Registration number is required and cannot be empty.";
        regNumberInput.classList.add("is-invalid");
        isValid = false;
      }

      /**
       * QUESTION SEVEN (b) [1 MARK]:
       * Validate that the email address entered follows an appropriate email format.
       */
      if (email === "") {
        emailError.textContent = "Email address is required.";
        emailInput.classList.add("is-invalid");
        isValid = false;
      } else if (!isValidEmail(email)) {
        emailError.textContent = "Please enter a valid email format (e.g. name@domain.com).";
        emailInput.classList.add("is-invalid");
        isValid = false;
      }

      // Programme check
      if (programme === "") {
        programmeError.textContent = "Please select an academic programme.";
        programmeSelect.classList.add("is-invalid");
        isValid = false;
      }

      // If validation fails, halt submission and display error banner
      if (!isValid) {
        statusMessage.textContent = "Please correct the highlighted errors before submitting.";
        statusMessage.className = "status-banner error";
        statusMessage.style.display = "block";
        return;
      }

      /**
       * QUESTION SIX (c) [2 MARKS]:
       * Retrieve the student's name and registration number from the form
       * and display them on the webpage using JavaScript.
       */
      displayName.textContent = fullName;
      displayReg.textContent = regNumber;
      displayEmail.textContent = email;
      displayGender.textContent = gender;
      displayProgramme.textContent = programme;
      displayTimestamp.textContent = new Date().toLocaleString();

      // Show preview card and hide placeholder
      if (emptyPlaceholder) emptyPlaceholder.style.display = "none";
      if (submittedDetailsCard) submittedDetailsCard.style.display = "block";

      /**
       * QUESTION SIX (d) [1 MARK]:
       * Display a success message after the form has been successfully submitted.
       */
      statusMessage.textContent = "Student registration for '" + fullName + "' was successful!";
      statusMessage.className = "status-banner success";
      statusMessage.style.display = "block";

      // Also dynamically add a row to the Student Records table for extra polish
      if (studentTableBody) {
        const newRow = document.createElement("tr");
        const nextId = "STU-" + (studentTableBody.querySelectorAll("tr").length + 101);
        newRow.innerHTML = `
          <td><strong>${nextId}</strong></td>
          <td>${fullName}</td>
          <td>${regNumber}</td>
          <td>${programme}</td>
          <td>Year 1</td>
        `;
        studentTableBody.appendChild(newRow);
      }

      // Reset form fields after successful capture
      registrationForm.reset();
    });

    // Reset button listener to clear errors and reset status
    registrationForm.addEventListener("reset", function () {
      clearErrors();
    });
  }

  /**
   * QUESTION SEVEN (c) [1 MARK]:
   * Test helper button: Pre-populates sample student information to demonstrate
   * that validation and submission work correctly.
   */
  const fillDemoBtn = document.getElementById("fillDemoBtn");
  if (fillDemoBtn) {
    fillDemoBtn.addEventListener("click", function () {
      fullNameInput.value = "Samuel Bundi";
      regNumberInput.value = "COM/B/01-07632/2025";
      emailInput.value = "sbundi@mmust.ac.ke";
      programmeSelect.value = "BSc Computer Science";
      clearErrors();
      statusMessage.textContent = "Sample test data populated! Click 'Submit Registration' to verify.";
      statusMessage.className = "status-banner success";
      statusMessage.style.display = "block";
    });
  }

  /* ==========================================================================
     INTERACTIVE GRADE CALCULATOR WIDGET (Supports Question 5 Testing)
     ========================================================================== */
  const calcGradeBtn = document.getElementById("calcGradeBtn");
  const scoreInput = document.getElementById("scoreInput");
  const resultGradeText = document.getElementById("resultGradeText");
  const triggerExamAlertBtn = document.getElementById("triggerExamAlertBtn");

  if (calcGradeBtn && scoreInput && resultGradeText) {
    calcGradeBtn.addEventListener("click", function () {
      const scoreVal = scoreInput.value;
      if (scoreVal === "" || isNaN(scoreVal)) {
        resultGradeText.textContent = "Please enter a valid numeric score.";
        resultGradeText.style.color = "var(--error-color)";
        return;
      }
      const grade = calculateGrade(Number(scoreVal));
      resultGradeText.textContent = "Score " + scoreVal + " = Grade " + grade;
      resultGradeText.style.color = "var(--primary-color)";
    });
  }

  if (triggerExamAlertBtn) {
    triggerExamAlertBtn.addEventListener("click", function () {
      const score = 75;
      const res = calculateGrade(score);
      alert("Question 5 (c) - Re-triggered:\ncalculateGrade(" + score + ") returned: " + res);
    });
  }

  /* ==========================================================================
     ACTIVE NAVIGATION LINK HIGHLIGHT ON SCROLL
     ========================================================================== */
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", function () {
    let currentSectionId = "";
    const scrollPos = window.scrollY + 150;

    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentSectionId) {
        link.classList.add("active");
      }
    });
  });
});
