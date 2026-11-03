export class Personagens {
  vida: number = $state(67);
  velocidade: number = 3;
  positionX: number = 0;
  positionY: number = 0;

  public aumentarVida(ganho : number) {
    if (player.vida + ganho <= 100) {
      player.vida += ganho
    } else {
      let ganho : number = 0
      for (let i : number = player.vida; i < 100; i++) {
        ganho ++
      }
      player.vida += ganho
    }
  }
}

export class Player extends Personagens {
  positionX: number = 180;
  positionY: number = 160;
}

export class Funcionario extends Personagens {
  velocidade: number = 2;
  positionX: number = 100;
  positionY: number = 120;
}


export const player = new Player