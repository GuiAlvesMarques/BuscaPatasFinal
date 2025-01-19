document.addEventListener("DOMContentLoaded", () => {
    // Donation modal handling
    const donationButton = document.getElementById("donation_button");
    const donationModal = document.getElementById("donationModal");
    const closeModal = document.getElementById("closeModal");

    donationButton.addEventListener("click", () => donationModal.classList.remove("d-none"));
    closeModal.addEventListener("click", () => donationModal.classList.add("d-none"));
    donationModal.addEventListener("click", (event) => {
        if (event.target === donationModal) {
            donationModal.classList.add("d-none");
        }
    });

    // More details toggle
    const detailsButton = document.getElementById("details");
    const moreDetails = document.getElementById("moreDetails");

    detailsButton.addEventListener("click", () => {
        moreDetails.classList.toggle("d-none");
        detailsButton.textContent = moreDetails.classList.contains("d-none") ? "Saber Mais" : "Mostrar Menos";
    });

    // Donation amount selection
    const donationAmountInput = document.getElementById("DonationAmount");
    const donationButtons = document.querySelectorAll(".donation-btn");

    donationButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const selectedAmount = event.target.textContent.replace("€", "").trim();
            donationAmountInput.value = selectedAmount;

            donationButtons.forEach((btn) => btn.classList.remove("selected"));
            event.target.classList.add("selected"); // Highlight the selected button
        });
    });

    // Handle custom amount input
    const customAmountInput = document.getElementById("customAmount");
    customAmountInput.addEventListener("input", () => {
        donationAmountInput.value = customAmountInput.value;
    });

    // Form validation before submission
    const donationForm = document.getElementById("donationForm");
    donationForm.addEventListener("submit", (event) => {
        const donationAmount = document.getElementById("DonationAmount").value;
        const shelterName = document.getElementById("shelterFilter").value;

        if (!donationAmount || !shelterName) {
            event.preventDefault();
            alert("Por favor, selecione um valor e escolha um parceiro antes de doar.");
        } else {
            alert("Obrigado pelo seu donativo!");
        }
    });
});