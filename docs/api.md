# Contrato da API

Última atualização: outubro de 2026

A URL base fica na variável `VITE_API_URL`.

## GET /products.json

Retorna a lista de produtos do catálogo.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string | Identificador do produto |
| `title` | string | Nome do produto |
| `price` | number | Preço atual, sempre numérico |
| `precoOriginal` | number | Preço antes da promoção. Presente só nos produtos em promoção |
| `category` | string | `roupas`, `eletronicos`, `acessorios` ou `casa` |
| `description` | string | Descrição do produto |
| `image` | string | URL da imagem |
| `rating` | object | `{ rate: number, count: number }` |
| `estoque` | number | Unidades disponíveis |

### Diferenças encontradas na resposta real (outubro de 2026)

* Alguns produtos vêm com `price` em texto, como `"89"` e `"189.90"`.
* Alguns produtos vêm sem o campo `price`: são os que ainda esperam o preço do time de suprimentos.

O `src/services/produtos.js` converte `price` e `precoOriginal` para número, ou para `null` quando o produto não tem preço. O resto do código recebe sempre esse formato.

## GET /customers.json

Retorna os clientes cadastrados.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string | Identificador do cliente |
| `nome` | string | Nome completo |
| `email` | string | E-mail |
| `pedidosAnteriores` | number | Quantidade de pedidos já feitos na loja |
