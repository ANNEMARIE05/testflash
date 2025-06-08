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
const menuLateral = document.getElementById('menuLateral');
const fondEcran = document.getElementById('fondEcran');

btnOuvrir.addEventListener('click', () => {
    menuLateral.classList.remove('-translate-x-full');
    fondEcran.classList.remove('hidden');
});

btnFermer.addEventListener('click', () => {
    menuLateral.classList.add('-translate-x-full');
    fondEcran.classList.add('hidden');
});

fondEcran.addEventListener('click', () => {
    menuLateral.classList.add('-translate-x-full');
    fondEcran.classList.add('hidden');
});

function retour() {
    window.location="dashboardTransaction.html"
    
}

const btnDeconnexion = document.getElementById('btnDeconnexion');
btnDeconnexion.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});