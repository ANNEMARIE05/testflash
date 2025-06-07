tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary': {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                'accent': {
                    50: '#fefce8',
                    100: '#fef9c3',
                    200: '#fef08a',
                    300: '#fde047',
                    400: '#facc15',
                    500: '#eab308',
                    600: '#ca8a04',
                    700: '#a16207',
                    800: '#854d0e',
                    900: '#713f12',
                },
                'gradient-start': '#0f172a',
                'gradient-middle': '#1e293b',
                'gradient-end': '#334155',
                'gradientDebut': '#0f172a',
                'gradientMilieu': '#1e293b',
                'gradientFin': '#334155',
                'bleu-principal': '#1e40af',
                'bleu-secondaire': '#3b82f6',
                'bleu-clair': '#60a5fa',
                'bleu-fonce': '#1e3a8a',
                'jaune-accent': '#fbbf24',
                'jaune-clair': '#fcd34d'
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'mesh-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }
        }
    }
}

function basculerMenu() {
    const menu = document.querySelector('.menu-mobile');
    const overlay = document.querySelector('.overlay-menu');
    
    menu.classList.add('ouvert');
    overlay.classList.add('actif');
}

function fermerMenu() {
    const menu = document.querySelector('.menu-mobile');
    const overlay = document.querySelector('.overlay-menu');
    
    menu.classList.remove('ouvert');
    overlay.classList.remove('actif');
}

document.addEventListener('DOMContentLoaded', function() {
    demarrerCompteur();
});

function demarrerCompteur() {
    let heures = 0;
    let minutes = 2;
    let secondes = 47;

    setInterval(function() {
        if (secondes > 0) {
            secondes--;
        } else if (minutes > 0) {
            minutes--;
            secondes = 59;
        } else if (heures > 0) {
            heures--;
            minutes = 59;
            secondes = 59;
        } else {
            heures = 0;
            minutes = 2;
            secondes = 47;
        }

    const temps = String(heures).padStart(2, '0') + ':' + 
        String(minutes).padStart(2, '0') + ':' + 
        String(secondes).padStart(2, '0');
                
        const compteur = document.getElementById('compteur-temps');
        if (compteur) {
            compteur.textContent = temps;
        }
    }, 1000);
}
