function removeAll() {
  let remove = document.getElementsByClassName('array-container');
	// remove.remove();
  console.log(remove);
}

function displayArray(arr) {
  // removeAll();
  let container = document.createElement("div");
  container.className = "array-container";
  container.style.position = "absolute";
  container.style.display = "inline-flex";
	for (valor of arr) {
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
	canvas.append(container);

	function center() {
		container.style.left = (canvas.offsetWidth / 2) - (container.offsetWidth / 2) + "px";
	}
	center();
  // window.resize(center);

  return container;
}

function center(container) {
  container.style.left = `${(canvas.offsetWidth / 2) - (container.offsetWidth / 2)}px`;
}

function displayMultArray(arr,valor) {
  let container = document.createElement("div");
  container.className = "array-container";
  container.style.position = "absolute";
  container.style.display = "inline-flex";
	for (complejo of arr) {
    let etiqueta = document.createElement("p");
    etiqueta.innerHTML = real(iguales(complejo.re));
    etiqueta.innerHTML += imaginario(iguales(complejo.im));
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
  canvas.appendChild(container);

	center(container);
  container.style.top = `${(container.offsetHeight + topMargin) * valor}px`;
  return container;
}
