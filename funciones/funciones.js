class Complex
{
	constructor(real,imaginary)
	{
		this.re = real;
		this.im = imaginary;
	}

	multiply = (C) => new Complex(this.re * C.re - this.im * C.im, this.re * C.im + this.im * C.re);

	add = (C) => new Complex(this.re + C.re, this.im + C.im);

	rest = (C) => new Complex(this.re - C.re, this.im - C.im);
}

const menor = (a) => (Math.abs(a) <= 3e-14)? 0:a;

const convertToComplex = (arreglo) => {
  for (index in arreglo) {
    arreglo[index] = new Complex(arreglo[index],0);
  }
  return arreglo;
}

const offSetWidth = (elemento) => elemento.offsetWidth;

var canvas = document.getElementById("canvas");
canvas.style.position = "relative";
canvas.style.height = "40vh";

var conta = 0;
var contador = document.getElementById("contador");
contador.textContent = `${conta}`;

// Recursive function of FFT
async function fft(contenedor,arreglo,opcion)
{
	contador.textContent = `${conta++}`;
	const tam = arreglo.length;
	let contentSup = Array.from(contenedor.childNodes);
	// Validación para que el polinomio no tenga un solo elemento
	if (tam == 1)
	{
		cambiaColor(contentSup);
		return arreglo;
	}
	// Se guardan los completjos de cada unidad
	let w = new Array(tam);
	let alpha;
	for (let i = 0; i < tam; i++) {
		alpha = (2 * Math.PI * i) / tam;
		if (opcion == 0) {
			w[i] = new Complex(menor(Math.cos(alpha)), menor(Math.sin(alpha)));
		}
		else if (opcion == 1) {
			w[i] = new Complex(menor(Math.cos(-alpha)), menor(Math.sin(-alpha)));
		}
	}
	let ArrayPar = new Array(tam / 2);
	let ArrayImpar = new Array(tam / 2);
	for (let i = 0; i < tam / 2; i++) {
		// Indexación de los coeficientes pares
		ArrayPar[i] = arreglo[i * 2];
		// Indexación de los coeficientes impares
		ArrayImpar[i] = arreglo[(i * 2) + 1];
	}

	let pares = crearSubA(contenedor,ArrayPar,'I');
	canvas.appendChild(pares);
	await animarDivision(pares, '+', topMargin);

	let impares = crearSubA(pares,ArrayImpar,'D');
	canvas.appendChild(impares);
  await animarDivision(impares, '-', topMargin);

	// Se hace la llamada recursiva para los coeficientes pares
	let y0 = await fft(pares,ArrayPar,opcion); // SON NÚMEROS COMPLEJOS
	await animarFFT(pares, contenedor);
	cambiaColor(contentSup);
	pares.remove();
	// Se hace la llamada recursiva para los coeficientes impare
	let y1 = await fft(impares,ArrayImpar,opcion); // SON NÚMEROS COMPLEJOS
	await animarFFT(impares, contenedor);
	impares.remove();
	// se guardan los valores para y0, y1, y2, ..., yn-1.

	let y = new Array(tam);
	for (let k = 0; k < tam / 2; k++) {
		let M = w[k].multiply(y1[k]);
		y[k] = y0[k].add(M);
		y[k + tam / 2] = y0[k].rest(M);
		modificaArray(contentSup[k],y[k]);
		modificaArray(contentSup[k + tam / 2],y[k + tam / 2]);
	}

	return y;
}

function valuesMultiplication(valores1,valores2) {
	let arreglo = new Array(8);
	for (let i = 0; i < 8; i++) {
		arreglo[i] = valores1[i].multiply(valores2[i]);
	}
	return arreglo;
}

function interpola(arreglo) {
	let tam = arreglo.length;
	for (index in arreglo) {
		arreglo[index].re = Math.round(arreglo[index].re / tam);
		arreglo[index].im = Math.round(arreglo[index].im / tam);
	}
	return arreglo;
}

function filtrado(arreglo) {
	let tamResultado = arreglo.length;
	while (arreglo[tamResultado-1].re == 0) {
		tamResultado--;
	}
	let resultado = [];
	for (let i = 0; i < tamResultado; i++) {
		resultado[i] = arreglo[i].re;
	}
	return resultado;
}

/*****************************************************************************************/
/*                            PRUEBAS DE LOS MÉTODOS DE CLASE                            */
/*****************************************************************************************/
// Números complejos de prueba
// const num1 = new Complex(4,5);
// const num2 = new Complex(2,6);

// Impresiones de prueba
// console.log(`Número complejo A = ${num1.re} + ${num1.im}i`);
// console.log(`Número complejo B = ${num2.re} + ${num2.im}i`);
// console.log(`Suma de A y B = ${num1.add(num2).re} + ${num1.add(num2).im}i`);
// console.log(`Producto de A y B = ${num1.multiply(num2).re} + ${num1.multiply(num2).im}i`);
