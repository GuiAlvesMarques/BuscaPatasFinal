document.addEventListener("DOMContentLoaded", () => {
    const speciesButtons = document.querySelectorAll(".species-select");
    const progressSteps = document.querySelectorAll(".progress-step");
    const formSteps = document.querySelectorAll(".form-step");
    const progressBar = document.getElementById("progress");
    const progressBarContainer = document.querySelector(".progressbar");
  
    let currentStep = 0;
    let selectedSpecies = null;
    let activeSteps = []; // Steps relevant to the selected species

    // Show/hide steps based on species selection
    speciesButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            selectedSpecies = button.dataset.attribute;
    
            // Reset current step and progress bar
            currentStep = 0;
            updateProgressBar(currentStep);

            // Hide the species selection step
            formSteps[0].classList.remove("form-step-active");
            formSteps[0].classList.add("d-none");

            // Show the progress bar
            progressBarContainer.style.display = "flex";

            // Determine relevant steps based on species
            if (selectedSpecies === "dog") {
                activeSteps = [
                    formSteps[1], // Dog characteristics
                    formSteps[3], // Dog lifestyle
                    formSteps[5], // Dog commitment
                    formSteps[7], // Dog relationship
                    formSteps[9], // Results
                ];
            } else if (selectedSpecies === "cat") {
                activeSteps = [
                    formSteps[2], // Cat characteristics
                    formSteps[4], // Cat lifestyle
                    formSteps[6], // Cat commitment
                    formSteps[8], // Cat relationship
                    formSteps[9], // Results
                ];
            }

            // Show the first relevant step
            activeSteps[0].classList.remove("d-none");
            activeSteps[0].classList.add("form-step-active");
            currentStep = 0;

            updateProgressBar(0);
        });
    });

    // Navigation: Next Buttons
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-next")) {
            e.preventDefault();
    
            if (currentStep < activeSteps.length - 1) {
                activeSteps[currentStep].classList.remove("form-step-active");
                activeSteps[currentStep].classList.add("d-none");
                currentStep++;
                activeSteps[currentStep].classList.remove("d-none");
                activeSteps[currentStep].classList.add("form-step-active");
    
                updateProgressBar(currentStep);
            }
        }
    });

    // Navigation: Previous Buttons
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-prev")) {
            e.preventDefault();
    
            if (currentStep > 0) {
                activeSteps[currentStep].classList.remove("form-step-active");
                activeSteps[currentStep].classList.add("d-none");
                currentStep--;
                activeSteps[currentStep].classList.remove("d-none");
                activeSteps[currentStep].classList.add("form-step-active");
    
                updateProgressBar(currentStep);
            } else if (currentStep === 0) {
                // Navigate back to the species selection step
                activeSteps[currentStep].classList.remove("form-step-active");
                activeSteps[currentStep].classList.add("d-none");

                // Hide the progress bar
                progressBarContainer.style.display = "none";

                formSteps[0].classList.remove("d-none");
                formSteps[0].classList.add("form-step-active");
                selectedSpecies = null;
                activeSteps = [];
            }
        }
    });

    // Handle Submit Button
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-submit") || e.target.classList.contains("btn-pre-submit")) {
            e.preventDefault();
            
            // Ensure the progress bar reflects the final step
            updateProgressBar(progressSteps.length - 1);
            progressSteps[progressSteps.length - 1].classList.add("progress-step-active");
    
            // Collect form data
            const form = document.querySelector(".form-quiz");
            const formData = new FormData(form);
    
            const results = {};
            formData.forEach((value, key) => {
                if (!results[key]) {
                    results[key] = value;
                } else if (Array.isArray(results[key])) {
                    results[key].push(value);
                } else {
                    results[key] = [results[key], value];
                }
            });
    
            console.log("Quiz Results:", results);
    
            // Hide current step
            const currentActiveStep = document.querySelector(".form-step-active");
            if (currentActiveStep) {
                currentActiveStep.classList.remove("form-step-active");
                currentActiveStep.classList.add("d-none");
            }
    
            // Show results section
            const resultsStep = document.getElementById("quizResults");
            if (resultsStep) {
                resultsStep.classList.remove("d-none");
                resultsStep.classList.add("form-step-active");
                console.log("Results step made visible");
            } else {
                console.error("Results step not found");
            }

            // put the #quizresults display to block
            document.getElementById("quizResults").style.display = "block";

            // Display results
            displayResults(results);
    
            updateProgressBar(activeSteps.length - 1); // Ensure progress bar reflects the final step
            progressSteps[progressSteps.length - 1].classList.add("progress-step-active"); // Mark "Results" as active
    
            // Disable inputs to prevent edits
            disableFormInputs(form);
        }
    });

    // Allow radio buttons to be unchecked
    document.querySelectorAll("input[type='radio']").forEach((radio) => {
        let lastChecked = null; // Track the last clicked radio button

        radio.addEventListener("click", (e) => {
            if (lastChecked === e.target) {
                // If the same radio is clicked again, uncheck it
                e.target.checked = false;
                lastChecked = null; // Reset the last checked radio button
            } else {
                // Otherwise, set this as the last checked radio button
                lastChecked = e.target;
            }
        });
    });

    // Handle "Sem preferência" logic
    document.querySelectorAll("[name$='Preference']").forEach((radio) => {
        radio.addEventListener("click", (e) => {
            const questionDiv = e.target.closest(".question");
            const checkboxes = questionDiv.querySelectorAll("input[type='checkbox']");

            if (e.target.checked) {
                // If "Sem preferência" is checked, check all checkboxes and disable them
                checkboxes.forEach((checkbox) => {
                    checkbox.checked = true;
                    checkbox.disabled = true;
                });
            } else {
                // If "Sem preferência" is unchecked, uncheck all checkboxes and enable them
                checkboxes.forEach((checkbox) => {
                    checkbox.checked = false;
                    checkbox.disabled = false;
                });
            }
        });
    });

    // Update Progress Bar
    function updateProgressBar(stepIndex) {
        const totalSteps = activeSteps.length; // Use activeSteps for relevant steps
        progressSteps.forEach((step, index) => {
            if (index <= stepIndex) {
                step.classList.add("progress-step-active");
            } else {
                step.classList.remove("progress-step-active");
            }
        });

        const progressPercentage = ((stepIndex + 1) / totalSteps) * 100; // +1 to include the current step
        progressBar.style.width = progressPercentage + "%";
    }

    // Display Results (Placeholder Logic)
    function displayResults(results) {
        const resultsContainer = document.getElementById("resultsContainer");
        resultsContainer.innerHTML = `
            <p>Respostas coletadas:</p>
            <pre>${JSON.stringify(results, null, 2)}</pre>
        `; // Display results here (replace this with actual results display logic)
    }

    // Disable all form inputs
    function disableFormInputs(form) {
        const inputs = form.querySelectorAll("input, select, textarea");
        inputs.forEach((input) => {
            input.disabled = true;
        });
    }

    // Save Results Button Logic
    document.getElementById("saveResultsBtn").addEventListener("click", () => {
        // Collect all results (in this case, they're logged to console)
        console.log("Saving quiz results...");

        // Replace this with actual save logic, like a POST request
        alert("Resultados salvos com sucesso!");
    });

    // Handle "Refazer o Quiz" button click
    document.getElementById("retakeQuizBtn").addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default behavior
    
        // 1. Hide the current step (Results section)
        const resultsStep = document.getElementById("quizResults");
        resultsStep.classList.remove("form-step-active");
        resultsStep.classList.add("d-none");
    
        // 2. Reset the form (clear all inputs and reset the form state)
        const form = document.querySelector(".form-quiz"); // Use the correct form class
        form.reset();
    
        // 3. Re-enable all disabled inputs
        const allInputs = form.querySelectorAll("input, select, textarea");
        allInputs.forEach((input) => {
            input.disabled = false; // Ensure all inputs are enabled
        });
    
        // 4. Hide all steps except the species selection step
        const formSteps = document.querySelectorAll(".form-step");
        formSteps.forEach((step) => {
            step.classList.add("d-none");
            step.classList.remove("form-step-active");
        });
    
        // 5. Reset progress bar
        const progressSteps = document.querySelectorAll(".progress-step");
        progressSteps.forEach((step) => {
            step.classList.remove("progress-step-active");
        });
    
        const progressBar = document.getElementById("progress");
        progressBar.style.width = "0%";
    
        // 6. Hide the progress bar container
        const progressBarContainer = document.querySelector(".progressbar");
        progressBarContainer.style.display = "none";
    
        // 7. Show the species selection step
        const speciesStep = formSteps[0]; // Assuming the species selection is the first form-step
        speciesStep.classList.remove("d-none");
        speciesStep.classList.add("form-step-active");
    
        // 8. Reset global variables
        currentStep = 0; // First step index
        selectedSpecies = null; // Clear previously selected species
        activeSteps = []; // Clear the active steps array
    });    

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-next") || 
            e.target.classList.contains("btn-prev") || 
            e.target.classList.contains("btn-submit") || 
            e.target.classList.contains("btn-pre-submit")) {
            
            e.preventDefault();
    
            // Scroll to the top of the page
            window.scrollTo({
                top: 0,      // Scroll to the very top
                behavior: "smooth"  // Use smooth scrolling for a better user experience
            });
    
            // Your existing logic for handling buttons goes here...
        }
    });

});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-next")) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-prev")) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    }
}
);
