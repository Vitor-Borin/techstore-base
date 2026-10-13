// Página usada pelo time de estoque para acompanhar a quantidade de cada produto
export default function Estoque({ produtos, avisos }) {
  // slice cria uma cópia, para o sort não alterar a lista original
  const ordenados = produtos.slice().sort((a, b) => a.estoque - b.estoque)

  function avisosDoProduto(produtoId) {
    return avisos.filter((aviso) => aviso.produtoId === produtoId)
  }

  // Produtos com clientes esperando, do mais pedido para o menos pedido,
  // para o time decidir o que repor primeiro
  const listaDeEspera = produtos
    .map((produto) => ({ produto, clientes: avisosDoProduto(produto.id) }))
    .filter((item) => item.clientes.length > 0)
    .toSorted((a, b) => b.clientes.length - a.clientes.length)

  return (
    <section>
      <p className="sobretitulo">Área interna</p>
      <h1>Estoque</h1>
      <p className="aviso">Produtos com menos de 5 unidades precisam de reposição.</p>

      <div className="tabela-moldura">
        <table className="tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Unidades</th>
              <th>Situação</th>
              <th>Aguardando</th>
            </tr>
          </thead>
          <tbody>
            {ordenados.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.title}</td>
                <td>{produto.category}</td>
                <td>{produto.estoque}</td>
                <td>
                  {produto.estoque === 0 && <span className="selo selo-esgotado">Esgotado</span>}
                  {produto.estoque > 0 && produto.estoque < 5 && (
                    <span className="selo selo-alerta">Repor</span>
                  )}
                  {produto.estoque >= 5 && <span className="selo selo-ok">OK</span>}
                </td>
                <td>{avisosDoProduto(produto.id).length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Lista de espera</h2>
      <p className="aviso">
        Clientes que pediram para ser avisados quando o produto voltar. O produto mais pedido
        aparece primeiro.
      </p>

      {listaDeEspera.length === 0 ? (
        <div className="estado-vazio">
          <p>Nenhum cliente está esperando produtos no momento.</p>
        </div>
      ) : (
        <div className="lista-espera">
          {listaDeEspera.map((item) => (
            <article key={item.produto.id} className="espera-produto">
              <div className="espera-topo">
                <h3>{item.produto.title}</h3>
                <span className="selo selo-alerta">{item.clientes.length} aguardando</span>
              </div>
              <p className="espera-estoque">{item.produto.estoque} unidades em estoque</p>
              <ul className="espera-clientes">
                {item.clientes.map((cliente) => (
                  <li key={cliente.email}>
                    <strong>{cliente.nome}</strong>
                    <a href={`mailto:${cliente.email}`}>{cliente.email}</a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
