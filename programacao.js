function mostrarDia(diaId, botaoClicado) {
    const dias = document.querySelectorAll('.dia');
    dias.forEach(dia => dia.style.display = 'none');
    document.getElementById(diaId).style.display = 'block';

    const botoes = document.querySelectorAll('.dia-btn');
    botoes.forEach(btn => btn.classList.remove('active'));

    botaoClicado.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarDia('dia1', document.querySelector('.dia-btn'));
});