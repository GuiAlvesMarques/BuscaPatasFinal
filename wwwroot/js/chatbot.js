document.addEventListener("DOMContentLoaded", () => {
    const chatbotInput = document.querySelector(".chatbot-input");
    const chatbotButton = document.querySelector(".chatbot-footer button");
    const chatbotConversation = document.querySelector(".chatbot-conversation");

    const responses = {
        "como encontrar um abrigo": "Pode utilizar o nosso <a href='index.html#mapa'>Mapa de Serviços</a> para encontrar abrigos, pet shops e hospitais veterinários próximos da sua localização.",
        "encontrar um abrigo perto de mim": "Pode utilizar o nosso <a href='index.html#mapa'>Mapa de Serviços</a> para encontrar abrigos, pet shops e hospitais veterinários próximos da sua localização.",

        "posso inserir um animal para adopção": "Sim, pode inserir um animal para adopção através da página <a href='entrega-animal.html'>Entrega Animal</a>. Preencha o formulário com as informações do animal e ele estará disponível para adopção.",
        "como colocar um animal para adopção": "Sim, pode inserir um animal para adopção através da página <a href='entrega-animal.html'>Entrega Animal</a>. Preencha o formulário com as informações do animal e ele estará disponível para adopção.",

        "quem pode adoptar os animais": "Qualquer pessoa interessada pode adoptar os animais listados no site. Basta entrar em contato com o responsável pelo animal na página de detalhes.",
        "quem pode ficar com um animal": "Qualquer pessoa interessada pode adoptar os animais listados no site. Basta entrar em contato com o responsável pelo animal na página de detalhes.",
        "Como adoptar um animal": "Qualquer pessoa interessada pode adoptar os animais listados no site. Basta entrar em contato com o responsável pelo animal na página de detalhes.",

        "como funciona a entrega de animais": "A entrega responsável permite que donos encontrem novos lares para seus animais, garantindo que os futuros adoptantes estejam preparados para cuidar do animal.",
        "como entregar um animal para adopção": "Ao aceder à página Entrega Animal do website pode preencher o formulário de entrega para o animal, <a href='entrega-animal.html'>Entrega Animal</a>.",

        "o site buscapatas é gratuito": "Sim, a nossa plataforma é totalmente gratuita tanto para quem deseja colocar animais para adopção como para quem deseja adotá-los.",
        "preciso pagar para usar o site": "Não, a nossa plataforma é totalmente gratuita tanto para quem deseja colocar animais para adopção como para quem deseja adotá-los.",

        "como posso ajudar os abrigos": "Pode ajudar os abrigos parceiros através de doações na página <a href='ajuda.html'>Apoiar</a>, contribuindo financeiramente ou oferecendo bens necessários.",
        "como ajudar os abrigos": "Pode ajudar os abrigos parceiros através de doações na página <a href='ajuda.html'>Apoiar</a>, contribuindo financeiramente ou oferecendo bens necessários.",

        "o que fazer se encontrar um animal": "Caso encontre um animal abandonado, pode registá-lo na nossa página de <a href='perdidos-e-encontrados.html'>Perdidos e Encontrados</a> para ajudar a encontrar o dono",
        "como reportar um animal encontrado": "Caso encontre um animal abandonado, pode registá-lo na nossa página de <a href='perdidos-e-encontrados.html'>Perdidos e Encontrados</a> para ajudar a encontrar o dono",

        "posso filtrar os animais para adopção": "Sim, pode filtrar os animais por espécie, idade e localização utilizando as opções disponíveis na página de <a href='adotar.html'>adopção</a>.",
        "como filtrar os animais disponíveis": "Pode filtrar os animais por espécie, idade e localização utilizando as opções disponíveis na página de <a href='adotar.html'>adopção</a>.",

        "os animais estão vacinados": "A situação de saúde de cada animal é definida pelo responsável que o adicionou ao site. Recomendamos verificar as informações na página do animal.",
        "os animais têm vacinas": "A situação de saúde de cada animal é definida pelo responsável que o adicionou ao site. Recomendamos verificar as informações na página do animal.",

        "como entrar em contato com um abrigo": "Cada abrigo listado no site tem uma página própria com informações de contato. Pode encontrar essas informações na seção <a href='partners.html'>Parceiros</a>.",
        "onde encontro o contato de um abrigo": "Cada abrigo listado no site tem uma página própria com informações de contato. Pode encontrar essas informações na seção <a href='partners.html'>Parceiros</a>.",

        "ola": "Olá! Como posso ajudar?",
        "olá": "Olá! Como posso ajudar?",
        "Tudo bem": "Sim! Como posso ajudar?",
        "bom dia": "Bom dia! Como posso ajudar?",
        "boa tarde": "Boa tarde! Como posso ajudar?",
        "boa noite": "Boa noite! Como posso ajudar?",

        "como funciona o matchmaking de adopção": "Nosso sistema de matchmaking ajuda a conectar animais disponíveis com adoptantes ideais, considerando preferências e estilo de vida. Experimente na página de <a href='matchmaking.html'>Matchmaking</a>.",
        "como faço o teste de matchmaking": "Para encontrar o animal ideal, acesse a página de <a href='matchmaking.html'>Matchmaking</a> e preencha o questionário para receber sugestões personalizadas.",

        "o que é o Buscapatas": "O Buscapatas é uma plataforma que ajuda a conectar adoptantes a abrigos e donos de animais, facilitando adoções responsáveis em Portugal.",
        "como funciona o site buscapatas": "Nosso site permite que usuários registrem animais para adopção, encontrem abrigos e façam doações para ajudar animais necessitados.",

        "posso doar ração para os abrigos": "Sim, pode entrar em contato com os abrigos listados na página de <a href='partners.html'>Parceiros</a> para saber como doar ração ou outros itens necessários.",
        "como fazer doações de alimentos para animais": "Pode contribuir com doações de alimentos entrando em contato diretamente com os abrigos na página de <a href='partners.html'>Parceiros</a>.",

        "como posso denunciar maus-tratos a animais": "Se testemunhar maus-tratos, deve contactar as autoridades locais de proteção animal. O Buscapatas não lida diretamente com denúncias, mas recomendamos relatar casos à polícia ou organizações de bem-estar animal.",
        "onde denunciar abuso de animais": "Recomenda-se entrar em contato com as autoridades locais ou organizações como a GNR SEPNA para denunciar maus-tratos.",

        "posso entregar um animal de outra pessoa": "Não é permitido entregar animais que não sejam seus sem autorização. Recomendamos entrar em contato com o responsável pelo animal antes de listá-lo para adopção.",
        "posso colocar um animal para adopção se não for meu": "Para garantir a transparência do processo, apenas os responsáveis legais pelo animal podem listá-lo para adopção no Buscapatas.",

        "como posso adoptar um cão ou gato": "Basta visitar a página de <a href='adotar.html'>adopção</a>, escolher o animal desejado e entrar em contato com o responsável indicado no perfil do animal.",
        "quais as raças disponíveis para adopção": "As raças disponíveis variam conforme os animais cadastrados. Recomendamos visitar a página de <a href='adotar.html'>adopção</a> para verificar as opções atuais.",

        "como posso atualizar as informações do meu animal": "Pode editar os dados do animal através da sua conta de usuário acessando a seção de gerenciamento de animais no site.",
        "posso remover um animal da plataforma": "Sim, pode remover um animal que cadastrou na plataforma acessando a sua conta e removendo o perfil do animal.",

        "o site garante que os adoptantes são responsáveis": "Fazemos o possível para promover adoções responsáveis, mas a decisão final cabe ao abrigo ou responsável pelo animal.",
        "como saber se o adoptante é confiável": "Recomendamos que converse com o adoptante, visite sua casa se possível e esclareça todas as dúvidas antes de finalizar a adopção.",

        "posso anunciar um evento de adopção": "Sim, entre em contato conosco para saber como anunciar eventos de adopção em nossa plataforma.",
        "como promover um evento no site": "Para promover eventos de adopção ou conscientização, pode enviar informações através da página de <a href='contacto.html'>Contato</a>.",

        "o site oferece suporte para quem adopta": "Sim, disponibilizamos informações e orientações na seção de <a href='faq.html'>FAQ</a> para ajudar adoptantes no processo de adaptação.",
        "o que faço se não puder mais cuidar do animal": "Se não puder mais cuidar do animal, pode registá-lo para adopção na página <a href='entrega-animal.html'>Entrega Animal</a>.",

        "os abrigos são verificados pelo site": "Trabalhamos para listar abrigos confiáveis, mas recomendamos que os adoptantes verifiquem as informações diretamente com os abrigos.",
        "como saber se um abrigo é confiável": "Recomendamos verificar as avaliações e histórico do abrigo, além de entrar em contato diretamente para mais informações.",

        "o site oferece serviços veterinários": "O Buscapatas não oferece serviços veterinários diretamente, mas pode encontrar clínicas na seção de <a href='index.html#mapa'>Mapa de Serviços</a>.",
        "posso encontrar clínicas veterinárias no site": "Sim, use o nosso <a href='index.html#mapa'>Mapa de Serviços</a> para localizar clínicas veterinárias próximas de você.",

        "como posso criar uma conta no site": "Clique no ícone de perfil no canto superior direito e siga as instruções para criar uma conta gratuitamente.",
        "como faço login no site": "Clique no ícone de perfil no canto superior direito e insira suas credenciais para acessar sua conta.",

        "o site tem uma versão para telemóvel": "Sim, o site do Buscapatas é otimizado para dispositivos móveis, permitindo uma navegação fácil e intuitiva.",
        "posso aceder ao site no telemóvel": "Sim, o Buscapatas é compatível com dispositivos móveis e pode ser acessado através do navegador do seu smartphone."
    };

    // Function to remove accents from strings
    // Function to remove accents from strings
    function removeAccents(str) {
        return str
            .normalize("NFD")  // Decompose Unicode characters
            .replace(/[\u0300-\u036f]/g, "")  // Remove diacritic marks
            .toLowerCase();  // Convert to lowercase
    }

    function addMessageToChatbox(message, isUser = false) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("chatbot-message");
        messageElement.classList.add(isUser ? "user-message" : "bot-message");
        messageElement.innerHTML = message;
        chatbotConversation.appendChild(messageElement);
        chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
    }

    function findBestResponse(userInput) {
        userInput = removeAccents(userInput.trim());

        // Check for exact match first
        if (responses[userInput]) {
            return responses[userInput];
        }

        let bestMatch = null;
        let maxMatches = 0;

        for (const key in responses) {
            const normalizedKey = removeAccents(key);
            const keywords = normalizedKey.split(" "); // Consider all words
            const inputWords = userInput.split(" "); // Consider all input words

            let matchCount = 0;

            for (const word of keywords) {
                if (inputWords.includes(word)) {
                    matchCount++;
                }
            }

            if (matchCount > maxMatches) {
                maxMatches = matchCount;
                bestMatch = responses[key];
            }
        }

        if (maxMatches > 0) {
            return bestMatch;
        }

        return "Desculpe, não entendi. Tente outra pergunta ou consulte nossa <a href='faq.html'>FAQ</a>.";
    }

    function handleUserInput() {
        const userInput = chatbotInput.value.trim();
        if (userInput === "") return;

        addMessageToChatbox(userInput, true);

        setTimeout(() => {
            const response = findBestResponse(userInput);
            addMessageToChatbox(response);
        }, 1000);

        chatbotInput.value = "";
    }

    chatbotButton.addEventListener("click", handleUserInput);
    chatbotInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            handleUserInput();
        }
    });
});