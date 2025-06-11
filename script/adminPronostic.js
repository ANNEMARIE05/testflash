const btnOuvrir = document.getElementById('btnOuvrir');
const btnFermer = document.getElementById('btnFermer');
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');

btnOuvrir.addEventListener('click', () => {
    menu.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
});

btnFermer.addEventListener('click', () => {
    menu.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
});

overlay.addEventListener('click', () => {
    menu.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
});

const champs = {
    comp: document.getElementById('comp'),
    equDom: document.getElementById('equDom'),
    equExt: document.getElementById('equExt'),
    imgDom: document.getElementById('imgDom'),
    imgExt: document.getElementById('imgExt'),
    dt: document.getElementById('dt'),
    hr: document.getElementById('hr'),
    tp: document.getElementById('tp'),
    ct: document.getElementById('ct'),
    conf: document.getElementById('conf'),
    stat: document.getElementById('stat')
};

const prev = {
    comp: document.getElementById('prevComp'),
    stat: document.getElementById('prevStat'),
    imgDom: document.getElementById('prevImgDom'),
    equDom: document.getElementById('prevEquDom'),
    equExt: document.getElementById('prevEquExt'),
    imgExt: document.getElementById('prevImgExt'),
    dtHr: document.getElementById('prevDtHr'),
    tp: document.getElementById('prevTp'),
    ct: document.getElementById('prevCt'),
    conf: document.getElementById('prevConf')
};

function majApercu() {
    prev.comp.textContent = champs.comp.value || 'Compétition';
    prev.equDom.textContent = champs.equDom.value || 'Équipe 1';
    prev.equExt.textContent = champs.equExt.value || 'Équipe 2';
    prev.tp.textContent = champs.tp.value || 'Type de pari';
    prev.ct.textContent = champs.ct.value || '0.00';

    if (champs.dt.value && champs.hr.value) {
        const date = new Date(champs.dt.value);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        let dateStr = '';
        if (date.toDateString() === today.toDateString()) {
            dateStr = 'Aujourd\'hui';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            dateStr = 'Demain';
        } else {
            dateStr = date.toLocaleDateString('fr-FR');
        }
        prev.dtHr.textContent = `${dateStr} ${champs.hr.value}`;
    }

    const statutTexte = {
        'en-cours': 'En cours',
        'gagne': 'Gagné',
        'perdu': 'Perdu'
    };
    const statutClass = {
        'en-cours': 'bg-orange-100 text-orange-700',
        'gagne': 'bg-green-100 text-green-700',
        'perdu': 'bg-red-100 text-red-700'
    };
    
    prev.stat.textContent = statutTexte[champs.stat.value] || 'En cours';
    prev.stat.className = `text-xs px-2 py-1 rounded-full ${statutClass[champs.stat.value] || 'bg-orange-100 text-orange-700'}`;

    if (champs.conf.value) {
        const confValue = parseInt(champs.conf.value);
        let confClass = 'bg-green-600';
        if (confValue < 70) confClass = 'bg-red-600';
        else if (confValue < 85) confClass = 'bg-yellow-600';
        
        prev.conf.textContent = `${confValue}%`;
        prev.conf.className = `text-white font-bold px-2 py-1 rounded text-xs ${confClass}`;
    }
}

function gererImg(input, previewImg) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

champs.imgDom.addEventListener('change', () => gererImg(champs.imgDom, prev.imgDom));
champs.imgExt.addEventListener('change', () => gererImg(champs.imgExt, prev.imgExt));

Object.values(champs).forEach(champ => {
    champ.addEventListener('input', majApercu);
    champ.addEventListener('change', majApercu);
});

function ajouterProno() {
    const donnees = {};
    let valide = true;
    
    Object.keys(champs).forEach(key => {
        if (key === 'imgDom' || key === 'imgExt') {
            donnees[key] = champs[key].files[0] || null;
        } else {
            donnees[key] = champs[key].value;
        }
        
        if (['comp', 'equDom', 'equExt', 'dt', 'hr', 'tp', 'ct', 'conf'].includes(key) && !champs[key].value) {
            valide = false;
        }
    });

    if (!valide) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
    }

    console.log('Nouveau pronostic:', donnees);
    alert('Pronostic ajouté avec succès!');
    viderTout();
}

function viderTout() {
    Object.values(champs).forEach(champ => {
        champ.value = '';
    });
    prev.imgDom.src = 'https://via.placeholder.com/40';
    prev.imgExt.src = 'https://via.placeholder.com/40';
    majApercu();
}

const today = new Date().toISOString().split('T')[0];
champs.dt.value = today;
champs.hr.value = '20:00';
majApercu();

const btnDeco = document.getElementById('btnDeco');
btnDeco.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});