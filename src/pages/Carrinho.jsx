import { useState } from 'react'
import { Link } from 'react-router'
import ProdutoCard from '../components/ProdutoCard'
import { agruparItens, calcularTotal } from '../utils/carrinho'
import { validarCupom } from '../utils/cupons'
import { formatarPreco } from '../utils/formatarPreco'
import {
  VALOR_MINIMO_FRETE_GRATIS,
  faltaParaFreteGratis,
  temFreteGratis,
} from '../utils/frete'
import { podeVender } from '../utils/produtos'

export default function Carrinho({
  carrinho,
  produtos,
  clienteAtual,
  cupomAplicado,
  onAplicarCupom,
  onAdicionar,
  onRemover,
}) {
  const [codigoCupom, setCodigoCupom] = useState(cupomAplicado || '')

  const itens = agruparItens(carrinho)
  const total = calcularTotal(carrinho)

  // O cupom é validado de novo a cada renderização, com o cliente atual.
  // Antes o resultado ficava guardado no clique e continuava valendo
  // mesmo depois de trocar de cliente (caso da Mariana, apontado pelo financeiro).
  const resultadoCupom = cupomAplicado ? validarCupom(cupomAplicado, clienteAtual) : null
  const desconto = resultadoCupom && resultadoCupom.valido ? resultadoCupom.desconto : 0
  const totalComDesconto = total * (1 - desconto)

  // Só sugere o que pode ser comprado agora: sem esgotados e sem produtos sem preço
  const sugestoes = produtos
    .filter((produto) => podeVender(produto) && !carrinho.find((item) => item.id === produto.id))
    .slice(0, 4)

  function aplicarCupom(evento) {
    evento.preventDefault()
    // Enviar o campo vazio remove o cupom
    onAplicarCupom(codigoCupom.trim())
  }

  if (carrinho.length === 0) {
    return (
      <section>
        <h1>Carrinho</h1>
        <div className="estado-vazio">
          <p>Seu carrinho está vazio.</p>
          <Link to="/" className="botao botao-secundario">
            Ver produtos
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section>
      <h1>Carrinho</h1>

      <div className="carrinho-layout">
        <ul className="lista-carrinho">
          {itens.map((item) => (
            <li key={item.produto.id} className="item-carrinho">
              <div className="item-imagem-moldura">
                <img src={item.produto.image} alt={item.produto.title} />
              </div>
              <div className="item-info">
                <p className="item-titulo">{item.produto.title}</p>
                <p className="item-preco">{formatarPreco(item.produto.price)}</p>
              </div>
              <span className="item-quantidade">{item.quantidade} un.</span>
              <button className="botao-texto" onClick={() => onRemover(item.produto.id)}>
                Remover 1
              </button>
            </li>
          ))}
        </ul>

        <aside className="resumo">
          <h2 className="resumo-titulo">Resumo do pedido</h2>

          <form className="cupom" onSubmit={aplicarCupom}>
            <label htmlFor="cupom" className="rotulo">
              Cupom de desconto
            </label>
            <div className="cupom-campo">
              <input
                id="cupom"
                value={codigoCupom}
                onChange={(evento) => setCodigoCupom(evento.target.value)}
                placeholder="Digite o código"
              />
              <button className="botao botao-secundario">Aplicar</button>
            </div>
            {resultadoCupom && (
              <p
                className={
                  resultadoCupom.valido
                    ? 'mensagem-cupom mensagem-cupom-ok'
                    : 'mensagem-cupom mensagem-cupom-erro'
                }
              >
                {resultadoCupom.mensagem}
              </p>
            )}
          </form>

          {desconto > 0 && (
            <p className="resumo-linha">
              <span>Desconto</span>
              <span>{desconto * 100}%</span>
            </p>
          )}
          <p className="total">
            <span>Total</span>
            <span>{formatarPreco(totalComDesconto)}</span>
          </p>

          {/* Frete grátis é calculado sobre o valor final, já com o desconto */}
          <div className="frete">
            {temFreteGratis(totalComDesconto) ? (
              <p className="frete-texto frete-texto-ok">Você ganhou frete grátis nesta compra.</p>
            ) : (
              <p className="frete-texto">
                Faltam <strong>{formatarPreco(faltaParaFreteGratis(totalComDesconto))}</strong> para
                ganhar frete grátis.
              </p>
            )}
            <progress
              className="frete-barra"
              value={totalComDesconto}
              max={VALOR_MINIMO_FRETE_GRATIS}
              aria-label="Progresso até o frete grátis"
            />
            <p className="frete-regra">
              Frete grátis em compras acima de {formatarPreco(VALOR_MINIMO_FRETE_GRATIS)}, no valor
              final com desconto.
            </p>
          </div>
        </aside>
      </div>

      {sugestoes.length > 0 && <h2>Você também pode gostar</h2>}
      {/* Mesmo card da lista da loja, com link para o produto */}
      <div className="grade">
        {sugestoes.map((produto) => (
          <ProdutoCard key={produto.id} produto={produto} onAdicionar={onAdicionar} />
        ))}
      </div>
    </section>
  )
}
