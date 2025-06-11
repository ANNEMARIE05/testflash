tailwind.config = {
    theme: {
        extend: {
            colors: {
                'bleu-principal': '#1e40af',
                'bleu-fonce': '#1e3a8a',
                'jaune-accent': '#fbbf24',
                'jaune-clair': '#fef3c7'
            }
        }
    }
}

const ouvrirMenu = document.getElementById('ouvrirMenu');
const fermerMenu = document.getElementById('fermerMenu');
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');

ouvrirMenu.addEventListener('click', () => {
    menu.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
});

fermerMenu.addEventListener('click', () => {
    menu.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
});

overlay.addEventListener('click', () => {
    menu.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
});

let quizStd = [
    { id: 1, titre: 'Quiz Football Ligue 1', participants: 45, bonus: 500, statut: 'Actif', date: '2025-06-06' },
    { id: 2, titre: 'Quiz Champions League', participants: 32, bonus: 500, statut: 'Actif', date: '2025-06-05' },
    { id: 3, titre: 'Quiz Premier League', participants: 28, bonus: 500, statut: 'Terminé', date: '2025-06-04' }
];

let quizVip = [
    { id: 1, titre: 'Quiz VIP Champions', participants: 12, bonus: 1000, statut: 'Actif', date: '2025-06-06' },
    { id: 2, titre: 'Quiz VIP Liga', participants: 8, bonus: 1000, statut: 'Actif', date: '2025-06-05' }
];

let clients = [
    { id: 1, nom: 'Koné Moussa', email: 'moussa@email.com', tel: '07 00 00 00 01', type: 'vip', nb_depot: 25, somme_depot: 125000 },
    { id: 2, nom: 'Diabaté Fatou', email: 'fatou@email.com', tel: '07 00 00 00 02', type: 'standard', nb_depot: 30, somme_depot: 95000 },
    { id: 3, nom: 'Traoré Ibrahim', email: 'ibrahim@email.com', tel: '07 00 00 00 03', type: 'vip', nb_depot: 20, somme_depot: 150000 },
    { id: 4, nom: 'Kouadio Aya', email: 'aya@email.com', tel: '07 00 00 00 04', type: 'standard', nb_depot: 35, somme_depot: 80000 },
    { id: 5, nom: 'Bamba Sekou', email: 'sekou@email.com', tel: '07 00 00 00 05', type: 'vip', nb_depot: 15, somme_depot: 200000 },
    { id: 6, nom: 'Ouattara Marie', email: 'marie@email.com', tel: '07 00 00 00 06', type: 'standard', nb_depot: 40, somme_depot: 70000 }
];

function affQuizStd() {
    const table = document.getElementById('tableQuizStd');
    const mobile = document.getElementById('quizStdMobile');
    
    table.innerHTML = '';
    mobile.innerHTML = '';

    quizStd.forEach(q => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${q.titre}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${q.participants}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${q.bonus} XOF</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full ${q.statut === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                    ${q.statut}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                <button onclick="modQuizStd(${q.id})" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors text-xs">
                    <i class="fas fa-edit mr-1"></i>Modifier
                </button>
                <button onclick="suppQuizStd(${q.id})" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors text-xs">
                    <i class="fas fa-trash mr-1"></i>Supprimer
                </button>
            </td>
        `;
        table.appendChild(row);

        const card = document.createElement('div');
        card.className = 'border-b border-gray-200 p-4';
        card.innerHTML = `
            <div class="space-y-3">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-medium text-gray-900">${q.titre}</p>
                        <p class="text-sm text-gray-500">${q.participants} participants</p>
                    </div>
                    <span class="px-2 py-1 text-xs rounded-full ${q.statut === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                        ${q.statut}
                    </span>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-lg font-bold text-gray-900">${q.bonus} XOF</p>
                    <div class="flex space-x-2">
                        <button onclick="modQuizStd(${q.id})" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors text-xs">
                            <i class="fas fa-edit mr-1"></i>Modifier
                        </button>
                        <button onclick="suppQuizStd(${q.id})" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors text-xs">
                            <i class="fas fa-trash mr-1"></i>Supprimer
                        </button>
                    </div>
                </div>
            </div>
        `;
        mobile.appendChild(card);
    });
}

function affQuizVip() {
    const table = document.getElementById('tableQuizVip');
    const mobile = document.getElementById('quizVipMobile');
    
    table.innerHTML = '';
    mobile.innerHTML = '';

    quizVip.forEach(q => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${q.titre}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${q.participants}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${q.bonus} XOF</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full ${q.statut === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                    ${q.statut}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                <button onclick="modQuizVip(${q.id})" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors text-xs">
                    <i class="fas fa-edit mr-1"></i>Modifier
                </button>
                <button onclick="suppQuizVip(${q.id})" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors text-xs">
                    <i class="fas fa-trash mr-1"></i>Supprimer
                </button>
            </td>
        `;
        table.appendChild(row);

        const card = document.createElement('div');
        card.className = 'border-b border-gray-200 p-4';
        card.innerHTML = `
            <div class="space-y-3">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-medium text-gray-900">${q.titre}</p>
                        <p class="text-sm text-gray-500">${q.participants} participants</p>
                    </div>
                    <span class="px-2 py-1 text-xs rounded-full ${q.statut === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                        ${q.statut}
                    </span>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-lg font-bold text-gray-900">${q.bonus} XOF</p>
                    <div class="flex space-x-2">
                        <button onclick="modQuizVip(${q.id})" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors text-xs">
                            <i class="fas fa-edit mr-1"></i>Modifier
                        </button>
                        <button onclick="suppQuizVip(${q.id})" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors text-xs">
                            <i class="fas fa-trash mr-1"></i>Supprimer
                        </button>
                    </div>
                </div>
            </div>
        `;
        mobile.appendChild(card);
    });
}

function affBenef(benef, montant) {
    const table = document.getElementById('tableBeneficiaires');
    const mobile = document.getElementById('beneficiairesMobile');
    const section = document.getElementById('beneficiairesSection');
    
    table.innerHTML = '';
    mobile.innerHTML = '';
    section.classList.remove('hidden');

    benef.forEach(b => {
        const valeur = document.getElementById('critere').value === 'nb_depot' ? b.nb_depot + ' dépôts' : b.somme_depot.toLocaleString() + ' XOF';
        
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${b.nom}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${b.email}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${b.tel}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span class="px-2 py-1 text-xs rounded-full ${b.type === 'vip' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}">
                    ${b.type.toUpperCase()}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${valeur}</td>
        `;
        table.appendChild(row);

        const card = document.createElement('div');
        card.className = 'border-b border-gray-200 p-4';
        card.innerHTML = `
            <div class="space-y-3">
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-medium text-gray-900">${b.nom}</p>
                        <p class="text-sm text-gray-500">${b.email}</p>
                        <p class="text-sm text-gray-500">${b.tel}</p>
                    </div>
                    <span class="px-2 py-1 text-xs rounded-full ${b.type === 'vip' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}">
                        ${b.type.toUpperCase()}
                    </span>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-sm font-medium text-gray-900">${valeur}</p>
                    <p class="text-lg font-bold text-green-600">${montant} XOF</p>
                </div>
            </div>
        `;
        mobile.appendChild(card);
    });
}

document.getElementById('formQuizStd').addEventListener('submit', function(e) {
    e.preventDefault();
    const titre = document.getElementById('titreQuizStd').value;
    const desc = document.getElementById('descQuizStd').value;
    const montant = document.getElementById('montantQuizStd').value;
    
    if (titre && desc && montant) {
        const newId = quizStd.length > 0 ? Math.max(...quizStd.map(q => q.id)) + 1 : 1;
        quizStd.push({
            id: newId,
            titre: titre,
            participants: 0,
            bonus: parseInt(montant),
            statut: 'Actif',
            date: new Date().toISOString().split('T')[0]
        });
        
        affQuizStd();
        this.reset();
        document.getElementById('montantQuizStd').value = '500';
        alert('Quiz Standard créé avec succès !');
    }
});

document.getElementById('formQuizVip').addEventListener('submit', function(e) {
    e.preventDefault();
    const titre = document.getElementById('titreQuizVip').value;
    const desc = document.getElementById('descQuizVip').value;
    const montant = document.getElementById('montantQuizVip').value;
    
    if (titre && desc && montant) {
        const newId = quizVip.length > 0 ? Math.max(...quizVip.map(q => q.id)) + 1 : 1;
        quizVip.push({
            id: newId,
            titre: titre,
            participants: 0,
            bonus: parseInt(montant),
            statut: 'Actif',
            date: new Date().toISOString().split('T')[0]
        });
        
        affQuizVip();
        this.reset();
        document.getElementById('montantQuizVip').value = '1000';
        alert('Quiz VIP créé avec succès !');
    }
});

document.getElementById('formMardiBonus').addEventListener('submit', function(e) {
    e.preventDefault();
    const typeClient = document.getElementById('typeClient').value;
    const critere = document.getElementById('critere').value;
    const nbBenef = parseInt(document.getElementById('nbBenef').value);
    const montant = parseInt(document.getElementById('montantMardiBonus').value);
    
    let clientsFiltres = clients.filter(c => c.type === typeClient);
    
    if (critere === 'nb_depot') {
        clientsFiltres.sort((a, b) => b.nb_depot - a.nb_depot);
    } else {
        clientsFiltres.sort((a, b) => b.somme_depot - a.somme_depot);
    }
    
    const beneficiaires = clientsFiltres.slice(0, nbBenef);
    
    affBenef(beneficiaires, montant);
});

document.getElementById('btnAttribuerBonus').addEventListener('click', function() {
    const montant = document.getElementById('montantMardiBonus').value;
    if (confirm(`Confirmer l'attribution du bonus de ${montant} XOF aux bénéficiaires sélectionnés ?`)) {
        alert('Bonus attribué avec succès aux bénéficiaires !');
        document.getElementById('beneficiairesSection').classList.add('hidden');
    }
});

function modQuizStd(id) {
    const quiz = quizStd.find(q => q.id === id);
    if (quiz) {
        const nouveauTitre = prompt('Nouveau titre:', quiz.titre);
        if (nouveauTitre) {
            quiz.titre = nouveauTitre;
            affQuizStd();
        }
    }
}

function suppQuizStd(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce quiz ?')) {
        quizStd = quizStd.filter(q => q.id !== id);
        affQuizStd();
    }
}

function modQuizVip(id) {
    const quiz = quizVip.find(q => q.id === id);
    if (quiz) {
        const nouveauTitre = prompt('Nouveau titre:', quiz.titre);
        if (nouveauTitre) {
            quiz.titre = nouveauTitre;
            affQuizVip();
        }
    }
}

function suppQuizVip(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce quiz VIP ?')) {
        quizVip = quizVip.filter(q => q.id !== id);
        affQuizVip();
    }
}

document.getElementById('btnDeco').addEventListener('click', function() {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});

affQuizStd();
affQuizVip();