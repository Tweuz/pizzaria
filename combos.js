// combos.js - COM MEIO A MEIO PARA PIZZAS GRANDES
let comboAtual = null;
let comboSelecionado = {};
let etapaAtual = 0;
let pizzaAtualHalfMode = {}; // Novo: armazena se pizza é half ou inteira

// Abrir modal de seleção de sabores do combo
function openComboModal(comboNumero) {
    const combo = combosData.find(c => c.numero === comboNumero);
    if (!combo) return;
    
    comboAtual = combo;
    comboSelecionado = {};
    etapaAtual = 0;
    pizzaAtualHalfMode = {};
    mostrarEtapaCombo();
}

// Mostrar etapa atual do combo
function mostrarEtapaCombo() {
    // Remover modal anterior se existir
    const modalAnterior = document.getElementById('comboModal');
    if (modalAnterior) modalAnterior.remove();
    
    // Identificar itens do combo
    const pizzas = comboAtual.itens.filter(i => i.tipo === 'pizza');
    const bebidas = comboAtual.itens.filter(i => i.tipo === 'bebida' && i.opcoes);
    const totalEtapas = pizzas.length + bebidas.length;
    
    // Se ainda estamos escolhendo pizzas
    if (etapaAtual < pizzas.length) {
        mostrarSelecaoPizza(pizzas[etapaAtual], etapaAtual, totalEtapas);
        return;
    }
    
    // Se estamos escolhendo bebidas
    const indiceBebida = etapaAtual - pizzas.length;
    if (indiceBebida < bebidas.length) {
        mostrarSelecaoBebida(bebidas[indiceBebida], etapaAtual, totalEtapas);
        return;
    }
    
    // Se acabou, mostra o resumo
    mostrarResumoCombo();
}

// Mostrar seleção de pizza (COM MEIO A MEIO)
function mostrarSelecaoPizza(item, etapa, total) {
    const modal = document.createElement('div');
    modal.className = 'half-pizza-modal';
    modal.id = 'comboModal';
    modal.style.display = 'flex';
    
    let html = `
        <div class="half-pizza-content">
            <div class="half-pizza-header">
                <h2>Combo ${comboAtual.numero}</h2>
                <button class="close-btn" onclick="closeComboModal()">&times;</button>
            </div>
            <div class="half-pizza-body">
                <div style="text-align: center; margin-bottom: 15px; color: #ff6f00; font-weight: bold;">
                    Etapa ${etapa + 1} de ${total} - Escolha a Pizza ${item.tamanho}
                </div>
                
                <!-- Opções Inteira / Meio a Meio (só para Grande) -->
                ${item.tamanho === 'Grande' ? `
                <div class="half-pizza-options" style="margin-bottom: 20px;">
                    <button class="half-pizza-option active"
                            onclick="toggleHalfMode(${etapa}, false)">
                        <span class="option-icon"></span>
                        <span class="option-text">Pizza Inteira</span>
                        <span class="option-desc">Um sabor único em toda a pizza</span>
                    </button>
                    <button class="half-pizza-option"
                            onclick="toggleHalfMode(${etapa}, true)">
                        <span class="option-icon"></span>
                        <span class="option-text">Meio a Meio</span>
                        <span class="option-desc">Dois sabores na mesma pizza</span>
                    </button>
                </div>
                ` : ''}

                <div class="flavors-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; max-height: 350px; overflow-y: auto; padding: 5px;">
    `;
    
    // Lista de sabores de acordo com a categoria definida no combo
    const sabores = menuData[item.categoria];
    sabores.forEach(sabor => {
        html += `
            <button class="flavor-button" onclick="selecionarSaborPizza('${sabor.nome}', '${item.tamanho}', ${etapa})">
                ${sabor.nome}
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
}

// NOVAS FUNÇÕES PARA MEIO A MEIO
function toggleHalfMode(etapa, isHalf) {
    pizzaAtualHalfMode[etapa] = isHalf;

    const modal = document.getElementById('comboModal');
    if (!modal) return;

    const options = modal.querySelectorAll('.half-pizza-option');
    options.forEach(btn => btn.classList.remove('active'));

    const index = isHalf ? 1 : 0; // 0 = inteira, 1 = meia
    if (options[index]) {
        options[index].classList.add('active');
    }
}

let saborSelecionadoAtual = null;
function selecionarSaborPizza(nome, tamanho, etapa) {
    if (!comboSelecionado[etapa]) {
        comboSelecionado[etapa] = { nome: '', tamanho, tipo: 'pizza' };
    }
    
    const isHalfMode = pizzaAtualHalfMode[etapa] || false;
    
    if (isHalfMode) {
        // Meio a Meio: primeiro sabor ou segundo
        if (!comboSelecionado[etapa].sabor1) {
            comboSelecionado[etapa].sabor1 = nome;
            saborSelecionadoAtual = { etapa, posicao: 1 };
            showNotification('1º sabor selecionado! Escolha o 2º sabor.');
        } else if (!comboSelecionado[etapa].sabor2) {
            comboSelecionado[etapa].sabor2 = nome;
            saborSelecionadoAtual = null;
            etapaAtual++;
            mostrarEtapaCombo();
            showNotification('Meio a meio completo!');
        }
    } else {
        // Pizza inteira
        comboSelecionado[etapa].nome = nome;
        etapaAtual++;
        mostrarEtapaCombo();
    }
}

// Mostrar seleção de bebida
function mostrarSelecaoBebida(item, etapa, total) {
    const modal = document.createElement('div');
    modal.className = 'half-pizza-modal';
    modal.id = 'comboModal';
    modal.style.display = 'flex';
    
    let html = `
        <div class="half-pizza-content" style="max-width: 400px;">
            <div class="half-pizza-header">
                <h2>Combo ${comboAtual.numero}</h2>
                <button class="close-btn" onclick="closeComboModal()">&times;</button>
            </div>
            <div class="half-pizza-body">
                <div style="text-align: center; margin-bottom: 15px; color: #ff6f00; font-weight: bold;">
                    Etapa ${etapa + 1} de ${total} - Escolha a Bebida
                </div>
                <div class="flavors-grid" style="display: grid; grid-template-columns: 1fr; gap: 10px;">
    `;
    
    item.opcoes.forEach(opcao => {
        html += `
            <button class="flavor-button" onclick="selecionarOpcaoBebida('${opcao}')" style="padding: 15px; text-align: center;">
                ${opcao}
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
}

// Funções de Seleção - Lógica de dados
function selecionarOpcaoBebida(nome) {
    comboSelecionado.bebida = nome;
    etapaAtual++;
    mostrarEtapaCombo();
}

// Mostrar Resumo Final (ATUALIZADO para meio a meio)
function mostrarResumoCombo() {
    const modal = document.createElement('div');
    modal.className = 'half-pizza-modal';
    modal.id = 'comboModal';
    modal.style.display = 'flex';
    
    let conteudo = `
        <div class="half-pizza-content">
            <div class="half-pizza-header">
                <h2>Resumo do Pedido</h2>
                <button class="close-btn" onclick="closeComboModal()">&times;</button>
            </div>
            <div class="half-pizza-body">
                <h3 style="color: #333; margin-bottom: 15px; text-align: center;">Combo ${comboAtual.numero}</h3>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <ul style="list-style: none; padding: 0; margin: 0;">
    `;
    
    // Listar Pizzas (COM MEIO A MEIO)
    const totalPizzas = comboAtual.itens.filter(it => it.tipo === 'pizza').length;
    for (let i = 0; i < totalPizzas; i++) {
        if (comboSelecionado[i]) {
            const pizza = comboSelecionado[i];
            let pizzaTexto = `<strong>Pizza</strong> ${pizza.tamanho}: `;
            
            if (pizza.sabor1 && pizza.sabor2) {
                pizzaTexto += `Meio a Meio: ${pizza.sabor1} + ${pizza.sabor2}`;
            } else {
                pizzaTexto += pizza.nome || 'Não selecionado';
            }
            
            conteudo += `
                <li style="padding: 8px 0; border-bottom: 1px dashed #ddd; display: flex; align-items: center;">
                    <span style="font-size: 1.2em; margin-right: 10px;">🍕</span>
                    <div>${pizzaTexto}</div>
                </li>
            `;
        }
    }
    
    // Listar Bebida
    if (comboSelecionado.bebida) {
        conteudo += `
            <li style="padding: 8px 0; display: flex; align-items: center;">
                <span style="font-size: 1.2em; margin-right: 10px;">🥤</span>
                <div><strong>Bebida:</strong> ${comboSelecionado.bebida}</div>
            </li>
        `;
    }
    
    conteudo += `
                    </ul>
                </div>
                <div class="half-pizza-modal-footer" style="background: none; border: none; padding: 0;">
                    <button class="btn btn-primary" onclick="adicionarComboAoCarrinho('${comboAtual.descricao}', ${comboAtual.numero})"
                            style="width: 100%; padding: 15px; font-size: 1.1rem; display: flex; justify-content: space-between; align-items: center;">
                        <span>Confirmar</span>
                        <span>R$ ${comboAtual.preco.toFixed(2)}</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.innerHTML = conteudo;
    document.body.appendChild(modal);
}

// Adicionar combo ao carrinho (ATUALIZADO)
function adicionarComboAoCarrinho(descricao, comboNumero) {
    if (!comboAtual) return;
    
    let descricaoCompleta = `Combo ${comboAtual.numero} - `;
    const totalPizzas = comboAtual.itens.filter(it => it.tipo === 'pizza').length;
    
    for (let i = 0; i < totalPizzas; i++) {
        if (comboSelecionado[i]) {
            const pizza = comboSelecionado[i];
            if (pizza.sabor1 && pizza.sabor2) {
                descricaoCompleta += `Meio a Meio ${pizza.tamanho}: ${pizza.sabor1}+${pizza.sabor2} `;
            } else {
                descricaoCompleta += `${pizza.nome || ''} ${pizza.tamanho} `;
            }
        }
    }
    
    if (comboSelecionado.bebida) {
        descricaoCompleta += `+ ${comboSelecionado.bebida}`;
    }
    
    const item = {
        id: Date.now(),
        name: `Combo ${comboAtual.numero}`,
        descricao: descricaoCompleta,
        price: comboAtual.preco,
        size: 'Combo',
        quantity: 1,
        tipo: 'combo'
    };
    
    cart.push(item);
    updateCart();
    showNotification(`Combo ${comboAtual.numero} adicionado ao carrinho!`);
    closeComboModal();

    // Combos que DEVEM perguntar refrigerante: 1, 2, 5 e 6
    if (comboAtual.numero === 1 || comboAtual.numero === 2 || comboAtual.numero === 5 || comboAtual.numero === 6) {
        openDrinkModalForItem(item);
    }
}

function closeComboModal() {
    const modal = document.getElementById('comboModal');
    if (modal) modal.remove();
}
