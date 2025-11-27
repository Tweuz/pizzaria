// Gerenciador simples de meio a meio
let halfPizzaOption = 'nao'; // Padrão: não

// Definir opção de meio a meio
function setHalfPizza(option) {
    halfPizzaOption = option;
    
    // Atualizar botões
    const noBtn = document.getElementById('halfPizzaNo');
    const simBtn = document.getElementById('halfPizzaSim');
    const flavorInput = document.getElementById('halfPizzaFlavor');
    
    if (option === 'nao') {
        noBtn.classList.add('active');
        simBtn.classList.remove('active');
        flavorInput.style.display = 'none';
        flavorInput.value = ''; // Limpar o campo
    } else {
        simBtn.classList.add('active');
        noBtn.classList.remove('active');
        flavorInput.style.display = 'block';
        flavorInput.focus(); // Focar no campo
    }
}

// Obter opção de meio a meio
function getHalfPizzaOption() {
    return halfPizzaOption;
}

// Obter sabor do meio a meio
function getHalfPizzaFlavor() {
    const flavorInput = document.getElementById('halfPizzaFlavor');
    return flavorInput.value.trim();
}
