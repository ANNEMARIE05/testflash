let questionActuelle = 1;
let score = 0;
const totalQuestions = 5;

const questions = [
    {
        question: "Quel est le montant minimum de dépôt sur Flash Service ?",
        options: [
            { texte: "A) 500 XOF", valeur: "500" },
            { texte: "B) 1 000 XOF", valeur: "1000" },
            { texte: "C) 1 500 XOF", valeur: "1500" }
        ],
        bonnereponse: "1000"
    },
    {
        question: "Quel est le bonus maximum offert par 1XBET ?",
        options: [
            { texte: "A) 100 000 FCFA", valeur: "100000" },
            { texte: "B) 200 000 FCFA", valeur: "200000" },
            { texte: "C) 300 000 FCFA", valeur: "300000" }
        ],
        bonnereponse: "200000"
    },
    {
        question: "Combien coûte l'abonnement VIP par mois ?",
        options: [
            { texte: "A) 30 000 XOF", valeur: "30000" },
            { texte: "B) 40 000 XOF", valeur: "40000" },
            { texte: "C) 50 000 XOF", valeur: "50000" }
        ],
        bonnereponse: "50000"
    },
    {
        question: "Quel est le code de parrainage affiché ?",
        options: [
            { texte: "A) FLASH9", valeur: "FLASH9" },
            { texte: "B) GRATIS9", valeur: "GRATIS9" },
            { texte: "C) BONUS9", valeur: "BONUS9" }
        ],
        bonnereponse: "GRATIS9"
    },
    {
        question: "Quel bonus peut-on gagner avec le Mardi Bonus ?",
        options: [
            { texte: "A) 3 000F", valeur: "3000" },
            { texte: "B) 5 000F", valeur: "5000" },
            { texte: "C) 7 000F", valeur: "7000" }
        ],
        bonnereponse: "5000"
    }
];

document.getElementById('ouvrir').addEventListener('click', function() {
    document.getElementById('menu').classList.remove('-translate-x-full');
    document.getElementById('fond').classList.remove('hidden');
});

document.getElementById('fermer').addEventListener('click', function() {
    document.getElementById('menu').classList.add('-translate-x-full');
    document.getElementById('fond').classList.add('hidden');
});

document.getElementById('fond').addEventListener('click', function() {
    document.getElementById('menu').classList.add('-translate-x-full');
    document.getElementById('fond').classList.add('hidden');
});

function demarrerCompteur() {
    let heures = 23;
    let minutes = 47;
    let secondes = 32;

    setInterval(function() {
        if (secondes > 0) {
            secondes--;
        } else {
            secondes = 59;
            if (minutes > 0) {
                minutes--;
            } else {
                minutes = 59;
                if (heures > 0) {
                    heures--;
                } else {
                    heures = 23;
                    minutes = 59;
                    secondes = 59;
                }
            }
        }

        const temps = String(heures).padStart(2, '0') + ':' + 
                     String(minutes).padStart(2, '0') + ':' + 
                     String(secondes).padStart(2, '0');
        document.getElementById('compteur').textContent = temps;
    }, 1000);
}

function ouvQuiz() {
    document.getElementById('quiz').classList.remove('hidden');
    questionActuelle = 1;
    score = 0;
    afficherQuestion();
}

function afficherQuestion() {
    const q = questions[questionActuelle - 1];
    document.getElementById('numQ').textContent = questionActuelle;
    
    const contenu = `
        <h4 class="text-xs sm:text-sm font-bold text-white mb-4">${q.question}</h4>
        <div class="space-y-3">
            ${q.options.map(option => `
                <button class="option w-full text-left p-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-all text-sm sm:text-base" data-rep="${option.valeur}">
                    ${option.texte}
                </button>
            `).join('')}
        </div>
    `;
    
    document.getElementById('contenuQ').innerHTML = contenu;
    
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('bg-blue-600', 'bg-red-600');
                opt.classList.add('bg-gray-700');
            });
            
            const reponse = this.getAttribute('data-rep');
            if (reponse === q.bonnereponse) {
                this.classList.remove('bg-gray-700');
                this.classList.add('bg-green-600');
                score++;
            } else {
                this.classList.remove('bg-gray-700');
                this.classList.add('bg-red-600');
                document.querySelectorAll('.option').forEach(opt => {
                    if (opt.getAttribute('data-rep') === q.bonnereponse) {
                        opt.classList.remove('bg-gray-700');
                        opt.classList.add('bg-green-600');
                    }
                });
            }
            
            document.querySelectorAll('.option').forEach(opt => {
                opt.disabled = true;
                opt.classList.add('cursor-not-allowed');
            });
        });
    });
}

function questionSuivante() {
    if (questionActuelle < totalQuestions) {
        questionActuelle++;
        afficherQuestion();
    } else {
        terminerQuiz();
    }
}

function terminerQuiz() {
    let message = '';
    let bonus = 0;
    
    if (score === 5) {
        message = 'Parfait ! Vous avez tout bon !';
        bonus = 5000;
    } else if (score >= 3) {
        message = 'Bien joué ! Bon score !';
        bonus = 3000;
    } else {
        message = 'Continuez vos efforts !';
        bonus = 1000;
    }
    
    document.getElementById('contenuQ').innerHTML = `
        <div class="text-center">
            <div class="text-4xl mb-4">${score === 5 ? '🏆' : score >= 3 ? '🎉' : '💪'}</div>
            <h4 class="text-xl font-bold text-white mb-2">${message}</h4>
            <p class="text-gray-400 mb-4">Score: ${score}/${totalQuestions}</p>
            <div class="text-2xl font-bold text-yellow-400 mb-4">+${bonus} XOF</div>
            <p class="text-sm text-gray-300">Votre bonus a été ajouté à votre compte !</p>
        </div>
    `;
    
    document.getElementById('suivant').textContent = 'Fermer';
}

document.getElementById('fermerQuiz').addEventListener('click', function() {
    document.getElementById('quiz').classList.add('hidden');
});

document.getElementById('suivant').addEventListener('click', function() {
    if (this.textContent === 'Fermer') {
        document.getElementById('quiz').classList.add('hidden');
    } else {
        questionSuivante();
    }
});

document.getElementById('deco').addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        alert('Déconnexion réussie !');
        window.location.href = '/auth/login.html';
    }
});

document.getElementById('depot').addEventListener('click', function() {
    window.location.href = 'dashboardDepot.html';
});

document.getElementById('retrait').addEventListener('click', function() {
    window.location.href = 'dashboardRetrait.html';
});

window.addEventListener('load', function() {
    demarrerCompteur();
});

window.ouvQuiz = ouvQuiz;