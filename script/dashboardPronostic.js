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

const filtres = document.querySelectorAll('.filtre');
const cartes = document.querySelectorAll('.carte');

filtres.forEach(filtre => {
    filtre.addEventListener('click', () => {
        filtres.forEach(f => {
            f.classList.remove('bg-blue-600', 'text-white');
            f.classList.add('bg-gray-700', 'text-gray-300');
        });

        filtre.classList.remove('bg-gray-700', 'text-gray-300');
        filtre.classList.add('bg-blue-600', 'text-white');

        const filtreId = filtre.id;

        cartes.forEach(carte => {
            if (filtreId === 'tous') {
                carte.style.display = 'block';
            } else if (filtreId === 'aujourdhui') {
                if (carte.dataset.statut === 'aujourdhui') {
                    carte.style.display = 'block';
                } else {
                    carte.style.display = 'none';
                }
            } else if (filtreId === 'gagnes') {
                if (carte.dataset.statut === 'gagne') {
                    carte.style.display = 'block';
                    } else {
                    carte.style.display = 'none';
                }
            }
        });
    });
});

document.getElementById('btnDepot').addEventListener('click', () => {
    window.location='dashboardDepot.html'
});

document.getElementById('btnRetrait').addEventListener('click', () => {
    window.location='dashboardRetrait.html'
});

document.getElementById('btnDeco').addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        alert('Déconnexion en cours...');
        window.location='/auth/login.html'
    }
});

cartes.forEach(carte => {
    carte.addEventListener('mouseenter', () => {
        carte.style.transform = 'translateY(-4px) scale(1.02)';
    });

    carte.addEventListener('mouseleave', () => {
        carte.style.transform = 'translateY(0) scale(1)';
    });
});