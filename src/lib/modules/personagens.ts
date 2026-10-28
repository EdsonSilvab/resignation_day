export class Personagens {
  vida: number = 100;
  velocidade: number = 3;
  positionX: number = 0;
  positionY: number = 0;
}

export class Player extends Personagens {
  positionX: number = 80;
  positionY: number = 160;
}

export class Funcionario extends Personagens {
  velocidade: number = 2;
  positionX: number = 100;
  positionY: number = 120;
}