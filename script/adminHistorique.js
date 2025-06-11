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

const transactions = [
    { id: 1, nom: 'Jean Dupont', numero: '07123456789', montant: '75000', plateforme: '1xbet', paiement: 'Orange Money', codeRetrait: 'RT001234', type: 'retrait', statut: 'valide', date: '2025-06-05', heure: '14:30' },
    { id: 2, nom: 'Marie Martin', numero: '05987654321', montant: '37500', plateforme: 'Melbet', paiement: 'Moov Money', codeRetrait: '', type: 'depot', statut: 'valide', date: '2025-06-05', heure: '10:15' },
    { id: 3, nom: 'Pierre Durand', numero: '01456789123', montant: '100000', plateforme: '1xbet', paiement: 'MTN Money', codeRetrait: 'RT005678', type: 'retrait', statut: 'rejete', date: '2025-06-04', heure: '16:45' },
    { id: 4, nom: 'Sophie Leroy', numero: '07789123456', montant: '25000', plateforme: 'Melbet', paiement: 'Wave', codeRetrait: '', type: 'depot', statut: 'valide', date: '2025-06-04', heure: '09:20' },
    { id: 5, nom: 'Paul Moreau', numero: '05321654987', montant: '50000', plateforme: '1xbet', paiement: 'Flash Service', codeRetrait: 'RT009876', type: 'retrait', statut: 'valide', date: '2025-06-03', heure: '11:10' },
    { id: 6, nom: 'Alice Bernard', numero: '01654321789', montant: '80000', plateforme: 'Melbet', paiement: 'Orange Money', codeRetrait: '', type: 'depot', statut: 'rejete', date: '2025-06-03', heure: '15:25' },
    { id: 7, nom: 'Michel Petit', numero: '07987654321', montant: '45000', plateforme: '1xbet', paiement: 'Moov Money', codeRetrait: 'RT003456', type: 'retrait', statut: 'valide', date: '2025-06-02', heure: '13:55' },
    { id: 8, nom: 'Claire Dubois', numero: '05147258369', montant: '60000', plateforme: 'Melbet', paiement: 'MTN Money', codeRetrait: '', type: 'depot', statut: 'valide', date: '2025-06-02', heure: '08:40' },
    { id: 9, nom: 'Robert Simon', numero: '01963852741', montant: '90000', plateforme: '1xbet', paiement: 'Wave', codeRetrait: 'RT007890', type: 'retrait', statut: 'rejete', date: '2025-06-01', heure: '17:20' },
    { id: 10, nom: 'Emma Blanc', numero: '07852963741', montant: '35000', plateforme: 'Melbet', paiement: 'Flash Service', codeRetrait: '', type: 'depot', statut: 'valide', date: '2025-06-01', heure: '12:05' },
    { id: 11, nom: 'Lucas Roux', numero: '05741852963', montant: '55000', plateforme: '1xbet', paiement: 'Orange Money', codeRetrait: 'RT002468', type: 'retrait', statut: 'valide', date: '2025-05-31', heure: '14:15' },
    { id: 12, nom: 'Julie Garnier', numero: '01258369147', montant: '70000', plateforme: 'Melbet', paiement: 'Moov Money', codeRetrait: '', type: 'depot', statut: 'rejete', date: '2025-05-31', heure: '10:30' },
    { id: 13, nom: 'Thomas Faure', numero: '07369147258', montant: '42000', plateforme: '1xbet', paiement: 'MTN Money', codeRetrait: 'RT008642', type: 'retrait', statut: 'valide', date: '2025-05-30', heure: '16:10' },
    { id: 14, nom: 'Nathalie Lebon', numero: '05159753486', montant: '28000', plateforme: 'Melbet', paiement: 'Wave', codeRetrait: '', type: 'depot', statut: 'valide', date: '2025-05-30', heure: '09:45' },
    { id: 15, nom: 'David Mercier', numero: '01753486159', montant: '85000', plateforme: '1xbet', paiement: 'Flash Service', codeRetrait: 'RT004567', type: 'retrait', statut: 'valide', date: '2025-05-29', heure: '13:20' }
];

let pageCourante = 1;
let limiteParPage = 10;
let filtreStatut = 'tous';
let filtreType = 'tous';

function appliquerFiltres() {
    return transactions.filter(t => {
        const statutOk = filtreStatut === 'tous' || t.statut === filtreStatut;
        const typeOk = filtreType === 'tous' || t.type === filtreType;
        return statutOk && typeOk;
    });
}

function afficherTransactions() {
    const donnesFiltrees = appliquerFiltres();
    const indexDebut = (pageCourante - 1) * limiteParPage;
    const indexFin = indexDebut + limiteParPage;
    const donnesPage = donnesFiltrees.slice(indexDebut, indexFin);
    
    const tableauHisto = document.getElementById('tableHisto');
    const histoMobile = document.getElementById('histoMobile');
    
    tableauHisto.innerHTML = '';
    histoMobile.innerHTML = '';

    donnesPage.forEach(t => {
        const ligne = document.createElement('tr');
        ligne.className = 'hover:bg-gray-50';
        ligne.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${t.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${t.nom}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${t.numero}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${parseInt(t.montant).toLocaleString()} XOF</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${t.plateforme}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${t.paiement}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${t.codeRetrait || '-'}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full ${t.type === 'retrait' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
                    ${t.type === 'retrait' ? 'Retrait' : 'Dépôt'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full ${t.statut === 'valide' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    <i class="fas ${t.statut === 'valide' ? 'fa-check' : 'fa-times'} mr-1"></i>
                    ${t.statut === 'valide' ? 'Validée' : 'Rejetée'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${t.date} ${t.heure}</td>
        `;
        tableauHisto.appendChild(ligne);

        const carte = document.createElement('div');
        carte.className = 'border-b border-gray-200 p-4';
        carte.innerHTML = `
            <div class="space-y-3">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-medium text-gray-900">${t.nom}</p>
                        <p class="text-sm text-gray-500">#${t.id} - ${t.date} ${t.heure}</p>
                        <p class="text-sm text-gray-600">Tel: ${t.numero}</p>
                    </div>
                    <div class="flex flex-col items-end space-y-1">
                        <span class="px-2 py-1 text-xs rounded-full ${t.type === 'retrait' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
                            ${t.type === 'retrait' ? 'Retrait' : 'Dépôt'}
                        </span>
                        <span class="px-2 py-1 text-xs rounded-full ${t.statut === 'valide' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                            <i class="fas ${t.statut === 'valide' ? 'fa-check' : 'fa-times'} mr-1"></i>
                            ${t.statut === 'valide' ? 'Validée' : 'Rejetée'}
                        </span>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-2 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Montant:</span>
                        <span class="font-semibold">${parseInt(t.montant).toLocaleString()} XOF</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Plateforme:</span>
                        <span>${t.plateforme}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Paiement:</span>
                        <span>${t.paiement}</span>
                    </div>
                    ${t.codeRetrait ? `<div class="flex justify-between">
                        <span class="text-gray-600">Code Retrait:</span>
                        <span class="font-mono">${t.codeRetrait}</span>
                    </div>` : ''}
                </div>
            </div>
        `;
        histoMobile.appendChild(carte);
    });

    mettreAJourPagination(donnesFiltrees.length);
}

function mettreAJourPagination(totalTrans) {
    const numDebut = (pageCourante - 1) * limiteParPage + 1;
    const numFin = Math.min(pageCourante * limiteParPage, totalTrans);
    
    document.getElementById('numDebut').textContent = numDebut;
    document.getElementById('numFin').textContent = numFin;
    document.getElementById('ttlAff').textContent = totalTrans;
    
    document.getElementById('btnPrec').disabled = pageCourante === 1;
    document.getElementById('btnSuiv').disabled = numFin >= totalTrans;
}

function mettreAJourCompteurs() {
    const ttlValidees = transactions.filter(t => t.statut === 'valide').length;
    const ttlRejetees = transactions.filter(t => t.statut === 'rejete').length;
    
    document.getElementById('ttlTrans').textContent = transactions.length;
    document.getElementById('nbValide').textContent = ttlValidees;
    document.getElementById('nbRejete').textContent = ttlRejetees;
}

document.getElementById('filtreStatut').addEventListener('change', (e) => {
    filtreStatut = e.target.value;
    pageCourante = 1;
    afficherTransactions();
});

document.getElementById('filtreType').addEventListener('change', (e) => {
    filtreType = e.target.value;
    pageCourante = 1;
    afficherTransactions();
});

document.getElementById('btnPrec').addEventListener('click', () => {
    if (pageCourante > 1) {
        pageCourante--;
        afficherTransactions();
    }
});

document.getElementById('btnSuiv').addEventListener('click', () => {
    const donnesFiltrees = appliquerFiltres();
    if (pageCourante * limiteParPage < donnesFiltrees.length) {
        pageCourante++;
        afficherTransactions();
    }
});

const btnDeco = document.getElementById('btnDeco');
btnDeco.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});

afficherTransactions();
mettreAJourCompteurs();