const btnOuvrir = document.getElementById('btnOuvrir');
const btnFermer = document.getElementById('btnFermer');
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');
const tableauVip = document.getElementById('tableauVip');
const cartesMobile = document.getElementById('cartesMobile');
const recherche = document.getElementById('recherche');
const filtre = document.getElementById('filtre');

const usersVip = [
    {
        nom: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        tel: '0123456789',
        ville: 'Paris',
        naissance: '15/03/1985',
        inscription: '12/01/2024',
        statut: 'actif'
    },
    {
        nom: 'Thomas Moreau',
        email: 'thomas.moreau@email.com',
        tel: '0567890123',
        ville: 'Nice',
        naissance: '18/09/1987',
        inscription: '22/01/2024',
        statut: 'actif'
    },
    {
        nom: 'Emma Petit',
        email: 'emma.petit@email.com',
        tel: '0678901234',
        ville: 'Nantes',
        naissance: '03/11/1991',
        inscription: '08/04/2024',
        statut: 'actif'
    },
    {
        nom: 'Julien Roux',
        email: 'julien.roux@email.com',
        tel: '0789012345',
        ville: 'Bordeaux',
        naissance: '25/06/1989',
        inscription: '17/02/2024',
        statut: 'expire'
    },
    {
        nom: 'Camille Blanc',
        email: 'camille.blanc@email.com',
        tel: '0890123456',
        ville: 'Strasbourg',
        naissance: '12/01/1993',
        inscription: '30/03/2024',
        statut: 'actif'
    }
];

function afficherUsers(users = usersVip) {
    tableauVip.innerHTML = '';
    
    cartesMobile.innerHTML = '';
    
    users.forEach((user, index) => {
        const couleurStatut = user.statut === 'actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
        const iconeStatut = user.statut === 'actif' ? 'fas fa-check-circle' : 'fas fa-times-circle';
        const texteStatut = user.statut === 'actif' ? 'Actif' : 'Expiré';
        
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50 transition-colors';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-3 shadow-sm">
                        <i class="fas fa-crown text-white text-sm"></i>
                    </div>
                    <div>
                        <div class="text-sm font-semibold text-gray-900">${user.nom}</div>
                        <div class="text-xs text-gray-500 uppercase tracking-wide">Premium</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${user.email}</div>
                <div class="text-sm text-gray-500">${user.tel}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${user.ville}</div>
                <div class="text-sm text-gray-500">${user.naissance}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.inscription}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-3">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${couleurStatut}">
                        <i class="${iconeStatut} mr-1"></i>
                        ${texteStatut}
                    </span>
                    <select onchange="changerStatut(${index}, this.value)" class="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500">
                        <option value="actif" ${user.statut === 'actif' ? 'selected' : ''}>Actif</option>
                        <option value="expire" ${user.statut === 'expire' ? 'selected' : ''}>Expiré</option>
                    </select>
                </div>
            </td>
        `;
        tableauVip.appendChild(row);

        const carte = document.createElement('div');
        carte.className = 'p-4 bg-white hover:bg-gray-50 transition-colors';
        carte.innerHTML = `
            <div class="flex items-start justify-between mb-3">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-3 shadow-sm">
                        <i class="fas fa-crown text-white text-sm"></i>
                    </div>
                    <div>
                        <div class="text-sm font-semibold text-gray-900">${user.nom}</div>
                        <div class="text-xs text-gray-500 uppercase tracking-wide">Premium</div>
                    </div>
                </div>
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${couleurStatut}">
                    <i class="${iconeStatut} mr-1"></i>
                    ${texteStatut}
                </span>
            </div>
            
            <div class="grid grid-cols-2 gap-3 text-xs mb-3">
                <div>
                    <span class="text-gray-500">Email:</span>
                    <div class="text-gray-900 truncate">${user.email}</div>
                </div>
                <div>
                    <span class="text-gray-500">Téléphone:</span>
                    <div class="text-gray-900">${user.tel}</div>
                </div>
                <div>
                    <span class="text-gray-500">Ville:</span>
                    <div class="text-gray-900">${user.ville}</div>
                </div>
                <div>
                    <span class="text-gray-500">Naissance:</span>
                    <div class="text-gray-900">${user.naissance}</div>
                </div>
            </div>
            
            <div class="flex items-center justify-between pt-2 border-t border-gray-100">
                <div class="text-xs">
                    <span class="text-gray-500">Inscription:</span>
                    <span class="text-gray-900">${user.inscription}</span>
                </div>
                <select onchange="changerStatut(${index}, this.value)" class="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500">
                    <option value="actif" ${user.statut === 'actif' ? 'selected' : ''}>Actif</option>
                    <option value="expire" ${user.statut === 'expire' ? 'selected' : ''}>Expiré</option>
                </select>
            </div>
        `;
        cartesMobile.appendChild(carte);
    });
}

function changerStatut(index, nouveauStatut) {
    usersVip[index].statut = nouveauStatut;
    afficherUsers(filtrer());
}

function filtrer() {
    const rech = recherche.value.toLowerCase();
    const stat = filtre.value;
    
    return usersVip.filter(user => {
        const matchRech = user.nom.toLowerCase().includes(rech) || 
                         user.email.toLowerCase().includes(rech) ||
                         user.ville.toLowerCase().includes(rech);
        const matchStat = !stat || user.statut === stat;
        
        return matchRech && matchStat;
    });
}

btnOuvrir.addEventListener('click', () => {
    menu.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});

btnFermer.addEventListener('click', () => {
    menu.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

overlay.addEventListener('click', () => {
    menu.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

recherche.addEventListener('input', () => {
    afficherUsers(filtrer());
});

filtre.addEventListener('change', () => {
    afficherUsers(filtrer());
});

const btnDeco = document.getElementById('btnDeco');
btnDeco.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});

afficherUsers();

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        menu.classList.remove('-translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    } else {
        menu.classList.add('-translate-x-full');
    }
});