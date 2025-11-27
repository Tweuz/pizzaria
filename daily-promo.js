// Promoção do dia
const dailyPromos = {
    0: { day: 'Domingo', flavors: ['Alho', 'Chocolate Branco'] },
    1: { day: 'Segunda', flavors: ['Hot Dog', 'Romeu e Julieta'] },
    2: { day: 'Terça', flavors: ['À Moda', 'Chocolate'] },
    3: { day: 'Quarta', flavors: ['Muçarela', 'Cocadinha'] },
    4: { day: 'Quinta', flavors: ['Presunto', 'Banana'] },
    5: { day: 'Sexta', flavors: ['Marguerita', 'Chocomix'] },
    6: { day: 'Sábado', flavors: ['Milho', 'Doce de Leite'] }
};

const PROMO_PRICE = 30.00;

function getTodayPromo() {
    const today = new Date().getDay();
    return dailyPromos[today];
}

window.isDailyPromo = false;
window.dailyPromoFlavors = [];


function renderDailyPromo() {
    const today = getTodayPromo();
    const flavorsContainer = document.getElementById('promoDayFlavors');
    const dayText = document.getElementById('promoDayText');
    
    if (!flavorsContainer || !dayText) return;
    
    dayText.textContent = `Sabores de ${today.day}`;
    flavorsContainer.innerHTML = '';
    
  today.flavors.forEach(flavor => {
  const button = document.createElement('button');
  button.className = 'promo-flavor-btn';
  button.textContent = flavor;
 button.onclick = function() {
  window.isDailyPromo = true;
  window.dailyPromoFlavors = today.flavors;

  openHalfPizzaModal(flavor + ' - Grande', PROMO_PRICE, 'tradicionais');
};

  flavorsContainer.appendChild(button);
});

}

function openDailyPromoModal(selectedFlavor, availableFlavors) {
    const otherFlavor = availableFlavors.find(f => f !== selectedFlavor);
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'dailyPromoModal';
    
    const modalContent = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Escolha a Configuração da Pizza</h2>
                <button class="modal-close" onclick="closeDailyPromoModal()">×</button>
            </div>
            <div class="modal-body">
                <p><strong>Pizza Grande - R$ ${PROMO_PRICE.toFixed(2).replace('.', ',')}</strong></p>
                
                <div class="half-pizza-options">
                    <button class="option-btn" onclick="selectDailyPromoOption('inteira', '${selectedFlavor}', null)">
                        <strong>Pizza Inteira Só</strong><br>
                        ${selectedFlavor}
                    </button>
                    
                    <button class="option-btn" onclick="selectDailyPromoOption('meia', '${selectedFlavor}', '${otherFlavor}')">
                        <strong>Meio a Meio</strong><br>
                        ${selectedFlavor} + ${otherFlavor}
                    </button>
                    
                    <button class="option-btn" onclick="selectDailyPromoOption('inteira', '${otherFlavor}', null)">
                        <strong>Pizza Inteira Só</strong><br>
                        ${otherFlavor}
                    </button>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeDailyPromoModal()">Cancelar</button>
                <button class="btn btn-primary" onclick="confirmDailyPromoSelection()">Confirmar</button>
            </div>
        </div>
    `;
    
    modal.innerHTML = modalContent;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    window.dailyPromoSelectedOption = null;
    window.dailyPromoSelectedFlavor = null;
    window.dailyPromoSecondFlavor = null;
}

function selectDailyPromoOption(option, flavor1, flavor2) {
    window.dailyPromoSelectedOption = option;
    window.dailyPromoSelectedFlavor = flavor1;
    window.dailyPromoSecondFlavor = flavor2;
    
    // Atualizar visual dos botões
    document.querySelectorAll('#dailyPromoModal .option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.closest('.option-btn').classList.add('selected');
}

function confirmDailyPromoSelection() {
    if (!window.dailyPromoSelectedFlavor) {
        alert('Selecione uma opção!');
        return;
    }
    
    const option = window.dailyPromoSelectedOption;
    const flavor1 = window.dailyPromoSelectedFlavor;
    const flavor2 = window.dailyPromoSecondFlavor;
    
    let itemName = flavor1 + ' - Grande';
    if (option === 'meia' && flavor2) {
        itemName = flavor1 + ' + ' + flavor2 + ' (Meio a Meio) - Grande';
    }
    
    // Adicionar ao carrinho
    const item = {
        id: Date.now(),
        name: itemName,
        price: PROMO_PRICE,
        size: 'Grande',
        quantity: 1,
        isPromo: true
    };
    
    cart.push(item);
    updateCart();
    closeDailyPromoModal();
    showNotification('Pizza adicionada ao carrinho!');
}

function closeDailyPromoModal() {
    const modal = document.getElementById('dailyPromoModal');
    if (modal) {
        modal.remove();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    renderDailyPromo();
});
