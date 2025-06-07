const btnAffichagePassword = document.getElementById('btnAffichagePassword');
const passwordUtilisateur = document.getElementById('password-utilisateur');
const btnAffichageConfirmationPassword = document.getElementById('btnConfirmationPassword');
const confirmationPassword = document.getElementById('confirmation-password');
const zoneMessagesErreur = document.getElementById('zone-messages-erreur');
const texteMessageErreur = document.getElementById('texte-message-erreur');

function afficherMessageErreur(message) {
    texteMessageErreur.textContent = message;
    zoneMessagesErreur.classList.remove('hidden');
}

function masquerMessageErreur() {
    zoneMessagesErreur.classList.add('hidden');
}

btnAffichagePassword.addEventListener('click', function() {
    const typePassword = passwordUtilisateur.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordUtilisateur.setAttribute('type', typePassword);
});

btnAffichageConfirmationPassword.addEventListener('click', function() {
    const typeConfirmationPassword = confirmationPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmationPassword.setAttribute('type', typeConfirmationPassword);
});

const formulaireInscription = document.getElementById('formulaire-inscription');
const btnValidation = document.getElementById('btn-validation');
const texteValidation = document.getElementById('texte-validation');
const indicateurChargement = document.getElementById('indicateur-chargement');

formulaireInscription.addEventListener('submit', function(e) {
    e.preventDefault();
    masquerMessageErreur();
    
    if (passwordUtilisateur.value !== confirmationPassword.value) {
        afficherMessageErreur('Les mots de passe ne correspondent pas');
        return;
    }

    if (passwordUtilisateur.value.length < 8) {
        afficherMessageErreur('Le mot de passe doit contenir au minimum 8 caractères');
        return;
    }

    btnValidation.disabled = true;
    texteValidation.classList.add('hidden');
    indicateurChargement.classList.remove('hidden');

    setTimeout(function() {
        alert('Inscription réussie !');
        btnValidation.disabled = false;
        texteValidation.classList.remove('hidden');
        indicateurChargement.classList.add('hidden');
        formulaireInscription.reset();
        masquerMessageErreur();
    }, 2000);
});