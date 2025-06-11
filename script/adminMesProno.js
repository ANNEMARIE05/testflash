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

        let pronostics = [
            { 
                id: 1, 
                eq1: 'PSG', 
                eq2: 'Lyon', 
                logoEq1: 'https://logos-world.net/wp-content/uploads/2020/07/PSG-Logo.png',
                logoEq2: 'https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo-700x394.png',
                competition: 'Ligue 1',
                prono: '1', 
                cote: 1.85, 
                date: '2025-06-10', 
                statut: 'en_cours' 
            },
            { 
                id: 2, 
                eq1: 'Marseille', 
                eq2: 'Monaco', 
                logoEq1: 'https://logos-world.net/wp-content/uploads/2020/07/PSG-Logo.png',
                logoEq2: 'https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo-700x394.png',
                competition: 'Ligue 1',
                prono: 'Plus de 2.5 buts', 
                cote: 2.10, 
                date: '2025-06-08', 
                statut: 'gagne' 
            },
            { 
                id: 3, 
                eq1: 'Lille', 
                eq2: 'Nice', 
                logoEq1: 'https://logos-world.net/wp-content/uploads/2020/07/PSG-Logo.png',
                logoEq2: 'https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo-700x394.png',
                competition: 'Ligue 1',
                prono: 'X', 
                cote: 3.20, 
                date: '2025-06-07', 
                statut: 'perdu' 
            },
            { 
                id: 4, 
                eq1: 'Rennes', 
                eq2: 'Nantes', 
                logoEq1: 'https://logos-world.net/wp-content/uploads/2020/07/PSG-Logo.png',
                logoEq2: 'https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo-700x394.png',
                competition: 'Ligue 1',
                prono: '2', 
                cote: 2.45, 
                date: '2025-06-12', 
                statut: 'en_cours' 
            },
            { 
                id: 5, 
                eq1: 'Bordeaux', 
                eq2: 'Strasbourg', 
                logoEq1: 'https://logos-world.net/wp-content/uploads/2020/07/PSG-Logo.png',
                logoEq2: 'https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo-700x394.png',
                competition: 'Ligue 1',
                prono: 'Moins de 2.5 buts', 
                cote: 1.75, 
                date: '2025-06-06', 
                statut: 'gagne' 
            }
        ];

        let idCompteur = 6;

        function getBadgeStatut(statut) {
            switch(statut) {
                case 'gagne': return 'bg-green-100 text-green-800';
                case 'perdu': return 'bg-red-100 text-red-800';
                default: return 'bg-yellow-100 text-yellow-800';
            }
        }

        function getTexteStatut(statut) {
            switch(statut) {
                case 'gagne': return 'Gagné';
                case 'perdu': return 'Perdu';
                default: return 'En cours';
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
                    <td class="px-4 py-3 whitespace-nowrap">
                        <div class="flex items-center space-x-2">
                            <img src="${p.logoEq1}" alt="${p.eq1}" class="w-6 h-6 object-contain">
                            <span class="text-sm text-gray-900">${p.eq1}</span>
                            <span class="text-gray-500 text-xs">vs</span>
                            <img src="${p.logoEq2}" alt="${p.eq2}" class="w-6 h-6 object-contain">
                            <span class="text-sm text-gray-900">${p.eq2}</span>
                        </div>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">${p.competition}</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">${p.prono}</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-semibold">${p.cote}</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">${p.date}</td>
                    <td class="px-4 py-3 whitespace-nowrap">
                        <span class="px-2 py-1 text-xs rounded-full ${getBadgeStatut(p.statut)}">
                            ${getTexteStatut(p.statut)}
                        </span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm space-x-1">
                        <button onclick="modifierProno(${p.id})" class="bg-bleu text-white px-2 py-1 rounded hover:bg-bleu-fonce transition-colors text-xs">
                            <i class="fas fa-edit mr-1"></i>Modifier
                        </button>
                        <button onclick="supprimerProno(${p.id})" class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors text-xs">
                            <i class="fas fa-trash mr-1"></i>Suppr
                        </button>
                    </td>
                `;
                tab.appendChild(row);

                const card = document.createElement('div');
                card.className = 'border-b border-gray-200 p-3';
                card.innerHTML = `
                    <div class="space-y-3">
                        <div class="flex justify-between items-start">
                            <div class="flex-1">
                                <div class="flex items-center space-x-2 mb-1">
                                    <img src="${p.logoEq1}" alt="${p.eq1}" class="w-6 h-6 object-contain">
                                    <span class="text-sm font-medium text-gray-900">${p.eq1}</span>
                                    <span class="text-gray-500 text-xs">vs</span>
                                    <img src="${p.logoEq2}" alt="${p.eq2}" class="w-6 h-6 object-contain">
                                    <span class="text-sm font-medium text-gray-900">${p.eq2}</span>
                                </div>
                                <p class="text-xs text-gray-500">${p.competition} - ${p.date}</p>
                            </div>
                            <span class="px-2 py-1 text-xs rounded-full ${getBadgeStatut(p.statut)}">
                                ${getTexteStatut(p.statut)}
                            </span>
                        </div>
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="text-xs text-gray-600">Prono: <span class="font-medium">${p.prono}</span></p>
                                <p class="text-xs text-gray-600">Cote: <span class="font-bold text-bleu">${p.cote}</span></p>
                            </div>
                            <div class="flex space-x-1">
                                <button onclick="modifierProno(${p.id})" class="bg-bleu text-white px-2 py-1 rounded hover:bg-bleu-fonce transition-colors text-xs">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button onclick="supprimerProno(${p.id})" class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors text-xs">
                                    <i class="fas fa-trash"></i>
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

        function modifierProno(id) {
            const p = pronostics.find(prono => prono.id === id);
            if (p) {
                document.getElementById('titreModal').textContent = 'Modifier Pronostic';
                document.getElementById('pronoId').value = p.id;
                document.getElementById('eq1').value = p.eq1;
                document.getElementById('eq2').value = p.eq2;
                document.getElementById('competition').value = p.competition;
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

        function convertirFichierEnBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }

        document.getElementById('formProno').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const id = document.getElementById('pronoId').value;
            const eq1 = document.getElementById('eq1').value;
            const eq2 = document.getElementById('eq2').value;
            const competition = document.getElementById('competition').value;
            const prono = document.getElementById('prono').value;
            const cote = parseFloat(document.getElementById('cote').value);
            const date = document.getElementById('dateMatch').value;
            const statut = document.getElementById('statut').value;

            let logoEq1 = 'https://logos-world.net/wp-content/uploads/2020/07/PSG-Logo.png';
            let logoEq2 = 'https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo-700x394.png';

            const fichierLogoEq1 = document.getElementById('logoEq1').files[0];
            const fichierLogoEq2 = document.getElementById('logoEq2').files[0];

            if (fichierLogoEq1) {
                logoEq1 = await convertirFichierEnBase64(fichierLogoEq1);
            }
            if (fichierLogoEq2) {
                logoEq2 = await convertirFichierEnBase64(fichierLogoEq2);
            }

            if (id) {
                const index = pronostics.findIndex(p => p.id == id);
                if (index !== -1) {
                    const pronoExistant = pronostics[index];
                    pronostics[index] = { 
                        id: parseInt(id), 
                        eq1, 
                        eq2, 
                        logoEq1: fichierLogoEq1 ? logoEq1 : pronoExistant.logoEq1,
                        logoEq2: fichierLogoEq2 ? logoEq2 : pronoExistant.logoEq2,
                        competition,
                        prono, 
                        cote, 
                        date, 
                        statut 
                    };
                    alert('Pronostic modifié avec succès!');
                }
            } else {
                const nouveauProno = { 
                    id: idCompteur++, 
                    eq1, 
                    eq2, 
                    logoEq1,
                    logoEq2,
                    competition,
                    prono, 
                    cote, 
                    date, 
                    statut 
                };
                pronostics.push(nouveauProno);
                alert('Pronostic ajouté avec succès!');
            }

            fermerModal();
            afficherPronostics();
            majCompteurs();
        });

        document.getElementById('filtreStatut').addEventListener('change', afficherPronostics);

        const btnDeco = document.getElementById('btnDeco');
        btnDeco.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
                window.location.href = '/auth/login.html';
            }
        });

        afficherPronostics();
        majCompteurs();