        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'bleu': '#1e40af',
                        'bleu-fonce': '#1e3a8a',
                        'jaune': '#fbbf24',
                        'jaune-clair': '#fef3c7'
                    }
                }
            }
        }

        const btnOuvr = document.getElementById('btnOuvr');
        const btnFerm = document.getElementById('btnFerm');
        const menu = document.getElementById('menu');
        const overlay = document.getElementById('overlay');
        const modal = document.getElementById('modalDet');
        const btnFermMod = document.getElementById('btnFermMod');

        let transAct = null;

        btnOuvr.addEventListener('click', () => {
            menu.classList.remove('-translate-x-full');
            overlay.classList.remove('hidden');
        });

        btnFerm.addEventListener('click', () => {
            menu.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        });

        overlay.addEventListener('click', () => {
            menu.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        });

        btnFermMod.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        const trans = [
            { 
                id: 1, 
                idCompt: 'BC-2021-001',
                nom: 'Jean Dupont', 
                mont: 75000, 
                typ: 'retrait', 
                plat: '1xBet',
                meth: 'Orange Money', 
                num: '+22501020304',
                codeRet: 'RT789123',
                dat: '2025-06-05 14:30', 
                stat: 'attente',
                frais: 1500
            },
            { 
                id: 2, 
                idCompt: 'BC-2021-002',
                nom: 'Marie Martin', 
                mont: 37500, 
                typ: 'depot', 
                plat: 'Melbet',
                meth: 'Moov Money', 
                num: '+22505060708',
                codeRet: '',
                dat: '2025-06-05 12:15', 
                stat: 'attente',
                frais: 0
            },
            { 
                id: 3,
                idCompt: 'BC-2021-003', 
                nom: 'Pierre Durand', 
                mont: 100000, 
                typ: 'retrait', 
                plat: '1xBet',
                meth: 'MTN Money', 
                num: '+22507080910',
                codeRet: 'RT456789',
                dat: '2025-06-04 16:45', 
                stat: 'valide',
                frais: 2000
            },
            { 
                id: 4, 
                idCompt: 'BC-2021-004',
                nom: 'Sophie Leroy', 
                mont: 25000, 
                typ: 'depot', 
                plat: 'Melbet',
                meth: 'Wave', 
                num: '+22509101112',
                codeRet: '',
                dat: '2025-06-04 11:20', 
                stat: 'rejete',
                frais: 0
            },
            { 
                id: 5, 
                idCompt: 'BC-2021-005',
                nom: 'Ahmed Kone', 
                mont: 50000, 
                typ: 'retrait', 
                plat: '1xBet',
                meth: 'Flash Service', 
                num: '+22504050607',
                codeRet: 'RT654321',
                dat: '2025-06-05 09:10', 
                stat: 'attente',
                frais: 1000
            },
            { 
                id: 6, 
                idCompt: 'BC-2021-006',
                nom: 'Fatou Diallo', 
                mont: 15000, 
                typ: 'depot', 
                plat: 'Melbet',
                meth: 'Orange Money', 
                num: '+22502030405',
                codeRet: '',
                dat: '2025-06-05 08:45', 
                stat: 'attente',
                frais: 0
            },
            { 
                id: 7, 
                idCompt: 'BC-2021-007',
                nom: 'Koffi Yao', 
                mont: 200000, 
                typ: 'retrait', 
                plat: '1xBet',
                meth: 'Orange Money', 
                num: '+22508090102',
                codeRet: 'RT123456',
                dat: '2025-06-08 15:30', 
                stat: 'valide',
                frais: 4000
            },
            { 
                id: 8, 
                idCompt: 'BC-2021-008',
                nom: 'Aya Traore', 
                mont: 60000, 
                typ: 'depot', 
                plat: 'Melbet',
                meth: 'MTN Money', 
                num: '+22510203040',
                codeRet: '',
                dat: '2025-06-08 10:15', 
                stat: 'rejete',
                frais: 0
            }
        ];

        function filPer(t) {
            const maint = new Date();
            const dateTrans = new Date(t.dat);
            const per = document.getElementById('filPer').value;
            
            switch(per) {
                case 'auj':
                    return dateTrans.toDateString() === maint.toDateString();
                case 'hier':
                    const hier = new Date(maint);
                    hier.setDate(hier.getDate() - 1);
                    return dateTrans.toDateString() === hier.toDateString();
                case 'moisAct':
                    return dateTrans.getMonth() === maint.getMonth() && 
                           dateTrans.getFullYear() === maint.getFullYear();
                case 'moisDer':
                    const moisDer = new Date(maint);
                    moisDer.setMonth(moisDer.getMonth() - 1);
                    return dateTrans.getMonth() === moisDer.getMonth() && 
                           dateTrans.getFullYear() === moisDer.getFullYear();
                default:
                    return true;
            }
        }

        function affAtt() {
            const tabAtt = trans.filter(t => t.stat === 'attente');
            const tab = document.getElementById('tabAtt');
            const mob = document.getElementById('attMob');
            
            tab.innerHTML = '';
            mob.innerHTML = '';

            tabAtt.forEach(t => {
                const coulTyp = t.typ === 'retrait' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
                const iconTyp = t.typ === 'retrait' ? 'fa-arrow-up' : 'fa-arrow-down';
                
                const row = document.createElement('tr');
                row.className = 'hover:bg-gray-50 cursor-pointer';
                row.onclick = () => affMod(t);
                row.innerHTML = `
                    <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${t.id}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">${t.nom}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${t.mont.toLocaleString()} XOF</td>
                    <td class="px-4 py-4 whitespace-nowrap">
                        <span class="px-2 py-1 text-xs rounded-full ${coulTyp}">
                            <i class="fas ${iconTyp} mr-1"></i>${t.typ.charAt(0).toUpperCase() + t.typ.slice(1)}
                        </span>
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">${t.plat}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">${t.meth}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">${t.num}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-500">${t.idCompt}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">${t.dat}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                        <button onclick="event.stopPropagation(); valTrans(${t.id})" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors text-xs">
                            <i class="fas fa-check mr-1"></i>Valider
                        </button>
                        <button onclick="event.stopPropagation(); rejTrans(${t.id})" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors text-xs">
                            <i class="fas fa-times mr-1"></i>Rejeter
                        </button>
                    </td>
                `;
                tab.appendChild(row);

                const card = document.createElement('div');
                card.className = 'border-b border-gray-200 p-4 cursor-pointer hover:bg-gray-50';
                card.onclick = () => affMod(t);
                card.innerHTML = `
                    <div class="space-y-3">
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="font-medium text-gray-900">#${t.id} - ${t.nom}</p>
                                <p class="text-sm text-gray-500">${t.dat}</p>
                                <p class="text-sm text-gray-500">${t.plat} - ${t.meth}</p>
                                <p class="text-sm text-gray-500">${t.num}</p>
                                <p class="text-sm text-gray-500">${t.idCompt}</p>
                            </div>
                            <div class="text-right">
                                <span class="px-2 py-1 text-xs rounded-full ${coulTyp}">
                                    <i class="fas ${iconTyp} mr-1"></i>${t.typ.charAt(0).toUpperCase() + t.typ.slice(1)}
                                </span>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <p class="text-lg font-bold text-gray-900">${t.mont.toLocaleString()} XOF</p>
                            <div class="flex space-x-2">
                                <button onclick="event.stopPropagation(); valTrans(${t.id})" class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors text-xs">
                                    <i class="fas fa-check mr-1"></i>Valider
                                </button>
                                <button onclick="event.stopPropagation(); rejTrans(${t.id})" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors text-xs">
                                    <i class="fas fa-times mr-1"></i>Rejeter
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                mob.appendChild(card);
            });

            if (tabAtt.length === 0) {
                tab.innerHTML = '<tr><td colspan="10" class="text-center py-8 text-gray-500">Aucune transaction en attente</td></tr>';
                mob.innerHTML = '<div class="text-center py-8 text-gray-500">Aucune transaction en attente</div>';
            }
        }

        function affHist() {
            const filTyp = document.getElementById('filTyp').value;
            
            const transFil = trans.filter(t => {
                const typOk = !filTyp || t.typ === filTyp;
                const perOk = filPer(t);
                const histOk = t.stat !== 'attente';
                return typOk && perOk && histOk;
            });

            const tab = document.getElementById('tabHist');
            const mob = document.getElementById('histMob');
            
            tab.innerHTML = '';
            mob.innerHTML = '';

            transFil.forEach(t => {
                const coulTyp = t.typ === 'retrait' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
                const iconTyp = t.typ === 'retrait' ? 'fa-arrow-up' : 'fa-arrow-down';
                
                let coulStat, txtStat;
                switch(t.stat) {
                    case 'valide':
                        coulStat = 'bg-green-100 text-green-800';
                        txtStat = 'Validée';
                        break;
                    case 'rejete':
                        coulStat = 'bg-red-100 text-red-800';
                        txtStat = 'Rejetée';
                        break;
                }

                const row = document.createElement('tr');
                row.className = 'hover:bg-gray-50 cursor-pointer';
                row.onclick = () => affMod(t);
                row.innerHTML = `
                    <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${t.id}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">${t.nom}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${t.mont.toLocaleString()} XOF</td>
                    <td class="px-4 py-4 whitespace-nowrap">
                        <span class="px-2 py-1 text-xs rounded-full ${coulTyp}">
                            <i class="fas ${iconTyp} mr-1"></i>${t.typ.charAt(0).toUpperCase() + t.typ.slice(1)}
                        </span>
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">${t.plat}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">${t.meth}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">${t.num}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-500">${t.idCompt}</td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">${t.dat}</td>
                    <td class="px-4 py-4 whitespace-nowrap">
                        <span class="px-2 py-1 text-xs rounded-full ${coulStat}">${txtStat}</span>
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                        <button onclick="event.stopPropagation(); affMod(${JSON.stringify(t).replace(/"/g, '&quot;')})" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors text-xs">
                            <i class="fas fa-eye mr-1"></i>Voir
                        </button>
                    </td>
                `;
                tab.appendChild(row);

                const card = document.createElement('div');
                card.className = 'border-b border-gray-200 p-4 cursor-pointer hover:bg-gray-50';
                card.onclick = () => affMod(t);
                card.innerHTML = `<div class="space-y-3">
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="font-medium text-gray-900">#${t.id} - ${t.nom}</p>
                                <p class="text-sm text-gray-500">${t.dat}</p>
                                <p class="text-sm text-gray-500">${t.plat} - ${t.meth}</p>
                                <p class="text-sm text-gray-500">${t.num}</p>
                                <p class="text-sm text-gray-500">${t.idCompt}</p>
                            </div>
                            <div class="text-right">
                                <span class="px-2 py-1 text-xs rounded-full ${coulStat}">${txtStat}</span>
                                <div class="mt-1">
                                    <span class="px-2 py-1 text-xs rounded-full ${coulTyp}">
                                        <i class="fas ${iconTyp} mr-1"></i>${t.typ.charAt(0).toUpperCase() + t.typ.slice(1)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <p class="text-lg font-bold text-gray-900">${t.mont.toLocaleString()} XOF</p>
                            <button onclick="event.stopPropagation(); affMod(${JSON.stringify(t).replace(/"/g, '&quot;')})" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors text-xs">
                                <i class="fas fa-eye mr-1"></i>Voir
                            </button>
                        </div>
                    </div>
                `;
                mob.appendChild(card);
            });

            if (transFil.length === 0) {
                tab.innerHTML = '<tr><td colspan="11" class="text-center py-8 text-gray-500">Aucune transaction trouvée</td></tr>';
                mob.innerHTML = '<div class="text-center py-8 text-gray-500">Aucune transaction trouvée</div>';
            }
        }

        function affMod(t) {
            transAct = t;
            const cont = document.getElementById('contMod');
            
            cont.innerHTML = `
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <p class="text-sm text-gray-500">ID Transaction</p>
                        <p class="font-medium">#${t.id}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Utilisateur</p>
                        <p class="font-medium">${t.nom}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Montant</p>
                        <p class="font-medium text-lg">${t.mont.toLocaleString()} XOF</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Type</p>
                        <p class="font-medium">${t.typ.charAt(0).toUpperCase() + t.typ.slice(1)}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Plateforme</p>
                        <p class="font-medium">${t.plat}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Méthode</p>
                        <p class="font-medium">${t.meth}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Numéro</p>
                        <p class="font-medium">${t.num}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">ID du compte</p>
                        <p class="font-medium">${t.idCompt}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500">Date</p>
                        <p class="font-medium">${t.dat}</p>
                    </div>
                    ${t.codeRet ? `
                    <div>
                        <p class="text-sm text-gray-500">Code retrait</p>
                        <p class="font-medium">${t.codeRet}</p>
                    </div>` : ''}
                    ${t.frais > 0 ? `
                    <div>
                        <p class="text-sm text-gray-500">Frais</p>
                        <p class="font-medium">${t.frais.toLocaleString()} XOF</p>
                    </div>` : ''}
                </div>
            `;

            const btnVal = document.getElementById('btnVal');
            const btnRej = document.getElementById('btnRej');
            
            if (t.stat !== 'attente') {
                btnVal.style.display = 'none';
                btnRej.style.display = 'none';
            } else {
                btnVal.style.display = 'inline-block';
                btnRej.style.display = 'inline-block';
            }

            modal.classList.remove('hidden');
        }

        function valTrans(id) {
            const idx = trans.findIndex(t => t.id === id);
            if (idx !== -1) {
                trans[idx].stat = 'valide';
                majNotif();
                affAtt();
                affHist();
                modal.classList.add('hidden');
            }
        }

        function rejTrans(id) {
            const idx = trans.findIndex(t => t.id === id);
            if (idx !== -1) {
                trans[idx].stat = 'rejete';
                majNotif();
                affAtt();
                affHist();
                modal.classList.add('hidden');
            }
        }

        function majNotif() {
            const nbAtt = trans.filter(t => t.stat === 'attente').length;
            document.getElementById('notif').textContent = nbAtt;
        }

        document.getElementById('btnVal').addEventListener('click', () => {
            if (transAct) {
                valTrans(transAct.id);
            }
        });

        document.getElementById('btnRej').addEventListener('click', () => {
            if (transAct) {
                rejTrans(transAct.id);
            }
        });

        document.getElementById('filPer').addEventListener('change', affHist);
        document.getElementById('filTyp').addEventListener('change', affHist);

        document.getElementById('btnDeco').addEventListener('click', () => {
            if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
                window.location.href = 'login.html';
            }
        });

        majNotif();
        affAtt();
        affHist();