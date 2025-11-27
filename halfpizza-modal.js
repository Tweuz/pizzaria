// Gerenciador de Modal de Meio a Meio para Pizzas Grandes

let currentPizzaData = null;
let selectedHalfPizzaOption = 'inteira';
let selectedSecondFlavor = null;

// Abrir modal de meio a meio
function openHalfPizzaModal(pizzaName, pizzaPrice, category) {
    currentPizzaData = {
        name: pizzaName,
        price: pizzaPrice,
        category: category
    };

    selectedHalfPizzaOption = 'inteira';
    selectedSecondFlavor = null;

    const titleElement = document.getElementById('halfPizzaModalTitle');
    if (titleElement) {
        titleElement.textContent =
            `${pizzaName.replace(' - Grande', '')} - R$ ${pizzaPrice.toFixed(2).replace('.', ',')}`;
    }

    const options = document.querySelectorAll('.half-pizza-option');
    options.forEach(opt => opt.classList.remove('active'));
    if (options[0]) options[0].classList.add('active');

    const flavorSelect = document.getElementById('halfPizzaFlavorSelect');
    if (flavorSelect) {
        flavorSelect.style.display = 'none';
    }

    populateHalfPizzaFlavors(category, pizzaName);

    const modal = document.getElementById('halfPizzaModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Selecionar opção (inteira ou meio a meio)
function selectHalfPizzaOption(option, event) {
    selectedHalfPizzaOption = option;

    const options = document.querySelectorAll('.half-pizza-option');
    options.forEach(opt => opt.classList.remove('active'));
    if (event && event.target.closest('.half-pizza-option')) {
        event.target.closest('.half-pizza-option').classList.add('active');
    }

    const flavorSelect = document.getElementById('halfPizzaFlavorSelect');
    if (flavorSelect) {
        flavorSelect.style.display = option === 'meia' ? 'block' : 'none';
    }
}

// Popular lista de sabores
function populateHalfPizzaFlavors(category, currentPizzaName) {
    const flavorList = document.getElementById('halfPizzaFlavorList');
    if (!flavorList) return;

    flavorList.innerHTML = '';

    // Promoção do dia: usa apenas sabores da promoção
    if (window.isDailyPromo && Array.isArray(window.dailyPromoFlavors)) {
        const cleanPizzaName = currentPizzaName.replace(' - Grande', '');
        window.dailyPromoFlavors.forEach(flavorName => {
            if (flavorName !== cleanPizzaName) {
                const button = document.createElement('button');
                button.className = 'flavor-button';
                button.textContent = flavorName;
                button.onclick = function () {
                    document.querySelectorAll('.flavor-button')
                        .forEach(btn => btn.classList.remove('selected'));
                    this.classList.add('selected');
                    selectedSecondFlavor = flavorName;
                };
                flavorList.appendChild(button);
            }
        });
        return;
    }

    // Juntar todas as pizzas de todas as categorias
    const allCategories = Object.keys(menuData);
    const cleanPizzaName = currentPizzaName.replace(' - Grande', '');
    const allPizzas = [];

    allCategories.forEach(cat => {
        (menuData[cat] || []).forEach(p => allPizzas.push(p));
    });

    allPizzas.forEach(pizza => {
        if (pizza.nome !== cleanPizzaName && pizza.nome !== '4 Estações') {
            const button = document.createElement('button');
            button.className = 'flavor-button';
            button.textContent = pizza.nome;
            button.onclick = function () {
                document.querySelectorAll('.flavor-button')
                    .forEach(btn => btn.classList.remove('selected'));
                this.classList.add('selected');
                selectedSecondFlavor = pizza.nome;
            };
            flavorList.appendChild(button);
        }
    });
}

// Confirmar seleção
function confirmHalfPizza() {
    if (!currentPizzaData) return;

    // --- PIZZA INTEIRA ---
    if (selectedHalfPizzaOption === 'inteira') {
        // Mesmo na promoção, usa o preço que veio (30 na promo)
        addToCart(currentPizzaData.name, currentPizzaData.price, 'Grande');
        closeHalfPizzaModal();
        return;
    }

    // --- MEIO A MEIO ---
    if (!selectedSecondFlavor) {
        alert('Por favor, escolha o segundo sabor para o meio a meio.');
        return;
    }

    // Se for promoção do dia: SEM ajuste, sempre preço da promo (30)
    if (window.isDailyPromo) {
        const pizzaName = currentPizzaData.name.replace(' - Grande', '');
        const itemName = `${pizzaName} + ${selectedSecondFlavor} (Meio a Meio) - Grande`;
        addToCart(itemName, currentPizzaData.price, 'Grande'); // permanece 30
        closeHalfPizzaModal();
        return;
    }

    // --------- LÓGICA NORMAL (fora da promoção) ---------
    const baseName = currentPizzaData.name.replace(' - Grande', '');
    let firstPrice = currentPizzaData.price;
    let secondPrice = currentPizzaData.price;

    Object.keys(menuData).forEach(cat => {
        (menuData[cat] || []).forEach(p => {
            if (p.nome === baseName && typeof p.grande === 'number') {
                firstPrice = p.grande;
            }
            if (p.nome === selectedSecondFlavor && typeof p.grande === 'number') {
                secondPrice = p.grande;
            }
        });
    });

    if (secondPrice > firstPrice) {
        alert(
            'Só para avisar: o segundo sabor que você escolheu é de uma categoria com preço maior.\n' +
            'O valor da pizza será atualizado para o preço do sabor mais caro.'
        );
    }

    const finalPrice = Math.max(firstPrice, secondPrice);
    const pizzaName = currentPizzaData.name.replace(' - Grande', '');
    const itemName = `${pizzaName} + ${selectedSecondFlavor} (Meio a Meio) - Grande`;

    addToCart(itemName, finalPrice, 'Grande');
    closeHalfPizzaModal();
}

// Fechar modal
function closeHalfPizzaModal() {
    const modal = document.getElementById('halfPizzaModal');
    if (modal) {
        modal.style.display = 'none';
    }

    currentPizzaData = null;
    selectedHalfPizzaOption = 'inteira';
    selectedSecondFlavor = null;
    window.isDailyPromo = false;
    window.dailyPromoFlavors = [];
}

// Fechar ao clicar fora
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('halfPizzaModal');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeHalfPizzaModal();
            }
        });
    }
});
