document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);

    fetch("/Account/Register", {
        method: "POST",
        body: formData,
    })
        .then((response) => {
            // Check if the response is JSON
            if (!response.ok) {
                throw new Error("Server error occurred.");
            }
            return response.json();
        })
        .then((data) => {
            const popupMessage = document.getElementById("popupMessage");

            if (data.success) {
                popupMessage.classList.remove("d-none", "alert-danger");
                popupMessage.classList.add("alert-success");
                popupMessage.innerText = data.message;

                // Optional: Redirect after success
                setTimeout(() => {
                    window.location.href = "/index.html"; // Redirect to homepage
                }, 2000);
            } else {
                popupMessage.classList.remove("d-none", "alert-success");
                popupMessage.classList.add("alert-danger");
                popupMessage.innerText = data.message;
            }
        })
        .catch((error) => {
            const popupMessage = document.getElementById("popupMessage");
            popupMessage.classList.remove("d-none", "alert-success");
            popupMessage.classList.add("alert-danger");
            popupMessage.innerText = "An error occurred. Please try again.";
            console.error("Error:", error);
        });
});

// Login: Lógica para o formulário de login
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita o envio padrão do formulário

    const formData = new FormData(this);

    // Debug: Exibe os dados enviados
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    fetch("/Account/Login", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            const popupMessage = document.getElementById("popupMessage");

            if (data.success) {
                popupMessage.classList.remove("d-none", "alert-danger");
                popupMessage.classList.add("alert-success");
                popupMessage.innerText = data.message;

                setTimeout(() => {
                    window.location.href = "/UserP.html";
                }, 2000);
            } else {
                popupMessage.classList.remove("d-none", "alert-success");
                popupMessage.classList.add("alert-danger");
                popupMessage.innerText = data.message;
            }
        })
        .catch((error) => {
            const popupMessage = document.getElementById("popupMessage");
            popupMessage.classList.remove("d-none", "alert-success");
            popupMessage.classList.add("alert-danger");
            popupMessage.innerText = "Erro ao tentar realizar login. Tente novamente mais tarde.";
            console.error("Erro ao tentar login:", error);
        });
});

