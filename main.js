const lista = document.querySelector(".li-container ul");
const textocaja = document.querySelector(".search");
const notask = document.querySelector(".empty p");
const contador = document.querySelector(".task-count");
const plusbtn = document.querySelector(".btn-add");


function guardarItems() {
  const items = Array.from(lista.querySelectorAll('li p')).map(item => item.textContent);
  localStorage.setItem("items", JSON.stringify(items));
}

function cargarItems() {
  const storedItems = localStorage.getItem("items");
  if (storedItems) {
    JSON.parse(storedItems).forEach(agregarItem);
  }
}

function crearItem(texto) {
  const nuevaCajita = document.createElement("li");
  nuevaCajita.innerHTML = `<p>${texto}</p><button class="btn-delete">X</button>`;
  
  const deleteButton = nuevaCajita.querySelector(".btn-delete");
  deleteButton.addEventListener("click", () => eliminarItem(texto));

  return nuevaCajita;
}

function agregarItem(texto) {
  const nuevaCajita = crearItem(texto);
  lista.appendChild(nuevaCajita);
  actualizarContador();
}

function eliminarItem(texto) {
  const listItemToRemove = Array.from(lista.querySelectorAll('li p')).find(item => item.textContent === texto);

  if (listItemToRemove) {
    listItemToRemove.parentElement.remove();
    actualizarContador();
    guardarItems();
  }
}

function actualizarContador() {
  const itemCount = lista.childElementCount;
  contador.textContent = "Number of Task: " + itemCount;
  notask.style.display = itemCount ? "none" : "block";
}

plusbtn.addEventListener("click", function (event) {
  event.preventDefault();
  const texto = textocaja.value.trim();
  if (texto !== "") {
    agregarItem(texto);
    textocaja.value = "";
    guardarItems();
  }
});

cargarItems();