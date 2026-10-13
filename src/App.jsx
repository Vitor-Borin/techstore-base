import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import RolarParaTopo from './components/RolarParaTopo'
import Loja from './pages/Loja'
import PaginaProduto from './pages/PaginaProduto'
import Carrinho from './pages/Carrinho'
import Estoque from './pages/Estoque'
import { buscarProdutos } from './services/produtos'
import { buscarClientes } from './services/clientes'
import { carregarAvisos, salvarAvisos } from './services/avisos'
import { podeVender } from './utils/produtos'

export default function App() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [carrinho, setCarrinho] = useState([])
  const [clientes, setClientes] = useState([])
  const [clienteAtualId, setClienteAtualId] = useState(null)
  // Lista de espera dos esgotados: a página do produto grava e a área interna lê, por isso fica aqui
  const [avisos, setAvisos] = useState(() => carregarAvisos())

  useEffect(() => {
    salvarAvisos(avisos)
  }, [avisos])

  useEffect(() => {
    buscarProdutos()
      .then((dados) => setProdutos(dados))
      .catch(() => setErro('Não foi possível carregar os produtos.'))
      .finally(() => setCarregando(false))

    buscarClientes().then((dados) => {
      setClientes(dados)
      if (dados.length > 0) setClienteAtualId(dados[0].id)
    })
  }, [])

  function adicionarAoCarrinho(produto) {
    // Todo botão de compra passa por aqui, então a regra de venda vale para a loja inteira
    if (!podeVender(produto)) return
    setCarrinho((anterior) => anterior.concat(produto))
  }

  function registrarAviso(aviso) {
    setAvisos((anteriores) => anteriores.concat(aviso))
  }

  function removerUmaUnidade(produtoId) {
    // Remove só a primeira unidade encontrada do produto
    let removido = false
    setCarrinho(
      carrinho.filter((produto) => {
        if (!removido && produto.id === produtoId) {
          removido = true
          return false
        }
        return true
      })
    )
  }

  const clienteAtual = clientes.find((cliente) => cliente.id === clienteAtualId)

  return (
    <div className="app">
      <RolarParaTopo />
      <Header carrinho={carrinho} clienteAtual={clienteAtual} />

      <main className="conteudo">
        {carregando && <p className="aviso">Carregando produtos...</p>}
        {erro && <p className="aviso aviso-erro">{erro}</p>}

        {!carregando && !erro && (
          <Routes>
            <Route
              path="/"
              element={<Loja produtos={produtos} onAdicionar={adicionarAoCarrinho} />}
            />
            <Route
              path="/produto/:id"
              element={
                <PaginaProduto
                  produtos={produtos}
                  avisos={avisos}
                  onAdicionar={adicionarAoCarrinho}
                  onAvisar={registrarAviso}
                />
              }
            />
            <Route
              path="/carrinho"
              element={
                <Carrinho
                  carrinho={carrinho}
                  produtos={produtos}
                  clienteAtual={clienteAtual}
                  onAdicionar={adicionarAoCarrinho}
                  onRemover={removerUmaUnidade}
                />
              }
            />
            <Route path="/estoque" element={<Estoque produtos={produtos} avisos={avisos} />} />
          </Routes>
        )}
      </main>

      <Footer
        clientes={clientes}
        clienteAtualId={clienteAtualId}
        onTrocarCliente={setClienteAtualId}
      />
    </div>
  )
}
