# TechStore

Loja virtual da TechStore, feita em React com Vite.

As demandas da avaliação estão no arquivo [ENUNCIADO.md](ENUNCIADO.md).

## Como rodar o projeto

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Rode o projeto:

   ```bash
   npm run dev
   ```

A loja abre em `http://localhost:5173`.

O endereço da API fica na variável `VITE_API_URL`, no arquivo `.env`.

## Organização do projeto

| Pasta | Conteúdo |
|---|---|
| `src/pages/` | Componentes de página, um por rota |
| `src/components/` | Componentes reaproveitáveis |
| `src/services/` | Chamadas à API e tratamento dos dados recebidos |
| `src/utils/` | Regras de negócio e cálculos (descontos, cupons, totais, formatação) |
| `docs/` | Requisitos, regras de negócio e contrato da API |

Todo código novo deve seguir essa organização.

## Rotas

| Rota | Página |
|---|---|
| `/` | Loja, com a lista de produtos e o filtro de categoria |
| `/produto/:id` | Página do produto, com produtos relacionados |
| `/carrinho` | Carrinho, com cupom de desconto e sugestões |
| `/estoque` | Área interna usada pelo time de estoque |

## Ambiente de testes

O rodapé tem um seletor de **cliente de teste**, que simula qual cliente está navegando na loja. Use-o para testar regras que dependem do cliente, como cupons.

## Documentação

Requisitos e regras de negócio ficam na pasta `docs/`. O histórico de mudanças da loja fica no `CHANGELOG.md`.

## Entrega da avaliação

Aluno: Vitor Borin, RM 573194

Projeto publicado: https://techstore-base-mauve.vercel.app/

| Item | Problema encontrado | Solução |
|---|---|---|
| Obrigatório 1: total do carrinho | A API manda alguns preços como texto, e a soma juntava os textos (`"089" + 45 = "08945"`). Dois produtos vêm sem preço | `services/produtos.js` converte o preço para número ou `null`. `utils/produtos.js` define quem pode ser vendido, e o `App` recusa produto sem preço ou esgotado no carrinho |
| Obrigatório 2: produtos esgotados | O comercial quer esconder os esgotados, mas o marketing divulga links deles | Esgotados saem da lista, dos relacionados e das sugestões. A página pelo link mostra o formulário "Avise-me quando chegar", e o `/estoque` mostra a lista de espera |
| Grupo 1, B: cupom de primeira compra | O desconto ficava guardado no clique e valia mesmo depois de trocar de cliente. O cupom se perdia ao sair do carrinho, e a mensagem não explicava o motivo | O código do cupom fica no `App` e é validado a cada renderização com o cliente atual, com mensagens claras |
| Grupo 2, D: card de produto | Três cards diferentes, alguns sem link. O selo de frete por produto enganava o cliente | `ProdutoCard` em todos os lugares. Frete grátis acima de R$ 200 no valor final (`utils/frete.js`), com aviso de quanto falta no carrinho |

### Por que o `.env` está no repositório

O `.env` veio no projeto base e só guarda a URL pública da API, sem chave nem senha. Toda variável `VITE_` vai para o código que roda no navegador, então essa URL já é pública. Sem o arquivo, um clone novo seguindo este README não carregaria os produtos.

### Onde fica a lista de espera

A API é só leitura (arquivos JSON), então não há onde gravar os pedidos de aviso. A lista fica no estado do `App`, o pai comum da página do produto (que grava) e da área interna (que lê), e vale enquanto a loja está aberta, como o carrinho. Quando a API aceitar gravação, o `registrarAviso` do `App` passa a enviar o pedido para ela.
