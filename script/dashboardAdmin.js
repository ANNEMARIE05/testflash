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

function majNombres() {
    const visJour = Math.floor(Math.random() * 500) + 1000;
    const enLigne = Math.floor(Math.random() * 200) + 150;
    const totUsers = Math.floor(Math.random() * 1000) + 3000;
    const usersVip = Math.floor(Math.random() * 50) + 70;
    const transAttente = Math.floor(Math.random() * 20) + 5;
    const bonusDist = Math.floor(Math.random() * 100) + 200;
    
    document.getElementById('visJour').textContent = visJour.toLocaleString();
    document.getElementById('enLigne').textContent = enLigne.toLocaleString();
    document.getElementById('totUsers').textContent = totUsers.toLocaleString();
    document.getElementById('usersVip').textContent = usersVip.toLocaleString();
    document.getElementById('transAttente').textContent = transAttente.toString();
    document.getElementById('bonusDist').textContent = bonusDist.toLocaleString();
}

const btnDeco = document.getElementById('btnDeco');
btnDeco.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.location.href = '/auth/login.html';
    }
});

majNombres();
setInterval(majNombres, 30000);