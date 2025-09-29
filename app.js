const candidatos = [
  "Parisi",
  "Jara",
  "MEO",
  "Kaiser",
  "Kast",
  "Artés",
  "Matthei",
  "Mayne-Nicholls",
  "Blanco",
  "Nulo"
];

let votos = JSON.parse(localStorage.getItem("votos")) || {};

candidatos.forEach(c => {
  if (!(c in votos)) votos[c] = 0;
});

const contenedor = document.getElementById("listaCandidatos");
const totalDiv = document.getElementById("total");

function guardar() {
  localStorage.setItem("votos", JSON.stringify(votos));
}

function totalVotos() {
  return Object.values(votos).reduce((a, b) => a + b, 0);
}

function render() {
  contenedor.innerHTML = "";
  candidatos.forEach((nombre, indice) => {
    const div = document.createElement("div");
    div.className = "candidato";
    div.innerHTML = `
      <span><strong>${indice + 1} . ${nombre}</strong>: ${votos[nombre]}</span>
      <div>
      <input type="number" id="input-${nombre}" value="${votos[nombre]}" 
               onchange="setVotos('${nombre}', this.value)">
        <button class="btn-mas" onclick="votar('${nombre}')">+1</button>
        <button class="btn-menos" onclick="restar('${nombre}')">-1</button>
      </div>
    `;
    contenedor.appendChild(div);
  });

  totalDiv.textContent = `Total de votos: ${totalVotos()}`;
}

function votar(nombre) {
  votos[nombre]++;
  guardar();
  render();
}

function restar(nombre) {
  if (votos[nombre] > 0) {
    votos[nombre]--;
    guardar();
    render();
  }
}

// Botón reset
document.getElementById("reset").addEventListener("click", () => {
  // Reiniciar todos los votos
  candidatos.forEach(c => votos[c] = 0);

  guardar(); // Guardar en localStorage
  render();  // Refrescar la pantalla
});

function setVotos(nombre, valor) {
  const numero = parseInt(valor, 10);
  votos[nombre] = isNaN(numero) || numero < 0 ? 0 : numero; // seguridad
  guardar();
  render();
}


render();
