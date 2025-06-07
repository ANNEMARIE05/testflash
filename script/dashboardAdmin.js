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

const trans = [
    { id: 1, nom: 'Jean Dupont', prix: '75000', type: 'Retrait', date: '2025-06-05' },
    { id: 2, nom: 'Marie Martin', prix: '37500', type: 'Dépôt', date: '2025-06-05' },
    { id: 3, nom: 'Pierre Durand', prix: '100000', type: 'Retrait', date: '2025-06-04' },
    { id: 4, nom: 'Sophie Leroy', prix: '25000', type: 'Dépôt', date: '2025-06-04' }
];

const req = [
    { id: 1, nom: 'Kouassi Yao', montant: '1000', plateforme: '1xbet', date: '2025-06-06' },
    { id: 2, nom: 'Aya Traore', montant: '2500', plateforme: 'melbet', date: '2025-06-06' },
    { id: 3, nom: 'Mamadou Kone', montant: '5000', plateforme: '1xbet', date: '2025-06-05' },
    { id: 4, nom: 'Fatou Diallo', montant: '1500', plateforme: 'melbet', date: '2025-06-05' },
    { id: 5, nom: 'Ibrahim Sanogo', montant: '3000', plateforme: '1xbet', date: '2025-06-05' },
    { id: 6, nom: 'Aminata Ouattara', montant: '750', plateforme: 'melbet', date: '2025-06-04' },
    { id: 7, nom: 'Seydou Bamba', montant: '4000', plateforme: '1xbet', date: '2025-06-04' },
    { id: 8, nom: 'Mariam Coulibaly', montant: '1200', plateforme: 'melbet', date: '2025-06-04' }
];

function affTrans() {
    const tab = document.getElementById('tabTrans');
    const mob = document.getElementById('transMobile');
    
    tab.innerHTML = '';
    mob.innerHTML = '';

    trans.slice(0, 4).forEach(t => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${t.nom}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${parseInt(t.prix).toLocaleString()} XOF</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full ${t.type === 'Retrait' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
                    ${t.type}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                <button onclick="valTrans(${t.id})" class="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-xs">
                    <i class="fas fa-check"></i>
                </button>
                <button onclick="supTrans(${t.id})" class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs">
                    <i class="fas fa-times"></i>
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
                        <p class="font-medium text-gray-900">${t.nom}</p>
                        <p class="text-lg font-bold text-gray-900">${parseInt(t.prix).toLocaleString()} XOF</p>
                    </div>
                    <span class="px-2 py-1 text-xs rounded-full ${t.type === 'Retrait' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
                        ${t.type}
                    </span>
                </div>
                <div class="flex space-x-2">
                    <button onclick="valTrans(${t.id})" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-xs flex-1">
                        <i class="fas fa-check mr-1"></i>Valider
                    </button>
                    <button onclick="supTrans(${t.id})" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs flex-1">
                        <i class="fas fa-times mr-1"></i>Refuser
                    </button>
                </div>
            </div>
        `;
        mob.appendChild(card);
    });
}

function affReq() {
    const tab = document.getElementById('tabRequetes');
    const mob = document.getElementById('requetesMobile');
    
    tab.innerHTML = '';
    mob.innerHTML = '';

    req.slice(0, 5).forEach(r => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${r.nom}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${parseInt(r.montant).toLocaleString()} FCFA</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full ${r.plateforme === '1xbet' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}">
                    ${r.plateforme}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button onclick="voirReq(${r.id})" class="bg-bleu text-white px-3 py-1 rounded hover:bg-bleu-fonce text-xs">
                    Voir requête
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
                        <p class="font-medium text-gray-900">${r.nom}</p>
                        <p class="text-sm text-gray-500">"Je veux effectuer un retrait de ${parseInt(r.montant).toLocaleString()} FCFA sur ${r.plateforme}"</p>
                    </div>
                    <span class="px-2 py-1 text-xs rounded-full ${r.plateforme === '1xbet' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}">
                        ${r.plateforme}
                    </span>
                </div>
                <button onclick="voirReq(${r.id})" class="bg-bleu text-white px-3 py-1 rounded hover:bg-bleu-fonce text-xs w-full">
                    Voir requête complète
                </button>
            </div>
        `;
        mob.appendChild(card);
    });
}

function valTrans(id) {
    const idx = trans.findIndex(t => t.id === id);
    if (idx !== -1) {
        trans.splice(idx, 1);
        affTrans();
        majComp();
        alert('Transaction validée!');
    }
}

function supTrans(id) {
    const idx = trans.findIndex(t => t.id === id);
    if (idx !== -1) {
        trans.splice(idx, 1);
        affTrans();
        majComp();
        alert('Transaction supprimée!');
    }
}

function voirReq(id) {
    const r = req.find(x => x.id === id);
    if (r) {
        alert(`Requête de ${r.nom}: "Je veux effectuer un retrait d'un montant de ${parseInt(r.montant).toLocaleString()} FCFA sur ${r.plateforme}"`);
        window.location.href = 'adminCoordonnee.html';
    }
}

function majComp() {
    document.getElementById('nbTrans').textContent = trans.length;
    document.getElementById('nbRequetes').textContent = req.length;
}

function majVis() {
    const nb = Math.floor(Math.random() * 500) + 1000;
    document.getElementById('visites').textContent = nb.toLocaleString();
}

function majUsr() {
    const nb = Math.floor(Math.random() * 1000) + 3000;
    document.getElementById('users').textContent = nb.toLocaleString();
}

const deco = document.getElementById('deco');
deco.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});
affTrans();
affReq();
majVis();
majUsr();

setInterval(majVis, 30000);
setInterval(majUsr, 45000);