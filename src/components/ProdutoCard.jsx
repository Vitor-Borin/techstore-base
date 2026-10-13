import { Link } from 'react-router'
import Avaliacao from './Avaliacao'
import { formatarPreco } from '../utils/formatarPreco'
import { estaEsgotado, podeVender, temPreco } from '../utils/produtos'

export default function ProdutoCard({ produto, onAdicionar }) {
  const esgotado = estaEsgotado(produto)

  return (
    <article className="card">
      <Link to={`/produto/${produto.id}`} className="card-link">
        <div className="card-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="card-imagem" />
        </div>
        <h3 className="card-titulo">{produto.title}</h3>
      </Link>

      <Avaliacao rating={produto.rating} />

      <div className="card-precos">
        {temPreco(produto) ? (
          <>
            {produto.precoOriginal && (
              <span className="preco-original">{formatarPreco(produto.precoOriginal)}</span>
            )}
            <span className="preco">{formatarPreco(produto.price)}</span>
          </>
        ) : (
          <span className="preco-em-breve">Preço em breve</span>
        )}
      </div>

      <div className="card-selos">
        {esgotado && <span className="selo selo-esgotado">Esgotado</span>}
      </div>

      <button
        className="botao"
        onClick={() => onAdicionar(produto)}
        disabled={!podeVender(produto)}
      >
        Adicionar ao carrinho
      </button>
    </article>
  )
}
