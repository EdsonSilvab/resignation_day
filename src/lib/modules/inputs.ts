//direções
export let direita: boolean = false;
export let esquerda: boolean = false;
export let cima: boolean = false;
export let baixo: boolean = false;

export function pressionar(e: KeyboardEvent): void {
  if (e.key == "a" || e.key == "ArrowLeft")
    ((esquerda = true), (direita = false), (cima = false), (baixo = false));
  if (e.key == "d" || e.key == "ArrowRight")
    ((direita = true), (esquerda = false), (cima = false), (baixo = false));
  if (e.key == "w" || e.key == "ArrowUp")
    ((cima = true), (baixo = false), (esquerda = false), (direita = false));
  if (e.key == "s" || e.key == "ArrowDown")
    ((baixo = true), (cima = false), (esquerda = false), (direita = false));
}

export function soltar(e: KeyboardEvent): void {
  if (e.key == "a" || e.key == "ArrowLeft") esquerda = false;
  if (e.key == "d" || e.key == "ArrowRight") direita = false;
  if (e.key == "w" || e.key == "ArrowUp") cima = false;
  if (e.key == "s" || e.key == "ArrowDown") baixo = false;
}
