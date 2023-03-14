let miliseconds = {value: 650};
const topMargin = 32;
let getTimeout = () => {
  return miliseconds;
}
let timeout = getTimeout();

const real = (a) => (a <= 0)? `- ${Math.abs(a)}`:`${a}`;
const imaginario = (a) => (a <= 0)? ` - ${Math.abs(a)}i`:` + ${a}i`;
const iguales = (a) => (a == a.toFixed(2))? `${a}`:`${a.toFixed(2)}`;

function crearSubA(contenedor,arreglo,direccion) {
  let container = document.createElement("div");
  container.className = "array-container";
  container.style.position = "absolute";
  container.style.display = "inline-flex";
  for (valor of arreglo) {
    let etiqueta = document.createElement("p");
    etiqueta.innerHTML = real(iguales(valor.re));
    etiqueta.innerHTML += imaginario(iguales(valor.im));
    let elemento = document.createElement("div");
    elemento.className = "array-element";
    elemento.style.border = "1px solid #D6E8EE";
    elemento.style.backgroundColor = "#018ABE";
    elemento.style.color = "#D6E8EE";
    elemento.style.fontWeight = "600";
    elemento.style.padding = "0 16px";
    elemento.appendChild(etiqueta);
    container.innerHTML += `${elemento.outerHTML}`;
  }
  if (direccion === 'I') {
    container.style.left = `${contenedor.offsetLeft - contenedor.offsetWidth/8}px`;
    container.style.top = `${contenedor.offsetTop + contenedor.offsetHeight + topMargin}px`;
  }
  else if (direccion === 'D') {
    container.style.left = `${contenedor.offsetLeft + contenedor.offsetWidth * (3/2)}px`;
    container.style.top = `${contenedor.offsetTop}px`;
  }
  return container;
}

async function animarDivision(half, dir) {
  return new Promise(resolve => {
    half.animate({
      transform: [
        `translate(${dir}${half.offsetWidth/2}px, ${-half.offsetHeight - topMargin}px)`,
        'translate(0, 0)'
      ]
    }, timeout.value);
    setTimeout(() => {
      resolve();
    }, timeout.value);
  });
}

function animarFFT(element, target) {
  return new Promise(resolve => {
    element.animate({
      transform: [
        'translate(0, 0)',
        `translate(
          ${target.offsetLeft - element.offsetLeft}px,
          ${target.offsetTop - element.offsetTop}px
        )`
      ]
    }, timeout.value);

    setTimeout(() => {
      // Hide animated element
      element.remove();
      // Confirm ordered index
      target.style.background = "#02457A";
      resolve();
    }, timeout.value);
  });
}

function animaMultiplicacion(valoresA, valoresB) {
  return new Promise(resolve => {
    valoresA.animate({
      transform: [
        'translate(0, 0)',
        `translate(${valoresB.offsetLeft - valoresA.offsetLeft}px,${valoresB.offsetTop - valoresA.offsetTop}px)`
      ]
    }, timeout.value);

    setTimeout(() => {
      // Hide animated element
      valoresA.remove();
      // Confirm ordered index
      valoresB.style.background = "#02457A";
      resolve();
    }, timeout.value);
  });
}

function modificaArray(contenedor,complejo) {
  contenedor.innerHTML = '';
  let etiqueta = document.createElement("p");
  etiqueta.innerHTML = real(iguales(complejo.re));
  etiqueta.innerHTML += imaginario(iguales(complejo.im));
  contenedor.className = "array-element";
  contenedor.style.display = "inline-flex";
  contenedor.style.border = "1px solid #D6E8EE";
  contenedor.style.backgroundColor = "#02457A";
  contenedor.style.color = "#D6E8EE";
  contenedor.style.padding = "0 16px";
  contenedor.appendChild(etiqueta);
  return contenedor;
}

function modificaArrays(contenedor,complejos) {
  contenedor.innerHTML = '';
  for (valor of complejos) {
    let etiqueta = document.createElement("p");
    etiqueta.innerHTML = real(iguales(valor));
    let elemento = document.createElement("div");
    elemento.className = "array-element";
    elemento.style.border = "1px solid #D6E8EE";
    elemento.style.backgroundColor = "#02457A";
    elemento.style.color = "#D6E8EE";
    elemento.style.fontWeight = "600";
    elemento.style.padding = "0 16px";
    elemento.appendChild(etiqueta);
    contenedor.innerHTML += `${elemento.outerHTML}`;
  }
  contenedor.style.left = `${(canvas.offsetWidth / 2) - (contenedor.offsetWidth / 2)}px`;
  return contenedor;
}

function cambiaColor(contenedor) {
	for (div of contenedor) {
		div.style.background = "#02457A";
    div.style.color = "#D6E8EE";
	}
}

const creaBoton = (textoBoton = "CONTINUAR") => {
  const botoncito = document.createElement("button");
  botoncito.className = "button";
  botoncito.innerHTML = textoBoton;
  botoncito.style.transform = "scale(95%)";
  botoncito.style.margin = "0 auto";
  botoncito.style.fontWeight = "bold";
  botoncito.style.backgroundColor = "#018ABE";
  botoncito.style.color = "#D6E8EE";
  botoncito.style.padding = "8px 16px";
  botoncito.style.borderStyle = "none";
  botoncito.style.borderRadius = "3px";
  botoncito.style.transition = "all 0.3s ease 0s";
  botoncito.style.marginTop = "680px";

  botoncito.addEventListener("mouseenter", (hover) => {
    // highlight the mouseenter target
    hover.target.style.transform = "scale(100%)";
    hover.target.style.boxShadow = "0 0 15px 0 rgb(1 138 190 / 20%)";
    // reset the color after a short delay
    botoncito.addEventListener("mouseleave", () => {
      hover.target.style.transform = "scale(95%)";
      hover.target.style.color = "#D6E8EE";
      hover.target.style.boxShadow = "none";
    });
  });

  const contenedorBotoncito = document.createElement("div");
  contenedorBotoncito.className = "text-center";
  contenedorBotoncito.appendChild(botoncito);

  document.body.appendChild(contenedorBotoncito);
  return contenedorBotoncito;
}
