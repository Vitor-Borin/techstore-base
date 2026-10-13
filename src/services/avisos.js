// Lista de espera dos produtos esgotados ("Avise-me quando chegar").
// A API da loja é só leitura (arquivos JSON), então a lista fica salva no navegador.
// Quando existir um endpoint para isso, só este arquivo precisa mudar.
const CHAVE = 'techstore:avisos'

export function carregarAvisos() {
  return JSON.parse(localStorage.getItem(CHAVE)) || []
}

export function salvarAvisos(avisos) {
  localStorage.setItem(CHAVE, JSON.stringify(avisos))
}
