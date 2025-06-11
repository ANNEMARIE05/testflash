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
                'vertPar': '#059669',
            }
        }
    }
}
const data = {
    stats: [
        { nom: "Bonus Dispo", val: "2,450.00 XOF", icone: "fas fa-coins", couleur: "jauneAcc" },
        { nom: "Bonus Réclamés", val: "15,750.00 XOF", icone: "fas fa-trophy", couleur: "green-400" },
        { nom: "Niveau VIP", val: "Bronze", icone: "fas fa-crown", couleur: "purple-400" }
    ],
    tachesVip: [
        { nom: "Inscription 1xBet/MelBet", desc: "Code: GRATIS9", statut: "complete", prog: "1/1", couleur: "green" },
        { nom: "Transactions Flash", desc: "3 dépôts min/semaine", statut: "complete", prog: "7 dépôts cette semaine", couleur: "blue" },
        { nom: "Parrainage", desc: "Code: XBEJEU", statut: "progress", prog: "4/10", couleur: "orange", btnText: "Partager Code" }
    ],
    bookmakers: [
        { nom: "1xBet", desc: "Bonus de bienvenue", bonus: "100%", code: "GRATIS9", max: "130,000 XOF", couleur: "red", icone: "fas fa-dice" },
        { nom: "MelBet", desc: "Bonus de bienvenue", bonus: "150%", code: "GRATIS9", max: "180,000 XOF", couleur: "blue", icone: "fas fa-bolt" }
    ],
    bonusQuot: [
        { nom: "Connexion Quotidienne", desc: "Connectez-vous chaque jour", montant: "5 XOF", icone: "fas fa-calendar-check", couleur: "jauneAcc", btnText: "Réclamer" },
        { nom: "Regarder Vidéo", desc: "1 vidéo par jour", montant: "10 XOF", icone: "fas fa-video", couleur: "green", btnText: "Regarder" },
        { nom: "Mardi Bonus", desc: "Pour les meilleurs dépôts de la semaine", montant: "5,000 XOF", icone: "fas fa-calendar-week", couleur: "purple", btnText: "Réclamer" }
    ],
    histBonus: [
        { nom: "Quiz Bonus", temps: "Aujourd'hui 14:30", montant: "+5,000 XOF", icone: "fas fa-question-circle", couleur: "green" },
        { nom: "Connexion Quotidienne", temps: "Hier 09:15", montant: "+5 XOF", icone: "fas fa-calendar-check", couleur: "jauneAcc" },
        { nom: "Mardi Bonus", temps: "Mardi 12:00", montant: "+5,000 XOF", icone: "fas fa-calendar-week", couleur: "purple" }
    ],
    quiz: [
        { q: "Quel est le code promo Flash Service pour 1xBet?", r: ["FLASH123", "GRATIS9", "BONUS100", "PROMO1X"], c: 1 },
        { q: "Combien de personnes faut-il parrainer pour devenir VIP?", r: ["5 personnes", "8 personnes", "10 personnes", "15 personnes"], c: 2 },
        { q: "Quel est le bonus maximum chez MelBet?", r: ["100,000 XOF", "130,000 XOF", "150,000 XOF", "200,000 XOF"], c: 1 },
        { q: "Combien de dépôts minimum par semaine pour le statut VIP?", r: ["2 dépôts", "3 dépôts", "4 dépôts", "5 dépôts"], c: 1 },
        { q: "Quel jour a lieu le Mardi Bonus?", r: ["Lundi", "Mardi", "Mercredi", "Jeudi"], c: 1 },
        { q: "Combien rapporte le Quiz Bonus?", r: ["1,000 XOF", "3,000 XOF", "5,000 XOF", "10,000 XOF"], c: 2 },
        { q: "Quel est le code de parrainage Flash Service?", r: ["XBEJEU", "FLASH99", "BONUS2024", "PARRAIN10"], c: 0 },
        { q: "Quel bookmaker offre 200% de bonus?", r: ["MelBet", "1xBet", "Betwinner", "Sportybets"], c: 1 },
        { q: "Combien rapporte la connexion quotidienne?", r: ["5 XOF", "10 XOF", "15 XOF", "20 XOF"], c: 0 },
        { q: "Quel est le montant du Mardi Bonus?", r: ["2,000 XOF", "3,000 XOF", "5,000 XOF", "8,000 XOF"], c: 2 }
    ]
};

let questActu = 0, scoreQuiz = 0, repUser = [];

function afficherStats() {
    const cont = document.getElementById('cartesStat');
    cont.innerHTML = data.stats.map(stat => `
        <div class="cardStat rounded-xl lg:rounded-2xl p-4 lg:p-6 relative overflow-hidden bg-gray-800 backdrop-filter backdrop-blur-xl border border-white/10">
            <div class="relative flex items-center justify-between">
                <div>
                    <p class="text-gray-400 text-xs lg:text-sm font-medium">${stat.nom}</p>
                    <p class="text-lg sm:text-xl lg:text-3xl font-bold text-${stat.couleur}">${stat.val}</p>
                </div>
                <div class="iconeFlottante">
                    <i class="${stat.icone} text-${stat.couleur} text-xl lg:text-3xl"></i>
                </div>
            </div>
        </div>
    `).join('');
}

function afficherVip() {
    const cont = document.getElementById('tachesVip');
    cont.innerHTML = data.tachesVip.map((tache, i) => `
        <div class="bg-gradient-to-r from-${tache.couleur}-500/20 to-${tache.couleur}-600/20 rounded-xl p-4 border border-${tache.couleur}-500/30">
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center">
                    <div class="w-8 h-8 bg-${tache.couleur}-500 rounded-full flex items-center justify-center mr-3">
                        <i class="fas ${tache.statut === 'complete' ? 'fa-check' : 'fa-users'} text-white text-sm"></i>
                    </div>
                    <div>
                        <p class="text-white font-medium text-sm">${tache.nom}</p>
                        <p class="text-gray-400 text-xs">${tache.desc}</p>
                    </div>
                </div>
                <span class="text-${tache.couleur}-400 text-sm font-bold">${tache.prog} ${tache.statut === 'complete' ? '✅' : ''}</span>
            </div>
            ${i === 0 ? `
                <div class="sm:flex items-center">
                    <input type="text" id="idBookmaker" placeholder="Votre ID Bookmaker" class="w-full bg-gray-700 text-white px-3 py-2 mb-2 sm:mb-0 rounded-lg flex-1 text-sm sm:mr-2">
                    <button id="btnVerifId" class="w-full sm:w-10 bg-${tache.couleur}-500 text-white px-3 py-2 rounded-lg text-sm btnAnim">
                        <i class="fas fa-check"></i>
                    </button>
                </div>
            ` : i === 1 ? `
                <div class="bg-${tache.couleur}-500/20 rounded-lg p-2">
                    <p class="text-${tache.couleur}-400 text-xs">${tache.prog}</p>
                </div>
            ` : `
                <div class="mb-3">
                    <div class="w-full bg-gray-700 rounded-full h-2">
                        <div class="bg-${tache.couleur}-500 h-2 rounded-full" style="width: 40%"></div>
                    </div>
                </div>
                <button id="btnPartager" class="bg-${tache.couleur}-500 text-white px-4 py-2 rounded-lg text-sm btnAnim w-full">
                    <i class="fas fa-share mr-2"></i>${tache.btnText}
                </button>
            `}
        </div>
    `).join('');
}

function afficherBookmakers() {
    const cont = document.getElementById('bookmakers');
    cont.innerHTML = data.bookmakers.map(book => `
        <div class="bg-gradient-to-r from-${book.couleur}-500/20 to-${book.couleur}-600/20 rounded-xl p-4 lg:p-6 border border-${book.couleur}-500/30">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                    <div class="w-12 h-12 bg-${book.couleur}-500 rounded-full flex items-center justify-center mr-3">
                        <i class="${book.icone} text-white text-xl"></i></div>
                    <div>
                        <h4 class="text-white font-bold text-lg">${book.nom}</h4>
                        <p class="text-gray-400 text-sm">${book.desc}</p>
                    </div>
                </div>
                <span class="text-${book.couleur}-400 font-bold text-xl">${book.bonus}</span>
            </div>
            <div class="bg-${book.couleur}-500/20 rounded-lg p-3 mb-4">
                <p class="text-${book.couleur}-400 text-sm font-medium">Code Promo: ${book.code}</p>
                <p class="text-gray-400 text-xs">Jusqu'à ${book.max}</p>
            </div>
            <div class="flex gap-2">
                <button class="bg-${book.couleur}-500 text-white px-4 py-2 rounded-lg text-sm btnAnim flex-1">
                    <i class="fas fa-external-link-alt mr-2"></i>S'inscrire
                </button>
                <button class="btnCopyCode bg-gray-600 text-white px-3 py-2 rounded-lg text-sm btnAnim" data-code="${book.code}">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function afficherBonusQuot() {
    const cont = document.getElementById('bonusQuot');
    cont.innerHTML = data.bonusQuot.map((bonus, i) => `
        <div class="bg-gradient-to-r from-${bonus.couleur}/20 to-${bonus.couleur === 'jauneAcc' ? 'yellow-500' : bonus.couleur + '-500'}/20 rounded-xl p-4 border border-${bonus.couleur === 'jauneAcc' ? 'yellow-500' : bonus.couleur + '-500'}/30">
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-${bonus.couleur === 'jauneAcc' ? 'yellow-500' : bonus.couleur + '-500'} rounded-full flex items-center justify-center mr-3">
                        <i class="${bonus.icone} ${bonus.couleur === 'jauneAcc' ? 'text-gray-900' : 'text-white'} text-sm"></i>
                    </div>
                    <div>
                        <p class="text-white font-medium text-sm">${bonus.nom}</p>
                        <p class="text-gray-400 text-xs">${bonus.desc}</p>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <p class="text-${bonus.couleur === 'jauneAcc' ? 'yellow-500' : bonus.couleur + '-400'} font-bold text-lg mb-2">${bonus.montant}</p>
                <button class="btnBonusQuot bg-${bonus.couleur === 'jauneAcc' ? 'yellow-500' : bonus.couleur + '-500'} ${bonus.couleur === 'jauneAcc' ? 'text-gray-900' : 'text-white'} px-4 py-2 rounded-lg text-sm btnAnim w-full" data-bonus="${bonus.nom}" data-montant="${bonus.montant}">
                    <i class="fas ${i === 1 ? 'fa-play' : i === 2 ? 'fa-trophy' : 'fa-gift'} mr-2"></i>${bonus.btnText}
                </button>
            </div>
        </div>
    `).join('');
}

function afficherHistBonus() {
    const cont = document.getElementById('histBonus');
    cont.innerHTML = data.histBonus.map(hist => `
        <div class="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
            <div class="flex items-center">
                <div class="w-10 h-10 bg-${hist.couleur === 'jauneAcc' ? 'yellow-500' : hist.couleur + '-500'} rounded-full flex items-center justify-center mr-3">
                    <i class="${hist.icone} ${hist.couleur === 'jauneAcc' ? 'text-gray-900' : 'text-white'} text-sm"></i>
                </div>
                <div>
                    <p class="text-white font-medium text-sm">${hist.nom}</p>
                    <p class="text-gray-400 text-xs">${hist.temps}</p>
                </div>
            </div>
            <span class="text-green-400 font-bold">${hist.montant}</span>
        </div>
    `).join('');
}

function demarrerQuiz() {
    document.getElementById('quizAccueil').className = 'quizCache';
    document.getElementById('quizJeu').className = 'quizVisible';
    chargerQuestion();
}

function chargerQuestion() {
    const quest = data.quiz[questActu];
    document.getElementById('numQuest').textContent = questActu + 1;
    document.getElementById('txtQuestion').textContent = quest.q;
    document.getElementById('progressQuiz').style.width = `${((questActu + 1) / 10) * 100}%`;
    
    const contRep = document.getElementById('reponses');
    contRep.innerHTML = quest.r.map((rep, i) => `
        <button class="btnReponse w-full text-left p-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-all" data-index="${i}">
            ${String.fromCharCode(65 + i)}. ${rep}
        </button>
    `).join('');
    
    document.getElementById('btnPrecedent').disabled = questActu === 0;
    document.getElementById('btnSuivant').disabled = true;
}

function selectionnerReponse(index) {
    repUser[questActu] = index;
    document.querySelectorAll('.btnReponse').forEach((btn, i) => {
        btn.className = i === index 
            ? 'btnReponse w-full text-left p-3 rounded-lg bg-bleuDash text-white transition-all'
            : 'btnReponse w-full text-left p-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-all';
    });
    document.getElementById('btnSuivant').disabled = false;
}

function questionSuivante() {
    if (questActu < 9) {
        questActu++;
        chargerQuestion();
    } else {
        terminerQuiz();
    }
}

function questionPrecedente() {
    if (questActu > 0) {
        questActu--;
        chargerQuestion();
        if (repUser[questActu] !== undefined) {
            selectionnerReponse(repUser[questActu]);
        }
    }
}

function terminerQuiz() {
    scoreQuiz = 0;
    repUser.forEach((rep, i) => {
        if (rep === data.quiz[i].c) scoreQuiz++;
    });
    
    document.getElementById('quizJeu').className = 'quizCache';
    document.getElementById('quizResultat').className = 'quizVisible';
    
    const pourcentage = (scoreQuiz / 10) * 100;
    const bonusGagne = scoreQuiz >= 7 ? 5000 : scoreQuiz >= 5 ? 3000 : scoreQuiz >= 3 ? 1000 : 0;
    
    const iconResult = document.getElementById('iconeResultat');
    const titreResult = document.getElementById('titreResultat');
    const msgResult = document.getElementById('msgResultat');
    
    if (pourcentage >= 70) {
        iconResult.className = 'w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 iconeFlottante';
        iconResult.innerHTML = '<i class="fas fa-trophy text-3xl text-white"></i>';
        titreResult.textContent = 'Excellent !';
        titreResult.className = 'text-xl font-bold mb-2 text-green-400';
        msgResult.textContent = `Vous avez obtenu ${scoreQuiz}/10 bonnes réponses !`;
    } else if (pourcentage >= 50) {
        iconResult.className = 'w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 iconeFlottante';
        iconResult.innerHTML = '<i class="fas fa-medal text-3xl text-gray-900"></i>';
        titreResult.textContent = 'Bien joué !';
        titreResult.className = 'text-xl font-bold mb-2 text-yellow-400';
        msgResult.textContent = `Vous avez obtenu ${scoreQuiz}/10 bonnes réponses.`;
    } else {
        iconResult.className = 'w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 iconeFlottante';
        iconResult.innerHTML = '<i class="fas fa-times text-3xl text-white"></i>';
        titreResult.textContent = 'Dommage !';
        titreResult.className = 'text-xl font-bold mb-2 text-red-400';
        msgResult.textContent = `Vous avez obtenu ${scoreQuiz}/10 bonnes réponses.`;
    }
    
    document.getElementById('montantBonus').textContent = bonusGagne.toLocaleString();
    
    if (bonusGagne > 0) {
        setTimeout(() => {
            afficherNotification('Bonus Reçu !', `Vous avez gagné ${bonusGagne.toLocaleString()} XOF !`, 'success');
        }, 1000);
    }
}

function recommencerQuiz() {
    questActu = 0;
    scoreQuiz = 0;
    repUser = [];
    document.getElementById('quizResultat').className = 'quizCache';
    document.getElementById('quizAccueil').className = 'quizVisible';
}

function afficherNotification(titre, message, type) {
    const modal = document.getElementById('modalNotif');
    const icon = document.getElementById('iconeNotif');
    const titreEl = document.getElementById('titreNotif');
    const msgEl = document.getElementById('msgNotif');
    
    titreEl.textContent = titre;
    msgEl.textContent = message;
    
    if (type === 'success') {
        icon.className = 'w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-green-500';
        icon.innerHTML = '<i class="fas fa-check text-white text-2xl"></i>';
    } else if (type === 'error') {
        icon.className = 'w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-red-500';
        icon.innerHTML = '<i class="fas fa-times text-white text-2xl"></i>';
    } else {
        icon.className = 'w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-blue-500';
        icon.innerHTML = '<i class="fas fa-info text-white text-2xl"></i>';
    }
    
    modal.classList.remove('hidden');
}

function fermerNotification() {
    document.getElementById('modalNotif').classList.add('hidden');
}

function copierCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        afficherNotification('Code Copié !', `Le code ${code} a été copié dans le presse-papier.`, 'success');
    }).catch(() => {
        afficherNotification('Erreur', 'Impossible de copier le code.', 'error');
    });
}

function reclamerBonus(nom, montant) {
    afficherNotification('Bonus Réclamé !', `Vous avez réclamé le bonus ${nom} de ${montant} !`, 'success');
}

function partagerCode() {
    const code = 'XBEJEU';
    const message = `🎉 Rejoignez Flash Service avec mon code de parrainage: ${code}\n\n💰 Gagnez des bonus incroyables !\n🎯 Pronostics VIP\n📱 https://flashservice.ci`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Flash Service - Code Parrainage',
            text: message
        });
    } else {
        navigator.clipboard.writeText(message).then(() => {
            afficherNotification('Code Partagé !', 'Le message de parrainage a été copié !', 'success');
        });
    }
}

function verifierIdBookmaker() {
    const id = document.getElementById('idBookmaker').value.trim();
    if (id) {
        afficherNotification('ID Vérifié !', `Votre ID ${id} a été vérifié avec succès !`, 'success');
    } else {
        afficherNotification('Erreur', 'Veuillez saisir votre ID Bookmaker.', 'error');
    }
}

function aller(url) {
    window.location.href = url;
}

function ouvrirMenu() {
    const menu = document.getElementById('menu');
    const fond = document.getElementById('fondMenu');
    
    menu.classList.add('ouvert');
    fond.classList.add('actif');
}

function fermerMenu() {
    const menu = document.getElementById('menu');
    const fond = document.getElementById('fondMenu');
    
    menu.classList.remove('ouvert');
    fond.classList.remove('actif');
}

document.addEventListener('DOMContentLoaded', function() {
    afficherStats();
    afficherVip();
    afficherBookmakers();
    afficherBonusQuot();
    afficherHistBonus();
    
    document.getElementById('btnOuvrir').addEventListener('click', ouvrirMenu);
    document.getElementById('btnFermer').addEventListener('click', fermerMenu);
    document.getElementById('fondMenu').addEventListener('click', fermerMenu);
    
    document.getElementById('btnDemarrerQuiz').addEventListener('click', demarrerQuiz);
    document.getElementById('btnSuivant').addEventListener('click', questionSuivante);
    document.getElementById('btnPrecedent').addEventListener('click', questionPrecedente);
    document.getElementById('btnRestart').addEventListener('click', recommencerQuiz);
    
    document.getElementById('reponses').addEventListener('click', function(e) {
        if (e.target.classList.contains('btnReponse')) {
            const index = parseInt(e.target.dataset.index);
            selectionnerReponse(index);
        }
    });
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btnBonusQuot') || e.target.closest('.btnBonusQuot')) {
            const btn = e.target.classList.contains('btnBonusQuot') ? e.target : e.target.closest('.btnBonusQuot');
            const bonus = btn.dataset.bonus;
            const montant = btn.dataset.montant;
            reclamerBonus(bonus, montant);
        }
    });
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btnCopyCode') || e.target.closest('.btnCopyCode')) {
            const btn = e.target.classList.contains('btnCopyCode') ? e.target : e.target.closest('.btnCopyCode');
            const code = btn.dataset.code;
            copierCode(code);
        }
    });
    
    const btnPartager = document.getElementById('btnPartager');
    if (btnPartager) {
        btnPartager.addEventListener('click', partagerCode);
    }
    
    const btnVerifId = document.getElementById('btnVerifId');
    if (btnVerifId) {
        btnVerifId.addEventListener('click', verifierIdBookmaker);
    }
    
    document.getElementById('btnFermNotif').addEventListener('click', fermerNotification);
    
    document.getElementById('btnDeco').addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
            window.location.href = '/auth/login.html';
        }
    });
});

setInterval(() => {
    const scoreEl = document.getElementById('scoreQuiz');
    if (scoreEl && document.getElementById('quizJeu').classList.contains('quizVisible')) {
        scoreEl.textContent = `Score: ${scoreQuiz}`;
    }
}, 100);