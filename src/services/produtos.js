import { get } from './api'

// Formato dos produtos documentado em docs/api.md.
// A API manda o preço de alguns produtos como texto ("89", "189.90") e de outros não manda.
// Aqui o preço vira número, ou null quando o produto ainda não tem preço definido.
export function buscarProdutos() {
  return get('/products.json').then((produtos) =>
    produtos.map((produto) => ({
      ...produto,
      price: converterPreco(produto.price),
      precoOriginal: converterPreco(produto.precoOriginal),
    }))
  )
}

function converterPreco(valor) {
  if (valor === undefined || valor === null || valor === '') return null
  const preco = Number(valor)
  return isNaN(preco) ? null : preco
}
