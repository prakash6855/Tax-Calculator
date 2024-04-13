document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelectorAll("input");
  input.forEach((inputElements) => {
    inputElements.addEventListener("input", (e) => {
      // Get the entered value
      const enteredValue = e.target.value.trim();

      // Check if the entered value is a number
      if (!isNumeric(enteredValue)) {
        // Apply red color warning
        e.target.style.borderColor = "red";
      } else {
        // Remove red color warning
        e.target.style.borderColor = "";
      }
    });
  });

  document.getElementById("taxForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const grossIncome = parseFloat(
      document.getElementById("grossIncome").value
    );
    const extraIncome = parseFloat(
      document.getElementById("extraIncome").value
    );
    const ageGroup = document.getElementById("ageGroup").value;
    const taxDeduction = parseFloat(
      document.getElementById("taxDeduction").value
    );

    var errorOcuuredDuringValidationOfTypes = false;
    [grossIncome, extraIncome, taxDeduction].forEach((element) => {
      if (isNaN(element)) {
        errorOcuuredDuringValidationOfTypes = true;
        showToast("Invalid Input, Please Enter Valid Numbers in Entries", 5000);
        return;
      }
    });
    if (errorOcuuredDuringValidationOfTypes) {
      return;
    }

    const inputElements = document.querySelectorAll(
      ".input-group input, .input-group select"
    );
    inputElements.forEach(function (element) {
      element.classList.remove("error");
    });

    const hasError = false;

    inputElements.forEach(function (element) {
      if (!element.checkValidity()) {
        element.classList.add("error");
        hasError = true;
      }
    });

    if (hasError) {
      return;
    }

    const taxableIncome = grossIncome + extraIncome - taxDeduction;
    if (taxableIncome <= 800000) {
      showModal("No tax applicable. i.e. 0.0");
    } else {
      let taxRate;
      if (ageGroup === "below40") {
        taxRate = 0.3;
      } else if (ageGroup === "40to60") {
        taxRate = 0.4;
      } else if (ageGroup === "above60") {
        taxRate = 0.1;
      } else {
        showToast("Please select Valid Age group.", 5000);
        return;
      }
      const taxAmount = taxRate * taxableIncome;
      showModal("Tax amount: " + taxAmount.toFixed(2));
    }
  });

  const tooltips = document.querySelectorAll(".tooltip");
  tooltips.forEach(function (tooltip) {
    const tooltipText = tooltip.querySelector(".tooltiptext");
    tooltip.addEventListener("mouseenter", function () {
      tooltipText.style.visibility = "visible";
    });
    tooltip.addEventListener("mouseleave", function () {
      tooltipText.style.visibility = "hidden";
    });
  });

  const closeModal = function () {
    document.getElementById("myModal").style.display = "none";
  };

  const closeButtons = document.querySelectorAll(".close");
  closeButtons.forEach(function (button) {
    button.addEventListener("click", closeModal);
  });

  window.addEventListener("click", function (event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
      closeModal();
    }
  });

  function showModal(message) {
    const modal = document.getElementById("myModal");
    const resultElement = document.getElementById("netAmount");
    resultElement.textContent = message;
    modal.style.display = "block";
  }
});

// Function to check if a value is numeric
function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}
// Custom Toaster
function showToast(message, duration) {
  var toaster = document.getElementById("toaster");
  toaster.textContent = message;
  toaster.style.display = "block";

  setTimeout(function () {
    toaster.style.display = "none";
  }, duration);
}
