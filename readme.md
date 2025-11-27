# 🍕 Du'Cheff Pizzaria Express - Website

Site moderno e responsivo para a pizzaria Du'Cheff, com cardápio completo, carrinho de compras e integração com WhatsApp.

## ✨ Características

- **📱 Totalmente Responsivo** - Funciona perfeitamente em celular, tablet e desktop
- **🍕 Cardápio Completo** - 54 pizzas divididas em 3 categorias (Tradicionais, Especiais, Premium)
- **🛒 Carrinho de Compras** - Adicione pizzas e combos ao carrinho
- **💬 Integração WhatsApp** - Envie pedidos direto para o WhatsApp da loja
- **🎁 Combos Especiais** - 6 combos promocionais com seleção de sabores
- **💳 Opções de Pagamento** - PIX ou Pagamento na Entrega
- **🚚 Entrega ou Retirada** - Escolha entre entrega (R$ 10,00) ou retirada no local
- **🍕 Meio a Meio** - Escolha dois sabores diferentes na mesma pizza (apenas para pizzas grandes)
- **🎨 Sabor Customizado** - Solicite sabores especiais que não estão no cardápio
- **⚡ Rápido e Leve** - Site otimizado para máxima performance
- **🎨 Design Atrativo** - Cores da marca bem destacadas (vermelho, laranja, amarelo)

## 📁 Estrutura do Projeto

```
ducheff_pizzaria/
├── index.html              # Página HTML principal
├── css/
│   └── styles.css          # Todos os estilos CSS
├── js/
│   ├── menu.js             # Dados do cardápio e funções de filtro
│   ├── script.js           # Funcionalidades gerais do site
│   ├── cart.js             # Lógica do carrinho de compras
│   ├── combos.js           # Lógica de seleção de combos
│   ├── halfpizza-modal.js  # Modal de seleção de meio a meio
│   └── halfpizza-simple.js # Lógica simplificada de meio a meio
├── images/                 # Pasta para imagens (se necessário)
└── README.md               # Este arquivo
```

## 🚀 Como Usar Localmente

### Opção 1: Abrir Direto no Navegador
1. Descompacte o arquivo `ducheff_pizzaria.zip`
2. Abra o arquivo `index.html` no seu navegador
3. Pronto! O site está funcionando

### Opção 2: Usar um Servidor Local (Recomendado)

**Com Python:**
```bash
cd ducheff_pizzaria
python3 -m http.server 8000
```
Depois acesse: `http://localhost:8000`

**Com Node.js:**
```bash
cd ducheff_pizzaria
npx http-server
```

## 🌐 Como Publicar Online (Gratuito)

### Opção 1: Netlify (Recomendado ⭐ - Mais Rápido)

**Vantagens:**
- ✅ Muito mais rápido (CDN global)
- ✅ Deploy automático (atualiza quando você faz push no GitHub)
- ✅ Domínio profissional: `seu-site.netlify.app`
- ✅ Grátis
- ✅ Melhor performance

**Passo a Passo:**
1. Crie uma conta em [netlify.com](https://netlify.com)
2. Conecte seu GitHub (ou faça login com GitHub)
3. Clique em "New site from Git"
4. Selecione seu repositório com os arquivos do site
5. Clique em "Deploy site"
6. Pronto! Seu site estará em `seu-site.netlify.app`

### Opção 2: GitHub Pages

**Vantagens:**
- ✅ Totalmente gratuito
- ✅ Integrado com GitHub
- ✅ Domínio: `seu-usuario.github.io`

**Passo a Passo:**
1. Crie um repositório chamado `seu-usuario.github.io`
2. Faça upload dos arquivos do site
3. Acesse `seu-usuario.github.io`
4. Pronto! Seu site está online

### Opção 3: Comprar Domínio Próprio (Opcional)

Se quiser um domínio como `duchefffpizzaria.com.br`:

**Onde comprar:**
- [Hostinger](https://hostinger.com.br) - R$ 30-50/ano
- [Registro.br](https://registro.br) - R$ 40/ano (domínio .br)
- [GoDaddy](https://godaddy.com) - Vários preços

**Como configurar:**
1. Compre o domínio
2. Configure para apontar para Netlify ou GitHub Pages
3. Pronto! Seu site estará com domínio próprio

## 📞 Informações de Contato

- **Telefone:** 3468.4000
- **WhatsApp:** 61 99878.5692
- **iFood:** [Link da loja](https://www.ifood.com.br/delivery/brasilia-df/du-cheff---lago-norte-qi-2/21a55c64-c12e-4990-a737-d52120cccae5)
- **Localização:** SHIN QI 2, Área Especial, loja 5 - Anexo ao Pão de Açúcar, Lago Norte-DF
- **Horário:** Todos os dias, 16h30 às 24h

## 🛠️ Como Editar o Site

### Editar Cardápio
Abra o arquivo `js/menu.js` e modifique os dados das pizzas:
```javascript
{ numero: 1, nome: "Calabresa", ingredientes: "muçarela e calabresa", junior: 23, grande: 38 }
```

### Editar Preços
Os preços estão em `js/menu.js` nos campos `junior` e `grande`.

### Editar Cores
As cores principais estão em `css/styles.css`:
```css
--primary-red: #C41E3A;
--primary-orange: #FF6F00;
--primary-yellow: #FFD700;
```

### Editar Informações de Contato
Abra `index.html` e procure pela seção "Entre em contato" para editar:
- Telefone
- WhatsApp
- iFood
- Horário

## 🎨 Personalizações

### Mudar Cores da Marca
Edite o arquivo `css/styles.css` e procure por:
```css
--primary-red: #C41E3A;      /* Vermelho */
--primary-orange: #FF6F00;   /* Laranja */
--primary-yellow: #FFD700;   /* Amarelo */
```

### Adicionar Logo
1. Coloque a imagem da logo na pasta `images/`
2. Edite o arquivo `index.html` e procure por `<img src="logo.png">`

### Editar Texto do Site
Todos os textos estão no arquivo `index.html`. Basta procurar e editar.

## 📱 Funcionalidades Detalhadas

### Carrinho de Compras
- ✅ Adicione pizzas e combos ao carrinho
- ✅ Veja o total em tempo real
- ✅ Remova itens se necessário
- ✅ Escolha entre Entrega (R$ 10,00) ou Retirada no Local
- ✅ Escolha entre PIX ou Pagamento na Entrega
- ✅ Preencha dados (nome, telefone, endereço)
- ✅ Campo de endereço aparece automaticamente quando Entrega é selecionado

### Meio a Meio (Pizzas Grandes)
- ✅ Ao adicionar uma pizza grande, aparece opção de "Pizza Inteira" ou "Meio a Meio"
- ✅ Escolha dois sabores diferentes na mesma pizza
- ✅ Restrição por categoria: Tradicionais só com Tradicionais, Especiais com Especiais, Premium com Premium
- ✅ Preço mantém o mesmo da pizza grande
- ✅ Descrição clara no carrinho: "Calabresa + Marguerita (Meio a Meio)"

### Sabor Customizado
- ✅ Campo "Deseja o sabor de alguma outra que não esteja aqui?" no carrinho
- ✅ Aviso: "⚠️ O valor pode aumentar conforme o sabor escolhido"
- ✅ Exemplos sugeridos: Pizza de Moqueca, Pizza de Camarão, etc.
- ✅ Sabor customizado é enviado junto com o pedido no WhatsApp

### Envio para WhatsApp
1. Adicione itens ao carrinho
2. Clique no botão "🛒 Carrinho"
3. Preencha seus dados
4. Escolha a forma de pagamento
5. Clique em "Enviar para WhatsApp"
6. A mensagem abre no WhatsApp pronta para enviar

### Seleção de Combos
1. Clique em "Adicionar" em um combo
2. Escolha o sabor de cada pizza (radio buttons)
3. Clique em "✓ Confirma" para ir para a próxima
4. Veja o resumo final
5. Clique em "✓ Adicionar ao Carrinho"

## 🔧 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica do site
- **CSS3** - Estilos, animações e responsividade
- **JavaScript Vanilla** - Funcionalidades (sem dependências)
- **WhatsApp API** - Integração com WhatsApp

## 📊 Performance

- ✅ Site otimizado para máxima velocidade
- ✅ Sem dependências externas desnecessárias
- ✅ Carrega em menos de 2 segundos
- ✅ Funciona offline (após primeiro carregamento)

## 🐛 Problemas Comuns

### O site não carrega
- Verifique se todos os arquivos estão na mesma pasta
- Tente abrir em outro navegador
- Limpe o cache do navegador (Ctrl+Shift+Delete)

### WhatsApp não abre
- Verifique se o número está correto: `61 99878.5692`
- Certifique-se de que tem WhatsApp instalado no celular
- Tente abrir manualmente: `https://wa.me/5561998785692`

### Carrinho não funciona
- Verifique se o JavaScript está habilitado no navegador
- Tente abrir em outro navegador
- Limpe o cache

## 📝 Licença

Este projeto é de uso livre para a Du'Cheff Pizzaria Express.

## 👨‍💻 Desenvolvido por

Site criado com ❤️ para Du'Cheff Pizzaria Express

---

**Dúvidas?** Entre em contato via WhatsApp: 61 99878.5692
