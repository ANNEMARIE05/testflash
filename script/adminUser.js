        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'bleu-principal': '#1e40af',
                        'bleu-fonce': '#1e3a8a'
                    }
                }
            }
        }

        let users = [
            { id: 1, nom: 'Jean Dupont', email: 'jean.dupont@email.com', tel: '+2250712345678', ville: 'Abidjan', naissance: '1990-05-15', inscription: '2025-06-09' },
            { id: 2, nom: 'Marie Martin', email: 'marie.martin@email.com', tel: '+2250523456789', ville: 'Bouaké', naissance: '1985-08-22', inscription: '2025-06-09' },
            { id: 3, nom: 'Pierre Durand', email: 'pierre.durand@email.com', tel: '+2250134567890', ville: 'Yamoussoukro', naissance: '1992-03-10', inscription: '2025-06-08' },
            { id: 4, nom: 'Sophie Leroy', email: 'sophie.leroy@email.com', tel: '+2250245678901', ville: 'San-Pédro', naissance: '1988-12-05', inscription: '2025-06-08' },
            { id: 5, nom: 'Ahmed Koné', email: 'ahmed.kone@email.com', tel: '+2250356789012', ville: 'Korhogo', naissance: '1995-07-12', inscription: '2025-06-07' },
            { id: 6, nom: 'Fatou Traoré', email: 'fatou.traore@email.com', tel: '+2250467890123', ville: 'Daloa', naissance: '1993-11-01', inscription: '2025-05-20' },
            { id: 7, nom: 'Yves Kouassi', email: 'yves.kouassi@email.com', tel: '+2250578901234', ville: 'Abidjan', naissance: '1987-09-18', inscription: '2025-05-15' },
            { id: 8, nom: 'Aïcha Ouattara', email: 'aicha.ouattara@email.com', tel: '+2250689012345', ville: 'Bouaké', naissance: '1991-06-30', inscription: '2025-05-10' },
            { id: 9, nom: 'Laurent Koffi', email: 'laurent.koffi@email.com', tel: '+2250790123456', ville: 'Man', naissance: '1989-04-25', inscription: '2025-04-28' },
            { id: 10, nom: 'Binta Diarra', email: 'binta.diarra@email.com', tel: '+2250801234567', ville: 'Gagnoa', naissance: '1994-02-14', inscription: '2025-04-15' },
            { id: 11, nom: 'Pascal Gbagbo', email: 'pascal.gbagbo@email.com', tel: '+2250912345678', ville: 'Abengourou', naissance: '1986-12-03', inscription: '2025-04-01' },
            { id: 12, nom: 'Ramatou Bamba', email: 'ramatou.bamba@email.com', tel: '+2250123456789', ville: 'Divo', naissance: '1992-08-19', inscription: '2025-03-22' },
            { id: 13, nom: 'Christian Attiéké', email: 'christian.attieke@email.com', tel: '+2250234567890', ville: 'Grand-Bassam', naissance: '1990-01-07', inscription: '2025-03-08' },
            { id: 14, nom: 'Mariame Fofana', email: 'mariame.fofana@email.com', tel: '+2250345678901', ville: 'Bondoukou', naissance: '1993-10-11', inscription: '2025-02-14' },
            { id: 15, nom: 'Serge Yapo', email: 'serge.yapo@email.com', tel: '+2250456789012', ville: 'Sassandra', naissance: '1988-07-23', inscription: '2025-01-30' }
        ];

        let usersFiltres = [...users];

        function obtenirDatesPeriode(periode) {
            const maintenant = new Date();
            const aujourd = new Date(maintenant.getFullYear(), maintenant.getMonth(), maintenant.getDate());
            
            switch(periode) {
                case 'aujourdhui':
                    return { 
                        debut: new Date(aujourd.getTime()), 
                        fin: new Date(aujourd.getTime() + 24 * 60 * 60 * 1000 - 1) 
                    };
                case 'hier':
                    const hier = new Date(aujourd.getTime() - 24 * 60 * 60 * 1000);
                    return { 
                        debut: hier, 
                        fin: new Date(hier.getTime() + 24 * 60 * 60 * 1000 - 1) 
                    };
                case 'moisActuel':
                    return { 
                        debut: new Date(maintenant.getFullYear(), maintenant.getMonth(), 1),
                        fin: new Date(maintenant.getFullYear(), maintenant.getMonth() + 1, 0, 23, 59, 59)
                    };
                case 'moisDernier':
                    return { 
                        debut: new Date(maintenant.getFullYear(), maintenant.getMonth() - 1, 1),
                        fin: new Date(maintenant.getFullYear(), maintenant.getMonth(), 0, 23, 59, 59)
                    };
                default:
                    return null;
            }
        }

        function compterParPeriode(periode) {
            const dates = obtenirDatesPeriode(periode);
            if (!dates) return users.length;
            
            return users.filter(u => {
                const dateInscr = new Date(u.inscription);
                return dateInscr >= dates.debut && dateInscr <= dates.fin;
            }).length;
        }

        function mettreAJourCartes() {
            document.getElementById('nbTotal').textContent = users.length;
            document.getElementById('nbAujourdhui').textContent = compterParPeriode('aujourdhui');
            document.getElementById('nbHier').textContent = compterParPeriode('hier');
            document.getElementById('nbMoisActuel').textContent = compterParPeriode('moisActuel');
            document.getElementById('nbAffiche').textContent = usersFiltres.length;
        }

        function afficherUsers() {
            const tab = document.getElementById('tabUsers');
            const mob = document.getElementById('mobUsers');
            const aucunResultat = document.getElementById('aucunResultat');
            
            tab.innerHTML = '';
            mob.innerHTML = '';

            if (usersFiltres.length === 0) {
                aucunResultat.classList.remove('hidden');
                return;
            } else {
                aucunResultat.classList.add('hidden');
            }

            usersFiltres.forEach(u => {
                const ligne = document.createElement('tr');
                ligne.className = 'hover:bg-gray-50 transition-colors';
                ligne.innerHTML = `
                    <td class="px-3 xl:px-6 py-4 whitespace-nowrap">
                        <div class="text-xs xl:text-sm font-medium text-gray-900">${u.nom}</div>
                    </td>
                    <td class="px-3 xl:px-6 py-4 whitespace-nowrap">
                        <div class="text-xs xl:text-sm text-gray-900" title="${u.email}">${u.email}</div>
                    </td>
                    <td class="px-3 xl:px-6 py-4 whitespace-nowrap">
                        <div class="text-xs xl:text-sm text-gray-900">${u.tel}</div>
                    </td>
                    <td class="px-3 xl:px-6 py-4 whitespace-nowrap">
                        <div class="text-xs xl:text-sm text-gray-900">${u.ville}</div>
                    </td>
                    <td class="px-3 xl:px-6 py-4 whitespace-nowrap">
                        <div class="text-xs xl:text-sm text-gray-900">${new Date(u.naissance).toLocaleDateString('fr-FR')}</div>
                    </td>
                    <td class="px-3 xl:px-6 py-4 whitespace-nowrap">
                        <div class="text-xs xl:text-sm text-gray-500">${new Date(u.inscription).toLocaleDateString('fr-FR')}</div>
                    </td>
                    <td class="px-3 xl:px-6 py-4 whitespace-nowrap">
                        <div class="flex flex-col xl:flex-row gap-1 xl:gap-2">
                            <button onclick="modifierUser(${u.id})" class="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors text-xs">
                                <i class="fas fa-edit mr-1"></i><span class="hidden xl:inline">Modifier</span>
                            </button>
                            <button onclick="supprimerUser(${u.id})" class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors text-xs">
                                <i class="fas fa-trash mr-1"></i><span class="hidden xl:inline">Supprimer</span>
                            </button>
                        </div>
                    </td>
                `;
                tab.appendChild(ligne);

                const carte = document.createElement('div');
                carte.className = 'border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors';
                carte.innerHTML = `
                    <div class="space-y-3">
                        <div class="flex items-start space-x-3">
                            <div class="flex-1">
                                <p class="font-medium text-gray-900">${u.nom}</p>
                                <p class="text-sm text-gray-600">${u.email}</p>
                                <p class="text-sm text-gray-600">${u.tel}</p>
                                <p class="text-sm text-gray-600">${u.ville} - Né(e) le ${new Date(u.naissance).toLocaleDateString('fr-FR')}</p>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <p class="text-sm text-gray-500">Inscrit le ${new Date(u.inscription).toLocaleDateString('fr-FR')}</p>
                            <div class="flex space-x-2">
                                <button onclick="modifierUser(${u.id})" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors text-xs">
                                    <i class="fas fa-edit mr-1"></i>Modifier
                                </button>
                                <button onclick="supprimerUser(${u.id})" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors text-xs">
                                    <i class="fas fa-trash mr-1"></i>Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                mob.appendChild(carte);
            });
        }

        function filtrerUsers() {
            const recherche = document.getElementById('inputRecherche').value.toLowerCase().trim();
            const periode = document.getElementById('filtrePeriode').value;

            usersFiltres = users.filter(u => {
                const correspondRecherche = recherche === '' ||
                    u.nom.toLowerCase().includes(recherche) || 
                    u.email.toLowerCase().includes(recherche) || 
                    u.tel.includes(recherche) ||
                    u.ville.toLowerCase().includes(recherche);

                if (periode === 'tous') {
                    return correspondRecherche;
                }

                const dates = obtenirDatesPeriode(periode);
                if (!dates) return correspondRecherche;

                const dateInscr = new Date(u.inscription);
                return correspondRecherche && dateInscr >= dates.debut && dateInscr <= dates.fin;
            });

            afficherUsers();
            mettreAJourCartes();
        }

        function ouvrirModal(idUser = null) {
            const modal = document.getElementById('modalUser');
            const titre = document.getElementById('titreModal');
            const form = document.getElementById('formUser');
            
            form.reset();
            
            if (idUser) {
                const user = users.find(u => u.id === idUser);
                if (user) {
                    titre.textContent = 'Modifier Utilisateur';
                    document.getElementById('idUser').value = user.id;
                    document.getElementById('nomUser').value = user.nom;
                    document.getElementById('emailUser').value = user.email;
                    document.getElementById('telUser').value = user.tel;
                    document.getElementById('villeUser').value = user.ville;
                    document.getElementById('naissanceUser').value = user.naissance;
                    document.getElementById('mdpUser').value = '';
                }
            } else {
                titre.textContent = 'Ajouter Utilisateur';
                document.getElementById('idUser').value = '';
            }
            
            modal.classList.remove('hidden');
        }

        function fermerModal() {
            document.getElementById('modalUser').classList.add('hidden');
        }

        function modifierUser(id) {
            ouvrirModal(id);
        }

        function supprimerUser(id) {
            if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
                users = users.filter(u => u.id !== id);
                filtrerUsers();
            }
        }

        function genererNouvelId() {
            return Math.max(...users.map(u => u.id)) + 1;
        }

        document.getElementById('formUser').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const idUser = document.getElementById('idUser').value;
            const nom = document.getElementById('nomUser').value.trim();
            const email = document.getElementById('emailUser').value.trim();
            const tel = document.getElementById('telUser').value.trim();
            const ville = document.getElementById('villeUser').value.trim();
            const naissance = document.getElementById('naissanceUser').value;
            const mdp = document.getElementById('mdpUser').value;

            if (!nom || !email || !tel || !ville || !naissance) {
                alert('Veuillez remplir tous les champs obligatoires');
                return;
            }

            const emailExiste = users.some(u => u.email === email && u.id != idUser);
            if (emailExiste) {
                alert('Cet email est déjà utilisé par un autre utilisateur');
                return;
            }

            if (idUser) {
                const index = users.findIndex(u => u.id == idUser);
                if (index !== -1) {
                    users[index] = {
                        ...users[index],
                        nom: nom,
                        email: email,
                        tel: tel,
                        ville: ville,
                        naissance: naissance
                    };
                }
            } else {
                const nouvelUser = {
                    id: genererNouvelId(),
                    nom: nom,
                    email: email,
                    tel: tel,
                    ville: ville,
                    naissance: naissance,
                    inscription: new Date().toISOString().split('T')[0]
                };
                users.push(nouvelUser);
            }

            filtrerUsers();
            fermerModal();
        });

        document.getElementById('btnOuvrir').addEventListener('click', function() {
            document.getElementById('menu').classList.remove('-translate-x-full');
            document.getElementById('overlay').classList.remove('hidden');
        });

        document.getElementById('btnFermer').addEventListener('click', function() {
            document.getElementById('menu').classList.add('-translate-x-full');
            document.getElementById('overlay').classList.add('hidden');
        });

        document.getElementById('overlay').addEventListener('click', function() {
            document.getElementById('menu').classList.add('-translate-x-full');
            document.getElementById('overlay').classList.add('hidden');
        });

        document.getElementById('btnDeco').addEventListener('click', function() {
            if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
                window.location.href = '/auth/login.html';
            }
        });

        document.getElementById('inputRecherche').addEventListener('input', filtrerUsers);
        document.getElementById('filtrePeriode').addEventListener('change', filtrerUsers);

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                fermerModal();
            }
        });

        document.getElementById('modalUser').addEventListener('click', function(e) {
            if (e.target === this) {
                fermerModal();
            }
        });

        document.addEventListener('DOMContentLoaded', function() {
            filtrerUsers();
        });

        document.querySelector('#modalUser .bg-white').addEventListener('click', function(e) {
            e.stopPropagation();
        });