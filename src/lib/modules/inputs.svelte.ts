//interações
import { verificarInteracoes } from "./interacoes.svelte";


//direções
export let direita: boolean = false;
export let esquerda: boolean = false;
export let cima: boolean = false;
export let baixo: boolean = false;
export let buttonE : boolean = false
export let buttonX : boolean = false
export let buttonEsc : boolean = false

export function pressionar(e: KeyboardEvent): void {
  if (e.key.toLowerCase() == "a" || e.key == "ArrowLeft")
    {esquerda = true, direita = false, cima = false, baixo = false};
  if (e.key.toLowerCase() == "d" || e.key == "ArrowRight")
    {direita = true, esquerda = false, cima = false, baixo = false};
  if (e.key.toLowerCase() == "w" || e.key == "ArrowUp")
    {cima = true, baixo = false, esquerda = false, direita = false};
  if (e.key.toLowerCase() == "s" || e.key == "ArrowDown")
    {baixo = true, cima = false, esquerda = false, direita = false};
  if (e.key.toLowerCase() == "e")
    {buttonE = true, verificarInteracoes()}
  if (e.key.toLowerCase() == "x")
    {buttonX = true, verificarInteracoes()}
  if (e.key == "Escape")
  {buttonEsc = true, verificarInteracoes()}
}

export function soltar(e: KeyboardEvent): void {
  if (e.key.toLowerCase() == "a" || e.key == "ArrowLeft") esquerda = false;
  if (e.key.toLowerCase().toLowerCase() == "d" || e.key == "ArrowRight") direita = false;
  if (e.key.toLowerCase() == "w" || e.key == "ArrowUp") cima = false;
  if (e.key.toLowerCase() == "s" || e.key == "ArrowDown") baixo = false;
  if (e.key.toLowerCase() == "e") buttonE = false
  if (e.key.toLowerCase() == "x") buttonX = false
}
