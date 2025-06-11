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
        { titre: 'Solde Bonus', valeur: '2,450.00 XOF', couleur: 'jauneAcc', icone: 'fas fa-wallet' },
        { titre: 'Pronostics Réussis', valeur: '92%', couleur: 'green-400', icone: 'fas fa-chart-line' },
        { titre: 'Bonus Récoltés', valeur: '15,750.00 XOF', couleur: 'bleuDash', icone: 'fas fa-gift' }
    ],
    filtres: [
        { nom: 'Tous', valeur: 'tous', actif: true },
        { nom: 'Aujourd\'hui', valeur: 'encours', actif: false },
        { nom: 'Gagnés', valeur: 'gagne', actif: false }
    ],
    pronostics: [
        {
            ligue: 'La Liga',
            etat: 'encours',
            equipe1: { nom: 'Real Madrid', logo: '/assets/img/Real-Madrid-Logo.png' },
            equipe2: { nom: 'Barcelone', logo: '/assets/img/Barcelona-Logo.png' },
            heure: '20:30',
            pari: '1X2 - Real Madrid',
            cote: '1.95',
            confiance: '85%',
            date: 'Aujourd\'hui'
        },
        {
            ligue: 'Premier League',
            etat: 'encours',
            equipe1: { nom: 'Man City', logo: '/assets/img/Manchester-City-Logo.png' },
            equipe2: { nom: 'Chelsea', logo: '/assets/img/Chelsea-Logo.png' },
            heure: '16:00',
            pari: 'BTTS - Oui',
            cote: '1.75',
            confiance: '75%',
            date: 'Aujourd\'hui'
        },
        {
            ligue: 'Ligue 1',
            etat: 'gagne',
            equipe1: { nom: 'PSG', logo: '/assets/img/PSG-Logo.png' },
            equipe2: { nom: 'Rennes', logo: '/assets/img/Chelsea-Logo.png' },
            score: '3-0',
            pari: 'Plus de 2.5 Buts',
            cote: '1.65',
            confiance: '92%',
            date: 'Hier'
        },
        {
            ligue: 'Serie A',
            etat: 'perdu',
            equipe1: { nom: 'Juventus', logo: '/assets/img/Chelsea-Logo.png' },
            equipe2: { nom: 'AC Milan', logo: '/assets/img/Chelsea-Logo.png' },
            score: '1-2',
            pari: '1X2 - Juventus',
            cote: '1.80',
            perte: '-2,000 XOF',
            date: 'Hier'
        }
    ]
};

const menu = document.getElementById('menu');
const fondMenu = document.getElementById('fondMenu');
const btnOuvrir = document.getElementById('btnOuvrir');
const btnFermer = document.getElementById('btnFermer');
const btnDeco = document.getElementById('btnDeco');
const statsContainer = document.getElementById('statsContainer');
const filtresCont = document.getElementById('filtresCont');
const contPron = document.getElementById('contPron');

function genererStats() {
    statsContainer.innerHTML = donnees.stats.map(stat => `
        <div class="cardStat rounded-xl lg:rounded-2xl p-4 lg:p-6 relative overflow-hidden bg-gray-800 backdrop-filter backdrop-blur-xl border border-white/10">
            <div class="relative flex items-center justify-between">
                <div>
                    <p class="text-gray-400 text-xs lg:text-sm font-medium">${stat.titre}</p>
                    <p class="text-lg sm:text-xl lg:text-3xl font-bold text-${stat.couleur}">${stat.valeur}</p>
                </div>
                <div class="icAnim">
                    <i class="${stat.icone} text-${stat.couleur} text-xl lg:text-3xl"></i>
                </div>
            </div>
        </div>
    `).join('');
}

function genererFiltres() {
    filtresCont.innerHTML = donnees.filtres.map(filtre => `
        <button class="filtrBtn ${filtre.actif ? 'actif' : ''} px-3 py-1 rounded-lg text-xs font-medium bg-gray-700 text-white" data-filtre="${filtre.valeur}">
            ${filtre.nom}
        </button>
    `).join('');
}

function genererPronostics() {
    contPron.innerHTML = donnees.pronostics.map(pron => {
        const classeEtat = pron.etat === 'gagne' ? 'carteGagne' : pron.etat === 'perdu' ? 'cartePerdu' : 'carteAujourdhui';
        const badgeEtat = pron.etat === 'gagne' ? 
            `<span class="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-medium"><i class="fas fa-check mr-1"></i>Gagné</span>` :
            pron.etat === 'perdu' ?
            `<span class="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full font-medium"><i class="fas fa-times mr-1"></i>Perdu</span>` :
            `<span class="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">${pron.date}</span>`;
        
        const scoreOuHeure = pron.score ? `<div class="text-${pron.etat === 'gagne' ? 'green' : 'red'}-400 font-bold text-sm">${pron.score}</div>` : 
                              `<div class="text-yellow-400 font-bold text-sm">${pron.heure}</div>`;
        
        const bgGradient = pron.etat === 'gagne' ? 'from-green-600/30 to-teal-600/30' : 
                          pron.etat === 'perdu' ? 'from-red-600/30 to-rose-600/30' : 
                          'from-cyan-600/30 to-blue-600/30';
        
        const texteCote = pron.etat === 'gagne' ? 'green-300' : 
                         pron.etat === 'perdu' ? 'red-300' : 'blue-300';
        
        const infoConf = pron.etat === 'perdu' ? 
            `<span class="text-gray-400 text-xs lg:text-sm">Perte</span>
             <span class="text-red-400 font-bold text-sm lg:text-base">${pron.perte}</span>` :
            `<span class="text-gray-400 text-xs lg:text-sm">Confiance</span>
             <span class="text-${pron.etat === 'gagne' ? 'green' : 'yellow'}-400 font-bold text-sm lg:text-base">${pron.confiance}</span>`;

        return `
            <div class="cartePron ${classeEtat} rounded-xl p-4 lg:p-5 border carteSurv transition-all duration-400 backdrop-blur-xl" data-stat="${pron.etat}">
                <div class="flex justify-between items-center mb-3 lg:mb-4">
                    <span class="text-xs text-${pron.etat === 'gagne' ? 'blue' : pron.etat === 'perdu' ? 'red' : 'green'}-300 bg-${pron.etat === 'gagne' ? 'blue' : pron.etat === 'perdu' ? 'red' : 'green'}-800/50 px-2 py-1 rounded-full">${pron.ligue}</span>
                    <div class="flex items-center gap-2">
                        ${badgeEtat}
                        ${pron.etat !== 'encours' ? `<span class="text-xs bg-gray-500/20 text-gray-400 px-2 py-1 rounded-full">${pron.date}</span>` : ''}
                    </div>
                </div>
                
                <div class="flex items-center justify-between mb-3 lg:mb-4">
                    <div class="flex flex-col items-center">
                        <img src="${pron.equipe1.logo}" alt="${pron.equipe1.nom}" class="logoEq rounded-full mb-1 lg:mb-2">
                        <span class="text-white font-medium text-xs lg:text-sm text-center">${pron.equipe1.nom}</span>
                    </div>
                    <div class="text-center">
                        <div class="text-gray-400 text-sm lg:text-lg font-bold">VS</div>
                        ${scoreOuHeure}
                    </div>
                    <div class="flex flex-col items-center">
                        <img src="${pron.equipe2.logo}" alt="${pron.equipe2.nom}" class="logoEq rounded-full mb-1 lg:mb-2">
                        <span class="text-white font-medium text-xs lg:text-sm text-center">${pron.equipe2.nom}</span>
                    </div>
                </div>
                
                <div class="bg-gradient-to-r ${bgGradient} rounded-lg p-3 lg:p-4 mb-3 lg:mb-4 text-center border border-${pron.etat === 'gagne' ? 'blue' : pron.etat === 'perdu' ? 'red' : 'green'}-400/30">
                    <div class="text-white font-bold text-xs lg:text-sm mb-1">${pron.pari}</div>
                    <div class="text-lg lg:text-2xl font-black text-${texteCote}">${pron.cote}</div>
                </div>
                
                <div class="flex justify-between items-center">
                    ${infoConf}
                </div>
            </div>
        `;
    }).join('');
}

function initInterface() {
    genererStats();
    genererFiltres();
    genererPronostics();
    
    const filtresBtns = document.querySelectorAll('.filtrBtn');
    const cartesPron = document.querySelectorAll('.cartePron');

    filtresBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filtresBtns.forEach(b => b.classList.remove('actif'));
            btn.classList.add('actif');

            const filtre = btn.getAttribute('data-filtre');
            
            cartesPron.forEach(carte => {
                if (filtre === 'tous') {
                    carte.style.display = 'block';
                } else {
                    const statCarte = carte.getAttribute('data-stat');
                    carte.style.display = statCarte === filtre ? 'block' : 'none';
                }
            });
        });
    });
}

btnOuvrir.addEventListener('click', () => {
    menu.classList.add('ouvert');
    fondMenu.classList.remove('hidden');
    fondMenu.classList.add('masqSide', 'actif');
});

btnFermer.addEventListener('click', () => {
    menu.classList.remove('ouvert');
    fondMenu.classList.add('hidden');
    fondMenu.classList.remove('masqSide', 'actif');
});

fondMenu.addEventListener('click', () => {
    menu.classList.remove('ouvert');
    fondMenu.classList.add('hidden');
    fondMenu.classList.remove('masqSide', 'actif');
});

btnDeco.addEventListener('click', e => {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});

function aller(page) {
    window.location.href = page;
}

document.addEventListener('DOMContentLoaded', initInterface);

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        menu.classList.remove('ouvert');
        fondMenu.classList.add('hidden');
        fondMenu.classList.remove('masqSide', 'actif');
    }
});

window.addEventListener('load', () => {
    const cartesStat = document.querySelectorAll('.carteStat');
    cartesStat.forEach((carte, index) => {
        setTimeout(() => {
            carte.style.opacity = '0';
            carte.style.transform = 'translateY(20px)';
            carte.style.transition = 'all 0.6s ease-out';
            
            setTimeout(() => {
                carte.style.opacity = '1';
                carte.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
});

document.querySelectorAll('.cartePron').forEach(carte => {
    carte.addEventListener('mouseenter', () => {
        carte.style.transform = 'translateY(-8px) scale(1.02)';
        carte.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
    });
    
    carte.addEventListener('mouseleave', () => {
        carte.style.transform = 'translateY(0) scale(1)';
        carte.style.boxShadow = '';
    });
});

document.querySelectorAll('.icAnim').forEach(icon => {
    setInterval(() => {
        icon.style.transform = 'scale(1.1)';
        setTimeout(() => {
            icon.style.transform = 'scale(1)';
        }, 300);
    }, 3000);
});

document.querySelectorAll('.iconeFlottante').forEach(icone => {
    icone.style.animation = 'flottement 3s ease-in-out infinite';
});