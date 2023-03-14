let coefA = []; // Representación de coeficientes del polinomio A
let coefB = []; // Representación de coeficientes del polinomio B
// x^4(x^3) = x^7 => 8 valores

let formu = document.getElementById("formu2");
let operaciones = document.getElementById("operaciones");
let contDesc = document.getElementById("contenedor-descripcion");
let descripcion = document.getElementById("descripcion");
canvas.hidden = true;
operaciones.hidden = true;
contDesc.hidden = true;

async function guardar() {
  let i = 0;
  contenedorFFT.hidden = true;
  for (i = 0; i <= 3; i++) {
    let coefi1 = "polinomio6" + i;
    let coefi2 = "polinomio7" + i;
    let poli1 = document.getElementById(coefi1);
    let poli2 = document.getElementById(coefi2);
    coefA.push(parseInt(poli1.value));
    coefB.push(parseInt(poli2.value));
  }
  return [coefA,coefB];
}

formu.addEventListener("submit", (event) =>
{
  event.preventDefault();
  let arreglos = guardar();
  contenedorFFT.remove();
  arreglos.then((coeficientes) =>
  {

    for (let i = 4; i < 8; i++) {
      coeficientes[0].push(0);
      coeficientes[1].push(0);
    }

    coefA = convertToComplex(coeficientes[0]);
    coefB = convertToComplex(coeficientes[1]);

    canvas.hidden = false;
    operaciones.hidden = false;

    descripcion.innerHTML = "Representación de Valores del Primer Polinomio";
    descripcion.style.color = "#343a40";
    contDesc.hidden = false;
    let containerCoefA = displayArray(coefA);
    const valoresA = fft(containerCoefA, coefA, 0); // Representación de valores en puntos del polinomio A

    valoresA.then(valoresA =>
    {
      center(containerCoefA);
      let botoncito = creaBoton();
      botoncito.onclick = () =>
      {
        canvas.innerHTML = "";
        botoncito.remove();

        conta = 0;
        let containerCoefB = displayArray(coefB);
        descripcion.innerHTML = "Representación de Valores del Segundo Polinomio";
        const valoresB = fft(containerCoefB, coefB, 0); // Representación de valores en puntos del polinomio B
        valoresB.then(valoresB =>
        {
          center(containerCoefB);
          let botoncito = creaBoton();
          botoncito.onclick = () =>
          {
            canvas.innerHTML = "";
            botoncito.remove();

            console.log("[VALORES EN PUNTOS]", valoresA, valoresB);
            descripcion.innerHTML = "Multiplicación de los Valores para obtener los de C";
            let multiplicaA = displayMultArray(valoresA,1);
            let multiplicaB = displayMultArray(valoresB,2);
            let multiplicaBoton = creaBoton("MULTIPLICACIÓN");
            multiplicaBoton.onclick = () =>
            {
              multiplicaBoton.remove();
              const valoresC = valuesMultiplication(valoresA, valoresB); // Representación de valores en puntos del polinomio C = A * B
              let multiplicados = animaMultiplicacion(multiplicaA, multiplicaB);
              multiplicados.then(() =>
              {
                multiplicaB.remove();
                displayMultArray(valoresC,2);
                let botoncito = creaBoton();
                botoncito.onclick = () =>
                {
                  canvas.innerHTML = "";
                  botoncito.remove();

                  console.log("[VALORES EN PUNTOS DE 'C']", valoresC);
                  descripcion.innerHTML = "Regresamos a Coeficientes del polinomio 3 ";

                  conta = 0;
                  let containerValC = displayArray(valoresC);
                  let interpolation = fft(containerValC, valoresC, 1);
                  interpolation.then(valoresC =>
                  {
                    center(containerValC);
                    descripcion.innerHTML = "Se divide entre la cantidad de elementos";
                    let botonDivide = creaBoton("DIVISIÓN");
                    botonDivide.onclick = () =>
                    {
                      botonDivide.remove();
                      containerValC.remove();
                      containerValC = displayArray(valoresC);
                      let coefC = interpola(valoresC); // Representación de coeficientes del polinomio C = A * B

                      console.log("[INTERPOLACIÓN = COEFICIENTES DE 'C']", coefC);
                      coefC = filtrado(coefC); // Se filtran los posibles 0's al final del arreglo
                      console.log("[FILTRADO DE 0'S AL FINAL DEL ARREGLO]", coefC);
                      containerValC = modificaArrays(containerValC,coefC);
                      canvas.style.height = `${containerValC.offsetHeight + topMargin}px`;
                      let botonRegresar = creaBoton("REGRESAR");
                      descripcion.innerHTML = "¡Listo! El resultado en coeficientes del polinomio 3 es:";
                      botonRegresar.onclick = () =>{
                        window.location.href = "index.html";
                      }
                    };
                  });
                };
              });
            };
          };
        });
      };
    });
  });
});




/*****************************************************************************************/
/*                            PASOS DE MULTIPLICACIÓN CON FFT                            */
/*****************************************************************************************/
/*
 * PASO 1:
 * 		EVALUAR LOS POLINOMIOS => REPRESENTACIÓN DE ESOS POLINOMIOS (VALORES)
 * PASO 2:
 *  	MULTIPLICAMOS LOS VALORES DE CADA POLINOMIO => REPRESENTACIÓN DEL POLINOMIO QUE ESTAMOS BUSCANDO "C" (VALORES)
 * PASO 3:
 *		SE INTERPOLA EL RESULTADO DE LA MULTIPLICACIÓN => REPRESENTACIÓN DE COEFICIENTES DEL POLINOMIO "C"
*/
