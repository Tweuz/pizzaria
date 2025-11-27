// Promoção Terça em Dobro - Premium + Tradicional por R$ 56,00

function openTuesdayDoubleModal() {
    const today = new Date().getDay();
    
    // Verificar se é terça-feira
    if (today !== 2) {
        alert('Esta promoção é válida apenas às terças-feiras!');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'tuesdayDoubleModal';
    
    const modalContent = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Terça em Dobro - Premium + Tradicional</h2>
                <button class="modal-close" onclick="closeTuesdayDoubleModal()">×</button>
            </div>
            <div class="modal-body">
                <p><strong>R$ 56,00</strong></p>
                
                <div class="tuesday-double-step" id="tuesdayStep1">
                    <h3>Etapa 1 de 2: Escolha a Pizza Tradicional</h3>
                    <div class="pizza-select" id="traditionalPizzaSelect">
                        <!-- Pizzas tradicionais serão inseridas aqui -->
                    </div>
                </div>
                
                <div class="tuesday-double-step" id="tuesdayStep2" style="display: none;">
                    <h3>Etapa 2 de 2: Escolha a Pizza Premium</h3>
                    <div class="pizza-select" id="premiumPizzaSelect">
                        <!-- Pizzas premium serão inseridas aqui -->
                    </div>
                </div>
                
                <div id="tuesdayDoubleReview" style="display: none; margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
                    <h3>Seu Pedido:</h3>
                    <p><strong>Pizza Tradicional:</strong> <span id="selectedTraditional">-</span></p>
                    <p><strong>Pizza Premium:</strong> <span id="selectedPremium">-</span></p>
                    <p><strong>Total:</strong> R$ 56,00</p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeTuesdayDoubleModal()">Cancelar</button>
                <button class="btn btn-primary" id="tuesdayNextBtn" onclick="tuesdayDoubleNextStep()">Próximo</button>
                <button class="btn btn-primary" id="tuesdayConfirmBtn" onclick="confirmTuesdayDouble()" style="display: none;">Confirmar</button>
            </div>
        </div>
    `;
    
    modal.innerHTML = modalContent;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    // Popular pizzas tradicionais
    populateTuesdayTraditional();
    
    // Fechar ao clicar fora
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeTuesdayDoubleModal();
        }
    });
}

function populateTuesdayTraditional() {
    const container = document.getElementById('traditionalPizzaSelect');
    container.innerHTML = '';
    
    const tradicionais = menuData['Tradicionais'] || [];
    
    tradicionais.forEach(pizza => {
        if (pizza.nome !== '4 Estações') {
            const button = document.createElement('button');
            button.className = 'pizza-option-btn';
            button.innerHTML = `
                <strong>${pizza.nome}</strong><br>
                <small>${pizza.descricao}</small>
            `;
            button.onclick = function() {
                selectTuesdayPizza('traditional', pizza.nome, this);
            };
            container.appendChild(button);
        }
    });
}

function populateTuesdayPremium() {
    const container = document.getElementById('premiumPizzaSelect');
    container.innerHTML = '';
    
    const premium = menuData['Premium'] || [];
    
    premium.forEach(pizza => {
        const button = document.createElement('button');
        button.className = 'pizza-option-btn';
        button.innerHTML = `
            <strong>${pizza.nome}</strong><br>
            <small>${pizza.descricao}</small>
        `;
        button.onclick = function() {
            selectTuesdayPizza('premium', pizza.nome, this);
        };
        container.appendChild(button);
    });
}

function selectTuesdayPizza(type, pizzaName, element) {
    // Remover seleção anterior
    document.querySelectorAll('.pizza-option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Adicionar seleção atual
    element.classList.add('selected');
    
    if (type === 'traditional') {
        window.tuesdaySelectedTraditional = pizzaName;
    } else {
        window.tuesdaySelectedPremium = pizzaName;
    }
}

function tuesdayDoubleNextStep() {
    if (!window.tuesdaySelectedTraditional) {
        alert('Selecione uma pizza tradicional!');
        return;
    }
    
    // Mostrar etapa 2
    document.getElementById('tuesdayStep1').style.display = 'none';
    document.getElementById('tuesdayStep2').style.display = 'block';
    document.getElementById('tuesdayNextBtn').style.display = 'none';
    document.getElementById('tuesdayConfirmBtn').style.display = 'block';
    
    // Popular pizzas premium
    populateTuesdayPremium();
}

function confirmTuesdayDouble() {
    if (!window.tuesdaySelectedTraditional || !window.tuesdaySelectedPremium) {
        alert('Selecione ambas as pizzas!');
        return;
    }
    
    // Adicionar ao carrinho
    const item = {
        id: Date.now(),
        name: `Terça em Dobro: ${window.tuesdaySelectedTraditional} + ${window.tuesdaySelectedPremium}`,
        price: 56.00,
        size: 'Combo',
        quantity: 1,
        isTuesdayDouble: true,
        descricao: `• ${window.tuesdaySelectedTraditional} (Grande)\n• ${window.tuesdaySelectedPremium} (Grande)\n`
    };
    
    cart.push(item);
    updateCart();
    closeTuesdayDoubleModal();
    showNotification('Terça em Dobro adicionada ao carrinho!');
}

function closeTuesdayDoubleModal() {
    const modal = document.getElementById('tuesdayDoubleModal');
    if (modal) {
        modal.remove();
    }
    window.tuesdaySelectedTraditional = null;
    window.tuesdaySelectedPremium = null;
}
