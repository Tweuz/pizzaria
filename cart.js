// Carrinho de Compras
let cart = [];
let paymentMethod = 'entrega'; // Método de pagamento padrão
let deliveryType = 'entrega'; // Tipo de entrega padrão


function addToCart(name, price, size = 'Único', tipo = 'pizza', descricao = '') {
    const item = {
        id: Date.now(),
        name: name,
        price: price,
        size: size,
        quantity: 1,
        tipo: tipo,
        descricao: descricao
    };

    cart.push(item);
    updateCart();
    showNotification(`${name} adicionado ao carrinho!`);

    // Perguntar refrigerante:
    // - Sempre para pizzas
    // - Para combos que NÃO têm bebida incluída
    if (
        tipo === 'pizza' ||
        (tipo === 'combo' && !/refrigerante|1,5L|2L/i.test(item.descricao || ''))
    ) {
        openDrinkModalForItem(item);
    }
}

// Opções de refrigerante mostradas após confirmar a pizza
const drinkOptions = [
    { name: 'Sem refrigerante', price: 0 },

    { name: 'Coca-Cola 2L', price: 13.00 },
    { name: 'Coca-Cola Zero 2L', price: 13.00 },
    { name: 'Coca-Cola 1,5L', price: 11.00 },
    { name: 'Coca-Cola Zero 1,5L', price: 11.00 },

    { name: 'Fanta Laranja 1,5L', price: 11.00 },
    { name: 'Fanta Uva 1,5L', price: 11.00 },
    { name: 'Sprite 1,5L', price: 11.00 },
    { name: 'Guaraná 1,5L', price: 11.00 },

    { name: 'Coca-Cola Lata', price: 7.00 },
    { name: 'Fanta Laranja Lata', price: 7.00 },
    { name: 'Sprite Lata', price: 7.00 },
    { name: 'Fanta Uva Lata', price: 7.00 },
    { name: 'Fanta Guaraná Lata', price: 7.00 },
    { name: 'Coca-Cola Zero Lata', price: 7.00 },

    { name: 'Coca-Cola 600ml', price: 8.00 },
    { name: 'Sprite 600ml', price: 8.00 },
    { name: 'Fanta Laranja 600ml', price: 8.00 }
];

// Abre um mini-modal perguntando se quer refrigerante
function openDrinkModalForItem(baseItem) {
    const modal = document.createElement('div');
    modal.className = 'half-pizza-modal';
    modal.id = 'drinkModal';

    let html = `
        <div class="half-pizza-content" style="max-width: 420px;">
            <div class="half-pizza-header">
                <h2>Adicionar Refrigerante?</h2>
                <button class="close-btn" onclick="closeDrinkModal()">&times;</button>
            </div>
            <div class="half-pizza-body">
                <p style="margin-bottom: 10px;"><strong>${baseItem.name}</strong></p>
                <p style="margin-bottom: 15px;">Escolha se deseja refrigerante junto com a pizza:</p>
                <div class="flavors-grid" style="display: grid; grid-template-columns: 1fr; gap: 10px;">
    `;

    drinkOptions.forEach((opt, index) => {
        html += `
            <button class="flavor-button"
                    onclick="confirmDrinkSelection(${baseItem.id}, ${index})"
                    style="display:flex; justify-content:space-between; align-items:center;">
                <span>${opt.name}</span>
                <span>R$ ${opt.price.toFixed(2).replace('.', ',')}</span>
            </button>
        `;
    });

    html += `
                </div>
            </div>
        </div>
    `;

    modal.innerHTML = html;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

function closeDrinkModal() {
    const modal = document.getElementById('drinkModal');
    if (modal) modal.remove();
}

// Quando escolher o refrigerante
function confirmDrinkSelection(baseItemId, optionIndex) {
    const opt = drinkOptions[optionIndex];
    const baseItem = cart.find(i => i.id === baseItemId);
    if (!baseItem || !opt) {
        closeDrinkModal();
        return;
    }

    // Se escolheu "Sem refrigerante", só fecha
    if (opt.price <= 0) {
        closeDrinkModal();
        return;
    }

    // Adiciona o refrigerante como item separado
    const drinkItem = {
        id: Date.now(),
        name: opt.name,
        price: opt.price,
        size: 'Bebida',
        quantity: 1,
        tipo: 'bebida'
    };

    cart.push(drinkItem);
    updateCart();
    showNotification(`${opt.name} adicionado ao carrinho!`);
    closeDrinkModal();
}



// Remover item do carrinho
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
}

// Aumentar quantidade
function increaseQuantity(itemId) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity++;
        updateCart();
    }
}

// Diminuir quantidade
function decreaseQuantity(itemId) {
    const item = cart.find(i => i.id === itemId);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCart();
    }
}

// Atualizar método de pagamento
function setPaymentMethod(method) {
    paymentMethod = method;
    updatePaymentDisplay();
}

// Atualizar exibição do método de pagamento
function updatePaymentDisplay() {
    const entregaBtn = document.getElementById('paymentEntrega');
    const pixBtn = document.getElementById('paymentPix');
    
    if (paymentMethod === 'entrega') {
        entregaBtn.classList.add('active');
        pixBtn.classList.remove('active');
    } else {
        pixBtn.classList.add('active');
        entregaBtn.classList.remove('active');
    }
}

// Taxa de entrega fixa de R$ 10,00 (apenas se for entrega)
function getDeliveryFee() {
    if (deliveryType === 'entrega') {
        return 10.00;
    }
    return 0.00;
}

// Definir tipo de entrega
function setDeliveryType(type) {
    deliveryType = type;
    
    const entregaBtn = document.getElementById('deliveryEntrega');
    const retiradaBtn = document.getElementById('deliveryRetirada');
    const addressInput = document.getElementById('customerAddress');
    
    if (type === 'entrega') {
        entregaBtn.classList.add('active');
        retiradaBtn.classList.remove('active');
        addressInput.style.display = 'block';
        addressInput.placeholder = 'Seu endereço';
    } else {
        retiradaBtn.classList.add('active');
        entregaBtn.classList.remove('active');
        addressInput.style.display = 'none';
    }
    
    updateCart();
}

// Atualizar exibição do carrinho
function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    // Atualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Atualizar itens
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
        cartTotal.textContent = 'R$ 0,00';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-size">${item.size}</p>
                    <p class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                    <p class="cart-item-note">*Valor sem taxa de entrega</p>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="decreaseQuantity(${item.id})">−</button>
                    <span class="qty">${item.quantity}</span>
                    <button class="qty-btn" onclick="increaseQuantity(${item.id})">+</button>
                </div>
                <div class="cart-item-total">
                    <p>R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑️</button>
                </div>
            </div>
        `).join('');
        
        // Calcular total com taxa de entrega
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryFee = getDeliveryFee();
        const total = subtotal + deliveryFee;
        cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

// Abrir/Fechar carrinho
function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('active');
}

// Enviar pedido para WhatsApp
function sendToWhatsApp() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    
    // Validar campos obrigatórios
    if (!name || !phone) {
        alert('Por favor, preencha nome e telefone');
        return;
    }
    
    if (deliveryType === 'entrega' && !address) {
        alert('Por favor, preencha o endereço para entrega');
        return;
    }
    
    // Montar mensagem
    let message = `*🍕 NOVO PEDIDO - Du'Cheff Pizzaria*\n\n`;
    message += `*Cliente:* ${name}\n`;
    message += `*Telefone:* ${phone}\n`;
    
    if (deliveryType === 'entrega') {
        message += `*Endereço:* ${address}\n`;
        message += `*Tipo:* Entrega\n\n`;
    } else {
        message += `*Tipo:* Retirada no Local\n\n`;
    }
    message += `*ITENS DO PEDIDO:*\n`;
    message += `${'='.repeat(40)}\n`;
    
    let subtotal = 0;
    cart.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal;
        message += `• ${item.name}\n`;
        
        // Se é um combo, mostrar os detalhes dos sabores
        if (item.descricao) {
            message += item.descricao;
        }
        
        message += `  Qtd: ${item.quantity} x R$ ${item.price.toFixed(2).replace('.', ',')} = R$ ${itemSubtotal.toFixed(2).replace('.', ',')}
`;
    });
    
    const deliveryFee = getDeliveryFee();
    const total = subtotal + deliveryFee;
    
    message += `${'='.repeat(40)}\n`;
    message += `*Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}*\n`;
    message += `*Taxa de Entrega: R$ ${deliveryFee.toFixed(2).replace('.', ',')}*\n`;
    message += `*TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;;
    

    
    // Adicionar informação de pagamento
    if (paymentMethod === 'pix') {
        message += `*Forma de Pagamento:* 💳 PIX\n`;
        message += `⚠️ Aguardando chave PIX da loja para realizar o pagamento\n`;
    } else {
        message += `*Forma de Pagamento:* 💰 Pagamento na Entrega\n`;
        message += `Aceitamos: Dinheiro, PIX, Débito, Crédito\n`;
    }
    
    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Link do WhatsApp
    const whatsappLink = `https://wa.me/5561998785692?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappLink, '_blank');
    
    // Limpar carrinho
    setTimeout(() => {
        cart = [];
        updateCart();
        toggleCart();
        document.getElementById('customerName').value = '';
        document.getElementById('customerPhone').value = '';
        document.getElementById('customerAddress').value = '';
        paymentMethod = 'entrega';
        updatePaymentDisplay();
        alert('Pedido enviado! Aguarde a confirmação no WhatsApp.');
    }, 500);
}

// Notificação
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Fechar modal ao clicar fora
document.addEventListener('click', function(event) {
    const modal = document.getElementById('cartModal');
    const cartBtn = document.querySelector('.cart-btn');
    
    if (!modal.contains(event.target) && !cartBtn.contains(event.target)) {
        if (modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    }
});

// Inicializar pagamento padrão ao carregar
document.addEventListener('DOMContentLoaded', function() {
    updatePaymentDisplay();
});
