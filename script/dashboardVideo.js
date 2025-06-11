tailwind.config = {
    theme: {
        extend: {
            colors: {
                'bleuPrinc': '#1e40af',
                'bleuDash': '#3b82f6',
                'jauneAcc': '#fbbf24',
                'vertPar': '#16a34a'
            }
        }
    }
}
const vids = [
    {
        id: 1,
        titre: "Comment créer un compte 1xBet",
        desc: "Guide complet pour ouvrir votre compte 1xBet en 5 minutes avec toutes les étapes détaillées.",
        duree: "8:45",
        cat: "1xbet",
        couleur: "blue"
    },
    {
        id: 2,
        titre: "Comment faire une recharge 1xBet",
        desc: "Découvrez toutes les méthodes de dépôt disponibles sur 1xBet : Mobile Money, cartes bancaires, portefeuilles électroniques.",
        duree: "6:22",
        cat: "1xbet",
        couleur: "blue"
    },
    {
        id: 3,
        titre: "Comment faire un retrait 1xBet",
        desc: "Procédure complète pour retirer vos gains sur 1xBet. Étapes de vérification, méthodes de retrait et délais de traitement.",
        duree: "7:18",
        cat: "1xbet",
        couleur: "blue"
    },
    {
        id: 4,
        titre: "Comment créer un compte MelBet",
        desc: "Inscription rapide et sécurisée sur MelBet. Processus étape par étape avec conseils de sécurité.",
        duree: "9:12",
        cat: "melbet",
        couleur: "purple"
    },
    {
        id: 5,
        titre: "Comment faire une recharge MelBet",
        desc: "Guide des différentes options de dépôt MelBet : Mobile Money, virements bancaires, cryptomonnaies et plus encore.",
        duree: "5:47",
        cat: "melbet",
        couleur: "purple"
    },
    {
        id: 6,
        titre: "Comment faire un retrait MelBet",
        desc: "Étapes détaillées pour effectuer un retrait sur MelBet. Vérifications nécessaires, limites et temps de traitement.",
        duree: "8:33",
        cat: "melbet",
        couleur: "purple"
    }
];

const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

const btnOuvrir = $('btnOuvrir');
const btnFermer = $('btnFermer');
const menu = $('menu');
const fondMenu = $('fondMenu');
const btnDeco = $('btnDeco');
const contVids = $('contVids');
const modalVid = $('modalVid');
const btnFermerModal = $('btnFermerModal');
const titreModal = $('titreModal');
const descModal = $('descModal');

let filtreActuel = 'tous';

function afficherVids() {
    const vidsTriees = [...vids].sort((a, b) => a.cat.localeCompare(b.cat));
    const vidsFiltrees = filtreActuel === 'tous' ? vidsTriees : vidsTriees.filter(v => v.cat === filtreActuel);
    
    contVids.innerHTML = vidsFiltrees.map(v => `
        <div class="cardVid bg-gradient-to-br from-gray-700/40 to-gray-600/40 rounded-xl p-3 lg:p-4 border border-gray-500/30 backdrop-blur-xl cursor-pointer" onclick="ouvrirModal('${v.titre}', '${v.desc}')">
            <div class="relative w-full h-32 lg:h-40 bg-gradient-to-r from-${v.couleur}-600 to-${v.couleur}-500 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                <div class="w-12 h-12 lg:w-14 lg:h-14 bg-white/90 rounded-full flex items-center justify-center transition-all hover:bg-white hover:scale-110">
                    <i class="fas fa-play text-${v.couleur}-600 text-lg lg:text-xl ml-1"></i>
                </div>
                <div class="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                    ${v.duree}
                </div>
            </div>
            <div class="mb-2">
                <span class="text-xs bg-${v.couleur}-500/20 text-${v.couleur}-400 px-2 py-1 rounded-full font-medium">
                    ${v.cat === '1xbet' ? '1xBet' : v.cat === 'melbet' ? 'MelBet' : 'Flash Service'}
                </span>
            </div>
            <h3 class="text-white font-bold text-sm lg:text-base mb-2 line-clamp-2">${v.titre}</h3>
            <p class="text-gray-400 text-xs lg:text-sm line-clamp-2">${v.desc}</p>
        </div>
    `).join('');
}

function gererFiltres() {
    $$('.btnFiltre').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.btnFiltre').forEach(b => {
                b.className = 'btnFiltre bg-gray-700/50 border border-gray-600 text-gray-300 px-3 py-1.5 rounded-full text-sm font-medium transition-all hover:bg-gray-600';
            });
            btn.className = 'btnFiltre bg-bleuDash/20 border border-bleuDash text-white px-3 py-1.5 rounded-full text-sm font-medium transition-all';
            filtreActuel = btn.dataset.filtre;
            afficherVids();
        });
    });
}

function ouvrirModal(titre, desc) {
    titreModal.textContent = titre;
    descModal.textContent = desc;
    modalVid.classList.add('actif');
}

function fermerModal() {
    modalVid.classList.remove('actif');
}

function fermerMenu() {
    menu.classList.remove('ouvert');
    fondMenu.classList.add('hidden');
}

function gererMenu() {
    btnOuvrir.addEventListener('click', () => {
        menu.classList.add('ouvert');
        fondMenu.classList.remove('hidden');
    });

    btnFermer.addEventListener('click', fermerMenu);

    fondMenu.addEventListener('click', fermerMenu);
}

btnDeco.addEventListener('click', e => {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});

btnFermerModal.addEventListener('click', fermerModal);

modalVid.addEventListener('click', e => {
    if (e.target === modalVid) fermerModal();
});

function aller(page) {
    window.location.href = page;
}

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        menu.classList.remove('ouvert');
        fondMenu.classList.add('hidden');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    afficherVids();
    gererFiltres();
    gererMenu();
});

document.querySelectorAll('.iconeFlottante').forEach(icone => {
    icone.style.animation = 'flottement 3s ease-in-out infinite';
});