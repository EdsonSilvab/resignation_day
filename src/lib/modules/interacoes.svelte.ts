
import { buttonE, buttonEsc } from "./inputs.svelte"
import { player } from "./personagens.svelte"

// Estados
export const estado = $state({
  curaLiberada: true,
  mostrarDicas: false
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
  if (interacoes.papel_dicas && buttonE && !estado.mostrarDicas) {
    estado.mostrarDicas = true
    console.log(estado.mostrarDicas)
  } else if (estado.mostrarDicas && buttonEsc) {
    estado.mostrarDicas = false
  }
  // sair das dicas
}
