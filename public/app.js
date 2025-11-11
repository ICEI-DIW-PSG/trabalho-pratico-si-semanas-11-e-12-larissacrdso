
console.log("🚀 app.js carregado!");

fetch("http://localhost:3000/livros")
  .then((response) => {
    console.log("🔍 Resposta do servidor:", response);
    return response.json();
  })
  .then((data) => {
    console.log("📚 Livros carregados:", data);
  })
  .catch((error) => console.error("❌ Erro ao buscar livros:", error));

const livros = [
    {
        titulo: "A Hipótese do Amor",
        imagemCard: "a hipotese.jpg",
        imagemCarrossel: "a-hipotese-carrosel.jpg",
        resumo: "Um namoro de mentira entre cientistas onde todas as teorias calculadas sobre o amor são postas à prova.",
        genero: "Romance",
        paginas: 320,
        lancamento: "2021",
        avaliacao: 4.5,
        detalhes: "Olive Smith, aluna do doutorado em Biologia da Universidade Stanford, acredita na ciência, não em algo incontrolável como o amor. Depois de sair algumas vezes com Jeremy, ela percebe que sua melhor amiga gosta dele e decide juntá-los. Sem muitas opções, ela resolve inventar um namoro de mentira e, num momento de pânico, beija o primeiro homem que vê pela frente. O problema é que esse homem é Adam Carlsen, um jovem professor de prestígio – conhecido por levar os alunos às lágrimas. Por isso, Olive fica chocada quando o tirano dos laboratórios concorda em levar adiante a farsa e fingir ser seu namorado.",
        fotos: [
            { titulo: "Capa", imagem: "a hipotese.jpg" },
            { titulo: "Olive Smith", imagem: "olive.jpg" },
            { titulo: "Adam Carlsen", imagem: "adam.png" },
        ]
    },
    {
        titulo: "A Razão do Amor",
        imagemCard: "a razao.jpg",
        imagemCarrossel: "a-razao-carrossel.JPEG",
        resumo: "Dois rivais do xadrez frente a frente, pondo em jogo o coração deles.",
        genero: "Romance/Competição",
        paginas: 280,
        lancamento: "2022",
        avaliacao: 4,
        detalhes: "A carreira de Bee Königswasser está indo de mal a pior. Quando surge um processo seletivo para liderar um projeto de neuroengenharia da Nasa, ela se faz a pergunta que sempre guiou sua vida: o que Marie Curie faria? Participaria, é claro. Depois de conquistar a vaga, Bee descobre que precisará trabalhar com Levi Ward. É um desafio que a mãe da física moderna nunca precisou enfrentar. Tudo bem, Levi é alto e lindo, com olhos verdes incríveis. E, aparentemente, está sempre pronto para salvá-la quando ela mais precisa. Mas ele também deixou bastante claro o que pensa de Bee quando os dois estavam no doutorado.",
        fotos: [
            { titulo: "Capa", imagem: "a razao.jpg" },
            { titulo: "Bee Königswasser", imagem: "bee.jpg" },
            { titulo: "Levi Ward", imagem: "levi.jpg" },
        ]
    },
    {
        titulo: "Amor Teoricamente",
        imagemCard: "amor teori.jpg",
        imagemCarrossel: "amor-teoricamente-carrossel.jpg",
        resumo: "Dois físicos rivais colidem em meio a disputas acadêmicas e namoros de mentira.",
        genero: "Romance/Acadêmico",
        paginas: 350,
        lancamento: "2023",
        avaliacao: 5,
        detalhes: "Elsie Hannaway é uma física teórica que passou anos de sua vida moldando diferentes versões de si mesma. Em alguns dias, ela trabalha como professora adjunta e oferece serviços de namorada de mentira. O culpado é Jack Smith, o irritante e atraente irmão mais velho de seu cliente favorito, que acaba se revelando um importante físico experimental. Apesar das dificuldades, ela consegue equilibrar bem seu cuidadoso “Elsie-verso”... até que ele começa a desabar, e logo percebe que não precisa fingir ser outra pessoa quando está com Jack.",
        fotos: [
            { titulo: "Capa", imagem: "amor teori.jpg" },
            { titulo: "Elsie", imagem: "elsie.jpeg" },
            { titulo: "Jack Smith", imagem: "jack.jpeg" },
        ]
    }
];


function renderCarrossel() {
    const destaquesContainer = document.getElementById('destaquesContainer');
    if (!destaquesContainer) return;
    
    const destaques = livros; 
    destaquesContainer.innerHTML = destaques.map((livro, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img src="${livro.imagemCarrossel}" class="d-block w-100 rounded" alt="${livro.titulo}" style="max-height:500px; object-fit:cover;">
            <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                <h5>${livro.titulo}</h5>
                <p>${livro.resumo}</p>
                <a href="detalhes.html?titulo=${encodeURIComponent(livro.titulo)}" class="btn btn-light">Ver detalhes</a>
            </div>
        </div>
    `).join('');
}

function renderCards() {
    const containerIndex = document.getElementById('livrosContainer');
    if (!containerIndex) return;

    containerIndex.innerHTML = livros.map(livro => `
        <div class="col-lg-4 col-md-6 col-sm-10 d-flex justify-content-center mx-auto">
            <div class="card h-100 shadow-sm border-0">
                <img src="${livro.imagemCard}" class="card-img-top rounded" alt="${livro.titulo}" style="height:400px; object-fit:cover;">
                <div class="card-body text-center">
                    <h5 class="card-title fw-bold">${livro.titulo}</h5>
                    <p><strong>Gênero:</strong> ${livro.genero}</p>
                    <p><strong>Páginas:</strong> ${livro.paginas}</p>
                    <p><strong>Lançamento:</strong> ${livro.lancamento}</p>
                    <p><strong>Avaliação:</strong> ${livro.avaliacao} ★</p>
                    <a href="detalhes.html?titulo=${encodeURIComponent(livro.titulo)}" class="btn btn-dark btn-lg">Ver detalhes</a>
                </div>
            </div>
        </div>
    `).join('');
}

function renderDetalhes() {
    const detalheContainer = document.getElementById('detalheLivro');
    if (!detalheContainer) return;

    const params = new URLSearchParams(window.location.search);
    const titulo = params.get('titulo');
    const livro = livros.find(l => l.titulo === titulo);

    if (!livro) {
        detalheContainer.innerHTML = `
            <h2>Livro não encontrado</h2>
            <a href="index.html" class="btn btn-dark btn-lg mt-3">Voltar</a>
        `;
        return;
    }

    detalheContainer.innerHTML = `
        <h1 class="display-4 fw-bold mb-4">${livro.titulo}</h1>
        <div class="row g-4 align-items-center mb-4">
            <div class="col-md-5">
                <img src="${livro.imagemCard}" alt="${livro.titulo}" class="img-fluid rounded" style="max-height:500px; object-fit:cover;">
            </div>
            <div class="col-md-7">
                <p><strong>Resumo:</strong> ${livro.detalhes}</p>
                <p><strong>Gênero:</strong> ${livro.genero}</p>
                <p><strong>Páginas:</strong> ${livro.paginas}</p>
                <p><strong>Lançamento:</strong> ${livro.lancamento}</p>
                <p><strong>Avaliação:</strong> ${livro.avaliacao} ★</p>
            </div>
        </div>
    `;

    const fotosContainer = document.getElementById('fotosLivro');
    if (fotosContainer && livro.fotos) {
        fotosContainer.innerHTML = livro.fotos.map(foto => `
            <div class="col-lg-4 col-md-6 col-sm-10 d-flex justify-content-center mx-auto">
                <div class="card shadow-sm border-0 mb-3">
                    <img src="${foto.imagem}" class="card-img-top rounded" alt="${foto.titulo}" style="height:250px; object-fit:cover;">
                    <div class="card-body text-center">
                        <h5 class="card-title">${foto.titulo}</h5>
                    </div>
                </div>
            </div>
        `).join('');
    }

    detalheContainer.innerHTML += `<a href="index.html" class="btn btn-dark btn-lg mt-4">Voltar</a>`;
}

document.addEventListener('DOMContentLoaded', () => {
    renderCarrossel();
    renderCards();
    renderDetalhes();
});
