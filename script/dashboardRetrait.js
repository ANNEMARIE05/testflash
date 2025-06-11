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
    let chronoInterval;
    let tempsRestant = 20 * 60; 
    let methodePaiementSelectionnee = '';

    const btnOuvrir = document.getElementById('btnOuvrir');
    const btnFermer = document.getElementById('btnFermer');
    const menu = document.getElementById('menu');
    const fondMenu = document.getElementById('fondMenu');

    btnOuvrir.addEventListener('click', () => {
        menu.classList.add('ouvert');
        fondMenu.classList.add('actif');
    });

    btnFermer.addEventListener('click', fermerMenu);
    fondMenu.addEventListener('click', fermerMenu);

    function fermerMenu() {
        menu.classList.remove('ouvert');
        fondMenu.classList.remove('actif');
    }

    const btnDrop = document.getElementById('btnDrop');
    const listeDrop = document.getElementById('listeDrop');
    const optSel = document.getElementById('optSel');
    const imgSel = document.getElementById('imgSel');

    btnDrop.addEventListener('click', () => {
        listeDrop.classList.toggle('ouvert');
    });

    document.addEventListener('click', (e) => {
        if (!btnDrop.contains(e.target) && !listeDrop.contains(e.target)) {
            listeDrop.classList.remove('ouvert');
        }
    });

    document.querySelectorAll('.itemDrop').forEach(item => {
        item.addEventListener('click', () => {
            const value = item.getAttribute('data-value');
            const imgSrc = item.getAttribute('data-img');
            const text = item.querySelector('span').textContent;
            
            methodePaiementSelectionnee = value;
            optSel.textContent = text;
            imgSel.src = imgSrc;
            imgSel.classList.remove('hidden');
            
            listeDrop.classList.remove('ouvert');
        });
    });

    document.getElementById('formDem').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const montant = document.getElementById('montant').value;
        const plateforme = document.getElementById('plat').value;
        
        if (!montant || !plateforme) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }
        
        if (montant < 1000) {
            alert('Le montant minimum est de 1000 FCFA');
            return;
        }
        
        changerEtape('etapAtt');
        
        setTimeout(() => {
            afficherCoordonnees(montant, plateforme);
        }, 3000); 
    });

    function afficherCoordonnees(montant, plateforme) {
        const villes = ['Abidjan', 'Bouaké', 'Daloa', 'Yamoussoukro', 'San-Pédro'];
        const rues = ['Rue 12', 'Avenue 7', 'Boulevard 3', 'Rue du Commerce', 'Avenue de la Paix'];
        
        document.getElementById('montantAff').textContent = montant;
        document.getElementById('nomPlat').textContent = plateforme.toUpperCase();
        document.getElementById('villeAff').textContent = villes[Math.floor(Math.random() * villes.length)];
        document.getElementById('rueAff').textContent = rues[Math.floor(Math.random() * rues.length)];
        document.getElementById('montantFin').value = montant;
        
        changerEtape('etapCoord');
        demarrerChrono();
    }

    function demarrerChrono() {
        const chronoElement = document.getElementById('chrono');
        
        chronoInterval = setInterval(() => {
            const minutes = Math.floor(tempsRestant / 60);
            const secondes = tempsRestant % 60;
            
            chronoElement.textContent = `${minutes.toString().padStart(2, '0')}:${secondes.toString().padStart(2, '0')}`;
            
            if (tempsRestant <= 0) {
                clearInterval(chronoInterval);
                alert('Temps écoulé! Veuillez recommencer la procédure.');
                changerEtape('etap1');
                tempsRestant = 20 * 60;
            }
            
            tempsRestant--;
        }, 1000);
    }

    document.getElementById('formRet').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const identifiant = document.getElementById('id').value;
        const code = document.getElementById('code').value;
        const montant = document.getElementById('montantFin').value;
        const telephone = document.getElementById('tel').value;
        const plateformeDest = document.querySelector('input[name="platDest"]:checked');
        
        if (!identifiant || !code || !montant || !telephone || !plateformeDest || !methodePaiementSelectionnee) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }
        
        setTimeout(() => {
            clearInterval(chronoInterval);
            afficherSucces(montant, plateformeDest.value, optSel.textContent);
        }, 2000);
    });

    function afficherSucces(montant, plateforme, methode) {
        
        changerEtape('etapSucces');
    }

    function changerEtape(nouvelleEtape) {
        document.querySelectorAll('.etap').forEach(etape => {
            etape.classList.remove('actif');
        });
        document.getElementById(nouvelleEtape).classList.add('actif');
    }

    function retourAccueil() {
        window.location.href = 'dashboardUser.html';
    }

    function aller(page) {
        window.location.href = page;
    }

    const btnDeco = document.getElementById('btnDeco');
    const modalConfirm = document.getElementById('modalConfirm');
    const btnAnnuler = document.getElementById('btnAnnuler');
    const btnConfirmer = document.getElementById('btnConfirmer');

    btnDeco.addEventListener('click', (e) => {
        e.preventDefault();
        modalConfirm.style.display = 'flex';
    });

    btnAnnuler.addEventListener('click', () => {
        modalConfirm.style.display = 'none';
    });

    btnConfirmer.addEventListener('click', () => {
        e.preventDefault();
        if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
            window.location.href = '/auth/login.html';
        }
    });

    modalConfirm.addEventListener('click', (e) => {
        if (e.target === modalConfirm) {
            modalConfirm.style.display = 'none';
        }
    });

    window.addEventListener('load', () => {
        document.querySelector('.cardDepot').style.animationDelay = '0.2s';
    });

    document.querySelectorAll('.iconeFlottante').forEach(icone => {
    icone.style.animation = 'flottement 3s ease-in-out infinite';
});