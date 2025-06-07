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

const histo = [
    { id: 1, nom: 'Jean Dupont', prix: '75000', type: 'retrait', statut: 'valide', date: '2025-06-05', heure: '14:30' },
    { id: 2, nom: 'Marie Martin', prix: '37500', type: 'depot', statut: 'valide', date: '2025-06-05', heure: '10:15' },
    { id: 3, nom: 'Pierre Durand', prix: '100000', type: 'retrait', statut: 'rejete', date: '2025-06-04', heure: '16:45' },
    { id: 4, nom: 'Sophie Leroy', prix: '25000', type: 'depot', statut: 'valide', date: '2025-06-04', heure: '09:20' },
    { id: 5, nom: 'Paul Moreau', prix: '50000', type: 'retrait', statut: 'valide', date: '2025-06-03', heure: '11:10' },
    { id: 6, nom: 'Alice Bernard', prix: '80000', type: 'depot', statut: 'rejete', date: '2025-06-03', heure: '15:25' },
    { id: 7, nom: 'Michel Petit', prix: '45000', type: 'retrait', statut: 'valide', date: '2025-06-02', heure: '13:55' },
    { id: 8, nom: 'Claire Dubois', prix: '60000', type: 'depot', statut: 'valide', date: '2025-06-02', heure: '08:40' },
    { id: 9, nom: 'Robert Simon', prix: '90000', type: 'retrait', statut: 'rejete', date: '2025-06-01', heure: '17:20' },
    { id: 10, nom: 'Emma Blanc', prix: '35000', type: 'depot', statut: 'valide', date: '2025-06-01', heure: '12:05' },
    { id: 11, nom: 'Lucas Roux', prix: '55000', type: 'retrait', statut: 'valide', date: '2025-05-31', heure: '14:15' },
    { id: 12, nom: 'Julie Garnier', prix: '70000', type: 'depot', statut: 'rejete', date: '2025-05-31', heure: '10:30' },
    { id: 13, nom: 'Thomas Faure', prix: '42000', type: 'retrait', statut: 'valide', date: '2025-05-30', heure: '16:10' },
    { id: 14, nom: 'Nathalie Lebon', prix: '28000', type: 'depot', statut: 'valide', date: '2025-05-30', heure: '09:45' },
    { id: 15, nom: 'David Mercier', prix: '85000', type: 'retrait', statut: 'valide', date: '2025-05-29', heure: '13:20' }
];

let page = 1;
let limite = 10;
let filtre = 'tout';
let typeFiltre = 'tout';

function appliquerFiltres() {
    return histo.filter(h => {
        const statutOk = filtre === 'tout' || h.statut === filtre;
        const typeOk = typeFiltre === 'tout' || h.type === typeFiltre;
        return statutOk && typeOk;
    });
}

function afficher() {
    const donnees = appliquerFiltres();
    const debut = (page - 1) * limite;
    const fin = debut + limite;
    const pageData = donnees.slice(debut, fin);
    
    const tab = document.getElementById('tabHisto');
    const mobile = document.getElementById('histoMobile');
    
    tab.innerHTML = '';
    mobile.innerHTML = '';

    pageData.forEach(h => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${h.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${h.nom}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${parseInt(h.prix).toLocaleString()} XOF</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full ${h.type === 'retrait' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
                    ${h.type === 'retrait' ? 'Retrait' : 'Dépôt'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full ${h.statut === 'valide' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    <i class="fas ${h.statut === 'valide' ? 'fa-check' : 'fa-times'} mr-1"></i>
                    ${h.statut === 'valide' ? 'Validée' : 'Rejetée'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${h.date} ${h.heure}</td>
        `;
        tab.appendChild(row);

        const card = document.createElement('div');
        card.className = 'border-b border-gray-200 p-4';
        card.innerHTML = `
            <div class="space-y-3">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-medium text-gray-900">${h.nom}</p>
                        <p class="text-sm text-gray-500">#${h.id} - ${h.date} ${h.heure}</p>
                    </div>
                    <div class="flex flex-col items-end space-y-1">
                        <span class="px-2 py-1 text-xs rounded-full ${h.type === 'retrait' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
                            ${h.type === 'retrait' ? 'Retrait' : 'Dépôt'}
                        </span>
                        <span class="px-2 py-1 text-xs rounded-full ${h.statut === 'valide' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                            <i class="fas ${h.statut === 'valide' ? 'fa-check' : 'fa-times'} mr-1"></i>
                            ${h.statut === 'valide' ? 'Validée' : 'Rejetée'}
                        </span>
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-lg font-bold text-gray-900">${parseInt(h.prix).toLocaleString()} XOF</p>
                </div>
            </div>
        `;
        mobile.appendChild(card);
    });

    majPagination(donnees.length);
}

function majPagination(total) {
    const debut = (page - 1) * limite + 1;
    const fin = Math.min(page * limite, total);
    
    document.getElementById('debut').textContent = debut;
    document.getElementById('fin').textContent = fin;
    document.getElementById('totalAff').textContent = total;
    
    document.getElementById('prec').disabled = page === 1;
    document.getElementById('suiv').disabled = fin >= total;
}

function majCompteurs() {
    const donnees = histo;
    const valides = donnees.filter(h => h.statut === 'valide').length;
    const rejetes = donnees.filter(h => h.statut === 'rejete').length;
    
    document.getElementById('total').textContent = donnees.length;
    document.getElementById('valide').textContent = valides;
    document.getElementById('rejete').textContent = rejetes;
}

document.getElementById('filtre').addEventListener('change', (e) => {
    filtre = e.target.value;
    page = 1;
    afficher();
});

document.getElementById('type').addEventListener('change', (e) => {
    typeFiltre = e.target.value;
    page = 1;
    afficher();
});

document.getElementById('prec').addEventListener('click', () => {
    if (page > 1) {
        page--;
        afficher();
    }
});

document.getElementById('suiv').addEventListener('click', () => {
    const donnees = appliquerFiltres();
    if (page * limite < donnees.length) {
        page++;
        afficher();
    }
});

const deco = document.getElementById('deco');
deco.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});
afficher();
majCompteurs();