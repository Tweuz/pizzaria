// Gerenciador de Pizzas Meio a Meio
let pizzaSelecionada = null;
let modoMeioAMeio = false;

// Abrir modal de seleção para pizza grande
function openHalfPizzaModal(pizzaName, price, size) {
    // Verificar se é pizza grande e não é 4 Estações
    if (size !== 'Grande' || pizzaName === '4 Estações') {
        // Adicionar pizza normal
        addToCart(pizzaName, price, size, 'pizza');
        return;
    }

    pizzaSelecionada = {
        nome: pizzaName,
        preco: price,
        tamanho: size
    };

    // Criar modal
    const modal = document.createElement('div');
    modal.className = 'half-pizza-modal';
    modal.id = 'halfPizzaModal';

    let conteudo = `
        <div class="half-pizza-content">
            <div class="half-pizza-header">
                <h2>${pizzaName}</h2>
                <button class="close-btn" onclick="closeHalfPizzaModal()">✕</button>
            </div>

            <div class="half-pizza-body">
                <p class="half-pizza-question">Como você quer sua pizza?</p>
                
                <div class="half-pizza-options">
                    <button class="half-pizza-option" onclick="selectPizzaOption('inteira')">
                        <div class="option-icon">🍕</div>
                        <div class="option-text">
                            <h3>Pizza Inteira</h3>
                            <p>Apenas ${pizzaName}</p>
                            <p class="option-price">R$ ${price.toFixed(2).replace('.', ',')}</p>
                        </div>
                    </button>

                    <button class="half-pizza-option" onclick="selectPizzaOption('meioameia')">
                        <div class="option-icon">🍕🍕</div>
                        <div class="option-text">
                            <h3>Meio a Meio</h3>
                            <p>Escolha outro sabor</p>
                            <p class="option-price">R$ ${price.toFixed(2).replace('.', ',')}</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    `;

    modal.innerHTML = conteudo;
    document.body.appendChild(modal);

    // Fechar ao clicar fora
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeHalfPizzaModal();
        }
    });
}

// Selecionar opção de pizza
function selectPizzaOption(option) {
    if (option === 'inteira') {
        // Pizza inteira: adiciona direto
        addToCart(pizzaSelecionada.nome, pizzaSelecionada.preco, pizzaSelecionada.tamanho, 'pizza');
        closeHalfPizzaModal();
    } else if (option === 'meioameia') {
        modoMeioAMeio = true;
        openSecondFlavorModal();
    }
}


// Abrir modal para selecionar segundo sabor
function openSecondFlavorModal() {
    // Remover modal anterior
    const modalAnterior = document.getElementById('halfPizzaModal');
    if (modalAnterior) {
        modalAnterior.remove();
    }

    // Criar modal
    const modal = document.createElement('div');
    modal.className = 'half-pizza-modal';
    modal.id = 'halfPizzaModal';

    let conteudo = `
        <div class="half-pizza-content">
            <div class="half-pizza-header">
                <h2>Escolha o Segundo Sabor</h2>
                <button class="close-btn" onclick="closeHalfPizzaModal()">✕</button>
            </div>

            <div class="half-pizza-body">
                <p class="half-pizza-question">Primeiro sabor: <strong>${pizzaSelecionada.nome}</strong></p>
                
                <div class="flavor-select">
                    <input type="text" id="flavorSearch" placeholder="Buscar sabor..." class="flavor-search" onkeyup="filterFlavors()">
                    <div class="flavor-list" id="flavorList">
    `;

    // Adicionar todas as pizzas disponíveis
    Object.keys(menuData).forEach(categoria => {
        menuData[categoria].forEach(pizza => {
            conteudo += `
                <div class="flavor-item" onclick="selectSecondFlavor('${pizza.nome}')">
                    <p class="flavor-name">Nº ${pizza.numero} - ${pizza.nome}</p>
                    <p class="flavor-ingredients">${pizza.ingredientes}</p>
                </div>
            `;
        });
    });

    conteudo += `
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.innerHTML = conteudo;
    document.body.appendChild(modal);

    // Fechar ao clicar fora
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeHalfPizzaModal();
        }
    });
}

// Selecionar segundo sabor
function selectSecondFlavor(flavorName) {
    // Criar nome do item com meio a meio
    const itemName = `${pizzaSelecionada.nome} + ${flavorName} (Meio a Meio)`;
    
    // Adicionar ao carrinho
    addToCart(itemName, pizzaSelecionada.preco, pizzaSelecionada.tamanho);
    
    closeHalfPizzaModal();
}

// Filtrar sabores na busca
function filterFlavors() {
    const searchInput = document.getElementById('flavorSearch');
    const flavorItems = document.querySelectorAll('.flavor-item');
    const searchTerm = searchInput.value.toLowerCase();

    flavorItems.forEach(item => {
        const flavorName = item.querySelector('.flavor-name').textContent.toLowerCase();
        if (flavorName.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Fechar modal
function closeHalfPizzaModal() {
    const modal = document.getElementById('halfPizzaModal');
    if (modal) {
        modal.remove();
    }
    pizzaSelecionada = null;
    modoMeioAMeio = false;
}
