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
const modal = document.getElementById('modalDetails');
const fermerModal = document.getElementById('fermerModal');

let transActuelle = null;

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

fermerModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

const trans = [
    { 
        id: 1, 
        nom: 'Jean Dupont', 
        montant: 75000, 
        type: 'retrait', 
        methode: 'Mobile Money', 
        numero: '+225 01 02 03 04', 
        date: '2025-06-05 14:30', 
        statut: 'attente' 
    },
    { 
        id: 2, 
        nom: 'Marie Martin', 
        montant: 37500, 
        type: 'depot', 
        methode: 'Carte Bancaire', 
        numero: '**** 1234', 
        date: '2025-06-05 12:15', 
        statut: 'attente' 
    },
    { 
        id: 3, 
        nom: 'Pierre Durand', 
        montant: 100000, 
        type: 'retrait', 
        methode: 'Virement', 
        numero: 'CI05 BK01 1234567890', 
        date: '2025-06-04 16:45', 
        statut: 'valide' 
    },
    { 
        id: 4, 
        nom: 'Sophie Leroy', 
        montant: 25000, 
        type: 'depot', 
        methode: 'Orange Money', 
        numero: '+225 07 08 09 10', 
        date: '2025-06-04 11:20', 
        statut: 'rejete' 
    },
    { 
        id: 5, 
        nom: 'Ahmed Kone', 
        montant: 50000, 
        type: 'retrait', 
        methode: 'MTN Money', 
        numero: '+225 05 06 07 08', 
        date: '2025-06-05 09:10', 
        statut: 'attente' 
    }
];

function afficher() {
    const filtreType = document.getElementById('filtreType').value;
    const filtreStatut = document.getElementById('filtreStatut').value;
    
    const transFiltrees = trans.filter(t => {
        const typeOk = !filtreType || t.type === filtreType;
        const statutOk = t.statut === filtreStatut;
        return typeOk && statutOk;
    });

    const tab = document.getElementById('tabTrans');
    const mobile = document.getElementById('transMobile');
    
    tab.innerHTML = '';
    mobile.innerHTML = '';

    transFiltrees.forEach(t => {
        const couleurType = t.type === 'retrait' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
        const iconType = t.type === 'retrait' ? 'fa-arrow-up' : 'fa-arrow-down';
        
        let couleurStatut, texteStatut;
        switch(t.statut) {
            case 'attente':
                couleurStatut = 'bg-yellow-100 text-yellow-800';
                texteStatut = 'En attente';
                break;
            case 'valide':
                couleurStatut = 'bg-green-100 text-green-800';
                texteStatut = 'Validée';
                break;
            case 'rejete':
                couleurStatut = 'bg-red-100 text-red-800';
                texteStatut = 'Rejetée';
                break;
        }

        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50 cursor-pointer';
        row.onclick = () => afficherModal(t);
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${t.nom}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${t.montant.toLocaleString()} XOF</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full ${couleurType}">
                    <i class="fas ${iconType} mr-1"></i>${t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${t.methode}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${t.date}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full ${couleurStatut}">${texteStatut}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                ${t.statut === 'attente' ? `
                    <button onclick="event.stopPropagation(); valider(${t.id})" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors text-xs">
                        <i class="fas fa-check mr-1"></i>Valider
                    </button>
                    <button onclick="event.stopPropagation(); rejeter(${t.id})" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors text-xs">
                        <i class="fas fa-times mr-1"></i>Rejeter
                    </button>
                ` : `
                    <button onclick="event.stopPropagation(); afficherModal(${JSON.stringify(t).replace(/"/g, '&quot;')})" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors text-xs">
                        <i class="fas fa-eye mr-1"></i>Voir
                    </button>
                `}
            </td>
        `;
        tab.appendChild(row);

        const card = document.createElement('div');
        card.className = 'border-b border-gray-200 p-4 cursor-pointer hover:bg-gray-50';
        card.onclick = () => afficherModal(t);
        card.innerHTML = `
            <div class="space-y-3">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-medium text-gray-900">${t.nom}</p>
                        <p class="text-sm text-gray-500">${t.date}</p>
                        <p class="text-sm text-gray-500">${t.methode}</p>
                    </div>
                    <div class="text-right">
                        <span class="px-2 py-1 text-xs rounded-full ${couleurType}">
                            <i class="fas ${iconType} mr-1"></i>${t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                        </span>
                        <div class="mt-1">
                            <span class="px-2 py-1 text-xs rounded-full ${couleurStatut}">${texteStatut}</span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-lg font-bold text-gray-900">${t.montant.toLocaleString()} XOF</p>
                    ${t.statut === 'attente' ? `
                        <div class="flex space-x-2">
                            <button onclick="event.stopPropagation(); valider(${t.id})" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors text-xs">
                                <i class="fas fa-check mr-1"></i>Valider
                            </button>
                            <button onclick="event.stopPropagation(); rejeter(${t.id})" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors text-xs">
                                <i class="fas fa-times mr-1"></i>Rejeter
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        mobile.appendChild(card);
    });
}

function afficherModal(t) {
    transActuelle = t;
    const contenu = document.getElementById('contenuModal');
    const btnValider = document.getElementById('btnValider');
    const btnRejeter = document.getElementById('btnRejeter');

    contenu.innerHTML = `
        <p><strong>Utilisateur:</strong> ${t.nom}</p>
        <p><strong>Montant:</strong> ${t.montant.toLocaleString()} XOF</p>
        <p><strong>Type:</strong> ${t.type.charAt(0).toUpperCase() + t.type.slice(1)}</p>
        <p><strong>Méthode:</strong> ${t.methode}</p>
        <p><strong>Numéro:</strong> ${t.numero}</p>
        <p><strong>Date:</strong> ${t.date}</p>
    `;

    if (t.statut === 'attente') {
        btnValider.style.display = 'block';
        btnRejeter.style.display = 'block';
        btnValider.onclick = () => {
            valider(t.id);
            modal.classList.add('hidden');
        };
        btnRejeter.onclick = () => {
            rejeter(t.id);
            modal.classList.add('hidden');
        };
    } else {
        btnValider.style.display = 'none';
        btnRejeter.style.display = 'none';
    }

    modal.classList.remove('hidden');
}

function valider(id) {
    const index = trans.findIndex(t => t.id === id);
    if (index !== -1) {
        trans[index].statut = 'valide';
        afficher();
        majCompteurs();
        alert('Transaction validée avec succès!');
    }
}

function rejeter(id) {
    const index = trans.findIndex(t => t.id === id);
    if (index !== -1) {
        trans[index].statut = 'rejete';
        afficher();
        majCompteurs();
        alert('Transaction rejetée!');
    }
}

function majCompteurs() {
    const enAttente = trans.filter(t => t.statut === 'attente');
    const depots = enAttente.filter(t => t.type === 'depot');
    const retraits = enAttente.filter(t => t.type === 'retrait');

    document.getElementById('totalAttente').textContent = enAttente.length;
    document.getElementById('nbDepots').textContent = depots.length;
    document.getElementById('nbRetraits').textContent = retraits.length;
    document.getElementById('notif').textContent = enAttente.length;
}

document.getElementById('filtreType').addEventListener('change', afficher);
document.getElementById('filtreStatut').addEventListener('change', afficher);


const deco = document.getElementById('deco');
deco.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});
afficher();
majCompteurs();