// Função para verificar acesso ao perfil do usuário
function checkUserProfileAccess() {
    fetch('/Account/IsLoggedIn', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.isLoggedIn) {
                // Se o usuário está logado, redireciona para o perfil
                window.location.href = '/Account/UserProfile';
            } else {
                // Se não está logado, exibe o modal de login
                $('#authModal').modal('show');
            }
        })
        .catch(error => {
            console.error('Erro ao verificar o acesso ao perfil:', error);
            alert('Erro ao verificar o acesso ao perfil do usuário.');
        });
}


// Função para gerenciar favoritos
// Gerenciar o acesso aos favoritos
document.getElementById("favoritesIcon").addEventListener("click", function (e) {
    e.preventDefault(); // Evita o comportamento padrão de redirecionamento do link

    // Faz uma chamada para verificar se o usuário está logado
    fetch('/Account/IsLoggedIn', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            if (data.isLoggedIn) {
                // Se o usuário estiver logado, redireciona para a página de favoritos
                window.location.href = "/Likes/Favorites";
            } else {
                // Caso contrário, exibe o modal de login
                $('#authModal').modal('show');
            }
        })
        .catch(error => {
            console.error("Erro ao verificar o login:", error);
            alert("Ocorreu um erro ao tentar verificar o login.");
        });
});
