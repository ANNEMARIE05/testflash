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

const btnOuvrir = document.getElementById('ouvrirMenu');
const btnFermer = document.getElementById('fermerMenu');
const menu = document.getElementById('menu');
const voile = document.getElementById('voile');

btnOuvrir.addEventListener('click', () => {
    menu.classList.remove('-translate-x-full');
    voile.classList.remove('hidden');
});

btnFermer.addEventListener('click', () => {
    menu.classList.add('-translate-x-full');
    voile.classList.add('hidden');
});

voile.addEventListener('click', () => {
    menu.classList.add('-translate-x-full');
    voile.classList.add('hidden');
});

let videos = [
    { 
        id: 1, 
        titre: 'Comment faire un pari sur 1XBET', 
        fichier: 'psg-om-analyse.mp4', 
        desc: 'Guide complet pour placer vos premiers paris sportifs sur la plateforme 1XBET', 
        duree: 15,
        date: '2025-06-05',
        url: "/assets/videos/onevideo.mp4"
    },
    { 
        id: 2, 
        titre: 'Comment faire un pari sur MELBET', 
        fichier: 'nba-finals-prono.mp4', 
        desc: 'Tutoriel détaillé pour maîtriser les paris sportifs sur MelBet', 
        duree: 12,
        date: '2025-06-04',
        url: "/assets/videos/onevideo.mp4"
    }
];

function afficherVideos() {
    const conteneur = document.getElementById('listeVideos');
    conteneur.innerHTML = '';

    videos.forEach(vid => {
        const carte = document.createElement('div');
        carte.className = 'bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105';
        carte.innerHTML = `
            <div class="relative">
                <div class="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <i class="fas fa-video text-gray-400 text-4xl"></i>
                </div>
                <div class="absolute top-2 right-2 flex space-x-2">
                    <button onclick="modifierVideo(${vid.id})" class="bg-blue-600 hover:bg-blue-800 text-white p-2 rounded-full shadow-lg">
                        <i class="fas fa-edit text-sm"></i>
                    </button>
                    <button onclick="supprimerVideo(${vid.id})" class="bg-red-600 hover:bg-red-800 text-white p-2 rounded-full shadow-lg">
                        <i class="fas fa-trash text-sm"></i>
                    </button>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-2">${vid.titre}</h3>
                <p class="text-gray-600 mb-4">${vid.desc}</p>
                <div class="flex items-center justify-between mb-4">
                    <span class="text-sm text-gray-500">Durée: ${vid.duree} min</span>
                </div>
                <button onclick="lireVideo(${vid.id})" class="w-full bg-bleu-principal hover:bg-bleu-fonce text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                    <i class="fas fa-play"></i>
                    <span>Regarder</span>
                </button>
            </div>
        `;
        conteneur.appendChild(carte);
    });
}

document.getElementById('formVideo').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fichier = document.getElementById('fichier');
    const nom = fichier.files[0] ? fichier.files[0].name : '';

    const nouvelleVideo = {
        id: Date.now(),
        titre: document.getElementById('titre').value,
        fichier: nom,
        desc: document.getElementById('desc').value,
        duree: parseInt(document.getElementById('duree').value),
        date: new Date().toISOString().split('T')[0],
        url: URL.createObjectURL(fichier.files[0])
    };

    videos.unshift(nouvelleVideo);
    afficherVideos();
    this.reset();
    alert('Vidéo ajoutée avec succès!');
});

function modifierVideo(id) {
    const vid = videos.find(v => v.id === id);
    if (vid) {
        document.getElementById('titre').value = vid.titre;
        document.getElementById('duree').value = vid.duree;
        document.getElementById('desc').value = vid.desc;
        
        const index = videos.findIndex(v => v.id === id);
        if (index !== -1) {
            videos.splice(index, 1);
            afficherVideos();
        }
    }
}

function supprimerVideo(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette vidéo?')) {
        const index = videos.findIndex(v => v.id === id);
        if (index !== -1) {
            videos.splice(index, 1);
            afficherVideos();
            alert('Vidéo supprimée!');
        }
    }
}

function lireVideo(id) {
    const vid = videos.find(v => v.id === id);
    if (vid) {
        document.getElementById('titreLecteur').textContent = vid.titre;
        document.getElementById('descLecteur').textContent = vid.desc;
        
        const lecteur = document.getElementById('videoPlayer');
        if (vid.url) {
            lecteur.src = vid.url;
        }
        
        document.getElementById('lecteur').classList.remove('hidden');
    }
}

document.getElementById('fermerLecteur').addEventListener('click', () => {
    document.getElementById('lecteur').classList.add('hidden');
    document.getElementById('videoPlayer').pause();
});

const deco = document.getElementById('deco');
deco.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});
afficherVideos();