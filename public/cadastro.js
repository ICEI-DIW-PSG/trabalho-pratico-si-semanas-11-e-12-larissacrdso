const API_URL = "http://localhost:3000/livros";
const form = document.getElementById("formLivro");
const lista = document.getElementById("listaLivros");
const btnLimpar = document.getElementById("btnLimpar");
let editandoId = null;

// 🟢 Carrega todos os livros
async function carregarLivros() {
  const res = await fetch(API_URL);
  const livros = await res.json();
  lista.innerHTML = "";

  livros.forEach(livro => {
    const card = document.createElement("div");
    card.className = "col-md-4";
    card.innerHTML = `
      <div class="card shadow-sm h-100">
        <img src="${livro.imagemCard}" class="card-img-top" alt="${livro.titulo}">
        <div class="card-body">
          <h5 class="card-title">${livro.titulo}</h5>
          <p class="card-text"><strong>Autor:</strong> ${livro.autor}</p>
          <p class="card-text"><small>${livro.genero}</small></p>
          <div class="d-flex justify-content-between">
            <button class="btn btn-warning btn-sm" onclick="editarLivro(${livro.id})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="deletarLivro(${livro.id})">Excluir</button>
          </div>
        </div>
      </div>
    `;
    lista.appendChild(card);
  });
}

// 🟡 Editar
async function editarLivro(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const livro = await res.json();

  document.getElementById("titulo").value = livro.titulo;
  document.getElementById("autor").value = livro.autor;
  document.getElementById("genero").value = livro.genero;
  document.getElementById("resumo").value = livro.resumo;
  document.getElementById("imagemCard").value = livro.imagemCard;
  document.getElementById("imagemCarrossel").value = livro.imagemCarrossel;
  document.getElementById("paginas").value = livro.paginas;
  document.getElementById("lancamento").value = livro.lancamento;

  editandoId = id;
}

// 🔴 Deletar
async function deletarLivro(id) {
  if (confirm("Tem certeza que deseja excluir este livro?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    carregarLivros();
  }
}

// 🟢 Salvar (Create / Update)
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const novoLivro = {
    titulo: document.getElementById("titulo").value,
    autor: document.getElementById("autor").value,
    genero: document.getElementById("genero").value,
    resumo: document.getElementById("resumo").value,
    imagemCard: document.getElementById("imagemCard").value,
    imagemCarrossel: document.getElementById("imagemCarrossel").value,
    paginas: document.getElementById("paginas").value,
    lancamento: document.getElementById("lancamento").value
  };

  if (editandoId) {
    await fetch(`${API_URL}/${editandoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoLivro)
    });
    editandoId = null;
  } else {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoLivro)
    });
  }

  form.reset();
  carregarLivros();
});

// 🧹 Limpar formulário
btnLimpar.addEventListener("click", () => {
  form.reset();
  editandoId = null;
});

carregarLivros();
