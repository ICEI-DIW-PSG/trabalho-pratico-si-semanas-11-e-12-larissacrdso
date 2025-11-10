async function fetchLivros() {
  try {
    const response = await fetch('../db/db.json');
    const data = await response.json();
    return data.livros;
  } catch (error) {
    console.error("Erro ao carregar livros:", error);
    return [];
  }
}

async function renderCarrossel() {
  const destaquesContainer = document.getElementById('destaquesContainer');
  if (!destaquesContainer) return;

  const livros = await fetchLivros();

  destaquesContainer.innerHTML = livros.map((livro, index) => `
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

async function renderCards() {
  const containerIndex = document.getElementById('livrosContainer');
  if (!containerIndex) return;

  const livros = await fetchLivros();

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

async function renderDetalhes() {
  const detalheContainer = document.getElementById('detalheLivro');
  if (!detalheContainer) return;

  const params = new URLSearchParams(window.location.search);
  const titulo = params.get('titulo');

  const livros = await fetchLivros();
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
