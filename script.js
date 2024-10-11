let numero;
let tentativas = 0;
let historico = [];
let timer;
let tempoInicial;

function iniciarJogo() {
    const nivel = document.getElementById('nivel').value;
    if (nivel === 'facil') {
        numero = Math.floor(Math.random() * 10) + 1;
    } else if (nivel === 'medio') {
        numero = Math.floor(Math.random() * 50) + 1;
    } else {
        numero = Math.floor(Math.random() * 100) + 1;
    }

    tentativas = 0;
    historico = [];
    document.getElementById('resultado').textContent = "Adivinhe um número!";
    document.getElementById('historico').innerHTML = '';
    document.getElementById('nivel-selection').style.display = 'none';
    document.getElementById('jogar').style.display = 'block';
    tempoInicial = Date.now();
    timer = setInterval(atualizarTempo, 1000);
}

function enviarPalpite() {
    const palpite = parseInt(document.getElementById('palpite').value);
    
    if (palpite < 1 || palpite > (numero > 10 ? (numero > 50 ? 100 : 50) : 10)) {
        document.getElementById('resultado').textContent = `Por favor, escolha um número entre 1 e ${numero > 10 ? (numero > 50 ? 100 : 50) : 10}.`;
        return;
    }

    tentativas++;
    historico.push(palpite);

    let resultado;
    if (palpite < numero) {
        resultado = "Tente um número maior!";
    } else if (palpite > numero) {
        resultado = "Tente um número menor!";
    } else {
        resultado = `Parabéns! Você acertou o número ${numero} em ${tentativas} tentativas!`;
        clearInterval(timer);
        document.getElementById('nivel-selection').style.display = 'block';
        document.getElementById('jogar').style.display = 'none';
    }

    document.getElementById('resultado').textContent = resultado;
    atualizarHistorico();
}

function atualizarHistorico() {
    const historicoList = document.getElementById('historico');
    historicoList.innerHTML = '';
    for (const tentativa of historico) {
        const li = document.createElement('li');
        li.textContent = tentativa;
        historicoList.appendChild(li);
    }
}

function atualizarTempo() {
    const tempoDecorrido = Math.floor((Date.now() - tempoInicial) / 1000);
    document.getElementById('tempo').textContent = `Tempo decorrido: ${tempoDecorrido} segundos`;
}

function reiniciarJogo() {
    clearInterval(timer);
    document.getElementById('nivel-selection').style.display = 'block';
    document.getElementById('jogar').style.display = 'none';
    document.getElementById('resultado').textContent = '';
    document.getElementById('tempo').textContent = '';
}
