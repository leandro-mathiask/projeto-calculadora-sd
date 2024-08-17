function validateCheckboxes() {
    // Obtém todas as checkboxes pelo nome
    const checkboxes = document.querySelectorAll('.checkbox-group input[name="option"]');
    // Verifica se pelo menos uma checkbox está marcada
    const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

    // Desabilita ou habilita o botão de prosseguir
    const esconderButton = document.getElementById("btn-calcular");
    const esconderResult = document.getElementById("result-valor");
    if (isChecked) {
        esconderButton.classList.remove("hidden");
        esconderResult.classList.remove("hidden");
    } else {
        esconderButton.classList.add("hidden");
        esconderResult.classList.add("hidden");
    }

    // Mostra ou esconde o aviso com base na condição
    document.getElementById("warning").style.display = isChecked ? "none" : "block";
}
document.addEventListener('DOMContentLoaded', (event) => {
    validateCheckboxes();
});

// Deixa marcar apenas uma checkbox
document.querySelectorAll('.checkbox-group input').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            document.querySelectorAll('.checkbox-group input').forEach(cb => {
                if (cb !== this) cb.checked = false;
            });
        }
    });
});

// Formulario
const form = document.getElementById('form');
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio do formulário

    // Obtendo valores dos inputs
    const mesesTrabalhados = parseInt(document.getElementById('meses').value);
    let mediaRemurecao = parseFloat(document.getElementById('remuneracoes').value);
    // let mediaRemurecao = (remuneracoesTotal / 3).toFixed(2); // Cálculo da média das remunerações
    let result;

    // Aplicando as regras para o cálculo do valor final
    if (mediaRemurecao <= 2041.39) {
        result = (mediaRemurecao * 0.8).toFixed(2);
    } else if (mediaRemurecao >= 2041.40 && mediaRemurecao <= 3402.65) {
        result = (1633.10 + ((mediaRemurecao - 2041.39) * 0.5)).toFixed(2);
    } else if (mediaRemurecao > 3402.65) {
        result = "2313.74";
    }

    // Garantir que o valor mínimo seja R$ 1.412,00
    if (result < 1412.00) {
        result = "1412.00";
    }


    const value = document.getElementById('value');
    const parcelas = document.getElementById('parcelas');

    // Referências às checkboxes
    const solicitacao1 = document.getElementById('solicitacao1');
    const solicitacao2 = document.getElementById('solicitacao2');
    const solicitacao3 = document.getElementById('solicitacao3');

    // Verificando se qualquer checkbox está marcada
    const isSolicitacao3Checked = solicitacao3.checked;
    const isSolicitacao2Checked = solicitacao2.checked;
    const isSolicitacao1Checked = solicitacao1.checked;

    // Diferença dos meses faltantes
    const dif1vez = (12 - mesesTrabalhados);
    const dif2vez = (9 - mesesTrabalhados);
    const dif3vez = (6 - mesesTrabalhados);

    // Validações para meses trabalhados entre 6 e 9 meses para solicitacao3
    if (isSolicitacao3Checked && mesesTrabalhados >= 6 && mesesTrabalhados <= 11) {
        document.getElementById('infos_results').classList.remove('hidden');
        parcelas.textContent = `Parcelas a receber: 03`;
        value.textContent = 'Valor a Receber: R$ ' + result.replace('.', ',');
    } else if (isSolicitacao2Checked && mesesTrabalhados >= 9 && mesesTrabalhados <= 11) {
        document.getElementById('infos_results').classList.remove('hidden');
        parcelas.textContent = `Parcelas a receber: 03`;
        value.textContent = 'Valor a Receber: R$ ' + result.replace('.', ',');
    } else if (isSolicitacao1Checked && mesesTrabalhados >=12 && mesesTrabalhados <= 23) {
        document.getElementById('infos_results').classList.remove('hidden');
        parcelas.textContent = `Parcelas a receber: 04`;
        value.textContent = 'Valor a Receber: R$ ' + result.replace('.', ',');
    } else if (isSolicitacao3Checked && mesesTrabalhados >=12 && mesesTrabalhados <= 23) {
        document.getElementById('infos_results').classList.remove('hidden');
        parcelas.textContent = `Parcelas a receber: 04`;
        value.textContent = 'Valor a Receber: R$ ' + result.replace('.', ',');
    } else if (isSolicitacao2Checked && mesesTrabalhados >=12 && mesesTrabalhados <= 23) {
        document.getElementById('infos_results').classList.remove('hidden');
        parcelas.textContent = `Parcelas a receber: 04`;
        value.textContent = 'Valor a Receber: R$ ' + result.replace('.', ',');
    } else if (isSolicitacao1Checked && mesesTrabalhados >=24) {
        document.getElementById('infos_results').classList.remove('hidden');
        parcelas.textContent = `Parcelas a receber: 05`;
        value.textContent = 'Valor a Receber: R$ ' + result.replace('.', ',');
    } else if (isSolicitacao2Checked && mesesTrabalhados >=24) {
        document.getElementById('infos_results').classList.remove('hidden');
        parcelas.textContent = `Parcelas a receber: 05`;
        value.textContent = 'Valor a Receber: R$ ' + result.replace('.', ',');
    } else if (isSolicitacao3Checked && mesesTrabalhados >=24) {
        document.getElementById('infos_results').classList.remove('hidden');
        parcelas.textContent = `Parcelas a receber: 05`;
        value.textContent = 'Valor a Receber: R$ ' + result.replace('.', ',');
    } else if (isSolicitacao1Checked && mesesTrabalhados <=11) {
        document.getElementById('infos_results').classList.remove('hidden');
        parcelas.textContent = `Desculpe, voçê não tem direito a seguro!`;
        value.textContent = `Faltam: ${dif1vez} meses`;
    } else if (isSolicitacao2Checked && mesesTrabalhados <=8) {
        document.getElementById('infos_results').classList.remove('hidden');
        parcelas.textContent = `Desculpe, voçê não tem direito a seguro!`;
        value.textContent = `Faltam: ${dif2vez} meses`;
    } else if (isSolicitacao3Checked && mesesTrabalhados <=5) {
        document.getElementById('infos_results').classList.remove('hidden');
        parcelas.textContent = 'Desculpe, voçê não tem direito a seguro!';
        value.textContent = `Faltam: ${dif3vez} meses`;
    } else { 
        alert('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
});