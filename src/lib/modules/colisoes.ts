export function colisaoObjetos(ob: HTMLDivElement, person: HTMLDivElement): string {
  const personagem = person.getBoundingClientRect();
  const object = ob.getBoundingClientRect();

  if (
    personagem.right >= object.left &&
    personagem.left <= object.right &&
    personagem.top <= object.bottom &&
    personagem.bottom >= object.top
  ) {
    let dDireita: number = Math.abs(personagem.left - object.right);
    let dEsquerda: number = Math.abs(personagem.right - object.left);
    let dCima: number = Math.abs(personagem.bottom - object.top);
    let dBaixo: number = Math.abs(personagem.top - object.bottom);

    let menorDistancia = Math.min(dDireita, dEsquerda, dCima, dBaixo);

    if (menorDistancia === dDireita) return "Colidiu esquerda";
    if (menorDistancia === dEsquerda) return "Colidiu direita";
    if (menorDistancia === dCima) return "Colidiu baixo";
    if (menorDistancia == dBaixo) return "Colidiu cima";
  }

  return "";
}

export function colisaoCenario(fundo: HTMLDivElement, person: HTMLDivElement): string[] {
  const personagem: DOMRect = person.getBoundingClientRect();
  const cenario: DOMRect = fundo.getBoundingClientRect();

  let resultado: string[] = [];

  if (personagem.left < cenario.left) resultado.push("Colidiu esquerda");

  if (personagem.right > cenario.right) resultado.push("Colidiu direita");

  if (personagem.top < cenario.top) resultado.push("Colidiu cima");

  if (personagem.bottom > cenario.bottom) resultado.push("Colidiu baixo");

  return resultado;
}
