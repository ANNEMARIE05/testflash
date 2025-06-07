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

const boutonOuvrir = document.getElementById('ouvrir');
const boutonFermer = document.getElementById('fermer');
const menu = document.getElementById('menu');
const fond = document.getElementById('fond');

boutonOuvrir.addEventListener('click', function() {
    menu.classList.remove('-translate-x-full');
    fond.classList.remove('hidden');
});

boutonFermer.addEventListener('click', function() {
    menu.classList.add('-translate-x-full');
    fond.classList.add('hidden');
});

fond.addEventListener('click', function() {
    menu.classList.add('-translate-x-full');
    fond.classList.add('hidden');
});

const filtreSelect = document.getElementById('filtre');

filtreSelect.addEventListener('change', function() {
    const typeFiltre = this.value;
    const transactions = document.querySelectorAll('.transaction');
    
    transactions.forEach(function(transaction) {
        const estDepot = transaction.querySelector('.fa-plus');
        const estRetrait = transaction.classList.contains('retrait');
        const estBonus = transaction.classList.contains('bonus');
        
        let afficher = true;
        
        switch(typeFiltre) {
            case 'depot':
                afficher = estDepot && !estBonus;
                break;
            case 'retrait':
                afficher = estRetrait;
                break;
            case 'bonus':
                afficher = estBonus;
                break;
            case 'tous':
            default:
                afficher = true;
                break;
        }
        
        if (afficher) {
            transaction.style.display = 'block';
        } else {
            transaction.style.display = 'none';
        }
    });
});

document.getElementById('deco').addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});

document.querySelectorAll('.carte').forEach(function(carte) {
    carte.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.01)';
    });
    
    carte.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});