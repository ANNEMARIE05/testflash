tailwind.config = {
    theme: {
        extend: {
            colors: {
                'bleuPrinc': '#1e40af',
                'bleuFc': '#1e3a8a',
                'bleuDash': '#3b82f6',
                'jauneAcc': '#fbbf24',
                'vertPar': '#059669'
            }
        }
    }
}
    const btnOuvrMenu = document.getElementById('btnOuvrMenuMob');
    const btnFermerMenu = document.getElementById('fermerMenu');
    const menu = document.getElementById('menu');
    const fondMenu = document.getElementById('fondMenu');

    btnOuvrMenu.addEventListener('click', () => {
        menu.classList.remove('-translate-x-full');
        fondMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    function fermerMenu() {
        menu.classList.add('-translate-x-full');
        fondMenu.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    btnFermerMenu.addEventListener('click', fermerMenu);
    fondMenu.addEventListener('click', fermerMenu);

    function allerPage(page) {
        window.location.href = page;
    }

    document.getElementById('btnVoirPron').addEventListener('click', () => {
        allerPage('dashboardPronostic.html');
    });

    document.getElementById('btnVoirBon').addEventListener('click', () => {
        allerPage('dashboardBonus.html');
    });

    document.getElementById('btnVoirActivites').addEventListener('click', () => {
        allerPage('dashboardTransaction.html');
    });

    document.querySelectorAll('.btnBon').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            this.classList.add('btnBonusClick');
            this.innerHTML = '<i class="fas fa-check mr-1"></i>Réclamé';
            this.disabled = true;
            
            setTimeout(() => {
                showNotification('Bonus réclamé avec succès !', 'success');
            }, 500);
        });
    });

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
            type === 'success' ? 'bg-green-600 text-white' : 
            type === 'error' ? 'bg-red-600 text-white' : 
            'bg-blue-600 text-white'
        }`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'} mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    document.getElementById('btnDeconnexion').addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
            window.location.href = '/auth/login.html';
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        const cards = document.querySelectorAll('.cardStat');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
        });
    });

    if (window.innerWidth > 768) {
        document.querySelectorAll('.icAnim').forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.animation = 'flottement 1s ease-in-out infinite';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.animation = 'none';
            });
        });
    }

    setInterval(() => {
        const soldeBonus = document.querySelector('.text-jauneAcc');
        if (soldeBonus && Math.random() > 0.95) {
            const currentAmount = parseFloat(soldeBonus.textContent.replace(/[^\d.]/g, ''));
            const newAmount = currentAmount + Math.floor(Math.random() * 100);
            soldeBonus.textContent = `${newAmount.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} XOF`;
            
            soldeBonus.style.transform = 'scale(1.1)';
            setTimeout(() => {
                soldeBonus.style.transform = 'scale(1)';
            }, 200);
        }
    }, 10000);

    document.querySelectorAll('.iconeFlottante').forEach(icone => {
    icone.style.animation = 'flottement 3s ease-in-out infinite';
});