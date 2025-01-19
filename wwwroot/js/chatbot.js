document.addEventListener("DOMContentLoaded", () => {
    const chatbotInput = document.querySelector(".chatbot-input");
    const chatbotButton = document.querySelector(".chatbot-footer button");
    const chatbotConversation = document.querySelector(".chatbot-conversation");

    const responses = {
        "como adotar um animal": "Para adotar um animal, visite a nossa página de <a href='adotar.html'>Adoção</a> e escolha o animal desejado.",
        "animal perdido": "Se encontrar um animal perdido, acesse a página <a href='reportar-encontrado.html'>Reportar Encontrado</a> e forneça informações detalhadas.",
        "visitar o abrigo": "Sim! Você pode entrar em contato diretamente com o abrigo para agendar uma visita.",
        "preço da adoção": "Depende do abrigo. Alguns cobram taxas para cobrir custos veterinários, outros oferecem a adoção gratuita.",
        "que animais posso adotar": "Atualmente oferecemos adoção de cães e gatos. Visite nossa página de adoção para mais detalhes.",
    };

    function addMessageToChatbox(message, isUser = false) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("chatbot-message");
        messageElement.classList.add(isUser ? "user-message" : "bot-message");
        messageElement.innerHTML = message;
        chatbotConversation.appendChild(messageElement);
        chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
    }

    function handleUserInput() {
        const userInput = chatbotInput.value.trim().toLowerCase();
        if (userInput === "") return;

        addMessageToChatbox(userInput, true);

        let response = "Desculpe, não entendi. Tente outra pergunta ou consulte nossa <a href='faq.html'>FAQ</a>.";
        for (const question in responses) {
            if (userInput.includes(question)) {
                response = responses[question];
                break;
            }
        }

        setTimeout(() => addMessageToChatbox(response), 1000);
        chatbotInput.value = "";
    }

    chatbotButton.addEventListener("click", handleUserInput);
    chatbotInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            handleUserInput();
        }
    });
});
