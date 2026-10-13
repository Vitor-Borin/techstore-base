import { useState } from 'react'

// Formulário "Avise-me quando chegar", mostrado na página de um produto esgotado
export default function AvisoEstoque({ produto, avisos, onAvisar }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [erros, setErros] = useState({})
  const [confirmacao, setConfirmacao] = useState('')

  function enviar(evento) {
    evento.preventDefault()
    const nomeLimpo = nome.trim()
    const emailLimpo = email.trim().toLowerCase()
    const novosErros = {}

    if (nomeLimpo === '') {
      novosErros.nome = 'Informe seu nome.'
    }

    if (emailLimpo === '') {
      novosErros.email = 'Informe seu e-mail.'
    } else if (!emailLimpo.includes('@') || !emailLimpo.includes('.')) {
      novosErros.email = 'Digite um e-mail válido, como nome@email.com.'
    } else if (
      avisos.find((aviso) => aviso.produtoId === produto.id && aviso.email === emailLimpo)
    ) {
      novosErros.email = 'Este e-mail já está na lista de espera deste produto.'
    }

    setErros(novosErros)

    if (novosErros.nome || novosErros.email) {
      setConfirmacao('')
      return
    }

    onAvisar({ produtoId: produto.id, nome: nomeLimpo, email: emailLimpo })
    setConfirmacao(`Pronto, ${nomeLimpo}! Vamos avisar em ${emailLimpo} quando o produto voltar.`)
    setNome('')
    setEmail('')
  }

  return (
    <form className="aviso-estoque" onSubmit={enviar}>
      <p className="aviso-estoque-titulo">Avise-me quando chegar</p>
      <p className="aviso-estoque-texto">
        Deixe seu contato e mandamos um e-mail assim que o produto voltar ao estoque.
      </p>

      <div className="campo">
        <label htmlFor="aviso-nome" className="rotulo">
          Nome
        </label>
        <input
          id="aviso-nome"
          value={nome}
          onChange={(evento) => setNome(evento.target.value)}
          className={erros.nome ? 'input-invalido' : ''}
        />
        {erros.nome && <p className="erro-campo">{erros.nome}</p>}
      </div>

      <div className="campo">
        <label htmlFor="aviso-email" className="rotulo">
          E-mail
        </label>
        <input
          id="aviso-email"
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
          className={erros.email ? 'input-invalido' : ''}
        />
        {erros.email && <p className="erro-campo">{erros.email}</p>}
      </div>

      <button className="botao">Quero ser avisado</button>

      {confirmacao && <p className="mensagem-sucesso">{confirmacao}</p>}
    </form>
  )
}
