/* =====================================================
   RANCHO DAS RAÇÕES
   CLIENTE.JS
   ===================================================== */


/* =====================================================
   WHATSAPP
   ===================================================== */

const WHATSAPP_EMPRESA =
    "5584999999999";


/*
   TROQUE O NÚMERO ACIMA PELO
   WHATSAPP REAL DA EMPRESA.
*/


/* =====================================================
   PRODUTOS
   ===================================================== */

const produtos = [

    {
        id: 1,

        nome:
            "Farelo de trigo 50kg",

        categoria:
            "Suinos",

        preco:
            99.90,

        imagem:
            "imagem/WhatsApp%20Image%202026-08-13%20at%2013.35.36.jpeg",

        descricao:
            "Ração para suinos e equinos, ideal para alimentação diária."

    },


    {
        id: 2,

        nome:
            "Milho em geral 50kg",

        categoria:
            "adultos",

        preco:
            90.00,

        imagem:
            "imagem/WhatsApp%20Image%202026-08-13%20at%2013.35.42.jpeg",

        descricao:
            "Alimento completo para animais adultos."

    },


    {
        id: 3,

        nome:
            "Ração de engorda para suinos 40kg",

        categoria:
            "suinos",

        preco:
            125.90,

        imagem:
            "imagem/WhatsApp%20Image%202026-08-13%20at%2013.35.48.jpeg",

        descricao:
            "Ração de alta qualidade para suinos."

    },


    {
        id: 4,

        nome:
            "Ração para aves adulto 5kg",

        categoria:
            "aves",

        preco:
            20.90,

        imagem:
            "imagem/WhatsApp%20Image%202026-08-13%20at%2013.35.57.jpeg",

        descricao:
            "Alimento completo para gatos adultos."

    },


    {
        id: 5,

        nome:
            "Ração Golden Gatos 10kg",

        categoria:
            "Gatos",

        preco:
            100.90,

        imagem:
            "imagem/WhatsApp%20Image%202026-08-13%20at%2013.36.02.jpeg",

        descricao:
            "Ração para gatos com nutrientes essenciais."

    },


    {
        id: 6,

        nome:
            "Ração para Galinhas 10kg",

        categoria:
            "Aves",

        preco:
            59.90,

        imagem:
            "imagem/WhatsApp%20Image%202026-08-13%20at%2013.36.09.jpeg",

        descricao:
            "Ração indicada para alimentação de aves."

    },


    {
        id: 7,

        nome:
            "Ração para Bovinos 40kg",

        categoria:
            "Bovinos",

        preco:
            99.90,

        imagem:
            "imagem/WhatsApp%20Image%202026-08-13%20at%2013.36.16.jpeg",

        descricao:
            "Ração destinada à alimentação de bovinos."

    }

];


/* =====================================================
   ESTADO
   ===================================================== */

let carrinho =
    JSON.parse(
        localStorage.getItem(
            "rancho_carrinho"
        )
    ) || [];


let categoriaAtual =
    "Todos";


let produtoModalAtual =
    null;


let quantidadeModal =
    1;


/* =====================================================
   ELEMENTOS
   ===================================================== */

const productsGrid =
    document.getElementById(
        "productsGrid"
    );


const emptyProducts =
    document.getElementById(
        "emptyProducts"
    );


const searchProduct =
    document.getElementById(
        "searchProduct"
    );


const cartSidebar =
    document.getElementById(
        "cartSidebar"
    );


const cartOverlay =
    document.getElementById(
        "cartOverlay"
    );


const cartItems =
    document.getElementById(
        "cartItems"
    );


const cartEmpty =
    document.getElementById(
        "cartEmpty"
    );


const cartTotal =
    document.getElementById(
        "cartTotal"
    );


const cartCount =
    document.getElementById(
        "cartCount"
    );


const toast =
    document.getElementById(
        "toast"
    );


/* =====================================================
   MOEDA
   ===================================================== */

function formatarMoeda(valor) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style:
                "currency",

            currency:
                "BRL"
        }
    );

}


/* =====================================================
   LOCAL STORAGE
   ===================================================== */

function salvarCarrinho() {

    localStorage.setItem(
        "rancho_carrinho",

        JSON.stringify(
            carrinho
        )
    );

}


/* =====================================================
   RENDERIZAR PRODUTOS
   ===================================================== */

function renderizarProdutos() {

    const pesquisa =
        searchProduct.value
            .toLowerCase()
            .trim();


    const produtosFiltrados =
        produtos.filter(
            produto => {

                const categoriaOk =
                    categoriaAtual ===
                    "Todos" ||
                    produto.categoria ===
                    categoriaAtual;


                const pesquisaOk =
                    produto.nome
                        .toLowerCase()
                        .includes(
                            pesquisa
                        );


                return (
                    categoriaOk &&
                    pesquisaOk
                );

            }
        );


    if (
        produtosFiltrados.length === 0
    ) {

        productsGrid.innerHTML =
            "";

        emptyProducts.style.display =
            "block";

        return;

    }


    emptyProducts.style.display =
        "none";


    productsGrid.innerHTML =
        produtosFiltrados
            .map(
                produto => `

                <article
                    class="product-card"
                    data-id="${produto.id}"
                >

                    <div
                        class="product-image"
                    >

                        <span
                            class="product-category"
                        >
                            ${produto.categoria}
                        </span>


                        <img
                            class="product-img"
                            src="${produto.imagem}"
                            alt="${produto.nome}"
                            loading="lazy"
                        >

                    </div>


                    <div
                        class="product-info"
                    >

                        <h3>
                            ${produto.nome}
                        </h3>


                        <p>
                            ${produto.descricao}
                        </p>


                        <div
                            class="product-bottom"
                        >

                            <div
                                class="product-price"
                            >

                                <span>
                                    Preço
                                </span>

                                <strong>
                                    ${formatarMoeda(
                                        produto.preco
                                    )}
                                </strong>

                            </div>


                            <button
                                class="add-product"
                                data-add="${produto.id}"
                                title="Adicionar ao carrinho"
                            >
                                +
                            </button>

                        </div>

                    </div>

                </article>

            `
            )
            .join("");


    adicionarEventosProdutos();

}


/* =====================================================
   EVENTOS DOS PRODUTOS
   ===================================================== */

function adicionarEventosProdutos() {

    document
        .querySelectorAll(
            "[data-add]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.stopPropagation();


                        const id =
                            Number(
                                button.dataset.add
                            );


                        abrirProdutoModal(
                            id
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll(
            ".product-card"
        )
        .forEach(
            card => {

                card.addEventListener(
                    "click",
                    () => {

                        const id =
                            Number(
                                card.dataset.id
                            );


                        abrirProdutoModal(
                            id
                        );

                    }
                );

            }
        );

}


/* =====================================================
   CATEGORIAS
   ===================================================== */

document
    .querySelectorAll(
        ".category"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".category"
                        )
                        .forEach(
                            item => {

                                item.classList
                                    .remove(
                                        "active"
                                    );

                            }
                        );


                    button.classList.add(
                        "active"
                    );


                    categoriaAtual =
                        button.dataset
                            .category;


                    renderizarProdutos();

                }
            );

        }
    );


/* =====================================================
   PESQUISA
   ===================================================== */

searchProduct.addEventListener(
    "input",
    renderizarProdutos
);


/* =====================================================
   MODAL
   ===================================================== */

function abrirProdutoModal(id) {

    const produto =
        produtos.find(
            item =>
                item.id === id
        );


    if (!produto) {

        return;

    }


    produtoModalAtual =
        produto;


    quantidadeModal =
        1;


    const imagem =
        document.getElementById(
            "modalProductImage"
        );


    imagem.src =
        produto.imagem;


    imagem.alt =
        produto.nome;


    document.getElementById(
        "modalProductCategory"
    ).textContent =
        produto.categoria;


    document.getElementById(
        "modalProductName"
    ).textContent =
        produto.nome;


    document.getElementById(
        "modalProductDescription"
    ).textContent =
        produto.descricao;


    document.getElementById(
        "modalProductPrice"
    ).textContent =
        formatarMoeda(
            produto.preco
        );


    atualizarQuantidadeModal();


    document
        .getElementById(
            "productModal"
        )
        .classList.add(
            "show"
        );

}


/* =====================================================
   FECHAR MODAL
   ===================================================== */

document
    .getElementById(
        "closeProductModal"
    )
    .addEventListener(
        "click",
        fecharProdutoModal
    );


document
    .getElementById(
        "productModal"
    )
    .addEventListener(
        "click",
        event => {

            if (
                event.target.id ===
                "productModal"
            ) {

                fecharProdutoModal();

            }

        }
    );


function fecharProdutoModal() {

    document
        .getElementById(
            "productModal"
        )
        .classList.remove(
            "show"
        );

}


/* =====================================================
   QUANTIDADE DO MODAL
   ===================================================== */

document
    .getElementById(
        "modalMinus"
    )
    .addEventListener(
        "click",
        () => {

            if (
                quantidadeModal > 1
            ) {

                quantidadeModal--;

                atualizarQuantidadeModal();

            }

        }
    );


document
    .getElementById(
        "modalPlus"
    )
    .addEventListener(
        "click",
        () => {

            quantidadeModal++;

            atualizarQuantidadeModal();

        }
    );


function atualizarQuantidadeModal() {

    document
        .getElementById(
            "modalQuantity"
        )
        .textContent =
        quantidadeModal;

}


/* =====================================================
   ADICIONAR AO CARRINHO
   ===================================================== */

document
    .getElementById(
        "modalAddCart"
    )
    .addEventListener(
        "click",
        () => {

            if (
                !produtoModalAtual
            ) {

                return;

            }


            adicionarAoCarrinho(
                produtoModalAtual.id,
                quantidadeModal
            );


            fecharProdutoModal();

            abrirCarrinho();

        }
    );


function adicionarAoCarrinho(
    produtoId,
    quantidade
) {

    const produto =
        produtos.find(
            item =>
                item.id ===
                produtoId
        );


    if (!produto) {

        return;

    }


    const existente =
        carrinho.find(
            item =>
                item.produtoId ===
                produtoId
        );


    if (existente) {

        existente.quantidade +=
            quantidade;

    } else {

        carrinho.push({

            produtoId:
                produto.id,

            nome:
                produto.nome,

            preco:
                produto.preco,

            imagem:
                produto.imagem,

            quantidade:
                quantidade

        });

    }


    salvarCarrinho();

    atualizarCarrinho();


    mostrarToast(
        "Produto adicionado ao carrinho!"
    );

}


/* =====================================================
   ATUALIZAR CARRINHO
   ===================================================== */

function atualizarCarrinho() {

    const quantidadeTotal =
        carrinho.reduce(
            (
                total,
                item
            ) =>
                total +
                item.quantidade,
            0
        );


    const valorTotal =
        carrinho.reduce(
            (
                total,
                item
            ) =>
                total +
                (
                    item.preco *
                    item.quantidade
                ),
            0
        );


    cartCount.textContent =
        quantidadeTotal;


    cartTotal.textContent =
        formatarMoeda(
            valorTotal
        );


    if (
        carrinho.length === 0
    ) {

        cartItems.innerHTML =
            "";

        cartEmpty.style.display =
            "block";

        return;

    }


    cartEmpty.style.display =
        "none";


    cartItems.innerHTML =
        carrinho
            .map(
                item => `

                <div
                    class="cart-item"
                >

                    <img
                        class="cart-item-image"
                        src="${item.imagem}"
                        alt="${item.nome}"
                    >


                    <div>

                        <h4>
                            ${item.nome}
                        </h4>


                        <div
                            class="cart-item-price"
                        >
                            ${formatarMoeda(
                                item.preco
                            )}
                        </div>


                        <div
                            class="cart-item-actions"
                        >

                            <div
                                class="quantity"
                            >

                                <button
                                    data-minus="${item.produtoId}"
                                >
                                    −
                                </button>


                                <strong>
                                    ${item.quantidade}
                                </strong>


                                <button
                                    data-plus="${item.produtoId}"
                                >
                                    +
                                </button>

                            </div>


                            <button
                                class="remove-item"
                                data-remove="${item.produtoId}"
                            >
                                Remover
                            </button>

                        </div>

                    </div>

                </div>

            `
            )
            .join("");


    adicionarEventosCarrinho();

}


/* =====================================================
   EVENTOS CARRINHO
   ===================================================== */

function adicionarEventosCarrinho() {

    document
        .querySelectorAll(
            "[data-minus]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        alterarQuantidade(
                            Number(
                                button.dataset
                                    .minus
                            ),
                            -1
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll(
            "[data-plus]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        alterarQuantidade(
                            Number(
                                button.dataset
                                    .plus
                            ),
                            1
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll(
            "[data-remove]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        removerDoCarrinho(
                            Number(
                                button.dataset
                                    .remove
                            )
                        );

                    }
                );

            }
        );

}


/* =====================================================
   ALTERAR QUANTIDADE
   ===================================================== */

function alterarQuantidade(
    produtoId,
    quantidade
) {

    const item =
        carrinho.find(
            produto =>
                produto.produtoId ===
                produtoId
        );


    if (!item) {

        return;

    }


    item.quantidade +=
        quantidade;


    if (
        item.quantidade <= 0
    ) {

        removerDoCarrinho(
            produtoId
        );

        return;

    }


    salvarCarrinho();

    atualizarCarrinho();

}


/* =====================================================
   REMOVER
   ===================================================== */

function removerDoCarrinho(
    produtoId
) {

    carrinho =
        carrinho.filter(
            item =>
                item.produtoId !==
                produtoId
        );


    salvarCarrinho();

    atualizarCarrinho();

}


/* =====================================================
   ABRIR CARRINHO
   ===================================================== */

document
    .getElementById(
        "openCart"
    )
    .addEventListener(
        "click",
        abrirCarrinho
    );


document
    .getElementById(
        "closeCart"
    )
    .addEventListener(
        "click",
        fecharCarrinho
    );


cartOverlay.addEventListener(
    "click",
    fecharCarrinho
);


function abrirCarrinho() {

    cartSidebar.classList.add(
        "show"
    );

    cartOverlay.classList.add(
        "show"
    );

    document.body.style.overflow =
        "hidden";

}


function fecharCarrinho() {

    cartSidebar.classList.remove(
        "show"
    );

    cartOverlay.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

}


/* =====================================================
   LIMPAR CARRINHO
   ===================================================== */

document
    .getElementById(
        "clearCart"
    )
    .addEventListener(
        "click",
        () => {

            if (
                carrinho.length === 0
            ) {

                return;

            }


            const confirmar =
                confirm(
                    "Deseja limpar o carrinho?"
                );


            if (!confirmar) {

                return;

            }


            carrinho = [];


            salvarCarrinho();

            atualizarCarrinho();


            mostrarToast(
                "Carrinho limpo."
            );

        }
    );


/* =====================================================
   WHATSAPP - PEDIDO
   ===================================================== */

document
    .getElementById(
        "sendOrder"
    )
    .addEventListener(
        "click",
        enviarPedidoWhatsApp
    );


function enviarPedidoWhatsApp() {

    if (
        carrinho.length === 0
    ) {

        mostrarToast(
            "Adicione produtos ao carrinho."
        );

        return;

    }


    let mensagem =
        "Olá! Gostaria de fazer um pedido no Rancho das Rações.\n\n";


    mensagem +=
        "*MEU PEDIDO:*\n\n";


    carrinho.forEach(
        (
            item,
            index
        ) => {

            const subtotal =
                item.preco *
                item.quantidade;


            mensagem +=
                `${index + 1}. ${item.nome}\n`;


            mensagem +=
                `Quantidade: ${item.quantidade}\n`;


            mensagem +=
                `Valor: ${formatarMoeda(
                    subtotal
                )}\n\n`;

        }
    );


    const total =
        carrinho.reduce(
            (
                soma,
                item
            ) =>
                soma +
                (
                    item.preco *
                    item.quantidade
                ),
            0
        );


    mensagem +=
        `*TOTAL: ${formatarMoeda(
            total
        )}*\n\n`;


    mensagem +=
        "Gostaria de confirmar a disponibilidade dos produtos e as condições de pagamento.";


    const url =
        `https://wa.me/${WHATSAPP_EMPRESA}?text=${encodeURIComponent(
            mensagem
        )}`;


    window.open(
        url,
        "_blank"
    );

}


/* =====================================================
   WHATSAPP CONTATO
   ===================================================== */

document
    .getElementById(
        "whatsappContact"
    )
    .addEventListener(
        "click",
        () => {

            const mensagem =
                "Olá! Gostaria de informações sobre os produtos do Rancho das Rações.";


            const url =
                `https://wa.me/${WHATSAPP_EMPRESA}?text=${encodeURIComponent(
                    mensagem
                )}`;


            window.open(
                url,
                "_blank"
            );

        }
    );


/* =====================================================
   MENU MOBILE
   ===================================================== */

document
    .getElementById(
        "mobileMenu"
    )
    .addEventListener(
        "click",
        () => {

            document
                .getElementById(
                    "nav"
                )
                .classList.toggle(
                    "open"
                );

        }
    );


document
    .querySelectorAll(
        ".nav a"
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    document
                        .getElementById(
                            "nav"
                        )
                        .classList.remove(
                            "open"
                        );

                }
            );

        }
    );


/* =====================================================
   TOAST
   ===================================================== */

function mostrarToast(
    mensagem
) {

    toast.textContent =
        mensagem;


    toast.classList.add(
        "show"
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        2800
    );

}


/* =====================================================
   ANO
   ===================================================== */

document
    .getElementById(
        "currentYear"
    )
    .textContent =
    new Date().getFullYear();


/* =====================================================
   INICIALIZAÇÃO
   ===================================================== */

renderizarProdutos();

atualizarCarrinho();