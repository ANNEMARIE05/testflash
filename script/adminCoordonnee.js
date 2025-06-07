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
const modalReponse = document.getElementById('modalReponse');
const fermerModal = document.getElementById('fermerModal');
const annuler = document.getElementById('annuler');
const soumettre = document.getElementById('soumettre');

let demandeSelectionnee = null;

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
    modalReponse.classList.add('hidden');
});

annuler.addEventListener('click', () => {
    modalReponse.classList.add('hidden');
});

const demandes = [
    { id: 1, nom: 'Koffi Yao', montant: '1000', plateforme: '1xbet', date: '2025-06-06' },
    { id: 2, nom: 'Akissi Marie', montant: '2500', plateforme: 'melbet', date: '2025-06-06' },
    { id: 3, nom: 'Kouame Jean', montant: '5000', plateforme: '1xbet', date: '2025-06-05' },
    { id: 4, nom: 'Adjoua Sandra', montant: '1500', plateforme: 'melbet', date: '2025-06-05' },
    { id: 5, nom: 'Yao Kouassi', montant: '3000', plateforme: '1xbet', date: '2025-06-04' }
];

function afficherDemandes() {
    const tab = document.getElementById('tabDemandes');
    const mobile = document.getElementById('demandesMobile');
    
    tab.innerHTML = '';
    mobile.innerHTML = '';

    demandes.forEach(d => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${d.nom}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${parseInt(d.montant).toLocaleString()} FCFA</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                    ${d.plateforme}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${d.date}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button onclick="repondre(${d.id})" class="bg-bleu text-white px-3 py-1 rounded hover:bg-bleu-fonce transition-colors text-xs">
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
                        <p class="text-sm text-gray-500">${d.date}</p>
                    </div>
                    <span class="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                        ${d.plateforme}
                    </span>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-lg font-bold text-gray-900">${parseInt(d.montant).toLocaleString()} FCFA</p>
                    <button onclick="repondre(${d.id})" class="bg-bleu text-white px-3 py-1 rounded hover:bg-bleu-fonce transition-colors text-xs">
                        <i class="fas fa-reply mr-1"></i>Répondre
                    </button>
                </div>
            </div>
        `;
        mobile.appendChild(card);
    });
}

function repondre(id) {
    demandeSelectionnee = demandes.find(d => d.id === id);
    modalReponse.classList.remove('hidden');
    
    document.getElementById('montant').value = '';
    document.getElementById('ville').value = '';
    document.getElementById('rue').value = '';
}

soumettre.addEventListener('click', () => {
    const montant = document.getElementById('montant').value;
    const ville = document.getElementById('ville').value;
    const rue = document.getElementById('rue').value;

    if (!montant || !ville || !rue) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    if (demandeSelectionnee) {
        const index = demandes.findIndex(d => d.id === demandeSelectionnee.id);
        if (index !== -1) {
            demandes.splice(index, 1);
        }
        
        afficherDemandes();
        modalReponse.classList.add('hidden');
        alert('Réponse envoyée avec succès!');
    }
});

const deco = document.getElementById('deco');
deco.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});
afficherDemandes();