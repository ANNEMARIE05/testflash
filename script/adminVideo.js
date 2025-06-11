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

const btnOuvrir = document.getElementById('btnOuvrirMenu');
const btnFermer = document.getElementById('btnFermerMenu');
const menuNav = document.getElementById('menu');
const voileMenu = document.getElementById('voileMenu');

btnOuvrir.addEventListener('click', () => {
    menuNav.classList.remove('-translate-x-full');
    voileMenu.classList.remove('hidden');
});

btnFermer.addEventListener('click', () => {
    menuNav.classList.add('-translate-x-full');
    voileMenu.classList.add('hidden');
});

voileMenu.addEventListener('click', () => {
    menuNav.classList.add('-translate-x-full');
    voileMenu.classList.add('hidden');
});

let listeVids = [
    { 
        id: 1, 
        titreVid: 'Comment faire un pari sur 1XBET', 
        fichierVid: 'psg-om-analyse.mp4', 
        descVid: 'Guide complet pour placer vos premiers paris sportifs sur la plateforme 1XBET', 
        dureeVid: '15 min',
        dateVid: '2025-06-05',
        plateformeVid: '1XBET',
        urlVid: "/assets/videos/onevideo.mp4"
    },
    { 
        id: 2, 
        titreVid: 'Comment faire un pari sur MELBET', 
        fichierVid: 'nba-finals-prono.mp4', 
        descVid: 'Tutoriel détaillé pour maîtriser les paris sportifs sur MelBet', 
        dureeVid: '12 min',
        dateVid: '2025-06-04',
        plateformeVid: 'MELBET',
        urlVid: "/assets/videos/onevideo.mp4"
    },
    { 
        id: 3, 
        titreVid: 'Flash Service Tutorial', 
        fichierVid: 'flash-tutorial.mp4', 
        descVid: 'Apprenez à utiliser Flash Service efficacement', 
        dureeVid: '8 min',
        dateVid: '2025-06-03',
        plateformeVid: 'FLASH SERVICE',
        urlVid: "/assets/videos/onevideo.mp4"
    }
];

function afficherVids(vids = listeVids) {
    const conteneur = document.getElementById('listeVid');
    conteneur.innerHTML = '';

    vids.forEach(vid => {
        const carteVid = document.createElement('div');
        carteVid.className = 'bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300';
        
        carteVid.innerHTML = `
            <div class="relative">
                <div class="w-full h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <i class="fas fa-video text-gray-400 text-2xl lg:text-4xl"></i>
                </div>
                <div class="absolute top-2 right-2 flex space-x-1">
                    <button onclick="modifierVid(${vid.id})" class="bg-blue-600 hover:bg-blue-800 text-white p-1.5 lg:p-2 rounded-full shadow-lg">
                        <i class="fas fa-edit text-xs lg:text-sm"></i>
                    </button>
                    <button onclick="supprimerVid(${vid.id})" class="bg-red-600 hover:bg-red-800 text-white p-1.5 lg:p-2 rounded-full shadow-lg">
                        <i class="fas fa-trash text-xs lg:text-sm"></i>
                    </button>
                </div>
            </div>
            <div class="p-3 lg:p-4">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs lg:text-sm text-blue-600 font-medium">${vid.plateformeVid}</span>
                    <span class="text-xs lg:text-sm text-gray-500">${vid.dureeVid}</span>
                </div>
                <h3 class="text-sm lg:text-lg font-bold text-gray-800 mb-2 line-clamp-2">${vid.titreVid}</h3>
                <p class="text-xs lg:text-sm text-gray-600 mb-3 lg:mb-4 line-clamp-3">${vid.descVid}</p>
                <button onclick="lireVid(${vid.id})" class="w-full bg-bleu-principal hover:bg-bleu-fonce text-white font-bold py-2 lg:py-3 px-3 lg:px-4 text-sm lg:text-base rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                    <i class="fas fa-play text-sm"></i>
                    <span>Regarder</span>
                </button>
            </div>
        `;
        conteneur.appendChild(carteVid);
    });
}

document.getElementById('formVid').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fichierInput = document.getElementById('fichierVid');
    const nomFichier = fichierInput.files[0] ? fichierInput.files[0].name : '';

    const nouvelleVid = {
        id: Date.now(),
        titreVid: document.getElementById('titreVid').value,
        fichierVid: nomFichier,
        descVid: document.getElementById('descVid').value,
        dureeVid: document.getElementById('dureeVid').value + ' min',
        plateformeVid: document.getElementById('plateformeVid').value.toUpperCase(),
        dateVid: new Date().toISOString().split('T')[0],
        urlVid: URL.createObjectURL(fichierInput.files[0])
    };

    listeVids.unshift(nouvelleVid);
    trierEtAfficher();
    this.reset();
    alert('Vidéo ajoutée avec succès!');
});

function modifierVid(id) {
    const vid = listeVids.find(v => v.id === id);
    if (vid) {
        document.getElementById('titreVid').value = vid.titreVid;
        document.getElementById('dureeVid').value = vid.dureeVid.replace(' min', '');
        document.getElementById('descVid').value = vid.descVid;
        document.getElementById('plateformeVid').value = vid.plateformeVid.toLowerCase();
        
        const index = listeVids.findIndex(v => v.id === id);
        if (index !== -1) {
            listeVids.splice(index, 1);
            trierEtAfficher();
        }
    }
}

function supprimerVid(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette vidéo?')) {
        const index = listeVids.findIndex(v => v.id === id);
        if (index !== -1) {
            listeVids.splice(index, 1);
            trierEtAfficher();
            alert('Vidéo supprimée!');
        }
    }
}

function lireVid(id) {
    const vid = listeVids.find(v => v.id === id);
    if (vid) {
        document.getElementById('titreLecteur').textContent = vid.titreVid;
        document.getElementById('descLecteur').textContent = vid.descVid;
        
        const lecteur = document.getElementById('lecteurVid');
        if (vid.urlVid) {
            lecteur.src = vid.urlVid;
        }
        
        document.getElementById('modalLecteur').classList.remove('hidden');
    }
}

function trierEtAfficher() {
    const filtre = document.getElementById('filtrePlateforme').value;
    let vidsFiltered = listeVids;
    
    if (filtre) {
        vidsFiltered = listeVids.filter(vid => vid.plateformeVid === filtre);
    }
    
    vidsFiltered.sort((a, b) => a.plateformeVid.localeCompare(b.plateformeVid));
    afficherVids(vidsFiltered);
}

document.getElementById('filtrePlateforme').addEventListener('change', trierEtAfficher);

document.getElementById('btnFermerLecteur').addEventListener('click', () => {
    document.getElementById('modalLecteur').classList.add('hidden');
    document.getElementById('lecteurVid').pause();
});

const btnDeco = document.getElementById('btnDeco');
btnDeco.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});

window.addEventListener('resize', () => trierEtAfficher());
trierEtAfficher();