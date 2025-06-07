const ouvrir = document.getElementById('ouvrir');
const fermer = document.getElementById('fermer');
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');

ouvrir.addEventListener('click', () => {
    menu.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
});

fermer.addEventListener('click', () => {
    menu.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
});

overlay.addEventListener('click', () => {
    menu.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
});

const inputs = {
    comp: document.getElementById('comp'),
    dom: document.getElementById('dom'),
    ext: document.getElementById('ext'),
    logoDom: document.getElementById('logoDom'),
    logoExt: document.getElementById('logoExt'),
    date: document.getElementById('date'),
    heure: document.getElementById('heure'),
    type: document.getElementById('type'),
    cote: document.getElementById('cote'),
    conf: document.getElementById('conf'),
    statut: document.getElementById('statut')
};

const preview = {
    comp: document.getElementById('previewComp'),
    statut: document.getElementById('previewStatut'),
    logoDom: document.getElementById('previewLogoDom'),
    dom: document.getElementById('previewDom'),
    ext: document.getElementById('previewExt'),
    logoExt: document.getElementById('previewLogoExt'),
    dateTime: document.getElementById('previewDateTime'),
    type: document.getElementById('previewType'),
    cote: document.getElementById('previewCote'),
    conf: document.getElementById('previewConf')
};

function updatePreview() {
    preview.comp.textContent = inputs.comp.value || 'Compétition';
    preview.dom.textContent = inputs.dom.value || 'Équipe 1';
    preview.ext.textContent = inputs.ext.value || 'Équipe 2';
    preview.type.textContent = inputs.type.value || 'Type de pari';
    preview.cote.textContent = inputs.cote.value || '0.00';

    if (inputs.logoDom.value) {
        preview.logoDom.src = inputs.logoDom.value;
    }
    if (inputs.logoExt.value) {
        preview.logoExt.src = inputs.logoExt.value;
    }

    if (inputs.date.value && inputs.heure.value) {
        const date = new Date(inputs.date.value);
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
        preview.dateTime.textContent = `${dateStr} ${inputs.heure.value}`;
    }

    const statutTexte = {
        'aujourdhui': 'Aujourd\'hui',
        'demain': 'Demain',
        'cette-semaine': 'Cette semaine'
    };
    const statutClass = {
        'aujourdhui': 'bg-green-100 text-green-700',
        'demain': 'bg-blue-100 text-blue-700',
        'cette-semaine': 'bg-purple-100 text-purple-700'
    };
    
    preview.statut.textContent = statutTexte[inputs.statut.value] || 'Aujourd\'hui';
    preview.statut.className = `text-xs px-2 py-1 rounded-full ${statutClass[inputs.statut.value] || 'bg-green-100 text-green-700'}`;

    if (inputs.conf.value) {
        const confValue = parseInt(inputs.conf.value);
        let confClass = 'bg-green-600';
        if (confValue < 70) confClass = 'bg-red-600';
        else if (confValue < 85) confClass = 'bg-yellow-600';
        
        preview.conf.textContent = `${confValue}%`;
        preview.conf.className = `text-white font-bold px-2 py-1 rounded text-xs ${confClass}`;
    }
}

Object.values(inputs).forEach(input => {
    input.addEventListener('input', updatePreview);
    input.addEventListener('change', updatePreview);
});

function ajouter() {
    const data = {};
    let valid = true;
    
    Object.keys(inputs).forEach(key => {
        data[key] = inputs[key].value;
        if (['comp', 'dom', 'ext', 'date', 'heure', 'type', 'cote', 'conf'].includes(key) && !inputs[key].value) {
            valid = false;
        }
    });

    if (!valid) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
    }

    console.log('Nouveau pronostic:', data);
    alert('Pronostic ajouté avec succès!');
    vider();
}

function vider() {
    Object.values(inputs).forEach(input => {
        input.value = '';
    });
    preview.logoDom.src = 'https://via.placeholder.com/40';
    preview.logoExt.src = 'https://via.placeholder.com/40';
    updatePreview();
}

const today = new Date().toISOString().split('T')[0];
inputs.date.value = today;
inputs.heure.value = '20:00';
updatePreview();

const deco = document.getElementById('deco');
deco.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});