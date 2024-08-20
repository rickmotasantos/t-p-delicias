let modalQt = 1;
let cart = [];
let modalKey = 0;
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

//usuario

let usuario = c('.icon-usuario');
let abrirLogUsuario = c('.usuario-cadastro');
let botaoCadastrar = c('.btn-cadastrar');

usuario.addEventListener('click', ()=>{
        abrirLogUsuario.classList.remove('fechada');
});

botaoCadastrar.addEventListener('click', (e)=>{
        e.preventDefault();
        let nome = document.querySelector('.nome');
        let valorNome = nome.value;
        if(valorNome == ''){
                alert("Favor insira seu nome");
        }else{
                alert('Seja bem vindo! ' +valorNome);
        };
        
        abrirLogUsuario.classList.add('fechada');
});



//Listagem dos Doces
doces.map((doce, index) => {
        let doceItem = c('.itens-delicias .item-delicia').cloneNode(true);

        doceItem.setAttribute('data-key', index);
        doceItem.querySelector('.img .imagem').src = doce.img;
        doceItem.querySelector('.nome').innerHTML = doce.name;
        doceItem.querySelector('.valor').innerHTML = `R$ ${doce.price.toFixed(2)}`;
        doceItem.querySelector('.text-desc').innerHTML = doce.desc;
        doceItem.querySelector('a').addEventListener('click', (e) => {
                e.preventDefault();

                let key = e.target.closest('.item-delicia').getAttribute('data-key');
                modalQt = 1;
                modalKey = key;

                c('.img-modal-left img').src = doces[key].img;
                c('.modal-right h3').innerHTML = doces[key].name;
                c('.valor-doce .valor').innerHTML = `R$ ${doces[key].price.toFixed(2)}`;

                c('.modal').style.display = 'flex';

                c('.doce-quant').innerHTML = modalQt;
        });

        c('.conteudo').append(doceItem);
});

// Eventos do modal

function closeModal() {

        c('.modal').style.display = 'none';
}

cs('.adc, .canc').forEach((item) => {
        item.addEventListener('click', closeModal);
});

c('.menos').addEventListener('click', () => {
        if (modalQt > 1) {
                modalQt--;
                c('.doce-quant').innerHTML = modalQt;
        }
});

c('.mais').addEventListener('click', () => {
        if (modalQt < 20) {
                modalQt++;
                c('.doce-quant').innerHTML = modalQt;
        };
});

c('.adc').addEventListener('click', () => {

        let identifier = doces[modalKey].id;

        let key = cart.findIndex((item) => item.identifier == identifier);

        if (key > - 1) {
                cart[key].qt += modalQt;
        } else {
                cart.push({
                        identifier,
                        id: doces[modalKey].id,
                        qt: modalQt

                });

        }
        updateCart();
});

c('.content-carrinho-mobile').addEventListener('click', () => {
        if (cart.length > 0) {
                c('.carrinho').style.left = '0';
        }
});

c('.btn-fechar-carrinho').addEventListener('click', () => {
        c('.carrinho').style.left = '100vw'
})

function updateCart() {

        c('.content-carrinho-mobile span').innerHTML = cart.length;

        if (cart.length > 0) {
                c('.carrinho').style.display = 'flex';

                c('.cart').innerHTML = '';

                let total = 0;

                for (let i in cart) {

                        let doceItem = doces.find((item) => item.id == cart[i].id);

                        total += doceItem.price * cart[i].qt;

                        let cartDoceItem = c('.itens-delicias .doce-carrinho').cloneNode(true);

                        cartDoceItem.querySelector('img').src = doceItem.img;
                        cartDoceItem.querySelector('.descric-carrinho').innerHTML = doceItem.name;
                        cartDoceItem.querySelector('.quant-cart').innerHTML = cart[i].qt;
                        cartDoceItem.querySelector('.menos-cart').addEventListener('click', () => {
                                if (cart[i].qt > 1) {
                                        cart[i].qt--;
                                }
                                else {
                                        cart.splice(i, 1);
                                }
                                updateCart();
                        });

                        cartDoceItem.querySelector('.mais-cart').addEventListener('click', () => {
                                cart[i].qt++;
                                updateCart();
                        })


                        c('.cart').append(cartDoceItem);
                }


                c('.total .total-cart').innerHTML = `R$ ${total.toFixed(2)}`;;
        } else {
                c('.carrinho').style.display = 'none';
        }
}

let botaoFechar = c('.fechar');
let btnFecharCartao = c('.fechar-cartao');
let btnFecharDinheiro = c('.fechar-dinheiro');

let fecharTodoConteudoPix = c('.pix');
let fecharTodoConteudoCartao = c('.cartao');
let fecharTodoConteudoDinheiro = c('.dinheiro');

let abrirFormaPagamento = c('.forma-pagamento');
let botaoFinalizarCarrinho = c('.btn-compra');

let pagamentoPix = c('.pagamento-pix');
let pagamentoCartao = c('.pagamento-cartao');
let pagamentoDinheiro = c('.pagamento-dinheiro');

botaoFechar.addEventListener('click', () => {
        fecharTodoConteudoPix.classList.add('fechada');
});

btnFecharCartao.addEventListener('click', () => {
        fecharTodoConteudoCartao.classList.add('fechada');
});

btnFecharDinheiro.addEventListener('click', () => {
        fecharTodoConteudoDinheiro.classList.add('fechada');
})

botaoFinalizarCarrinho.addEventListener('click', () => {
        abrirFormaPagamento.classList.remove('fechada')
});

pagamentoPix.addEventListener('click', () => {
        abrirFormaPagamento.classList.add('fechada');
        fecharTodoConteudoPix.classList.remove('fechada');
});

pagamentoCartao.addEventListener('click', () => {
        abrirFormaPagamento.classList.add('fechada');
        fecharTodoConteudoCartao.classList.remove('fechada');
});

pagamentoDinheiro.addEventListener('click', () => {
        abrirFormaPagamento.classList.add('fechada');
        fecharTodoConteudoDinheiro.classList.remove('fechada');
});

let btnCopiar = c('.btn-copiar');
let textPix = c('.code-qr-code');
let copiado = c('.mensagem-copiado');
let valorText = textPix.value;

btnCopiar.addEventListener('click', () => {
        navigator.clipboard.writeText(valorText);

        copiado.classList.remove('fechada');

        setTimeout(() => {
                copiado.classList.add('fechada');
        }, 3000);
});





