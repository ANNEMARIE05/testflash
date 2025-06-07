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

const btnmenu = document.getElementById('btnmenu');
const menuNav = document.getElementById('menuNav');
const fondmenu = document.getElementById('fondmenu');
const fermermenu = document.getElementById('fermermenu');
const formDepot = document.getElementById('formDepot');
const modalValid = document.getElementById('modalValid');
const fermerModalValid = document.getElementById('fermerModalValid');
const idCompte = document.getElementById('idCompte');
const telUser = document.getElementById('telUser');
const montantDepot = document.getElementById('montantDepot');
const btnDrop = document.getElementById('btnDrop');
const menuDrop = document.getElementById('menuDrop');
const optSelect = document.getElementById('optSelect');
const btnDeco = document.getElementById('btnDeco');

let methodeChoisie = '';

function ouvrirmenu() {
    menuNav.classList.remove('-translate-x-full');
    fondmenu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function fermermenuFunc() {
    menuNav.classList.add('-translate-x-full');
    fondmenu.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

btnmenu.addEventListener('click', function() {
    if (menuNav.classList.contains('-translate-x-full')) {
        ouvrirmenu();
    } else {
        fermermenuFunc();
    }
});

fermermenu.addEventListener('click', fermermenuFunc);
fondmenu.addEventListener('click', fermermenuFunc);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        fermermenuFunc();
    }
});

const liens = document.querySelectorAll('.lien-nav');
liens.forEach(lien => {
    lien.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            window.location.href = href;
            return;
        }
        
        e.preventDefault();
        
        liens.forEach(l => l.classList.remove('actif'));
        liens.forEach(l => {
            l.classList.remove('bg-gradient-to-r', 'from-bleu-principal', 'to-bleu-fonce', 'text-white');
            l.classList.add('text-gray-300', 'hover:text-white');
        });
        
        this.classList.add('actif');
        this.classList.remove('text-gray-300', 'hover:text-white');
        this.classList.add('bg-gradient-to-r', 'from-bleu-principal', 'to-bleu-fonce', 'text-white');
    });
});

btnDeco.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});

const platChoice = document.querySelectorAll('.platChoice');
platChoice.forEach(ch => {
    ch.addEventListener('click', function() {
        platChoice.forEach(c => {
            const div = c.querySelector('div');
            div.classList.remove('border-yellow-400', 'bg-yellow-400/10');
            div.classList.add('border-gray-600', 'bg-gray-700');
        });
        
        const div = this.querySelector('div');
        div.classList.remove('border-gray-600', 'bg-gray-700');
        div.classList.add('border-yellow-400', 'bg-yellow-400/10');
    });
});

btnDrop.addEventListener('click', function() {
    menuDrop.classList.toggle('active');
});

document.addEventListener('click', function(e) {
    if (!btnDrop.contains(e.target) && !menuDrop.contains(e.target)) {
        menuDrop.classList.remove('active');
    }
});

const itemsDrop = document.querySelectorAll('.dropdown-item');
itemsDrop.forEach(item => {
    item.addEventListener('click', function() {
        methodeChoisie = this.dataset.value;
        const img = this.querySelector('img');
        const text = this.querySelector('span').textContent;
        
        const newImg = img.cloneNode(true);
        newImg.className = 'selected-img';
        
        optSelect.innerHTML = '';
        optSelect.appendChild(newImg);
        optSelect.appendChild(document.createTextNode(text));
        
        menuDrop.classList.remove('active');
    });
});

formDepot.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const idVal = idCompte.value.trim();
    const telVal = telUser.value.trim();
    const montantVal = parseFloat(montantDepot.value);
    const platVal = document.querySelector('input[name="plateforme"]:checked');
    
    if (!idVal || !montantVal || !telVal || !methodeChoisie || !platVal) {
        alert('Veuillez remplir tous les champs requis');
        return;
    }
    if (montantVal < 1000) {
        alert('Le montant minimum de dépôt est de 1000 FCFA');
        return;
    }
    
    modalValid.classList.remove('hidden');
});

fermerModalValid.addEventListener('click', function() {
    modalValid.classList.add('hidden');
    formDepot.reset();
    
    platChoice.forEach(ch => {
        const div = ch.querySelector('div');
        div.classList.remove('border-yellow-400', 'bg-yellow-400/10');
        div.classList.add('border-gray-600', 'bg-gray-700');
    });
    
    optSelect.innerHTML = 'Sélectionnez une méthode';
    methodeChoisie = '';
});