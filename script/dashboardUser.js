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

const btnMenu = document.getElementById('btnMenu');
const menu = document.getElementById('menu');
const fondMenu = document.getElementById('fondMenu');
const fermerMenu = document.getElementById('fermerMenu');

function ouvrir() {
    menu.classList.remove('-translate-x-full');
    fondMenu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function fermer() {
    menu.classList.add('-translate-x-full');
    fondMenu.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

btnMenu.addEventListener('click', function() {
    if (menu.classList.contains('-translate-x-full')) {
        ouvrir();
    } else {
        fermer();
    }
});

fermerMenu.addEventListener('click', fermer);
fondMenu.addEventListener('click', fermer);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        fermer();
    }
});

const liens = document.querySelectorAll('.lien-nav');
liens.forEach(lien => {
    lien.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            window.location.href = href;
            return;
        }
        
        e.preventDefault();
        
        liens.forEach(l => l.classList.remove('actif'));
        liens.forEach(l => {
            l.classList.remove('bg-gradient-to-r', 'from-bleu-principal', 'to-bleu-fonce', 'text-white');
            l.classList.add('text-gray-300', 'hover:text-white');
        });
        
        this.classList.add('actif');
        this.classList.remove('text-gray-300', 'hover:text-white');
        this.classList.add('bg-gradient-to-r', 'from-bleu-principal', 'to-bleu-fonce', 'text-white');
    });
});

const btnsBonus = document.querySelectorAll('.btn-bonus');
btnsBonus.forEach(btn => {
    btn.addEventListener('click', function() {
        this.textContent = 'Réclamé';
        this.classList.remove('bg-red-400', 'bg-blue-400', 'bg-jaune-accent');
        this.classList.add('bg-green-500');
        this.disabled = true;
    });
});

const btnDetails = document.querySelectorAll('.btn-detail');
btnDetails.forEach(btn => {
    btn.addEventListener('click', function() {
        const transactionId = this.getAttribute('data-id');
        const transactionCard = this.closest('.bg-gray-700');
        const details = transactionCard.querySelectorAll('.bg-gray-800');
        
        transactionCard.classList.add('ring-2', 'ring-bleu-principal');
        setTimeout(() => {
            transactionCard.classList.remove('ring-2', 'ring-bleu-principal');
        }, 2000);
        
        console.log(`Affichage des détails de la transaction #${transactionId}`);
    });
});

const btnDepot = document.getElementById('depot');
const btnRetrait = document.getElementById('retrait');

btnDepot.addEventListener('click', function() {
    window.location.href = 'dashboardDepot.html';
});

btnRetrait.addEventListener('click', function() {
    window.location.href = 'dashboardRetrait.html';
});

const voirProno = document.getElementById('voirProno');
voirProno.addEventListener('click', function() {
    window.location.href = 'dashboardPronostic.html';
});

const voirBonus = document.getElementById('voirBonus');
voirBonus.addEventListener('click', function() {
    window.location.href = 'dashboardBonus.html';
});

const btnDeco = document.getElementById('btnDeco');
btnDeco.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});

const cartesProno = document.querySelectorAll('.carte-prono');
cartesProno.forEach(carte => {
    carte.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    carte.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('fr-FR');
    const timeElement = document.querySelector('.current-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

setInterval(updateTime, 1000);

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    const cartesStat = document.querySelectorAll('.carte-stat');
    cartesStat.forEach((carte, index) => {
        setTimeout(() => {
            carte.style.opacity = '0';
            carte.style.transform = 'translateY(20px)';
            carte.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                carte.style.opacity = '1';
                carte.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
});

const notifications = document.querySelectorAll('.notification');
notifications.forEach(notification => {
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
});