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

let pronostics = [
    { id: 1, eq1: 'PSG', eq2: 'Lyon', prono: '1', cote: 1.85, date: '2025-06-10', statut: 'en_attente' },
    { id: 2, eq1: 'Marseille', eq2: 'Monaco', prono: 'Plus de 2.5 buts', cote: 2.10, date: '2025-06-08', statut: 'gagne' },
    { id: 3, eq1: 'Lille', eq2: 'Nice', prono: 'X', cote: 3.20, date: '2025-06-07', statut: 'perdu' },
    { id: 4, eq1: 'Rennes', eq2: 'Nantes', prono: '2', cote: 2.45, date: '2025-06-12', statut: 'en_attente' },
    { id: 5, eq1: 'Bordeaux', eq2: 'Strasbourg', prono: 'Moins de 2.5 buts', cote: 1.75, date: '2025-06-06', statut: 'gagne' }
];

let idCompteur = 6;

function getStatutBadge(statut) {
    switch(statut) {
        case 'gagne': return 'bg-green-100 text-green-800';
        case 'perdu': return 'bg-red-100 text-red-800';
        default: return 'bg-yellow-100 text-yellow-800';
    }
}

function getStatutTexte(statut) {
    switch(statut) {
        case 'gagne': return 'Gagné';
        case 'perdu': return 'Perdu';
        default: return 'En attente';
    }
}

function filtrerPronostics() {
    const filtre = document.getElementById('filtreStatut').value;
    return filtre === 'tous' ? pronostics : pronostics.filter(p => p.statut === filtre);
}

function afficherPronostics() {
    const pronosFiltres = filtrerPronostics();
    const tab = document.getElementById('tabProno');
    const mobile = document.getElementById('pronoMobile');
    
    tab.innerHTML = '';
    mobile.innerHTML = '';

    pronosFiltres.forEach(p => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${p.eq1} vs ${p.eq2}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${p.prono}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${p.cote}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${p.date}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full ${getStatutBadge(p.statut)}">
                    ${getStatutTexte(p.statut)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                <button onclick="modifierProno(${p.id})" class="bg-bleu text-white px-3 py-1 rounded hover:bg-bleu-fonce transition-colors text-xs">
                    <i class="fas fa-edit mr-1"></i>Modifier
                </button>
                <button onclick="supprimerProno(${p.id})" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors text-xs">
                    <i class="fas fa-trash mr-1"></i>Supprimer
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
                        <p class="font-medium text-gray-900">${p.eq1} vs ${p.eq2}</p>
                        <p class="text-sm text-gray-500">${p.date}</p>
                    </div>
                    <span class="px-2 py-1 text-xs rounded-full ${getStatutBadge(p.statut)}">
                        ${getStatutTexte(p.statut)}
                    </span>
                </div>
                <div class="flex justify-between items-center">
                    <div>
                        <p class="text-sm text-gray-600">Prono: <span class="font-medium">${p.prono}</span></p>
                        <p class="text-sm text-gray-600">Cote: <span class="font-bold text-bleu">${p.cote}</span></p>
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="modifierProno(${p.id})" class="bg-bleu text-white px-3 py-1 rounded hover:bg-bleu-fonce transition-colors text-xs">
                            <i class="fas fa-edit mr-1"></i>Modifier
                        </button>
                        <button onclick="supprimerProno(${p.id})" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors text-xs">
                            <i class="fas fa-trash mr-1"></i>Supprimer
                        </button>
                    </div>
                </div>
            </div>
        `;
        mobile.appendChild(card);
    });
}

function majCompteurs() {
    const total = pronostics.length;
    const gagnes = pronostics.filter(p => p.statut === 'gagne').length;
    const perdus = pronostics.filter(p => p.statut === 'perdu').length;

    document.getElementById('totProno').textContent = total;
    document.getElementById('pronoGagne').textContent = gagnes;
    document.getElementById('pronoPerdu').textContent = perdus;
}

function nouvelleModal() {
    document.getElementById('titreModal').textContent = 'Nouveau Pronostic';
    document.getElementById('formProno').reset();
    document.getElementById('pronoId').value = '';
    document.getElementById('modalEdit').classList.remove('hidden');
}

function modifierProno(id) {
    const p = pronostics.find(prono => prono.id === id);
    if (p) {
        document.getElementById('titreModal').textContent = 'Modifier Pronostic';
        document.getElementById('pronoId').value = p.id;
        document.getElementById('eq1').value = p.eq1;
        document.getElementById('eq2').value = p.eq2;
        document.getElementById('prono').value = p.prono;
        document.getElementById('cote').value = p.cote;
        document.getElementById('dateMatch').value = p.date;
        document.getElementById('statut').value = p.statut;
        document.getElementById('modalEdit').classList.remove('hidden');
    }
}

function supprimerProno(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce pronostic ?')) {
        const index = pronostics.findIndex(p => p.id === id);
        if (index !== -1) {
            pronostics.splice(index, 1);
            afficherPronostics();
            majCompteurs();
            alert('Pronostic supprimé avec succès!');
        }
    }
}

function fermerModal() {
    document.getElementById('modalEdit').classList.add('hidden');
}

document.getElementById('formProno').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = document.getElementById('pronoId').value;
    const eq1 = document.getElementById('eq1').value;
    const eq2 = document.getElementById('eq2').value;
    const prono = document.getElementById('prono').value;
    const cote = parseFloat(document.getElementById('cote').value);
    const date = document.getElementById('dateMatch').value;
    const statut = document.getElementById('statut').value;

    if (id) {
        const index = pronostics.findIndex(p => p.id == id);
        if (index !== -1) {
            pronostics[index] = { id: parseInt(id), eq1, eq2, prono, cote, date, statut };
            alert('Pronostic modifié avec succès!');
        }
    } else {
        const nouveauProno = { id: idCompteur++, eq1, eq2, prono, cote, date, statut };
        pronostics.push(nouveauProno);
        alert('Pronostic ajouté avec succès!');
    }

    fermerModal();
    afficherPronostics();
    majCompteurs();
});

document.getElementById('filtreStatut').addEventListener('change', afficherPronostics);


const deco = document.getElementById('deco');
deco.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});
afficherPronostics();
majCompteurs();