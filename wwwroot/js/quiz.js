document.addEventListener("DOMContentLoaded", function () {
    const speciesSelection = document.getElementById("speciesSelection");
    const quizSection = document.getElementById("quizSection");
    const quizQuestionsContainer = document.getElementById("quizQuestions");
    const backToSelection = document.getElementById("backToSelection");
    const submitButton = document.getElementById("submitButton");
    const nextButton = document.getElementById("nextButton");
    const prevButton = document.getElementById("prevButton");

    // Track current species and section
    let currentSpecies = "";
    let currentSectionIndex = 0;

    // Define sections and order
    const sectionOrder = ["pet characteristics", "lifestyle", "commitment", "relationship with the pet"];

    // Questions for dogs and cats
    const questions = {
        // Questions for dogs
        dog: [
            // Pet characteristics section
            {
                question: "Porte ideal para o seu cão.",
                options: [
                    { value: "1", label: "Mini", details: "Mini: até 5 kg" },
                    { value: "2", label: "Pequeno", details: "Pequeno: 5-10 kg" },
                    { value: "3", label: "Médio", details: "Médio: 10-20 kg" },
                    { value: "4", label: "Grande", details: "Grande: 20-35 kg" },
                    { value: "5", label: "Gigante", details: "Gigante: acima de 35 kg" },
                ],
                allowNoPreference: true,
                group: "size",
                type: "pet characteristics",
            },
            {
                question: "Faixa etária ideal para o seu cão.",
                options: [
                    { value: "1", label: "Filhote", details: "Filhote: 0-1 ano" },
                    { value: "2", label: "Jovem adulto", details: "Jovem adulto: 1-3 anos" },
                    { value: "3", label: "Adulto", details: "Adulto: 3-8 anos" },
                    { value: "4", label: "Sénior", details: "Sênior: 8+ anos" },
                ],
                allowNoPreference: true,
                group: "age",
                type: "pet characteristics",
            },
            {
                question: "Nível de energia ideal para o seu cão.",
                options: [
                    { value: "1", label: "Baixo", details: "Baixo: relaxado, requer mínimo de exercício" },
                    { value: "2", label: "Médio", details: "Médio: equilibrado entre atividade e descanso" },
                    { value: "3", label: "Alto", details: "Alto: muito ativo, precisa de muito exercício" },
                ],
                allowNoPreference: true,
                group: "energy",
                type: "pet characteristics",
            },
            {
                question: "Comprimento de pelo ideal para o seu cão.",
                options: [
                    { value: "1", label: "Curto" },
                    { value: "2", label: "Médio" },
                    { value: "3", label: "Longo" },
                ],
                allowNoPreference: true,
                group: "fur",
                type: "pet characteristics",
            },
            {
                question: "Estaria confortável com a queda de pelo?",
                options: [
                    { value: "1", label: "Prefiro queda mínima." },
                    { value: "2", label: "Alguma queda é aceitável." },
                    { value: "3", label: "Queda intensa é aceitável." },
                ],
                allowNoPreference: false,
                group: "shedding",
                type: "pet characteristics",
            },
            {
                question: "Estaria confortável com um cão com problemas de saúde?",
                options: [
                    { value: "1", label: "Não estou confortável em ter um cão com problemas de saúde." },
                    { value: "2", label: "Posso lidar com problemas de saúde não graves.", example: "Por exemplo, alergias." },
                    { value: "3", label: "Tenho preparação para lidar com problemas de saúde graves.", example: "Por exemplo, deficiências, condições crónicas." },
                ],
                allowNoPreference: false,
                group: "health",
                type: "pet characteristics",
            },
            {
                question: "O cão precisa se dar bem com outros animais?",
                options: [
                    { value: "1", label: "Sim, deve se dar bem com outros cães." },
                    { value: "2", label: "Sim, deve se dar bem com cães e gatos." },
                    { value: "3", label: "Não importa." },
                ],
                allowNoPreference: false,
                group: "social",
                type: "pet characteristics",
            },
            {
                question: "O cão precisa saber lidar com crianças?",
                options: [
                    { value: "1", label: "Sim, deve ser amigável com crianças."},
                    { value: "2", label: "Não há crianças em casa." },
                    { value: "3", label: "Tanto faz." },
                ],
                allowNoPreference: false,
                group: "children",
                type: "pet characteristics",
            },
            {
                question: "Personalidade ideal para o seu cão.",
                options: [
                    { value: "1", label: "Muito afetuoso e apegado." },
                    { value: "2", label: "Independente, mas gosta de atenção ocasional." },
                    { value: "3", label: "Brincalhão e enérgico." },
                    { value: "4", label: "Calmo e reservado." },
                ],
                allowNoPreference: false,
                group: "personality",
                type: "pet characteristics",
            },
            {
                question: "Qual o nível de vocalização que tolera?",
                options: [
                    { value: "1", label: "Prefiro um cão silencioso." },
                    { value: "2", label: "Alguma vocalização é aceitável." },
                    { value: "3", label: "Vocalização frequente é aceitável." },
                ],
                allowNoPreference: true,
                group: "vocalization",
                type: "pet characteristics",
            },
            {
                question: "Tem alergias a cães?",
                options: [
                    { value: "1", label: "Sim, a raças de pelo comprido." },
                    { value: "2", label: "Sim, mas ligeiras, controláveis com cães de pelo curto." },
                    { value: "3", label: "Não." },
                    { value: "4", label: "Incerto, mas preferia um cão hipoalergénico." },
                ],
                allowNoPreference: false,
                group: "allergies",
                type: "pet characteristics",
            },
            {
                question: "Preferia um cão de uma raça específica?",
                options: [
                    { value: "1", label: "Sim, especificar raça." },
                    { value: "2", label: "Sem preferência." },
                ],
                allowNoPreference: false,
                group: "breed",
                type: "pet characteristics",
            },
            // Lifestyle section
            {
                question: "Quanto tempo pode dedicar para exercitar o seu cão?",
                options: [
                    { value: "1", label: "Menos de 30 minutos por dia." },
                    { value: "2", label: "30 minutos a 1 hora por dia." },
                    { value: "3", label: "1-2 horas por dia." },
                    { value: "4", label: "Mais de 2 horas por dia." },
                ],
                allowNoPreference: false,
                group: "exercise",
                type: "lifestyle",
            },
            {
                question: "O quão ativo é o seu estilo de vida?",
                options: [
                    { value: "1", label: "Sedentário", example: "Pouca atividade, o cão vai passar a maior parte do dia em casa." },
                    { value: "2", label: "Moderado", example: "Vamos fazer caminhadas ou atividades leves diarimente." },
                    { value: "3", label: "Ativo", example: "Vamos correr e fazer exercícios algumas vezes por semana, além das caminhadas diárias." },
                    { value: "4", label: "Muito ativo", example: "Vamos fazer atividades regulares ao ar livre, caminhadas, corridas." },
                ],
                allowNoPreference: false,
                group: "outdoors",
                type: "lifestyle",
            },
            {
                question: "Qual será o nível de atividade ou estímulos diários?",
                options: [
                    { value: "1", label: "Mínimo", example: "Ambiente relaxado." },
                    { value: "2", label: "Moderado", example: "Algum tempo de brincadeira." },
                    { value: "3", label: "Alto", example: "Brincadeiras diárias e atividades para estimulação mental." },
                ],
                allowNoPreference: false,
                group: "activities",
                type: "lifestyle",
            },
            {
                question: "Como é a moradia? Escolha a opção mais semelhante.",
                options: [
                    { value: "1", label: "Apartamento ou casa pequena (menos de 50 m²)." },
                    { value: "2", label: "Apartamento ou casa de tamanho médio (50-100 m²)." },
                    { value: "3", label: "Apartamento ou casa grande (mais de 100 m²)." },
                    { value: "4", label: "Espaço grande com jardim ou quintal." },
                    { value: "5", label: "Quinta com muita área exterior." },
                ],
                allowNoPreference: false,
                group: "home",
                type: "lifestyle",
            },
            {
                question: "Há fácil acesso a espaços exteriores para exercício?",
                options: [
                    { value: "1", label: "Sim, um quintal privado." },
                    { value: "2", label: "Sim, parques ou espaços abertos próximos." },
                    { value: "3", label: "Não, acesso limitado a espaços exteriores." },
                ],
                allowNoPreference: false,
                group: "outdoor-access",
                type: "lifestyle",
            },
            {
                question: "Passa quanto tempo fora de casa diariamente?",
                options: [
                    { value: "1", label: "Menos de 2 horas." },
                    { value: "2", label: "2-4 horas." },
                    { value: "3", label: "4-8 horas." },
                    { value: "4", label: "Mais de 8 horas." },
                ],
                allowNoPreference: false,
                group: "away-time",
                type: "lifestyle",
            },
            {
                question: "Com que frequência viaja?",
                options: [
                    { value: "1", label: "Raramente, quase nunca." },
                    { value: "2", label: "Ocasionalmente, viagens curtas." },
                    { value: "3", label: "Frequentemente. Vou levar o cão em viagens." },
                    { value: "4", label: "Frequentemente. Vou deixar o cão a cuidado de terceiros." },
                ],
                allowNoPreference: false,
                group: "travel",
                type: "lifestyle",
            },
            {
                question: "O ambiente em casa é geralmente silencioso ou barulhento?",
                options: [
                    { value: "1", label: "Muito silencioso (sem trânsito ou barulho alto)." },
                    { value: "2", label: "Moderadamente silencioso." },
                    { value: "3", label: "Barulhento (centro da cidade, barulho frequente)." },
                    { value: "4", label: "Variável (depende do horário ou dia)." },
                ],
                allowNoPreference: false,
                group: "noise",
                type: "lifestyle",
            },
            // Commitment section
            {
                question: "Tem tempo para treinar o seu cão?",
                options: [
                    { value: "1", label: "Não, prefiro um cão que já saiba comandos básicos." },
                    { value: "2", label: "Sim, tenho disposição para treinar comandos básicos." },
                    { value: "3", label: "Sim, gosto de treinar e ensinar novos truques." },
                ],
                allowNoPreference: true,
                group: "training",
                type: "commitment",
            },
            {
                question: "O cão precisa estar treinado para fazer as necessidades fora de casa?",
                options: [
                    { value: "1", label: "Sim, deve estar treinado." },
                    { value: "2", label: "Tenho disposição para o treinar." },
                ],
                allowNoPreference: true,
                group: "house-training",
                type: "commitment",
            },
            {
                question: "Estaria confortável com um cão com problemas de comportamento? (ex: ansiedade, dificuldades de socialização)",
                options: [
                    { value: "1", label: "Não, prefiro um cão bem comportado." },
                    { value: "2", label: "Problemas menos graves são aceitáveis." },
                    { value: "3", label: "Sim, estou disposto a ajudar com problemas de comportamento." },
                ],
                allowNoPreference: false,
                group: "behaviour",
                type: "commitment",
            },
            {
                question: "Quanto está disposto a gastar em cuidados veterinários por mês?",
                options: [
                    { value: "1", label: "Menos de 50€" },
                    { value: "2", label: "50€ a 100€" },
                    { value: "3", label: "100€ a 200€" },
                    { value: "4", label: "Mais de 200€" },
                ],
                allowNoPreference: false,
                group: "vet-costs",
                type: "commitment",
            },
            {
                question: "Com que frequência pode levar o cão ao veterinário?",
                options: [
                    { value: "1", label: "Uma vez por ano" },
                    { value: "2", label: "A cada 6 meses" },
                    { value: "3", label: "Conforme necessário" },
                ],
                allowNoPreference: false,
                group: "vet-visits",
                type: "commitment",
            },
            {
                question: "Estaria confortável com um cão que requer uma dieta especial?",
                options: [
                    { value: "1", label: "Dieta simples (ração normal)" },
                    { value: "2", label: "Disposto a gerir uma dieta especial" },
                    { value: "3", label: "Posso fornecer refeições caseiras ou especializadas" },
                ],
                allowNoPreference: false,
                group: "special-diet",
                type: "commitment",
            },
            // Relationship section
            {
                question: "Qual o nível de interação que espera ter com o seu cão diariamente?",
                options: [
                    { value: "1", label: "Muito. Quero companhia constante." },
                    { value: "2", label: "Moderado. Quero algumas horas de interação." },
                    { value: "3", label: "Mínimo. Em momentos de descanso em casa." },
                ],
                allowNoPreference: false,
                group: "interaction",
                type: "relationship",
            },
            {
                question: "Qual o papel que espera que o cão desempenhe na sua vida?",
                options: [
                    { value: "1", label: "Companheiro para relaxar." },
                    { value: "2", label: "Presença brincalhona." },
                    { value: "3", label: "Independente, que aprecie a sua própria companhia." },
                ],
                allowNoPreference: false,
                group: "role",
                type: "relationship",
            },
            {
                question: "Como espera que o cão passe a maior parte do dia?",
                options: [
                    { value: "1", label: "A dormir dentro de casa." },
                    { value: "2", label: "A brincar ou exercitar-se ao ar livre." },
                    { value: "3", label: "A acompanhar-me durante o dia." },
                ],
                allowNoPreference: false,
                group: "day",
                type: "relationship",
            },
        ],
        // Questions for cats
        cat: [
            // Pet characteristics section
            {
                question: "Porte ideal para o seu gato.",
                options: [
                    { value: "1", label: "Pequeno", details: "Pequeno: até 3 kg" },
                    { value: "2", label: "Médio", details: "Médio: 3-5 kg" },
                    { value: "3", label: "Grande", details: "Grande: 5-7 kg" },
                    { value: "4", label: "Gigante", details: "Gigante: acima de 7 kg" },
                ],
                allowNoPreference: true,
                group: "size",
                type: "pet characteristics",
            },
            {
                question: "Faixa etária ideal para o seu gato.",
                options: [
                    { value: "1", label: "Filhote", details: "Filhote: 0-1 ano" },
                    { value: "2", label: "Jovem adulto", details: "Jovem adulto: 1-3 anos" },
                    { value: "3", label: "Adulto", details: "Adulto: 3-8 anos" },
                    { value: "4", label: "Sénior", details: "Sênior: 8+ anos" },
                ],
                allowNoPreference: true,
                group: "age",
                type: "pet characteristics",
            },
            {
                question: "Nível de energia ideal para o seu gato.",
                options: [
                    { value: "1", label: "Baixo", details: "Baixo: calmo e relaxado" },
                    { value: "2", label: "Médio", details: "Médio: brincalhão, mas calmo quando está dentro de casa" },
                    { value: "3", label: "Alto", details: "Alto: ativo, adora brincar e escalar" },
                ],
                allowNoPreference: true,
                group: "energy",
                type: "pet characteristics",
            },
            {
                question: "Comprimento de pelo ideal para o seu gato.",
                options: [
                    { value: "1", label: "Curto" },
                    { value: "2", label: "Médio" },
                    { value: "3", label: "Longo" },
                ],
                allowNoPreference: true,
                group: "fur",
                type: "pet characteristics",
            },
            {
                question: "Estaria confortável com a queda de pelo?",
                options: [
                    { value: "1", label: "Prefiro queda de pelo mínima." },
                    { value: "2", label: "Não me importo com queda de pelo moderada." },
                    { value: "3", label: "Não me importo de todo com queda de pelo." },
                ],
                allowNoPreference: false,
                group: "shedding",
                type: "pet characteristics",
            },
            {
                question: "Estaria confortável com um gato que requer cuidados de higiene, como escova e banho?",
                options: [
                    { value: "1", label: "Não, prefiro baixa manutenção." },
                    { value: "2", label: "Sim, tenho disposição para cuidar regularmente da higiene do gato." },
                ],
                allowNoPreference: false,
                group: "grooming",
                type: "pet characteristics",
            },
            {
                question: "Estaria confortável com um gato com problemas de saúde?",
                options: [
                    { value: "1", label: "Não estou confortável em ter um gato com problemas de saúde." },
                    { value: "2", label: "Posso lidar com problemas de saúde não graves.", example: "Por exemplo, alergias." },
                    { value: "3", label: "Tenho preparação para lidar com problemas de saúde graves.", example: "Por exemplo, deficiências, condições crónicas." },
                ],
                allowNoPreference: false,
                group: "health",
                type: "pet characteristics",
            },
            {
                question: "O gato precisa se dar bem com outros animais?",
                options: [
                    { value: "1", label: "Sim, deve se dar bem com outros gatos." },
                    { value: "2", label: "Sim, deve se dar bem com cães e gatos." },
                    { value: "3", label: "Não importa." },
                ],
                allowNoPreference: false,
                group: "social",
                type: "pet characteristics",
            },
            {
                question: "O gato precisa saber lidar com crianças?",
                options: [
                    { value: "1", label: "Sim, deve ser amigável com crianças." },
                    { value: "2", label: "Não há crianças em casa." },
                    { value: "3", label: "Tanto faz." },
                ],
                allowNoPreference: false,
                group: "children",
                type: "pet characteristics",
            },
            {
                question: "Personalidade ideal para o seu gato.",
                options: [
                    { value: "1", label: "Muito afetuoso e apegado." },
                    { value: "2", label: "Independente, mas gosta de atenção ocasional." },
                    { value: "3", label: "Brincalhão e enérgico." },
                    { value: "4", label: "Calmo e reservado." },
                ],
                allowNoPreference: false,
                group: "personality",
                type: "pet characteristics",
            },
            {
                question: "Qual o nível de vocalização que tolera?",
                options: [
                    { value: "1", label: "Prefiro um gato silencioso." },
                    { value: "2", label: "Alguma vocalização é aceitável." },
                    { value: "3", label: "Vocalização frequente é aceitável." },
                ],
                allowNoPreference: true,
                group: "vocalization",
                type: "pet characteristics",
            },
            {
                question: "Tem alergias a gatos?",
                options: [
                    { value: "1", label: "Sim, a raças de pelo comprido." },
                    { value: "2", label: "Sim, mas ligeiras, controláveis com gatos de pelo curto." },
                    { value: "3", label: "Não." },
                    { value: "4", label: "Incerto, mas preferia um gato hipoalergénico." },
                ],
                allowNoPreference: false,
                group: "allergies",
                type: "pet characteristics",
            },
            {
                question: "Preferia um gato de uma raça específica?",
                options: [
                    { value: "1", label: "Sim, especificar raça." },
                    { value: "2", label: "Sem preferência." },
                ],
                allowNoPreference: false,
                group: "breed",
                type: "pet characteristics",
            },
            // Lifestyle section
            {
                question: "Quanto tempo pode dedicar para brincar com o seu gato?",
                options: [
                    { value: "1", label: "Menos de 30 minutos por dia." },
                    { value: "2", label: "30 minutos a 1 hora por dia." },
                    { value: "3", label: "1-2 horas por dia." },
                    { value: "4", label: "Mais de 2 horas por dia." },
                ],
                allowNoPreference: false,
                group: "playtime",
                type: "lifestyle",
            },
            {
                question: "Qual será o nível de atividade ou estímulos diários?",
                options: [
                    { value: "1", label: "Mínimo", example: "Ambiente relaxado." },
                    { value: "2", label: "Moderado", example: "Algum tempo de brincadeira." },
                    { value: "3", label: "Alto", example: "Brincadeiras diárias e atividades para estimulação mental." },
                ],
                allowNoPreference: false,
                group: "activities",
                type: "lifestyle",
            },
            {
                question: "Como é a moradia? Escolha a opção mais semelhante.",
                options: [
                    { value: "1", label: "Apartamento ou casa pequena (menos de 50 m²)." },
                    { value: "2", label: "Apartamento ou casa de tamanho médio (50-100 m²)." },
                    { value: "3", label: "Apartamento ou casa grande (mais de 100 m²)." },
                    { value: "4", label: "Espaço grande com jardim ou quintal." },
                    { value: "5", label: "Quinta com muita área exterior." },
                ],
                allowNoPreference: false,
                group: "home",
                type: "lifestyle",
            },
            {
                question: "O gato terá acesso a espaços exteriores?",
                options: [
                    { value: "1", label: "Não, apenas interior." },
                    { value: "2", label: "Sim, mas apenas um espaço pequeno e fechado (ex: varanda)." },
                    { value: "3", label: "Sim, acesso a uma área exterior segura (jardim, quintal)." },
                ],
                allowNoPreference: false,
                group: "outdoor-access",
                type: "lifestyle",
            },
            {
                question: "Passa quanto tempo fora de casa diariamente?",
                options: [
                    { value: "1", label: "Menos de 2 horas." },
                    { value: "2", label: "2-4 horas." },
                    { value: "3", label: "4-8 horas." },
                    { value: "4", label: "Mais de 8 horas." },
                ],
                allowNoPreference: false,
                group: "away-time",
                type: "lifestyle",
            },
            {
                question: "Com que frequência viaja?",
                options: [
                    { value: "1", label: "Raramente, quase nunca." },
                    { value: "2", label: "Ocasionalmente, viagens curtas." },
                    { value: "3", label: "Frequentemente. Vou levar o gato em viagens." },
                    { value: "4", label: "Frequentemente. Vou deixar o gato a cuidado de terceiros." },
                ],
                allowNoPreference: false,
                group: "travel",
                type: "lifestyle",
            },
            {
                question: "O ambiente em casa é geralmente silencioso ou barulhento?",
                options: [
                    { value: "1", label: "Muito silencioso (sem trânsito ou barulho alto)." },
                    { value: "2", label: "Moderadamente silencioso." },
                    { value: "3", label: "Barulhento (centro da cidade, barulho frequente)." },
                    { value: "4", label: "Variável (depende do horário ou dia)." },
                ],
                allowNoPreference: false,
                group: "noise",
                type: "lifestyle",
            },
            // Commitment section
            {
                question: "O gato precisa estar treinado para fazer as necessidades na caixa de areia?",
                options: [
                    { value: "1", label: "Sim, deve estar treinado." },
                    { value: "2", label: "Tenho disposição para o treinar." },
                ],
                allowNoPreference: true,
                group: "litter-training",
                type: "commitment",
            },
            {
                question: "Estaria confortável com um gato com problemas de comportamento? (ex: ansiedade, dificuldades de socialização)",
                options: [
                    { value: "1", label: "Não, prefiro um gato bem comportado." },
                    { value: "2", label: "Problemas menos graves são aceitáveis." },
                    { value: "3", label: "Sim, estou disposto a ajudar com problemas de comportamento." },
                ],
                allowNoPreference: false,
                group: "behaviour",
                type: "commitment",
            },
            {
                question: "Quanto está disposto a gastar em cuidados veterinários por mês?",
                options: [
                    { value: "1", label: "Menos de 50€" },
                    { value: "2", label: "50€ a 100€" },
                    { value: "3", label: "100€ a 200€" },
                    { value: "4", label: "Mais de 200€" },
                ],
                allowNoPreference: false,
                group: "vet-costs",
                type: "commitment",
            },
            {
                question: "Com que frequência pode levar o gato ao veterinário?",
                options: [
                    { value: "1", label: "Uma vez por ano" },
                    { value: "2", label: "A cada 6 meses" },
                    { value: "3", label: "Conforme necessário" },
                ],
                allowNoPreference: false,
                group: "vet-visits",
                type: "commitment",
            },
            {
                question: "Estaria confortável com um gato que requer uma dieta especial?",
                options: [
                    { value: "1", label: "Dieta simples (ração normal)" },
                    { value: "2", label: "Disposto a gerir uma dieta especial" },
                    { value: "3", label: "Posso fornecer refeições caseiras ou especializadas" },
                ],
                allowNoPreference: false,
                group: "special-diet",
                type: "commitment",
            },
            // Relationship section
            {
                question: "Qual o nível de interação que espera ter com o seu gato diariamente?",
                options: [
                    { value: "1", label: "Muito. Quero companhia constante." },
                    { value: "2", label: "Moderado. Quero algumas horas de interação." },
                    { value: "3", label: "Mínimo. Em momentos de descanso em casa." },
                ],
                allowNoPreference: false,
                group: "interaction",
                type: "relationship",
            },
            {
                question: "Qual o papel que espera que o gato desempenhe na sua vida?",
                options: [
                    { value: "1", label: "Companheiro para relaxar." },
                    { value: "2", label: "Presença brincalhona." },
                    { value: "3", label: "Independente, que aprecie a sua própria companhia." },
                ],
                allowNoPreference: false,
                group: "role",
                type: "relationship",
            },
            {
                question: "Como espera que o gato passe a maior parte do dia?",
                options: [
                    { value: "1", label: "A dormir dentro de casa." },
                    { value: "2", label: "Uma mistura de descanso e brincadeiras." },
                    { value: "3", label: "A acompanhar-me durante o dia." },
                ],
                allowNoPreference: false,
                group: "day",
                type: "relationship",
            },
        ],
        // Questions for different species can be added here
    };

    // Function to dynamically load questions
    function loadQuestions(species) {
        quizQuestionsContainer.innerHTML = ""; // Clear existing questions

        questions[species].forEach((questionData, index) => {
            const { question, options, allowNoPreference, group } = questionData;

            // Create question container
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question", "mb-4");

            // Add question text
            const questionTitle = document.createElement("h5");
            questionTitle.textContent = `${index + 1}. ${question}`;
            questionDiv.appendChild(questionTitle);

            // Add options container
            const optionsContainer = document.createElement("div");
            optionsContainer.classList.add(`${group}-options`);

            // Add options
            // If noPreference is allowed, the other options are checkboxes and "No Preference" is a radio button. If not, all options are radio buttons and only one can be selected.
            options.forEach((optionData) => {
                const { value, label, details, example } = optionData;

                const optionLabel = document.createElement("label");
                optionLabel.classList.add("form-check-label", "d-block", "mb-2");

                const optionInput = document.createElement("input");
                optionInput.type = allowNoPreference ? "checkbox" : "radio";
                optionInput.name = `${group}Preference`;
                optionInput.value = value;

                optionLabel.appendChild(optionInput);
                optionLabel.appendChild(document.createTextNode(label));

                if (details) {
                    const detailsSpan = document.createElement("span");
                    detailsSpan.classList.add("text-muted", "ms-2");
                    detailsSpan.textContent = details;
                    optionLabel.appendChild(detailsSpan);
                }

                if (example) {
                    const exampleSpan = document.createElement("span");
                    exampleSpan.classList.add("text-muted", "ms-2");
                    exampleSpan.textContent = example;
                    optionLabel.appendChild(exampleSpan);
                }

                optionsContainer.appendChild(optionLabel);
            });

            // Add "No Preference" radio button if applicable
            if (allowNoPreference) {
                const noPreferenceLabel = document.createElement("label");
                noPreferenceLabel.classList.add("form-check-label", "mt-2");

                const noPreferenceInput = document.createElement("input");
                noPreferenceInput.type = "radio"; // Use radio button for "No Preference"
                noPreferenceInput.name = `${group}Preference`;
                noPreferenceInput.id = `noPreference${group}`;
                noPreferenceInput.value = "no-preference";

                noPreferenceLabel.appendChild(noPreferenceInput);
                noPreferenceLabel.appendChild(document.createTextNode("Sem preferência"));

                optionsContainer.appendChild(noPreferenceLabel);

                // Apply "No Preference" logic dynamically
                setTimeout(() => applyNoPreferenceLogic(`.${group}-option input`, `#noPreference${group}`), 0);
            }

            questionDiv.appendChild(optionsContainer);
            quizQuestionsContainer.appendChild(questionDiv);
        });

        // Show quiz section and back arrow, hide species selection
        speciesSelection.classList.add("d-none");
        quizSection.classList.remove("d-none");
        backToSelection.classList.remove("d-none");
    }

    /**
     * Handles the "No Preference" logic for a group of checkboxes.
     * @param {string} groupSelector - Selector for the checkbox group.
     * @param {string} noPreferenceSelector - Selector for the "No Preference" button.
     */
    function applyNoPreferenceLogic(groupSelector, noPreferenceSelector) {
        const groupOptions = document.querySelectorAll(groupSelector);
        const noPreferenceOption = document.querySelector(noPreferenceSelector);

        let noPreferenceSelected = false;

        noPreferenceOption.addEventListener("click", function () {
            if (noPreferenceSelected) {
                // Uncheck "No Preference" and clear all checkboxes
                noPreferenceOption.checked = false;
                noPreferenceSelected = false;
                groupOptions.forEach((option) => (option.checked = false));
            } else {
                // Select "No Preference" and check all checkboxes
                groupOptions.forEach((option) => (option.checked = true));
                noPreferenceSelected = true;
            }
        });

        groupOptions.forEach((option) => {  
            option.addEventListener("change", function () {
                if (!this.checked) {
                    noPreferenceOption.checked = false;
                    noPreferenceSelected = false;
                }

                // If all checkboxes are manually checked, select "No Preference"
                const allChecked = Array.from(groupOptions).every((opt) => opt.checked);
                if (allChecked) {
                    noPreferenceOption.checked = true;
                    noPreferenceSelected = true;
                }
            });
        });
    }

    // Handle back arrow click
    backToSelection.addEventListener("click", function () {
        // Hide quiz section and back arrow, show species selection
        quizSection.classList.add("d-none");
        backToSelection.classList.add("d-none");
        speciesSelection.classList.remove("d-none");
    });

    // Event listeners for species selection
    document.getElementById("selectDog").addEventListener("click", function () {
        loadQuestions("dog");
    });

    document.getElementById("selectCat").addEventListener("click", function () {
        loadQuestions("cat");
    });
});
