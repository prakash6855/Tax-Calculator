document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("taxForm").addEventListener("submit", function(e) {
        e.preventDefault();

        var grossIncome = parseFloat(document.getElementById("grossIncome").value);
        var extraIncome = parseFloat(document.getElementById("extraIncome").value);
        var ageGroup = document.getElementById("ageGroup").value;
        var taxDeduction = parseFloat(document.getElementById("taxDeduction").value);
        
        var inputElements = document.querySelectorAll(".input-group input, .input-group select");
        inputElements.forEach(function(element) {
            element.classList.remove("error");
        });
        
        var hasError = false;
        
        inputElements.forEach(function(element) {
            if (!element.checkValidity()) {
                element.classList.add("error");
                hasError = true;
            }
        });
        
        if (hasError) {
            return;
        }
        
        var taxableIncome = grossIncome + extraIncome - taxDeduction - 8;
        if (taxableIncome <= 0) {
            showModal("No tax applicable.");
        } else {
            var taxRate;
            if (ageGroup === "below40") {
                taxRate = 0.3;
            } else if (ageGroup === "40to60") {
                taxRate = 0.4;
            } else if (ageGroup === "above60") {
                taxRate = 0.1;
            } else {
                showModal("Please select age group.");
                return;
            }
            var taxAmount = taxRate * taxableIncome;
            showModal("Tax amount: " + taxAmount.toFixed(2) + " Lakhs");
        }
    });

    var tooltips = document.querySelectorAll(".tooltip");
    tooltips.forEach(function(tooltip) {
        var tooltipText = tooltip.querySelector(".tooltiptext");
        tooltip.addEventListener("mouseenter", function() {
            tooltipText.style.visibility = "visible";
        });
        tooltip.addEventListener("mouseleave", function() {
            tooltipText.style.visibility = "hidden";
        });
    });

    var closeModal = function() {
        document.getElementById("myModal").style.display = "none";
    };

    var closeButtons = document.querySelectorAll(".close");
    closeButtons.forEach(function(button) {
        button.addEventListener("click", closeModal);
    });

    window.addEventListener("click", function(event) {
        var modal = document.getElementById("myModal");
        if (event.target == modal) {
            closeModal();
        }
    });

    function showModal(message) {
        var modal = document.getElementById("myModal");
        var resultElement = document.getElementById("result");
        resultElement.textContent = message;
        modal.style.display = "block";
    }
});
