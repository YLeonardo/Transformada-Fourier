let formu = document.getElementById("formu2");
let polinomio1Animacion1 = document.getElementById("animacionPolinomio1");
let polinomio1Animacion2 = document.getElementById("animacionPolinomio2");
let resultadosP = document.getElementById("resultadosPrevios");
let resultados = document.getElementById("resultados");
let contenedorprincipal = document.getElementById("contenedorprincipal");
let aux23 = [];
let aux24 = [];
let arreglosSpan = [];


const guardar = () => {
    let i = 0;
    contenedorprincipal.hidden = true;
    for (i = 0; i <= 4; i++) {
        let coefi1 = "polinomio1" + i;
        let coefi2 = "polinomio2" + i;
        let poli1 = document.getElementById(coefi1);
        let poli2 = document.getElementById(coefi2);
        aux23.push([poli1.value, i]);
        aux24.push([poli2.value, i]);
    }
}

let resultadosPrevios = [];
const multiplicarPolinomio = () => {
    let i = 0, j = 0;
    for (i = 0; i < aux23.length; i++) {
        for (j = 0; j < aux24.length; j++) {
            let coeficiente = (aux23[i][0]) * (aux24[j][0]);
            let grado = (aux23[i][1]) + (aux24[j][1]);
            resultadosPrevios.push([coeficiente, grado]);
        }
    }
    console.log(resultadosPrevios);
}

let resultado = [];

const reduccionTerminos = () => {
    let i = 0, j = 0, sumaCoeficiente = 0;
    for (i = 0; i <= 8; i++) {
        for (j = 0; j < resultadosPrevios.length; j++) {
            if (i === resultadosPrevios[j][1]) {
                sumaCoeficiente += resultadosPrevios[j][0];
            }
        }
        resultado.push([sumaCoeficiente, i]);
        sumaCoeficiente = 0;
    }
    console.log(resultado);
}
//POLINOMIO 1
const primerBloqueAnimacion = () => {
    console.log(aux23);
    let html = '';
    aux23.forEach((S, id) => {
        let exponente = '';
        if (S[1] === 1) {
            exponente = "x";
        }
        if (S[1] > 1) {
            exponente = "x" + `<sup>${S[1]}</sup>`;
        }
        console.log(exponente);
        html += `<span id='polinomio3${id}' class='m-4 p-2'>${S[0] + exponente}</span>`
    });
    console.log(html);
    polinomio1Animacion1.innerHTML = html;
}
//POLINOMIO 2
const segundoBloqueAnimacion = () => {
    console.log(aux24);
    let html = '';
    aux24.forEach((S, id) => {
        let exponente = '';
        if (S[1] === 1) {
            exponente = "x";
        }
        if (S[1] > 1) {
            exponente = "x" + `<sup>${S[1]}</sup>`;
        }
        console.log(exponente);
        html += `<span id='polinomio4${id}' class='m-4 p-2'>${S[0] + exponente}</span>`
    });
    console.log(html);
    polinomio1Animacion2.innerHTML = html;
}
//RESULTADOS PREVIOS
const tercerBloqueAnimacion = () => {
    let contador = 0;
    console.log(resultadosPrevios);
    let html = '';
    let html2 = '';
    resultadosPrevios.forEach((S, id) => {
        contador++;
        let exponente = '';
        if (S[1] === 1) {
            exponente = "x";
        }
        if (S[1] > 1) {
            exponente = "x" + `<sup>${S[1]}</sup>`;
        }
        console.log(exponente);
        html += `<span id='resultadosP${S[1]}${id}' class='m-4 p-2'>${S[0] + exponente}</span>`
        if (contador === 5) {
            html2 += `<section class="container mt-3">${html}</section>`;
            html = '';
            contador = 0;
        }
    });
    console.log(html);
    resultadosP.innerHTML = html2;
}
//RESULTADO CON FILTRO
const cuartoBloqueAnimacion = () => {
    console.log(resultado);
    let html = '';
    resultado.forEach((S, id) => {
        let exponente = '';
        if (S[1] === 1) {
            exponente = "x";
        }
        if (S[1] > 1) {
            exponente = "x" + `<sup>${S[1]}</sup>`;
        }
        console.log(exponente);
        html += `<span id='resultado${id}' class='m-4 p-2'>${S[0] + exponente}</span>`
    });
    console.log(html);
    resultados.innerHTML = html;
}

const botonRegresar = () => {
    let boton3 = document.getElementById("boton3");
    boton3.style.display = "none";

    const boton = document.createElement('button');
    boton.setAttribute('type', 'button');
    boton.textContent = 'Regresar';
    boton.style.position = "fixed";
    boton.classList.add('btn', 'btn-primary');
    boton.style.bottom = "50px";
    boton.style.left = "50%";
    boton.style.transform = "translateX(-50%)";
    boton.style.fontSize = "1.5rem";
    document.body.appendChild(boton);
    boton.addEventListener('click', function() {
        window.location.href = 'index.html';
      });
}


formu.addEventListener("submit", (event) => {
    event.preventDefault();
    botonRegresar();
    guardar();
    multiplicarPolinomio();
    reduccionTerminos();
    primerBloqueAnimacion();
    segundoBloqueAnimacion();
    tercerBloqueAnimacion();
    cuartoBloqueAnimacion();
    guardarElemento();
    pruebani();
});

//ANIMACION
let pruebani = () => {
    var tl = anime.timeline({
        easing: 'easeOutExpo',
    });
    for(let x=0; x<elementos.length; x++){
        if((elementos[x].id).startsWith("polinomio3"))
        {
            tl.add({
                targets: [elementos[x], elementos[x+1]],
                color: "#fff",
                backgroundColor: "#018ABE",
                duration:200
            },'+=200')
            tl.add({
                targets: [elementos[x], elementos[x+1]],
                color: "#fff",
                backgroundColor: "#001B48",
                duration:200
            },'+=200')
            console.log(elementos);
            x++;
        }
        if((elementos[x].id).startsWith("resultadosP"))
        {
            tl.add({
                targets: [elementos[x]],
                color: "#fff",
                backgroundColor: "#018ABE",
                duration:200
            },'+=200')
            tl.add({
                targets: [elementos[x]],
                color: "#fff",
                backgroundColor: "#001B48",
                duration:200
            },'+=200')
            console.log(elementos);
        }
    }
    for (let u = 0; u <= 8; u++) { //U tiene que llegar al grado maximo de la multiplicacion
        let arr = [];
        arreglosSpan.forEach((ele) => {
            if ((ele.id).startsWith("resultadosP" + u))
                arr.push(ele);
        })
        tl.add({
            targets: [arr],
            color: "#fff",
            backgroundColor: "#018ABE",
            duration: 200
        }, '+=200')
        tl.add({
            targets: [arr],
            color: "#fff",
            backgroundColor: "#001B48",
            duration: 200
        }, '+=200')
        
        let r = document.getElementById("resultado" + u);
        tl.add({
            targets: [r],
            color: "#fff",
            backgroundColor: "#018ABE",
            duration: 200
        }, '+=200')
        tl.add({
            targets: [r],
            color: "#fff",
            backgroundColor: "#001B48",
            duration: 200
        }, '+=200')
        console.log(arr);
    }
    
    let final = document.getElementById("resultados");
    tl.add({
        targets: [final],
        border: "0.75rem solid #fff",
        duration: 200
    }, '+=200')
    let compa= document.getElementById("comparaciones")
    tl.add({
        targets: [compa],
        color: "#fff",
        duration: 200
    }, '+=200')
}


let elementos = [];
let guardarElemento = () => {
    let barrido = 0;
    for (let h = 0; h < aux23.length; h++) {
        for (let w = 0; w < aux24.length; w++) {
            let p3 = "polinomio3" + h;
            let p4 = "polinomio4" + w;
            let pr = "resultadosP"+resultadosPrevios[barrido][1] + barrido;
            let busquedap3 = document.getElementById(p3);
            let busquedap4 = document.getElementById(p4);
            let barri = document.getElementById(pr);
            arreglosSpan.push(barri);
            elementos.push(busquedap3);
            elementos.push(busquedap4);
            elementos.push(barri);
            barrido++;
        }
    }
    console.log(elementos);
}

/*let recorridoF=()=>{
    let barr=0;
    for(let l=0; l<)
}*/

