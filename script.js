let respostas = [
    ["Frequentemente", "Muito importante", 5, 2],
    ["Às vezes", "Importante", 3, 4],
    ["Sempre", "Muito importante", 7, 5],
    ["Nunca", "Nada importante", 0, 0],
    ["Raramente", "Importante", 2, 1],
    ["Frequentemente", "Muito importante", 6, 8],
    ["Às vezes", "Pouco importante", 4, 3],
    ["Frequentemente", "Muito importante", 5, 6],
    ["Sempre", "Importante", 10, 7],
    ["Às vezes", "Pouco importante", 3, 2],
    ["Nunca", "Nada importante", 0, 0],
    ["Frequentemente", "Muito importante", 6, 9],
    ["Raramente", "Pouco importante", 2, 1],
    ["Às vezes", "Importante", 4, 5],
    ["Frequentemente", "Muito importante", 5, 4],
    ["Às vezes", "Pouco importante", 2, 3],
    ["Sempre", "Muito importante", 8, 6],
    ["Nunca", "Nada importante", 0, 0],
    ["Raramente", "Pouco importante", 1, 2],
    ["Frequentemente", "Muito importante", 5, 5],
    ["Às vezes", "Importante", 3, 3]
];

function calcularMedia(arr) {
    const soma = arr.reduce((acc, val) => acc + val, 0);
    return soma / arr.length;
}

function calcularModa(arr) {
    const frequencias = {};
    arr.forEach(val => frequencias[val] = (frequencias[val] || 0) + 1);
    let moda = Object.keys(frequencias).reduce((a, b) => frequencias[a] > frequencias[b] ? a : b);
    return moda;
}

function calcularMediana(arr) {
    const sorted = arr.sort((a, b) => a - b);
    const meio = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[meio - 1] + sorted[meio]) / 2 : sorted[meio];

function exibirResultados() {
    const tabelaResultados = document.getElementById('tabelaResultados').getElementsByTagName('tbody')[0];
    const horasPraticandoEsportes = respostas.map(resposta => parseInt(resposta[2], 10)); 
    const horasEsportesEletronicos = respostas.map(resposta => parseInt(resposta[3], 10));

    tabelaResultados.innerHTML = '';

    respostas.forEach((resposta, index) => {
        const frequencia = resposta[0];  
        const importancia = resposta[1]; 
        const horasEsportes = parseInt(resposta[2], 10); 
        const horasEsportesEletronicos = parseInt(resposta[3], 10); 
        const limiteInferior = isNaN(horasEsportes) || isNaN(horasEsportesEletronicos) ? 0 : Math.min(horasEsportes, horasEsportesEletronicos);
        const limiteSuperior = isNaN(horasEsportes) || isNaN(horasEsportesEletronicos) ? 0 : Math.max(horasEsportes, horasEsportesEletronicos);

        let classe = '';

        if (frequencia === "Nunca" && importancia === "Nada importante" && horasEsportes === 0 && horasEsportesEletronicos === 0) {
            classe = "Nada";
        } else if (horasEsportes >= horasEsportesEletronicos) {
            classe = "Praticante de Esportes";
        } else {
            classe = "Jogador de Esportes Eletrônicos";
        }

        const row = tabelaResultados.insertRow();
        row.insertCell(0).textContent = `Participante ${index + 1}`;
        row.insertCell(1).textContent = frequencia;
        row.insertCell(2).textContent = importancia;
        row.insertCell(3).textContent = horasEsportes;  
        row.insertCell(4).textContent = horasEsportesEletronicos;
        row.insertCell(5).textContent = limiteInferior;
        row.insertCell(6).textContent = limiteSuperior;
        row.insertCell(7).textContent = classe;
    });

    const mediaHorasPraticando = calcularMedia(horasPraticandoEsportes).toFixed(2);
    const modaHorasPraticando = calcularModa(horasPraticandoEsportes);
    const medianaHorasPraticando = calcularMediana(horasPraticandoEsportes).toFixed(2);

    const mediaHorasEletronicos = calcularMedia(horasEsportesEletronicos).toFixed(2);
    const modaHorasEletronicos = calcularModa(horasEsportesEletronicos);
    const medianaHorasEletronicos = calcularMediana(horasEsportesEletronicos).toFixed(2);

    const estatisticas = document.getElementById('estatisticas');
    estatisticas.innerHTML = `
        <strong>Horas praticando esportes:</strong><br>
        Média: ${mediaHorasPraticando} | Moda: ${modaHorasPraticando} | Mediana: ${medianaHorasPraticando}<br><br>

        <strong>Horas em esportes eletrônicos:</strong><br>
        Média: ${mediaHorasEletronicos} | Moda: ${modaHorasEletronicos} | Mediana: ${medianaHorasEletronicos}
    `;
}

document.getElementById('mostrarResultados').addEventListener('click', function() {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.style.display = resultadosDiv.style.display === 'none' ? 'block' : 'none';
    exibirResultados();
});
