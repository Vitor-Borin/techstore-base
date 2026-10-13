import { useState } from 'react'
import ProdutoCard from '../components/ProdutoCard'
import { estaEsgotado } from '../utils/produtos'

const CATEGORIAS = [
  { id: 'todas', nome: 'Todas' },
  { id: 'roupas', nome: 'Roupas' },
  { id: 'eletronicos', nome: 'Eletrônicos' },
  { id: 'acessorios', nome: 'Acessórios' },
  { id: 'casa', nome: 'Casa' },
]

export default function Loja({ produtos, onAdicionar }) {
  const [categoria, setCategoria] = useState('todas')

  // Produto esgotado não aparece mais na loja (pedido do comercial, 7 de outubro).
  // A lista é calculada a cada renderização a partir de produtos e categoria,
  // então não precisa de estado nem de useEffect.
  const disponiveis = produtos.filter((produto) => !estaEsgotado(produto))
  const produtosVisiveis =
    categoria === 'todas'
      ? disponiveis
      : disponiveis.filter((produto) => produto.category === categoria)

  return (
    <section>
      <div className="vitrine-topo">
        <p className="sobretitulo">Coleção de outubro</p>
        <h1>Produtos</h1>
      </div>

      <div className="filtros" role="group" aria-label="Filtrar por categoria">
        {CATEGORIAS.map((item) => (
          <button
            key={item.id}
            className={item.id === categoria ? 'filtro filtro-ativo' : 'filtro'}
            aria-pressed={item.id === categoria}
            onClick={() => setCategoria(item.id)}
          >
            {item.nome}
          </button>
        ))}
      </div>

      <div className="grade">
        {produtosVisiveis.map((produto) => (
          <ProdutoCard key={produto.id} produto={produto} onAdicionar={onAdicionar} />
        ))}
      </div>
    </section>
  )
}
