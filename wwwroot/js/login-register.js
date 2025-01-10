
document.getElementById('switchToRegister').addEventListener('click', function (e) {
    e.preventDefault();
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm && registerForm) {
        loginForm.classList.add('d-none');
        registerForm.classList.remove('d-none');
    }
});

document.getElementById('switchToLogin').addEventListener('click', function (e) {
    e.preventDefault();
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm && registerForm) {
        registerForm.classList.add('d-none');
        loginForm.classList.remove('d-none');
    }
});
