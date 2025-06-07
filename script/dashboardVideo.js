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

const videos = [
    {
        id: 1,
        titre: "Comment faire un pari sur 1XBET",
        desc: "Guide complet pour placer vos premiers paris sportifs sur la plateforme 1XBET",
        duree: "8 min",
        url: "/assets/videos/onevideo.mp4"
    },
    {
        id: 2,
        titre: "Comment faire un pari sur MELBET",
        desc: "Tutoriel détaillé pour maîtriser les paris sportifs sur MelBet",
        duree: "6 min",
        url: "/assets/videos/onevideo.mp4"
    },
    {
        id: 3,
        titre: "Comment effectuer un dépôt",
        desc: "Guide pas à pas pour alimenter votre compte en toute sécurité",
        duree: "5 min",
        url: "/assets/videos/onevideo.mp4"
    },
    {
        id: 4,
        titre: "Comment effectuer un retrait",
        desc: "Apprenez à retirer vos gains rapidement et facilement",
        duree: "7 min",
        url: "/assets/videos/onevideo.mp4"
    },
    {
        id: 5,
        titre: "Comment récupérer des bonus",
        desc: "Maximisez vos gains avec nos bonus et promotions exclusives",
        duree: "9 min",
        url: "/assets/videos/onevideo.mp4"
    },
    {
        id: 6,
        titre: "Conseils et astuces pour débutants",
        desc: "Les meilleures stratégies pour optimiser vos paris sportifs",
        duree: "12 min",
        url: "/assets/videos/onevideo.mp4"
    }
];

const contenu = document.getElementById('contenu');
const pop = document.getElementById('pop');
const titre = document.getElementById('titre');
const lecteur = document.getElementById('lecteur');
const menu = document.getElementById('menu');
const fond = document.getElementById('fond');

function afficherVideos() {
    contenu.innerHTML = '';
    videos.forEach(vid => {
        const carte = document.createElement('div');
        carte.className = 'bg-gray-800 rounded-xl overflow-hidden shadow-xl transition-all duration-300 transform card-hover';
        carte.innerHTML = `
            <div class="relative">
                <div class="w-full h-48 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                    <i class="fas fa-video text-white text-4xl"></i>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-white mb-2">${vid.titre}</h3>
                <p class="text-gray-400 mb-4">${vid.desc}</p>
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm text-yellow-400 font-semibold">Durée: ${vid.duree}</span>
                </div>
                <button onclick="lireVideo(${vid.id})" class="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-800 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                    <i class="fas fa-play"></i>
                    <span>Regarder</span>
                </button>
            </div>
        `;
        contenu.appendChild(carte);
    });
}

function lireVideo(id) {
    const vid = videos.find(v => v.id === id);
    if (vid) {
        titre.textContent = vid.titre;
        lecteur.src = vid.url;
        pop.classList.remove('hidden');
    }
}

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

document.getElementById('ouvrir').addEventListener('click', () => {
    menu.classList.remove('-translate-x-full');
    fond.classList.remove('hidden');
});

document.getElementById('fermer').addEventListener('click', () => {
    menu.classList.add('-translate-x-full');
    fond.classList.add('hidden');
});



fond.addEventListener('click', () => {
    menu.classList.add('-translate-x-full');
    fond.classList.add('hidden');
});

document.getElementById('fermerPop').addEventListener('click', () => {
    pop.classList.add('hidden');
    lecteur.pause();
});

const deco = document.getElementById('deco');
deco.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});
afficherVideos();