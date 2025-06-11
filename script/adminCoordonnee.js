tailwind.config = {
    theme: {
        extend: {
            colors: {
                'bleu': '#1e40af',
                'bleu-fonce': '#1e3a8a',
                'jaune': '#fbbf24',
                'jaune-clair': '#fef3c7'
            }
        }
    }
}

const btnOuvrir = document.getElementById('btnOuvrir');
const btnFermer = document.getElementById('btnFermer');
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');
const modalRep = document.getElementById('modalRep');
const btnFermerModal = document.getElementById('btnFermerModal');
const btnAnn = document.getElementById('btnAnn');
const btnSoum = document.getElementById('btnSoum');

let demSel = null;

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

btnFermerModal.addEventListener('click', () => {
    modalRep.classList.add('hidden');
});

btnAnn.addEventListener('click', () => {
    modalRep.classList.add('hidden');
});

const dem = [
    { id: 1, nom: 'Koffi Yao', mt: '1000', num: '0708123456', pf: '1xbet', dt: '2025-06-06' },
    { id: 2, nom: 'Akissi Marie', mt: '2500', num: '0759876543', pf: 'melbet', dt: '2025-06-06' },
    { id: 3, nom: 'Kouame Jean', mt: '5000', num: '0702345678', pf: '1xbet', dt: '2025-06-05' },
    { id: 4, nom: 'Adjoua Sandra', mt: '1500', num: '0748765432', pf: 'melbet', dt: '2025-06-05' },
    { id: 5, nom: 'Yao Kouassi', mt: '3000', num: '0756789012', pf: '1xbet', dt: '2025-06-04' }
];

function affDem() {
    const tab = document.getElementById('tabDem');
    const mob = document.getElementById('demMob');
    
    tab.innerHTML = '';
    mob.innerHTML = '';

    dem.forEach(d => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${d.nom}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${parseInt(d.mt).toLocaleString()} FCFA</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${d.num}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                    ${d.pf}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${d.dt}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button onclick="rep(${d.id})" class="bg-bleu text-white px-3 py-1 rounded hover:bg-bleu-fonce transition-colors text-xs">
                    <i class="fas fa-reply mr-1"></i>Répondre
                </button>
            </td>
        `;
        tab.appendChild(row);

        const card = document.createElement('div');
        card.className = 'border-b border-gray-200 p-4';
        card.innerHTML = `
            <div class="space-y-3">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-medium text-gray-900">${d.nom}</p>
                        <p class="text-sm text-gray-500">${d.dt}</p>
                        <p class="text-sm text-gray-600">${d.num}</p>
                    </div>
                    <span class="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                        ${d.pf}
                    </span>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-lg font-bold text-gray-900">${parseInt(d.mt).toLocaleString()} FCFA</p>
                    <button onclick="rep(${d.id})" class="bg-bleu text-white px-3 py-1 rounded hover:bg-bleu-fonce transition-colors text-xs">
                        <i class="fas fa-reply mr-1"></i>Répondre
                    </button>
                </div>
            </div>
        `;
        mob.appendChild(card);
    });
}

function rep(id) {
    demSel = dem.find(d => d.id === id);
    modalRep.classList.remove('hidden');
    
    document.getElementById('mt').value = '';
    document.getElementById('vil').value = '';
    document.getElementById('ru').value = '';
}

btnSoum.addEventListener('click', () => {
    const mt = document.getElementById('mt').value;
    const vil = document.getElementById('vil').value;
    const ru = document.getElementById('ru').value;

    if (!mt || !vil || !ru) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    if (demSel) {
        const idx = dem.findIndex(d => d.id === demSel.id);
        if (idx !== -1) {
            dem.splice(idx, 1);
        }
        
        affDem();
        modalRep.classList.add('hidden');
        alert('Réponse envoyée avec succès!');
    }
});

const btnDeco = document.getElementById('btnDeco');
btnDeco.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});
affDem();