const firebaseConfig = {
    apiKey: "AIzaSyAFx7--6XQnjL01tjgMHyxCnqzP01OUrng",
    authDomain: "jinclap.firebaseapp.com",
    databaseURL: "https://jinclap-default-rtdb.firebaseio.com",
    projectId: "jinclap",
    storageBucket: "jinclap.firebasestorage.app",
    messagingSenderId: "80147176913",
    appId: "1:80147176913:web:bc6dd18c425fea2b5614f0"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function votar(jogoId, time) {
  const votoRef = db.ref('palpites/' + jogoId + '/' + time);
  votoRef.transaction(current => (current || 0) + 1);
}


function atualizarBarra(jogoId, votos) {
  const barra = document.getElementById('barra-' + jogoId);
  if (!barra) return;

  const blocoAzul = barra.querySelector('.azul');
  const blocoVermelho = barra.querySelector('.vermelho');

  if (!blocoAzul || !blocoVermelho) {
    // Se os blocos não existem, cria-los:
    barra.innerHTML = `
      <div class="bloco azul"></div>
      <div class="bloco vermelho"></div>
    `;
  }

  const total = (votos.timeA || 0) + (votos.timeB || 0);
  let percentualA = 0;
  let percentualB = 0;

  if (total > 0) {
    percentualA = (votos.timeA / total) * 100;
    percentualB = (votos.timeB / total) * 100;
  }

  // Atualiza o estilo depois que os blocos foram criados
  barra.querySelector('.azul').style.width = percentualA + '%';
  barra.querySelector('.vermelho').style.width = percentualB + '%';
}

function iniciarListeners() {
  for(let i = 1; i <= 7; i++) {
    const jogoId = 'jogo' + i;
    db.ref('palpites/' + jogoId).on('value', snapshot => {
      const votos = snapshot.val() || { timeA: 0, timeB: 0 };
      atualizarBarra(jogoId, votos);
    });
  }
}

window.onload = iniciarListeners;
