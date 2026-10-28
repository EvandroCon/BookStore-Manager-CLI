export function converterParaIdValido(texto: string): number | undefined {
    const numero = Number(texto);

    if (!Number.isInteger(numero) || numero <= 0) {
        return undefined;
    }

    return numero;
}

export function converterParaInteiroNaoNegativo(texto: string): number | undefined {
    if (texto.trim() === "") {
        return undefined;
    }

    const numero = Number(texto);

    if (!Number.isInteger(numero) || numero < 0) {
        return undefined;
    }

    return numero;
}