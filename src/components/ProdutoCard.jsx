import { Link } from 'react-router'
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

      {produto.rating.count > 0 ? (
        <p className="card-avaliacao">
          ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
        </p>
      ) : (
        <p className="card-avaliacao">
          <span>Sem avaliações ainda</span>
        </p>
      )}

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
        {produto.price > 100 && <span className="selo selo-frete">Frete grátis</span>}
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
