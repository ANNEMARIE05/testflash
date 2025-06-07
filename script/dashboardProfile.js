tailwind.config = {
    theme: {
        extend: {
            colors: {
                'bleu-principal': '#1e40af',
                'bleu-fonce': '#1e3a8a',
                'jaune-accent': '#fbbf24',
                'jaune-clair': '#fef3c7'
            }
        }
    }
}

const btnOuvrir = document.getElementById('btnOuvrir');
const btnFermer = document.getElementById('btnFermer');
const menuNav = document.getElementById('menuNav');
const fondEcran = document.getElementById('fondEcran');
const btnPassword = document.getElementById('btnPassword');
const password = document.getElementById('password');
const btnNewPassword = document.getElementById('btnNewPassword');
const newPassword = document.getElementById('newPassword');
const btnAffichePassword = document.getElementById('btnAffichePassword');
const confirmPassword = document.getElementById('confirmPassword');

btnOuvrir.addEventListener('click', () => {
    menuNav.classList.remove('-translate-x-full');
    fondEcran.classList.remove('hidden');
});

btnFermer.addEventListener('click', () => {
    menuNav.classList.add('-translate-x-full');
    fondEcran.classList.add('hidden');
});

fondEcran.addEventListener('click', () => {
    menuNav.classList.add('-translate-x-full');
    fondEcran.classList.add('hidden');
});

btnPassword.addEventListener('click', function() {
    const typePassord = password.type === 'password' ? 'text' : 'password';
    password.type = typePassord;
    this.innerHTML = typePassord === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

btnNewPassword.addEventListener('click', function() {
    const typePassord = newPassword.type === 'password' ? 'text' : 'password';
    newPassword.type = typePassord;
    this.innerHTML = typePassord === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

btnAffichePassword.addEventListener('click', function() {
    const typePassord = confirmPassword.type === 'password' ? 'text' : 'password';
    confirmPassword.type = typePassord;
    this.innerHTML = typePassord === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

const btnDeco = document.getElementById('btnDeco');
btnDeco.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});