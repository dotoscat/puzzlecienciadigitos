// Copyright 2020 Oscar Triano García 

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software
// and associated documentation files (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge, publish, distribute,
// sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies
// or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
// ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


"use strict";

const NUMERO_DIGITOS = 10; // Del 0 al 9
let estados = [];

class Ocurrencias {
    constructor() {
        this._estado = {};
        for (let i = 0; i < NUMERO_DIGITOS; i++) {
            this._estado[i] = "1";// Como mínimo el que hay como clave o índice
        }
    }

    get estado() {
        return this._estado;
    }

    _contarNumeroDeOcurrenciasDe(digito) {
        let veces = 1;
        for(let i in this._estado) {
            const valor = this._estado[i];
            for (let d of Array.from(valor)){
                if (d == digito) {
                    veces++;
                }
            }
        }
        return veces;
    }

    contar() {
        const siguiente = new Ocurrencias()
        for(let digito in this._estado) {
            let veces = this._contarNumeroDeOcurrenciasDe(digito);
            siguiente._ponerNumeroOcurrenciasPara(digito, veces);
        }
        return siguiente;
    }

    _ponerNumeroOcurrenciasPara(digito, veces) {
        this._estado[digito] = String(veces);
    }

    esIgual(otro) {
        if (!(otro instanceof Ocurrencias)) {
            return false;
        }
        for (let digito in this._estado) {
            if (this._estado[digito] != otro._estado[digito]) {
                return false;
            }
        }
        return true;
    }
}

function* calcularOcurrencias(estado) {
    let anterior = null;
    for(;!estado.esIgual(anterior);){
        yield estado;
        anterior = estado;
        estado = estado.contar();
    }
}

function actualizar(ocurrencias) {
    for (let i = 0; i < NUMERO_DIGITOS; i++){
        const casilla = document.getElementById(String(i));
        casilla.innerText = ocurrencias.estado[i];
    }
}

function onclickCalcular() {
    estados = Array.from(calcularOcurrencias(new Ocurrencias()));
    const pasoControl = document.getElementById("paso");
    pasoControl.max = estados.length;
    pasoControl.value = estados.length;
    actualizar(estados[estados.length-1]);
}

function oninputPaso(){
    if (estados.length == 0){
        return;
    }
    const pasoControl = document.getElementById("paso");
    if (pasoControl.value == "" || pasoControl.value > pasoControl.max){
        return;
    }
    const i = pasoControl.value - 1;
    actualizar(estados[i]);
}
