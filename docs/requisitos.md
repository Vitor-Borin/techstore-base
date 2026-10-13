# Requisitos da TechStore

Última atualização: outubro de 2026

## Loja

* A página inicial lista os produtos do catálogo que têm unidades em estoque.
* O cliente pode filtrar os produtos por categoria.
* Cada produto é exibido em um card com imagem, nome, avaliação e preço.
* O card é o mesmo na lista, em "Produtos relacionados" e em "Você também pode gostar".
* Clicar no card abre a página do produto.

## Produtos esgotados

* Produtos sem unidades em estoque não aparecem na loja: ficam fora da lista, dos produtos relacionados e das sugestões do carrinho.
* A página do produto esgotado continua abrindo pelo link direto, como os links divulgados pelo marketing.
* Nessa página, o cliente pode pedir para ser avisado quando o produto voltar, informando nome e e-mail.
* O mesmo e-mail não entra duas vezes na lista de espera do mesmo produto.
* A área interna (`/estoque`) mostra quantos clientes esperam cada produto e a lista com nome e e-mail, com o produto mais pedido primeiro.

## Produtos sem preço

* Produtos sem preço definido não podem ser vendidos.
* Eles aparecem na loja com "Preço em breve" e o botão de compra desabilitado.

## Página do produto

* Exibe imagem, nome, avaliação, preço, descrição e unidades disponíveis.
* Exibe até 4 produtos relacionados da mesma categoria, sem os esgotados.

## Carrinho

* Lista os produtos adicionados, com a quantidade de cada um.
* Permite remover unidades.
* Permite aplicar cupons de desconto. O cupom aplicado continua valendo enquanto o cliente navega pela loja e é validado de novo se o cliente mudar.
* Exibe o total da compra.
* Mostra quanto falta para o frete grátis.
