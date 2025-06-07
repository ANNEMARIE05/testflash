let numeroTelephone = document.getElementById('numeroTelephone');
let Password = document.getElementById('Password');
let btnAfficherPassword = document.getElementById('btnAfficherPassword');
let formulaireConnexion = document.getElementById('formulaireConnexion');
let boutonValidation = document.getElementById('boutonValidation');
let texteConnexion = document.getElementById('texteConnexion');
let chargementConnexion = document.getElementById('chargementConnexion');
let zoneAffichageMessages = document.getElementById('zoneAffichageMessages');
let messageSucces = document.getElementById('messageSucces');
let messageErreur = document.getElementById('messageErreur');

let PasswordVisible = false;

btnAfficherPassword.addEventListener('click', function() {
    PasswordVisible = !PasswordVisible;
    Password.type = PasswordVisible ? 'text' : 'password';
});

formulaireConnexion.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let numeroSaisi = numeroTelephone.value;
    let PasswordSaisi = Password.value;
    
    zoneAffichageMessages.classList.add('hidden');
    messageSucces.classList.add('hidden');
    messageErreur.classList.add('hidden');
    
    texteConnexion.classList.add('hidden');
    chargementConnexion.classList.remove('hidden');
    boutonValidation.disabled = true;
    
    setTimeout(function() {
        chargementConnexion.classList.add('hidden');
        texteConnexion.classList.remove('hidden');
        boutonValidation.disabled = false;
        
        zoneAffichageMessages.classList.remove('hidden');
        
        if (numeroSaisi === '0776464241' && PasswordSaisi === 'flashservice2025') {
            messageSucces.classList.remove('hidden');
            setTimeout(function() {
                window.location.href = '/admin/dashboardAdmin.html';
            }, 2000);
        } else if (numeroSaisi === '0546742406' && PasswordSaisi === 'Bonjour2025') {
            messageSucces.classList.remove('hidden');
            setTimeout(function() {
                window.location.href = '/users/dashboardUser.html';
            }, 2000);
        } else {
            messageErreur.classList.remove('hidden');
        }
    }, 2000);
});