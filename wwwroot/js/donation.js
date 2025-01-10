document.addEventListener("DOMContentLoaded", () => {
    const shelterFilter = document.getElementById("shelterFilter");
    const shelterList = document.getElementById("shelterList");

    // Show dropdown on input focus
    shelterFilter.addEventListener("focus", () => {
        shelterList.classList.remove("d-none");
    });

    // Hide dropdown on click outside
    document.addEventListener("click", (event) => {
        if (!shelterFilter.contains(event.target) && !shelterList.contains(event.target)) {
            shelterList.classList.add("d-none");
        }
    });

    // Populate input field with selected item
    shelterList.addEventListener("click", (event) => {
        if (event.target.tagName === "LI") {
            shelterFilter.value = event.target.textContent;
            shelterList.classList.add("d-none");
        }
    });

    // Filter the dropdown items
    shelterFilter.addEventListener("input", () => {
        const filter = shelterFilter.value.toLowerCase();
        const items = shelterList.getElementsByTagName("li");
        Array.from(items).forEach((item) => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(filter) ? "" : "none";
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const donationButton = document.getElementById("donation_button");
    const donationModal = document.getElementById("donationModal");
    const closeModal = document.getElementById("closeModal");

    // Open the modal
    donationButton.addEventListener("click", () => {
        donationModal.classList.remove("d-none");
    });

    // Close the modal
    closeModal.addEventListener("click", () => {
        donationModal.classList.add("d-none");
    });

    // Close the modal by clicking outside the modal content
    donationModal.addEventListener("click", (event) => {
        if (event.target === donationModal) {
            donationModal.classList.add("d-none");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const detailsButton = document.getElementById("details");
    const moreDetails = document.getElementById("moreDetails");

    detailsButton.addEventListener("click", () => {
        if (moreDetails.classList.contains("d-none")) {
            moreDetails.classList.remove("d-none");
            detailsButton.textContent = "Mostrar Menos";
        } else {
            moreDetails.classList.add("d-none");
            detailsButton.textContent = "Saber Mais";
        }
    });
});
