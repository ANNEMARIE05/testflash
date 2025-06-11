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
const data = {
    nom: 'Kouamé',
    prenom: 'Yao',
    email: 'yao.kouame@email.com',
    tel: '+225 07 12 34 56 78',
    naissance: '1995-03-15',
    ville: 'abidjan',
    parrain: '',
    nomUtil: 'Hello Yao',
    solde: 'Solde: 45,000 XOF'
};

    const menu = document.getElementById('menu');
    const fondMenu = document.getElementById('fondMenu');
    const btnOuvrir = document.getElementById('btnOuvrir');
    const btnFermer = document.getElementById('btnFermer');
    const btnDeco = document.getElementById('btnDeco');
    const btnSauv = document.getElementById('btnSauv');
    const btnAnn = document.getElementById('btnAnn');
    const msgSucces = document.getElementById('msgSucces');
    const btnsVoirMdp = document.querySelectorAll('.btnVoirMdp');
    const nomUtil = document.getElementById('nomUtilisateur');
    const soldeUtil = document.getElementById('soldeUtilisateur')


function init() {
    Object.keys(data).forEach(k => {
        const el = document.getElementById(k);
        if (el) el.value = data[k];
    });
    nomUtil.textContent = data.nomUtil;
    soldeUtil.textContent = data.solde;
}

function sauv() {
    const nouveau = document.getElementById('mdpNouveau').value;
    const confirm = document.getElementById('mdpConfirm').value;
    
    if (nouveau && nouveau !== confirm) {
        alert('Les mots de passe ne correspondent pas');
        return;
    }

    Object.keys(data).forEach(k => {
        const el = document.getElementById(k);
        if (el) data[k] = el.value;
    });
    
    btnSauv.classList.add('btnSucces');
    btnSauv.innerHTML = '<i class="fas fa-check mr-2"></i>Sauvegardé!';
    
    setTimeout(() => {
        btnSauv.classList.remove('btnSucces');
        btnSauv.innerHTML = '<i class="fas fa-save mr-2"></i>Sauvegarder les modifications';
        affMsg();
    }, 1500);

    ['mdpActuel', 'mdpNouveau', 'mdpConfirm'].forEach(id => {
        document.getElementById(id).value = '';
    });
}

function ann() {
    Object.keys(data).forEach(k => {
        const el = document.getElementById(k);
        if (el) el.value = data[k];
    });
    ['mdpActuel', 'mdpNouveau', 'mdpConfirm'].forEach(id => {
        document.getElementById(id).value = '';
    });
}

function affMsg() {
    msgSucces.classList.remove('hidden');
    setTimeout(() => msgSucces.classList.add('hidden'), 5000);
}

function toggleMdp(btn) {
    const input = btn.parentElement.querySelector('input');
    const icon = btn.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

function aller(page) {
    window.location.href = page;
}

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

btnSauv.addEventListener('click', sauv);
btnAnn.addEventListener('click', ann);

btnsVoirMdp.forEach(btn => {
    btn.addEventListener('click', () => toggleMdp(btn));
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        menu.classList.remove('ouvert');
        fondMenu.classList.remove('actif');
    }
});

document.addEventListener('DOMContentLoaded', init);

document.querySelectorAll('.iconeFlottante').forEach(icone => {
    icone.style.animation = 'flottement 3s ease-in-out infinite';
});