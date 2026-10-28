<script lang="ts">
    import "../../app.css"
    import "./style.css"
    import * as Input from "../../lib/modules/inputs"
    import {Player, Funcionario} from "../../lib/modules/personagens"
    import {colisaoObjetos, colisaoCenario} from "../../lib/modules/colisoes"
    import {onMount} from "svelte"

    //sprites
    let playerDiv: HTMLDivElement;
    let funcionarioDiv: HTMLDivElement;
    let cenario: HTMLDivElement

    //personagens - classes/atributos
    let player : Player = new Player
    let funcionario : Funcionario = new Funcionario

    let colisaoObj : HTMLDivElement[] = []
    

    //animação
    let animationFrame : number

    function moverPlayer() : void {

        let bloquearDireita: boolean = false;
        let bloquearEsquerda: boolean = false;
        let bloquearCima: boolean = false;
        let bloquearBaixo: boolean = false;

        for (let i: number = 0; i < colisaoObj.length; i++) {
            let colidiu: string = colisaoObjetos(colisaoObj[i], playerDiv);
            let colidiuCenario : string[] = colisaoCenario(cenario, playerDiv)

            if (colidiu == "Colidiu direita" || colidiuCenario.includes("Colidiu direita")) bloquearDireita = true;
            if (colidiu == "Colidiu esquerda" || colidiuCenario.includes("Colidiu esquerda")) bloquearEsquerda = true;
            if (colidiu == "Colidiu cima" || colidiuCenario.includes("Colidiu cima")) bloquearCima = true;
            if (colidiu == "Colidiu baixo" || colidiuCenario.includes("Colidiu baixo")) bloquearBaixo = true;
        }


        if (Input.direita && !bloquearDireita) {
            player.positionX += player.velocidade;
        }

        if (Input.esquerda && !bloquearEsquerda) {
            player.positionX -= player.velocidade;
        }

        if (Input.cima && !bloquearCima) {
            player.positionY -= player.velocidade;
        }

        if (Input.baixo && !bloquearBaixo) {
            player.positionY += player.velocidade;
        }

        let pesdoPlayer = player.positionY + 50; 
        playerDiv.style.zIndex = Math.round(pesdoPlayer).toString();
        //console.log(pesdoPlayer) // ver zindex do player
        
        playerDiv.style.left = player.positionX + 'px';
        playerDiv.style.top = player.positionY + 'px';
        

        animationFrame = requestAnimationFrame(moverPlayer) // loop da função
    }

    // Funcionario
    let direcaoX: number = 0;
    let direcaoY: number = 0;
    let proximaDirecao = 0;

    function moverFuncionarios(): void {

        if (Date.now() >= proximaDirecao) {
            //  sortieo positionX ou positionY
            if (Math.random() < 0.5) {
                direcaoX = Math.floor(Math.random() * 3) - 1;
                direcaoY = 0;
            } else {
                direcaoY = Math.floor(Math.random() * 3) - 1;
                direcaoX = 0;
            }

            // intervalo
            proximaDirecao = Date.now() + 1000;
        }

        let bloquearDireita: boolean = false;
        let bloquearEsquerda: boolean = false;
        let bloquearCima: boolean = false;
        let bloquearBaixo: boolean = false;

        for (let i: number = 0; i < colisaoObj.length; i++) {
            let colidiu: string = colisaoObjetos(colisaoObj[i], funcionarioDiv);
            let colidiuCenario : string[] = colisaoCenario(cenario, funcionarioDiv)

            if (colidiu == "Colidiu direita" || colidiuCenario.includes("Colidiu direita")) bloquearDireita = true;
            if (colidiu == "Colidiu esquerda" || colidiuCenario.includes("Colidiu esquerda")) bloquearEsquerda = true;
            if (colidiu == "Colidiu cima" || colidiuCenario.includes("Colidiu cima")) bloquearCima = true;
            if (colidiu == "Colidiu baixo" || colidiuCenario.includes("Colidiu baixo")) bloquearBaixo = true;
        }


        if (direcaoX > 0 && !bloquearDireita) {
            funcionario.positionX += direcaoX * funcionario.velocidade;
        }

        if (direcaoX < 0 && !bloquearEsquerda) {
            funcionario.positionX += direcaoX * funcionario.velocidade;
        }

        if (direcaoY < 0 && !bloquearCima) {
            funcionario.positionY += direcaoY * funcionario.velocidade;
        }

        if (direcaoY > 0 && !bloquearBaixo) {
            funcionario.positionY += direcaoY * funcionario.velocidade;
        }
        
        let pesdoFuncionario = funcionario.positionY + 50; 
        funcionarioDiv.style.zIndex = Math.round(pesdoFuncionario).toString();

        funcionarioDiv.style.left = funcionario.positionX + 'px';
        funcionarioDiv.style.top = funcionario.positionY + 'px';

        animationFrame = requestAnimationFrame(moverFuncionarios)
    }

    onMount(() => {

        window.addEventListener("keydown", Input.pressionar)
        window.addEventListener("keyup", Input.soltar)
        animationFrame = requestAnimationFrame(moverPlayer)
        animationFrame = requestAnimationFrame(moverFuncionarios) // ciclo da animação no componente
        

        return () => {
           window.removeEventListener("keydown", Input.pressionar)
           window.removeEventListener("keyup", Input.soltar)
           cancelAnimationFrame(animationFrame)
        }
    })

</script>

<div class="scene" bind:this={cenario}> 
    <div class="player" bind:this={playerDiv}></div>
    <div class="funcionarios" bind:this={funcionarioDiv}></div>
   
    <div id="mesa1"><div class="colisao" bind:this={colisaoObj[0]}></div></div>
    <div id="cadeira1"><div class="colisao" bind:this={colisaoObj[1]}></div></div>
    <div id="mesa2"><div class="colisao" bind:this={colisaoObj[2]}></div></div>
    <div id="mesa3"><div class="colisao" bind:this={colisaoObj[3]}></div></div>
    <div id="mesa4"><div class="colisao" bind:this={colisaoObj[4]}></div></div>
    <div id="bebedouro"><div class="colisao" bind:this={colisaoObj[5]}></div></div>
    <div id="planta1"><div class="colisao" bind:this={colisaoObj[6]}></div></div>
    <div id="impressora"><div class="colisao" bind:this={colisaoObj[7]}></div></div>
    <div id="cadeira2"><div class="colisao" bind:this={colisaoObj[8]}></div></div>

    <div class="parede"><div class="colisao" bind:this={colisaoObj[9]}></div></div>
</div>