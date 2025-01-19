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

document.addEventListener("DOMContentLoaded", function () {
    function checkUserType() {
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
                console.log(data); // Para depuração

                if (data.isLoggedIn && data.userType === "Admin") {
                    // Mostra todos os links de admin
                    document.getElementById('adminLink1').style.display = 'inline-block';
                    document.getElementById('adminLink2').style.display = 'inline-block';
                    document.getElementById('adminLink3').style.display = 'inline-block';
                }
            })
            .catch(error => {
                console.error('Erro ao verificar o tipo de usuário:', error);
            });
    }

    // Chama a função para verificar o tipo de usuário
    checkUserType();
});
