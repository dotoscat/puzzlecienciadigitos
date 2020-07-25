"use strict";

const NUMERO_DIGITOS = 10; // Del 0 al 9

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
        for (let digito in this._estado) {
            if (this._estado[digito] != otro._estado[digito]) {
                return false;
            }
        }
        return true;
    }
}

function calcularOcurrencias(estado) {
    const siguiente = estado.contar();
    if (siguiente.esIgual(estado)){
        return siguiente;
    }
    return calcularOcurrencias(siguiente);
}

function onclickCalcular() {
    const final = calcularOcurrencias(new Ocurrencias());
    for (let i = 0; i < NUMERO_DIGITOS; i++){
        const casilla = document.getElementById(String(i));
        casilla.innerText = final.estado[i];
    }
}
