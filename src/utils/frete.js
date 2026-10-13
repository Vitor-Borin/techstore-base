// Campanha de frete grátis (marketing, 10 de outubro):
// vale para compras acima de R$ 200 no valor final, já com o desconto do cupom.
export const VALOR_MINIMO_FRETE_GRATIS = 200

// Contas em centavos, para não errar por arredondamento (0.1 + 0.2 = 0.30000000000000004)
function emCentavos(valor) {
  return Math.round(valor * 100)
}

export function temFreteGratis(valorFinal) {
  return emCentavos(valorFinal) > emCentavos(VALOR_MINIMO_FRETE_GRATIS)
}

// "Acima de R$ 200" quer dizer que R$ 200,00 ainda não ganha: o mínimo é R$ 200,01
export function faltaParaFreteGratis(valorFinal) {
  const falta = emCentavos(VALOR_MINIMO_FRETE_GRATIS) + 1 - emCentavos(valorFinal)
  return Math.max(0, falta) / 100
}
