// Regras de venda dos produtos

// O preço já chega como número ou null (ver services/produtos.js)
export function temPreco(produto) {
  return typeof produto.price === 'number'
}

export function estaEsgotado(produto) {
  return produto.estoque <= 0
}

// Só vai para o carrinho o produto que tem preço definido e unidades em estoque
export function podeVender(produto) {
  return temPreco(produto) && !estaEsgotado(produto)
}
