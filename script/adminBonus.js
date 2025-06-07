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

let quiz = [
    { id: 1, titre: 'Quiz Football Ligue 1', participants: 45, bonus: 500, statut: 'Actif', date: '2025-06-06' },
    { id: 2, titre: 'Quiz Champions League', participants: 32, bonus: 500, statut: 'Actif', date: '2025-06-05' },
    { id: 3, titre: 'Quiz Premier League', participants: 28, bonus: 500, statut: 'Terminé', date: '2025-06-04' },
    { id: 4, titre: 'Quiz Coupe du Monde', participants: 67, bonus: 500, statut: 'Actif', date: '2025-06-03' },
    { id: 5, titre: 'Quiz Liga Espagnole', participants: 19, bonus: 500, statut: 'Actif', date: '2025-06-02' }
];

let membresVip = [
    { id: 1, nom: 'Koné Moussa', email: 'moussa@email.com', vip: 'Gold', dernierBonus: '2025-06-01', montant: 1000 },
    { id: 2, nom: 'Diabaté Fatou', email: 'fatou@email.com', vip: 'Platinum', dernierBonus: '2025-06-01', montant: 1000 },
    { id: 3, nom: 'Traoré Ibrahim', email: 'ibrahim@email.com', vip: 'Gold', dernierBonus: '2025-06-01', montant: 1000 },
    { id: 4, nom: 'Kouadio Aya', email: 'aya@email.com', vip: 'Diamond', dernierBonus: '2025-06-01', montant: 1000 }
];

function afficherQuiz() {
    const table = document.getElementById('tableQuiz');
    const mobile = document.getElementById('quizMobile');
    
    table.innerHTML = '';
    mobile.innerHTML = '';

    quiz.forEach(q => {
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
                <button onclick="modifierQuiz(${q.id})" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors text-xs">
                    <i class="fas fa-edit mr-1"></i>Modifier
                </button>
                <button onclick="supprimerQuiz(${q.id})" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors text-xs">
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
                        <button onclick="modifierQuiz(${q.id})" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors text-xs">
                            <i class="fas fa-edit mr-1"></i>Modifier
                        </button>
                        <button onclick="supprimerQuiz(${q.id})" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors text-xs">
                            <i class="fas fa-trash mr-1"></i>Supprimer
                        </button>
                    </div>
                </div>
            </div>
        `;
        mobile.appendChild(card);
    });
}

function afficherVip() {
    const table = document.getElementById('tableVip');
    const mobile = document.getElementById('vipMobile');
    
    table.innerHTML = '';
    mobile.innerHTML = '';

    membresVip.forEach(v => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${v.nom}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${v.email}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                    ${v.vip}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${v.dernierBonus}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                <button onclick="donnerBonus(${v.id})" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors text-xs">
                    <i class="fas fa-gift mr-1"></i>Bonus
                </button>
                <button onclick="retirerVip(${v.id})" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors text-xs">
                    <i class="fas fa-times mr-1"></i>Retirer VIP
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
                        <p class="font-medium text-gray-900">${v.nom}</p>
                        <p class="text-sm text-gray-500">${v.email}</p>
                    </div>
                    <span class="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                        ${v.vip}
                    </span>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-sm text-gray-600">Dernier bonus: ${v.dernierBonus}</p>
                    <div class="flex space-x-2">
                        <button onclick="donnerBonus(${v.id})" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors text-xs">
                            <i class="fas fa-gift mr-1"></i>Bonus
                        </button>
                        <button onclick="retirerVip(${v.id})" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors text-xs">
                            <i class="fas fa-times mr-1"></i>Retirer VIP
                        </button>
                    </div>
                </div>
            </div>
        `;
        mobile.appendChild(card);
    });
}

document.getElementById('formQuiz').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const titre = document.getElementById('titreQuiz').value;
    const desc = document.getElementById('descQuiz').value;
    const montant = document.getElementById('montantQuiz').value;
    
    if (titre && desc && montant) {
        const nouveauQuiz = {
            id: quiz.length + 1,
            titre: titre,
            participants: 0,
            bonus: parseInt(montant),
            statut: 'Actif',
            date: new Date().toISOString().split('T')[0]
        };
        
        quiz.unshift(nouveauQuiz);
        afficherQuiz();
        majCompteurs();
        
        document.getElementById('formQuiz').reset();
        document.getElementById('montantQuiz').value = 500;
        
        alert('Quiz créé avec succès!');
    }
});

function modifierQuiz(id) {
    const q = quiz.find(quiz => quiz.id === id);
    if (q) {
        const nouveauTitre = prompt('Nouveau titre:', q.titre);
        if (nouveauTitre) {
            q.titre = nouveauTitre;
            afficherQuiz();
            alert('Quiz modifié avec succès!');
        }
    }
}

function supprimerQuiz(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce quiz?')) {
        const index = quiz.findIndex(q => q.id === id);
        if (index !== -1) {
            quiz.splice(index, 1);
            afficherQuiz();
            majCompteurs();
            alert('Quiz supprimé!');
        }
    }
}

function donnerBonus(id) {
    const v = membresVip.find(membre => membre.id === id);
    if (v) {
        v.dernierBonus = new Date().toISOString().split('T')[0];
        afficherVip();
        alert(`Bonus de ${v.montant} XOF donné à ${v.nom}!`);
    }
}

function retirerVip(id) {
    if (confirm('Êtes-vous sûr de vouloir retirer le statut VIP?')) {
        const index = membresVip.findIndex(v => v.id === id);
        if (index !== -1) {
            membresVip.splice(index, 1);
            afficherVip();
            majCompteurs();
            alert('Statut VIP retiré!');
        }
    }
}

function majBonusVip() {
    const montant = document.getElementById('bonusVip').value;
    const date = document.getElementById('dateDistrib').value;
    
    if (montant && date) {
        membresVip.forEach(v => v.montant = parseInt(montant));
        alert('Bonus VIP mis à jour!');
    }
}

function distribuerBonus() {
    if (confirm('Distribuer les bonus VIP maintenant?')) {
        const aujourd = new Date().toISOString().split('T')[0];
        membresVip.forEach(v => v.dernierBonus = aujourd);
        afficherVip();
        alert(`Bonus distribués à ${membresVip.length} membres VIP!`);
    }
}

function majCompteurs() {
    document.getElementById('nbQuiz').textContent = quiz.filter(q => q.statut === 'Actif').length;
    document.getElementById('nbVip').textContent = membresVip.length;
    
    const totalBonus = quiz.reduce((sum, q) => sum + (q.participants * q.bonus), 0) + 
                     (membresVip.length * 1000);
    document.getElementById('totalBonus').textContent = totalBonus.toLocaleString();
}

function initDates() {
    const aujourd = new Date();
    const prochainMois = new Date(aujourd.getFullYear(), aujourd.getMonth() + 1, 1);
    document.getElementById('dateDistrib').value = prochainMois.toISOString().split('T')[0];
}

const deco = document.getElementById('deco');
deco.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});
afficherQuiz();
afficherVip();
majCompteurs();
initDates();