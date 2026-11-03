
import { buttonE, buttonEsc } from "./inputs.svelte"
import { player } from "./personagens.svelte"

// Estados
export const estado = $state({
  curaLiberada: true,
  dicas: false
})

export const interacoes = {
  bebedouro: false,
  cafeteira: false,
  papel_dicas: false
}

// Ações das interações
export function verificarInteracoes() {

  // Interações de recuperação
  if (player.vida < 100 && estado.curaLiberada) {

    if (interacoes.bebedouro && buttonE) {
      player.aumentarVida(7)
      estado.curaLiberada = false
    }

    if (interacoes.cafeteira && buttonE) {
      player.aumentarVida(13)
      estado.curaLiberada = false
    }

    if (!estado.curaLiberada) {
      setTimeout(() => {
        estado.curaLiberada = true
      }, 5000)
    }
  }

  // Interação de dicas
  if (interacoes.papel_dicas && buttonE && !estado.dicas) {
    estado.dicas = true
    console.log(estado.dicas)
  } else if (estado.dicas && buttonEsc) {
    estado.dicas = false
  }
  // sair das dicas
}
