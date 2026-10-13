const CUPONS = {
  PRIMEIRACOMPRA: 0.1,
}

// Valida o cupom para o cliente que está comprando agora.
// Devolve se é válido, o desconto e a mensagem que o cliente vê.
export function validarCupom(codigo, cliente) {
  const codigoNormalizado = codigo.trim().toUpperCase()
  const desconto = CUPONS[codigoNormalizado]

  if (codigoNormalizado === '') {
    return { valido: false, mensagem: 'Digite o código do cupom.' }
  }

  if (!desconto) {
    return { valido: false, mensagem: 'Cupom não encontrado. Confira o código digitado.' }
  }

  if (!cliente) {
    return {
      valido: false,
      mensagem: 'Não conseguimos identificar o cliente. Recarregue a página e tente de novo.',
    }
  }

  // Regra do financeiro (versão 1.3.0): só vale para quem ainda não comprou na loja
  if (codigoNormalizado === 'PRIMEIRACOMPRA' && cliente.pedidosAnteriores > 0) {
    return {
      valido: false,
      mensagem: 'O cupom PRIMEIRACOMPRA vale só para a primeira compra na loja.',
    }
  }

  return {
    valido: true,
    desconto,
    mensagem: `Cupom ${codigoNormalizado} aplicado: ${desconto * 100}% de desconto.`,
  }
}
