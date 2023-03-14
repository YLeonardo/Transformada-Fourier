// Programa para la solución por fuerza bruta de la multiplicación de dos polinomios

// A[] son los coeficientes del primer polinomio
// B[] son los coeficientes del segundo polinomio
// m y n son el tamaño (grado) de cada polinomio
function multiply(A, B, m, n){
	var prod = [];
	for (var i = 0; i < m + n - 1; i++) prod[i] = 0;
	// Multiplica ambos polinomios término a término

	// Este for toma cada término del primer polinomio
	for(var i = 0; i < m ; i++){
		// Con este otro for multiplicamos el término en el 
		// término del primer polinomio que tengamos por cada 
		// término del segundo polinomio
		for (var j = 0; j < n ; j++)
			prod[i + j] += A[i] * B[j];
	}
	return prod;
}
// Con esto se muestran correctamente la represetnación polinomial
function printPoly(poly, n){
	let ans= '';
	for (var i = 0; i < n ; i++){
		ans += poly[i];
		if (i != 0)
			ans +="x^ "+i;
		if (i != n - 1)
			ans += " + ";
	}
	document.write(ans)
}

// Representación  polinomial para: 4 + 3x +2x^2 + x^3
A = [4, 3, 2, 1];

// Representacón polinomial para: 1 + 2x + 3x^2 + 4x^3
let B = [1, 2, 3, 4];
let m = (A).length;
let n = (B).length;

console.log("[FUERZA BRUTA]");
console.log("Primer polinomio");
console.log(A);
console.log("Segundo polinomio");
console.log(B);

let prod = multiply(A, B, m, n);
console.log("Resultado de multiplicación");
console.log(prod);
