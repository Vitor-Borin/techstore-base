import { Link, useParams } from 'react-router'
import AvisoEstoque from '../components/AvisoEstoque'
import Avaliacao from '../components/Avaliacao'
import ProdutoCard from '../components/ProdutoCard'
import { formatarPreco } from '../utils/formatarPreco'
import { estaEsgotado, podeVender, temPreco } from '../utils/produtos'

export default function PaginaProduto({ produtos, avisos, onAdicionar, onAvisar }) {
  const { id } = useParams()
  const produto = produtos.find((item) => item.id === id)

  if (!produto) {
    return (
      <div className="estado-vazio">
        <p>Produto não encontrado.</p>
        <Link to="/" className="botao botao-secundario">
          Voltar para a loja
        </Link>
      </div>
    )
  }

  const esgotado = estaEsgotado(produto)

  // Esgotado não aparece na loja, então também fica fora dos relacionados.
  // A página dele continua abrindo pelo link direto (links divulgados pelo marketing).
  const relacionados = produtos
    .filter(
      (item) =>
        item.category === produto.category && item.id !== produto.id && !estaEsgotado(item)
    )
    .slice(0, 4)

  return (
    <section>
      <nav className="trilha" aria-label="Você está em">
        <Link to="/">Loja</Link>
        <span aria-hidden="true">/</span>
        <span>{produto.title}</span>
      </nav>

      <div className="detalhe">
        <div className="detalhe-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="detalhe-imagem" />
        </div>

        <div className="detalhe-info">
          <h1>{produto.title}</h1>
          <Avaliacao rating={produto.rating} />
          {/* Regra de promoções: preço original riscado ao lado do preço atual */}
          {temPreco(produto) ? (
            <div className="detalhe-precos">
              {produto.precoOriginal && (
                <span className="preco-original">{formatarPreco(produto.precoOriginal)}</span>
              )}
              <p className="detalhe-preco">{formatarPreco(produto.price)}</p>
            </div>
          ) : (
            <p className="detalhe-preco detalhe-preco-em-breve">Preço em breve</p>
          )}
          <p className="detalhe-descricao">{produto.description}</p>
          {esgotado && (
            <p className="detalhe-estoque detalhe-estoque-esgotado">Esgotado no momento</p>
          )}
          {!esgotado && temPreco(produto) && (
            <p className="detalhe-estoque">{produto.estoque} unidades disponíveis</p>
          )}
          {!temPreco(produto) && (
            <p className="detalhe-estoque detalhe-estoque-aviso">
              Chega em breve: o preço deste produto ainda está sendo definido.
            </p>
          )}

          {/* key: ao trocar de produto, o formulário começa do zero */}
          {esgotado ? (
            <AvisoEstoque key={produto.id} produto={produto} avisos={avisos} onAvisar={onAvisar} />
          ) : (
            <button
              className="botao botao-grande"
              onClick={() => onAdicionar(produto)}
              disabled={!podeVender(produto)}
            >
              Adicionar ao carrinho
            </button>
          )}

          <ul className="detalhe-garantias">
            <li>Troca grátis em até 30 dias</li>
            <li>Parcele em até 10x sem juros</li>
          </ul>
        </div>
      </div>

      {relacionados.length > 0 && <h2>Produtos relacionados</h2>}
      <div className="grade">
        {relacionados.map((item) => (
          <ProdutoCard key={item.id} produto={item} onAdicionar={onAdicionar} />
        ))}
      </div>
    </section>
  )
}
