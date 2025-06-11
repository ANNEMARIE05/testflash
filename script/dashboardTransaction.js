tailwind.config = {
    theme: {
        extend: {
            colors: {
                'bleuPrinc': '#1e40af',
                'bleuFonce': '#1e3a8a',
                'bleuDash': '#3b82f6',
                'bleuClair': '#dbeafe',
                'jauneAcc': '#fbbf24',
                'jauneClair': '#fef3c7',
                'vertPar': '#16a34a'
            }
        }
    }
}
const donnees = {
    stats: [
        {titre: "Total Dépôts", montant: "125,500 XOF", couleur: "green", icone: "fas fa-arrow-up"},
        {titre: "Total Retraits", montant: "78,000 XOF", couleur: "red", icone: "fas fa-arrow-down"},
        {titre: "Bonus Reçus", montant: "12,750 XOF", couleur: "jauneAcc", icone: "fas fa-gift"},
        {titre: "Nb Transactions", montant: "47", couleur: "bleuDash", icone: "fas fa-exchange-alt"}
    ],
    txns: [
        {date: "07/06/2025 14:30", type: "depot", montant: "+15,000 XOF", methode: "Orange Money", statut: "Réussi", id: "TXN001245"},
        {date: "06/06/2025 09:15", type: "retrait", montant: "-5,000 XOF", methode: "MTN Money", statut: "Réussi", id: "TXN001244"},
        {date: "05/06/2025 16:45", type: "bonus", montant: "+2,500 XOF", methode: "1xBet Bonus", statut: "Complété", id: "BON001089"},
        {date: "04/06/2025 11:20", type: "depot", montant: "+25,000 XOF", methode: "Moov Money", statut: "Réussi", id: "TXN001243"},
        {date: "03/06/2025 13:05", type: "retrait", montant: "-12,000 XOF", methode: "Orange Money", statut: "En cours", id: "TXN001242"},
        {date: "02/06/2025 08:30", type: "bonus", montant: "+5,000 XOF", methode: "Connexion Quotidienne", statut: "Complété", id: "BON001088"}
    ]
};

const couleurType = {
    depot: {bg: "green-500/20", txt: "green-400", icone: "fas fa-plus", nom: "Dépôt"},
    retrait: {bg: "red-500/20", txt: "red-400", icone: "fas fa-minus", nom: "Retrait"},
    bonus: {bg: "jauneAcc/20", txt: "jauneAcc", icone: "fas fa-gift", nom: "Bonus"}
};

const couleurStatut = {
    "Réussi": {bg: "green-500/20", txt: "green-400"},
    "Complété": {bg: "jauneAcc/20", txt: "jauneAcc"},
    "En cours": {bg: "yellow-500/20", txt: "yellow-400"}
};

function creerStats() {
    const conteneur = document.getElementById('stats');
    conteneur.innerHTML = donnees.stats.map(stat => `
        <div class="bg-gray-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 backdrop-blur-xl border border-white/10">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-gray-400 text-xs lg:text-sm font-medium">${stat.titre}</p>
                    <p class="text-lg sm:text-xl lg:text-2xl font-bold text-${stat.couleur === 'jauneAcc' ? 'jauneAcc' : stat.couleur + '-400'}">${stat.montant}</p>
                </div>
                <div class="w-10 h-10 lg:w-12 lg:h-12 bg-${stat.couleur === 'jauneAcc' ? 'jauneAcc' : stat.couleur + '-500'}/20 rounded-full flex items-center justify-center">
                    <i class="${stat.icone} text-${stat.couleur === 'jauneAcc' ? 'jauneAcc' : stat.couleur + '-400'} text-lg lg:text-xl"></i>
                </div>
            </div>
        </div>
    `).join('');
}

function creerTableau() {
    const tableau = document.getElementById('tableau');
    tableau.innerHTML = donnees.txns.map(txn => {
        const typeData = couleurType[txn.type];
        const statutData = couleurStatut[txn.statut];
        return `
            <tr class="hover:bg-gray-700/50 transition-colors">
                <td class="py-4 px-4 text-white text-sm">${txn.date}</td>
                <td class="py-4 px-4">
                    <span class="bg-${typeData.bg} text-${typeData.txt} px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit">
                        <i class="${typeData.icone} mr-1"></i>${typeData.nom}
                    </span>
                </td>
                <td class="py-4 px-4 text-${typeData.txt} font-bold text-sm">${txn.montant}</td>
                <td class="py-4 px-4 text-white text-sm">${txn.methode}</td>
                <td class="py-4 px-4">
                    <span class="bg-${statutData.bg} text-${statutData.txt} px-2 py-1 rounded-full text-xs">${txn.statut}</span>
                </td>
            </tr>
        `;
    }).join('');
}

function creerMobile() {
    const mobile = document.getElementById('mobile');
    mobile.innerHTML = donnees.txns.map(txn => {
        const typeData = couleurType[txn.type];
        const statutData = couleurStatut[txn.statut];
        return `
            <div class="bg-gradient-to-r from-${typeData.bg} to-${typeData.bg.replace('500', '600')} rounded-xl p-4 border border-${typeData.bg.replace('/20', '/30')}">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-${typeData.bg.replace('/20', '')} rounded-full flex items-center justify-center">
                            <i class="${typeData.icone} text-white text-sm"></i>
                        </div>
                        <div>
                            <p class="text-white font-medium text-sm">${typeData.nom}</p>
                            <p class="text-gray-400 text-xs">${txn.date}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-${typeData.txt} font-bold text-sm">${txn.montant}</p>
                        <span class="text-xs text-${statutData.txt} bg-${statutData.bg} px-2 py-1 rounded-full">${txn.statut}</span>
                    </div>
                </div>
                <div class="flex justify-between items-center text-xs text-gray-400">
                    <span>${txn.methode}</span>
                    <span>#${txn.id}</span>
                </div>
            </div>
        `;
    }).join('');
}

btnDeco.addEventListener('click', e => {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});

function gererMenu() {
    const menu = document.getElementById('menu');
    const btnOuvrir = document.getElementById('btnOuvrir');
    const btnFermer = document.getElementById('btnFermer');
    const fondMenu = document.getElementById('fondMenu');

    btnOuvrir.addEventListener('click', () => {
        menu.classList.add('ouvert');
        fondMenu.classList.add('actif');
    });

    btnFermer.addEventListener('click', () => {
        menu.classList.remove('ouvert');
        fondMenu.classList.remove('actif');
    });

    fondMenu.addEventListener('click', () => {
        menu.classList.remove('ouvert');
        fondMenu.classList.remove('actif');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    creerStats();
    creerTableau();
    creerMobile();
    gererMenu();
});

function aller(url) {
    window.location.href = url;
}

document.querySelectorAll('.iconeFlottante').forEach(icone => {
    icone.style.animation = 'flottement 3s ease-in-out infinite';
});