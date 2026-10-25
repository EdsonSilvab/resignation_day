<script lang="ts">
    import "../../app.css"
    import "./style.css"
    import {onMount} from "svelte"

    class Player {
        vida: number = 100
        velocidade: number = 3
        positionX: number = 80
        positionY: number = 60
    }

    let playerDiv : HTMLDivElement
    let player : Player = new Player
    let playerColidiu : boolean = false

    let colisaoObj : HTMLDivElement[] = []
    let cenario : HTMLDivElement

    //movimentação
    let direita : boolean = false
    let esquerda : boolean = false
    let cima : boolean = false
    let baixo : boolean = false
    let animationFrame : number

    function pressionar(e: KeyboardEvent) : void {
        if (e.key == "a") esquerda = true, direita = false, cima = false, baixo = false
        if (e.key == "d") direita = true, esquerda = false, cima = false, baixo = false
        if (e.key == "w" ) cima = true, baixo = false, esquerda = false, direita = false
        if (e.key == "s") baixo = true, cima = false, esquerda = false, direita = false
        
    }

   
    function soltar(e: KeyboardEvent) : void {
        if (e.key == "a") esquerda = false
        if (e.key == "d") direita = false
        if (e.key == "w") cima = false
        if (e.key == "s") baixo = false
    }

    function colisao(ob : HTMLDivElement): string {
        const player = playerDiv.getBoundingClientRect();
        let object = ob.getBoundingClientRect();
        let directColisao : string = ""

        if (
            player.right >= object.left &&
            player.left <= object.right &&
            player.top <= object.bottom && 
            player.bottom >= object.top) 
            {
                let dDireita : number = Math.abs(player.left - object.right)
                let dEsquerda : number = Math.abs(player.right - object.left)
                let dCima : number = Math.abs(player.bottom - object.top)
                let dBaixo : number = Math.abs(player.top - object.bottom)

                let menorDistancia = Math.min(dDireita, dEsquerda, dCima, dBaixo)

                if (menorDistancia == dDireita) directColisao = "Colidiu esquerda"
                else if (menorDistancia == dEsquerda) directColisao = "Colidiu direita"
                else if (menorDistancia == dCima) directColisao = "Colidiu baixo"
                else if (menorDistancia == dBaixo) directColisao = "Colidiu cima"
            }

        return directColisao
    }

    function moverPlayer() : void {

        let bloquearDireita: boolean = false;
        let bloquearEsquerda: boolean = false;
        let bloquearCima: boolean = false;
        let bloquearBaixo: boolean = false;

        for (let i: number = 0; i < colisaoObj.length; i++) {
            let colidiu: string = colisao(colisaoObj[i]);

            if (colidiu == "Colidiu direita") bloquearDireita = true;
            if (colidiu == "Colidiu esquerda") bloquearEsquerda = true;
            if (colidiu == "Colidiu cima") bloquearCima = true;
            if (colidiu == "Colidiu baixo") bloquearBaixo = true;
        }

        if (direita && !bloquearDireita) {
            player.positionX += player.velocidade;
        }

        if (esquerda && !bloquearEsquerda) {
            player.positionX -= player.velocidade;
        }

        if (cima && !bloquearCima) {
            player.positionY -= player.velocidade;
        }

        if (baixo && !bloquearBaixo) {
            player.positionY += player.velocidade;
        }

        let pesdoPlayer = player.positionY + 50; 
        playerDiv.style.zIndex = Math.round(pesdoPlayer).toString();
        //console.log(pesdoPlayer) // ver zindex do player

        
        playerDiv.style.left = player.positionX + 'px';
        playerDiv.style.top = player.positionY + 'px';
        

        animationFrame = requestAnimationFrame(moverPlayer) // loop da função
    }

    onMount(() => {

        
        window.addEventListener("keydown", pressionar)
        window.addEventListener("keyup", soltar)
        animationFrame = requestAnimationFrame(moverPlayer) // ciclo da animação no componente
        

        return () => {
           window.removeEventListener("keydown", pressionar)
           window.removeEventListener("keyup", soltar)
           cancelAnimationFrame(animationFrame)
        }
    })

    
</script>

<div class="scene" bind:this={cenario}> 
    <div class="player" bind:this={playerDiv}></div>
    <div class="mesa1"><div class="colisao" bind:this={colisaoObj[0]}></div></div>
    <div class="mesa2"><div class="colisao" bind:this={colisaoObj[1]}></div></div>
    <div class="bebedouro"><div class="colisao" bind:this={colisaoObj[2]}></div></div>
</div>
