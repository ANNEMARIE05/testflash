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

let etapeCourante = 1;
let montantDemande = 0;
let plateformeDemande = '';
let chronoInterval;
let tempsRestant = 1200; 

const etapes = {
    1: document.getElementById('etap1'),
    att: document.getElementById('etapAtt'),
    coord: document.getElementById('etapCoord'),
    retrait: document.getElementById('etapRetrait'),
    exp: document.getElementById('etapExp')
};

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalBtn = document.getElementById('modalBtn');

const btnMenu = document.getElementById('btnMenu');
const menu = document.getElementById('menu');
const fondMenu = document.getElementById('fondMenu');
const fermer = document.getElementById('fermer');

btnMenu.addEventListener('click', () => {
    menu.classList.remove('-translate-x-full');
    fondMenu.classList.remove('hidden');
});

[fermer, fondMenu].forEach(el => {
    el.addEventListener('click', () => {
        menu.classList.add('-translate-x-full');
        fondMenu.classList.add('hidden');
    });
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

const dropdown = document.getElementById('btn');
const liste = document.getElementById('liste');
const opt = document.getElementById('opt');

dropdown.addEventListener('click', () => {
    liste.classList.toggle('show');
});

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
        const value = item.dataset.value;
        const text = item.querySelector('span').textContent;
        const img = item.querySelector('img').src;
        
        opt.innerHTML = `<img src="${img}" class="w-6 h-6 mr-2 rounded"> ${text}`;
        liste.classList.remove('show');
    });
});

document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
        liste.classList.remove('show');
    }
});

function afficherEtape(etape) {
    Object.values(etapes).forEach(el => el.classList.add('hidden'));
    if (etapes[etape]) {
        etapes[etape].classList.remove('hidden');
    }
}

function afficherModal(titre, texte, callback = null) {
    modalTitle.textContent = titre;
    modalText.textContent = texte;
    modal.classList.remove('hidden');
    
    modalBtn.onclick = () => {
        modal.classList.add('hidden');
        if (callback) callback();
    };
}

function demarrerChrono() {
    const chronoEl = document.getElementById('chrono');
    
    chronoInterval = setInterval(() => {
        const minutes = Math.floor(tempsRestant / 60);
        const secondes = tempsRestant % 60;
        
        chronoEl.textContent = `${minutes.toString().padStart(2, '0')}:${secondes.toString().padStart(2, '0')}`;
        
        if (tempsRestant <= 0) {
            clearInterval(chronoInterval);
            afficherEtape('exp');
            return;
        }
        
        tempsRestant--;
    }, 1000);
}

function genererCoordonnees() {
    const villes = ['Abidjan', 'Bouaké', 'Daloa', 'Yamoussoukro', 'San-Pédro', 'Korhogo', 'Man', 'Divo'];
    const rues = ['Rue des Jardins', 'Avenue de la Paix', 'Boulevard du Commerce', 'Rue de la République', 'Avenue des Cocotiers', 'Rue du Marché', 'Boulevard de l\'Indépendance'];
    
    const villeAleatoire = villes[Math.floor(Math.random() * villes.length)];
    const rueAleatoire = rues[Math.floor(Math.random() * rues.length)];
    
    return { ville: villeAleatoire, rue: rueAleatoire };
}

document.getElementById('formDemand').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const montant = document.getElementById('montant').value;
    const plat = document.getElementById('plat').value;
    
    if (!montant || montant < 1000) {
        afficherModal('Erreur', 'Le montant minimum est de 1000 FCFA');
        return;
    }
    
    if (!plat) {
        afficherModal('Erreur', 'Veuillez sélectionner une plateforme');
        return;
    }
    
    montantDemande = parseInt(montant);
    plateformeDemande = plat;
    
    afficherEtape('att');
    
    setTimeout(() => {
        const coords = genererCoordonnees();
        
        document.getElementById('nomPlat').textContent = plat.toUpperCase();
        document.getElementById('montantAff').value = montantDemande;
        document.getElementById('villeAff').value = coords.ville;
        document.getElementById('rueAff').value = coords.rue;
        document.getElementById('montantFin').value = montantDemande;
        
        afficherEtape('coord');
        demarrerChrono();
    }, 3000);
});

document.getElementById('formCoord').addEventListener('submit', (e) => {
    e.preventDefault();
    afficherEtape('retrait');
});

document.getElementById('formRetrait').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const code = document.getElementById('code').value;
    const tel = document.getElementById('tel').value;
    const platDest = document.querySelector('input[name="platDest"]:checked');
    
    if (!code) {
        afficherModal('Erreur', 'Veuillez saisir le code de retrait');
        return;
    }
    
    if (!tel) {
        afficherModal('Erreur', 'Veuillez saisir votre numéro de téléphone');
        return;
    }
    
    if (!platDest) {
        afficherModal('Erreur', 'Veuillez sélectionner une plateforme de destination');
        return;
    }
    
    clearInterval(chronoInterval);
    afficherModal('Succès!', `Votre retrait de ${montantDemande} FCFA a été effectué avec succès. Vous recevrez une confirmation par SMS.`, () => {
        document.getElementById('formDemand').reset();
        document.getElementById('formRetrait').reset();
        tempsRestant = 1200;
        afficherEtape(1);
    });
});

document.getElementById('recom').addEventListener('click', () => {
    tempsRestant = 1200;
    clearInterval(chronoInterval);
    afficherEtape(1);
});

document.getElementById('depot').addEventListener('click', () => {
    window.location.href = 'dashboardDepot.html';
});

document.getElementById('retrait').addEventListener('click', () => {
    window.location.href = 'dashboardRetrait.html';
});

document.getElementById('deco').addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});

afficherEtape(1);