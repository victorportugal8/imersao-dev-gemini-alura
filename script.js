let cardContainer = document.querySelector(".card-container")
let campoBusca = document.querySelector("header input")
let dados = []

async function iniciarBusca(){
    if(dados.length === 0){
        try{
            let resposta = await fetch("data.json")
            dados = await resposta.json()
        } catch(error){
            console.error("Erro ao carregar os dados:", error)
            return
        }
    }
    const termoBusca = campoBusca.value.toLowerCase()
    const dadosFiltrados = dados.filter(dado => dado.nome.toLowerCase().includes(termoBusca) || dado.genero.toLowerCase().includes(termoBusca) || dado.autor.toLowerCase().includes(termoBusca))
    renderizarCards(dadosFiltrados)
}

async function carregarDados(){

    let resposta = await fetch("data.json")
    dados = await resposta.json()
    renderizarCards(dados)
}

function renderizarCards(dados){
    for(let dado of dados){
        let article = document.createElement("article")
        article.classList.add("card")
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.sinopse}</p>
            <p>${dado.genero}</p>
            <p>${dado.ano_lancamento}</p>
            <p>${dado.autor}</p>
            <a href="${dado.link}" target="_blank">Saiba mais</a>
        `
        cardContainer.appendChild(article)
    }
}