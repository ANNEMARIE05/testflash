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
    methodes: [
        { val: 'orange-money', txt: 'Orange Money', img: '/assets/img/orange.png' },
        { val: 'mtn-money', txt: 'MTN Money', img: '/assets/img/mtn-money.png' },
        { val: 'moov-money', txt: 'Moov Money', img: '/assets/img/moov.png' },
        { val: 'wave', txt: 'Wave', img: '/assets/img/wave.png' },
        { val: 'solde-bonus', txt: 'Solde Bonus', img: '/assets/img/log.jpeg' }
    ],
    plateformes: [
        { val: '1xbet', txt: '1XBET', img: '/assets/img/1xbet-icon.png' },
        { val: 'melbet', txt: 'MELBET', img: '/assets/img/melbet.jpg' }
    ],
    infos: [
        { icone: 'fas fa-clock', titre: 'Traitement Instantané', desc: 'Les dépôts sont crédités immédiatement' },
        { icone: 'fas fa-coins', titre: 'Montant Minimum', desc: 'Dépôt minimum: 1000 FCFA' },
        { icone: 'fas fa-gift', titre: 'Frais de dépôt', desc: '0% de frais de dépôt' },
        { icone: 'fas fa-headset', titre: 'Support', desc: 'Assistance 24h/24 et 7j/7' }
    ]
};

let methChoisie = null;
let platChoisie = null;

const btnDrop = document.getElementById('btnDrop');
const menuDrop = document.getElementById('menuDrop');
const optSelect = document.getElementById('optSelect');
const chevron = document.getElementById('chevron');
const formDepot = document.getElementById('formDepot');
const modaleDepot = document.getElementById('modaleDepot');
const btnFermerModale = document.getElementById('btnFermerModale');
const btnOuvrir = document.getElementById('btnOuvrir');
const btnFermer = document.getElementById('btnFermer');
const menu = document.getElementById('menu');
const fondMenu = document.getElementById('fondMenu');
const btnDeco = document.getElementById('btnDeco');

function initInterface() {
    donnees.methodes.forEach(meth => {
        const div = document.createElement('div');
        div.className = 'dropdown-item';
        div.setAttribute('data-value', meth.val);
        div.innerHTML = `<img src="${meth.img}" alt="${meth.txt}"><span>${meth.txt}</span>`;
        menuDrop.appendChild(div);
        
        div.addEventListener('click', () => {
            methChoisie = meth.val;
            optSelect.innerHTML = `<img src="${meth.img}" alt="${meth.txt}" class="w-6 h-6 mr-2 inline-block"> ${meth.txt}`;
            menuDrop.classList.remove('ouvert');
            chevron.classList.remove('fa-chevron-up');
            chevron.classList.add('fa-chevron-down');
        });
    });

    const platChoices = document.getElementById('platChoices');
    donnees.plateformes.forEach(plat => {
        const label = document.createElement('label');
        label.className = 'platChoice cursor-pointer';
        label.innerHTML = `
            <input type="radio" name="plateforme" value="${plat.val}" class="sr-only">
            <div class="p-4 border-2 border-gray-600 rounded-xl hover:border-yellow-400 transition-all bg-gray-700 hover:bg-gray-600 flex justify-center items-center space-x-3">
                <img src="${plat.img}" class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center" alt="${plat.val}">
                <span class="hidden sm:block font-medium text-white">${plat.txt}</span>
            </div>`;
        platChoices.appendChild(label);
        
        label.addEventListener('click', () => {
            document.querySelectorAll('.platChoice div').forEach(div => {
                div.classList.remove('border-yellow-400', 'bg-gray-600');
                div.classList.add('border-gray-600', 'bg-gray-700');
            });
            
            const div = label.querySelector('div');
            div.classList.remove('border-gray-600', 'bg-gray-700');
            div.classList.add('border-yellow-400', 'bg-gray-600');
            
            platChoisie = plat.val;
        });
    });

    const infosDiv = document.getElementById('infos');
    donnees.infos.forEach(info => {
        const div = document.createElement('div');
        div.className = 'flex items-start space-x-3';
        div.innerHTML = `
            <i class="${info.icone} text-yellow-400 mt-1"></i>
            <div>
                <h4 class="font-semibold text-white mb-1">${info.titre}</h4>
                <p class="text-sm text-gray-400">${info.desc}</p>
            </div>`;
        infosDiv.appendChild(div);
    });
}

function validerForm() {
    const idCompte = document.getElementById('idCompte').value.trim();
    const montantDepot = document.getElementById('montantDepot').value.trim();
    const telUser = document.getElementById('telUser').value.trim();
    
    if (!idCompte) {
        alert('Veuillez saisir l\'identifiant du compte');
        return false;
    }
    
    if (!montantDepot) {
        alert('Veuillez saisir le montant du dépôt');
        return false;
    }
    
    if (parseInt(montantDepot) < 1000) {
        alert('Le montant minimum est de 1000 FCFA');
        return false;
    }
    
    if (!telUser) {
        alert('Veuillez saisir votre numéro de téléphone');
        return false;
    }
    
    const telRegex = /^0[1-9]\d{8}$/;
    if (!telRegex.test(telUser)) {
        alert('Format de numéro invalide (ex: 0172317983)');
        return false;
    }
    
    if (!methChoisie) {
        alert('Veuillez sélectionner une méthode de paiement');
        return false;
    }
    
    if (!platChoisie) {
        alert('Veuillez sélectionner une plateforme de destination');
        return false;
    }
    
    return true;
}

function ouvrirModale() {
    modaleDepot.classList.remove('hidden');
    modaleDepot.classList.add('flex');
    
    setTimeout(() => {
        modaleDepot.classList.remove('opacity-0');
        modaleDepot.querySelector('.bg-white').classList.remove('scale-75', 'opacity-0');
        modaleDepot.querySelector('.bg-white').classList.add('scale-100', 'opacity-100');
    }, 10);
}

function fermerModale() {
    modaleDepot.querySelector('.bg-white').classList.remove('scale-100', 'opacity-100');
    modaleDepot.querySelector('.bg-white').classList.add('scale-75', 'opacity-0');
    
    setTimeout(() => {
        modaleDepot.classList.add('opacity-0');
        setTimeout(() => {
            modaleDepot.classList.add('hidden');
            modaleDepot.classList.remove('flex');
        }, 300);
    }, 100);
}

btnDrop.addEventListener('click', () => {
    menuDrop.classList.toggle('ouvert');
    chevron.classList.toggle('fa-chevron-up');
    chevron.classList.toggle('fa-chevron-down');
});

document.addEventListener('click', (e) => {
    if (!btnDrop.contains(e.target) && !menuDrop.contains(e.target)) {
        menuDrop.classList.remove('ouvert');
        chevron.classList.remove('fa-chevron-up');
        chevron.classList.add('fa-chevron-down');
    }
});

formDepot.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validerForm()) {
        ouvrirModale();
    }
});

btnFermerModale.addEventListener('click', fermerModale);

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

btnDeco.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});

document.getElementById('montantDepot').addEventListener('input', (e) => {
    const montant = parseInt(e.target.value);
    if (montant && montant < 1000) {
        e.target.style.borderColor = '#ef4444';
    } else {
        e.target.style.borderColor = '#4b5563';
    }
});

document.getElementById('telUser').addEventListener('input', (e) => {
    const tel = e.target.value;
    const regex = /^0[1-9]\d{8}$/;
    if (tel && !regex.test(tel)) {
        e.target.style.borderColor = '#ef4444';
    } else {
        e.target.style.borderColor = '#4b5563';}
});

function aller(page) {
    window.location.href = page;
}

document.addEventListener('DOMContentLoaded', () => {
    initInterface();
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        menu.classList.remove('ouvert');
        fondMenu.classList.remove('actif');
    }
});

window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.cardDepot');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animationDelay = `${index * 0.2}s`;
        }, index * 100);
    });
});

function formaterNumero(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.substring(0, 10);
    }
    input.value = value;
}

document.getElementById('telUser').addEventListener('input', (e) => {
    formaterNumero(e.target);
    const tel = e.target.value;
    const regex = /^0[1-9]\d{8}$/;
    if (tel && !regex.test(tel)) {
        e.target.style.borderColor = '#ef4444';
    } else {
        e.target.style.borderColor = '#4b5563';
    }
});

document.getElementById('montantDepot').addEventListener('input', (e) => {
    const montant = parseInt(e.target.value);
    if (montant && montant < 1000) {
        e.target.style.borderColor = '#ef4444';
    } else {
        e.target.style.borderColor = '#4b5563';
    }
});

document.querySelectorAll('.iconeFlottante').forEach(icone => {
    icone.style.animation = 'flottement 3s ease-in-out infinite';
});
