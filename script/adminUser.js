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

let liste = [
    { id: 1, nom: 'Jean Dupont', email: 'jean.dupont@email.com', tel: '+225 07 12 34 56 78', ville: 'Abidjan', naissance: '1990-05-15', inscription: '2024-01-15' },
    { id: 2, nom: 'Marie Martin', email: 'marie.martin@email.com', tel: '+225 05 23 45 67 89', ville: 'Bouaké', naissance: '1985-08-22', inscription: '2024-02-20' },
    { id: 3, nom: 'Pierre Durand', email: 'pierre.durand@email.com', tel: '+225 01 34 56 78 90', ville: 'Yamoussoukro', naissance: '1992-03-10', inscription: '2024-01-10' },
    { id: 4, nom: 'Sophie Leroy', email: 'sophie.leroy@email.com', tel: '+225 02 45 67 89 01', ville: 'San Pedro', naissance: '1988-12-05', inscription: '2024-03-05' },
    { id: 5, nom: 'Ahmed Kone', email: 'ahmed.kone@email.com', tel: '+225 03 56 78 90 12', ville: 'Korhogo', naissance: '1995-07-12', inscription: '2024-05-12' },
    { id: 6, nom: 'Fatou Traore', email: 'fatou.traore@email.com', tel: '+225 04 67 89 01 23', ville: 'Daloa', naissance: '1993-11-01', inscription: '2024-06-01' }
];

let filtres = [...liste];

function afficher() {
    const tableau = document.getElementById('tableau');
    const mobile = document.getElementById('mobile');
    
    tableau.innerHTML = '';
    mobile.innerHTML = '';

    filtres.forEach(u => {
        const ligne = document.createElement('tr');
        ligne.className = 'hover:bg-gray-50';
        ligne.innerHTML = `
            <td class="px-3 xl:px-6 py-4 whitespace-nowrap">
                <div class="text-xs xl:text-sm font-medium text-gray-900 truncate max-w-24 xl:max-w-none">${u.nom}</div>
            </td>
            <td class="px-3 xl:px-6 py-4 whitespace-nowrap">
                <div class="text-xs xl:text-sm text-gray-900 truncate max-w-32 xl:max-w-none" title="${u.email}">${u.email}</div>
            </td>
            <td class="px-3 xl:px-6 py-4 whitespace-nowrap">
                <div class="text-xs xl:text-sm text-gray-900">${u.tel}</div>
            </td>
            <td class="px-3 xl:px-6 py-4 whitespace-nowrap">
                <div class="text-xs xl:text-sm text-gray-900">${u.ville}</div>
            </td>
            <td class="px-3 xl:px-6 py-4 whitespace-nowrap">
                <div class="text-xs xl:text-sm text-gray-900">${u.naissance}</div>
            </td>
            <td class="px-3 xl:px-6 py-4 whitespace-nowrap">
                <div class="text-xs xl:text-sm text-gray-500">${u.inscription}</div>
            </td>
            <td class="px-3 xl:px-6 py-4 whitespace-nowrap">
                <div class="flex flex-col xl:flex-row gap-1 xl:gap-2">
                    <button onclick="editer(${u.id})" class="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors text-xs">
                        <i class="fas fa-edit mr-1"></i><span class="hidden xl:inline">Modifier</span>
                    </button>
                    <button onclick="supprimer(${u.id})" class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors text-xs">
                        <i class="fas fa-trash mr-1"></i><span class="hidden xl:inline">Supprimer</span>
                    </button>
                </div>
            </td>
        `;
        tableau.appendChild(ligne);

        const carte = document.createElement('div');
        carte.className = 'border-b border-gray-200 p-4';
        carte.innerHTML = `
            <div class="space-y-3">
                <div class="flex items-start space-x-3">
                    <div class="flex-1">
                        <p class="font-medium text-gray-900">${u.nom}</p>
                        <p class="text-sm text-gray-500">${u.email}</p>
                        <p class="text-sm text-gray-500">${u.tel}</p>
                        <p class="text-sm text-gray-500">${u.ville} - Né(e) le ${u.naissance}</p>
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-sm text-gray-500">Inscrit le ${u.inscription}</p>
                    <div class="flex space-x-2">
                        <button onclick="editer(${u.id})" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors text-xs">
                            <i class="fas fa-edit mr-1"></i>Modifier
                        </button>
                        <button onclick="supprimer(${u.id})" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors text-xs">
                            <i class="fas fa-trash mr-1"></i>Supprimer
                        </button>
                    </div>
                </div>
            </div>
        `;
        mobile.appendChild(carte);
    });
}

function compteur() {
    document.getElementById('total').textContent = liste.length;
    
    const maintenant = new Date();
    const debut = new Date(maintenant.getFullYear(), maintenant.getMonth(), 1);
    const nouveaux = liste.filter(u => new Date(u.inscription) >= debut).length;
    document.getElementById('nouveaux').textContent = nouveaux;
}

function filtrer() {
    const recherche = document.getElementById('recherche').value.toLowerCase();

    filtres = liste.filter(u => {
        return u.nom.toLowerCase().includes(recherche) || 
               u.email.toLowerCase().includes(recherche) || 
               u.tel.includes(recherche) ||
               u.ville.toLowerCase().includes(recherche);
    });

    afficher();
}

function modal(idUser = null) {
    const formulaire = document.getElementById('modalForm');
    const titre = document.getElementById('titre');
    const form = document.getElementById('form');
    
    form.reset();
    
    if (idUser) {
        const user = liste.find(u => u.id === idUser);
        if (user) {
            titre.textContent = 'Modifier Utilisateur';
            document.getElementById('id').value = user.id;
            document.getElementById('nom').value = user.nom;
            document.getElementById('email').value = user.email;
            document.getElementById('tel').value = user.tel;
            document.getElementById('ville').value = user.ville;
            document.getElementById('naissance').value = user.naissance;
        }
    } else {
        titre.textContent = 'Ajouter Utilisateur';
        document.getElementById('id').value = '';
    }
    
    formulaire.classList.remove('hidden');
}

function fermer() {
    document.getElementById('modalForm').classList.add('hidden');
}

function editer(idUser) {
    modal(idUser);
}

function supprimer(idUser) {
    if (confirm('Supprimer cet utilisateur ?')) {
        const index = liste.findIndex(u => u.id === idUser);
        if (index !== -1) {
            liste.splice(index, 1);
            filtrer();
            compteur();
            alert('Utilisateur supprimé !');
        }
    }
}

document.getElementById('ouvrir').addEventListener('click', () => {
    document.getElementById('menu').classList.remove('-translate-x-full');
    document.getElementById('overlay').classList.remove('hidden');
});

document.getElementById('fermerMenu').addEventListener('click', () => {
    document.getElementById('menu').classList.add('-translate-x-full');
    document.getElementById('overlay').classList.add('hidden');
});

document.getElementById('overlay').addEventListener('click', () => {
    document.getElementById('menu').classList.add('-translate-x-full');
    document.getElementById('overlay').classList.add('hidden');
});

document.getElementById('recherche').addEventListener('input', filtrer);

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const idUser = document.getElementById('id').value;
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const tel = document.getElementById('tel').value;
    const ville = document.getElementById('ville').value;
    const naissance = document.getElementById('naissance').value;
    
    if (idUser) {
        const index = liste.findIndex(u => u.id == idUser);
        if (index !== -1) {
            liste[index] = { ...liste[index], nom, email, tel, ville, naissance };
            alert('Utilisateur modifié !');
        }
    } else {
        const nouveauId = Math.max(...liste.map(u => u.id)) + 1;
        const inscription = new Date().toISOString().split('T')[0];
        liste.push({ id: nouveauId, nom, email, tel, ville, naissance, inscription });
        alert('Utilisateur ajouté !');
    }
    
    filtrer();
    compteur();
    fermer();
});

const deco = document.getElementById('deco');
deco.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});

afficher();
compteur();