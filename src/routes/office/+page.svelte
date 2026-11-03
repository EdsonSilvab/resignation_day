<script lang="ts">
    import "../../app.css"
    import "./style.css"
    import {iniciarSomDialogo, pausarSomDialogo} from "../../lib/modules/musica.svelte"
    import { intervalo } from "#lib/modules/intervalo.svelte.ts"
    import LifeBar from "../../lib/components/LifeBar.svelte"
    import ImgDicas from "../../lib/assets/Dicas01.png"
    import ButtonE from "../../lib/components/ButtonE.svelte"
    import * as Input from "../../lib/modules/inputs.svelte"
    import {Player, Funcionario} from "../../lib/modules/personagens.svelte"
    import {colisaoObjetos, colisaoCenario, colisaoObj, colisaoPersonagem} from "../../lib/modules/colisoes.svelte"
    import {interacoes, estado} from "../../lib/modules/interacoes.svelte"
    import {onMount} from "svelte"

    //sprites
    let playerDiv: HTMLDivElement;
    let funcionarioDiv: HTMLDivElement;
    let cenario: HTMLDivElement

    //personagens - classes/atributos
    let player : Player = new Player
    let funcionario : Funcionario = new Funcionario

    //interação
    let interagir : boolean = false
    let buttonEventE : boolean  = $state(false)
    let bebedouro : HTMLDivElement
    let cafeteira : HTMLDivElement
    let papelDicas : HTMLDivElement
    let ativarDialogo : boolean = $state(false)


    //animação
    let animationFrame : number

    //dialogo
   
    
    let dialogoIniciado: boolean = false
    let dialogos = [
  { personagem: "OLIVER", texto: "EI, NOLAN! TEM UM MINUTO?" },
  { personagem: "NOLAN", texto: "DEPENDE. SE FOR MAIS TRABALHO, JÁ TENHO O SUFICIENTE POR HOJE." },
  { personagem: "OLIVER", texto: "HAHAHA! VOCÊ ANDA RABUGENTO ULTIMAMENTE." },
  { personagem: "NOLAN", texto: "ENGRAÇADO. MAS, NA VERDADE, PRECISO TE CONTAR UMA COISA." },
  { personagem: "OLIVER", texto: "LÁ VEM... O QUE FOI?" },
  { personagem: "NOLAN", texto: "ESTOU PENSANDO EM PEDIR DEMISSÃO." },
  { personagem: "OLIVER", texto: "COMO ASSIM? TÁ FALANDO SÉRIO?" },
  { personagem: "NOLAN", texto: "ESTOU. PRECISO PASSAR MAIS TEMPO COM MINHA FAMÍLIA." },
  { personagem: "OLIVER", texto: "MAS, CARA, AQUI É UM BOM LUGAR! VOCÊ TEM UM BOM EMPREGO." },
  { personagem: "NOLAN", texto: "EU SEI, MAS MINHA ESPOSA E MINHA FILHA PRECISAM DE MIM." },
  { personagem: "OLIVER", texto: "VOCÊ ACHA QUE SAIR DAQUI VAI RESOLVER TUDO?" },
  { personagem: "NOLAN", texto: "TALVEZ NÃO. MAS PELO MENOS VOU TER TEMPO PRA TENTAR." },
  { personagem: "OLIVER", texto: "VOCÊ ANDA PENSANDO DEMAIS NESSAS COISAS, HEIN?" },
  { personagem: "NOLAN", texto: "É QUE EU NÃO QUERO PERDER OS MOMENTOS IMPORTANTES DA VIDA DA MINHA FILHA." },
  { personagem: "OLIVER", texto: "..." },
  { personagem: "OLIVER", texto: "SABE, CARA... EU NÃO QUERIA QUE VOCÊ FOSSE EMBORA." },
  { personagem: "NOLAN", texto: "EU TAMBÉM NÃO QUERIA DEIXAR TUDO ASSIM. MAS PRECISO FAZER ISSO." },
  { personagem: "OLIVER", texto: "ENTÃO ESCUTA UMA COISA, NOLAN." },
  { personagem: "NOLAN", texto: "O QUÊ?" },
  { personagem: "OLIVER", texto: "VOCÊ SÓ VAI SAIR DAQUI POR CIMA DE MIM!" },
  { personagem: "NOLAN", texto: "HAHAHA! VOCÊ NÃO EXISTE, CARA." },
];
    let personagem : string = $state("")
    let continuarDialogo: boolean = false;
    let textoVisivel: string = $state("");
    let enter: string = $state("");

    function moverPlayer() : void {
        let colisaoPersonagens : string = colisaoPersonagem(playerDiv, funcionarioDiv)

          if (colisaoPersonagens !== "" && !dialogoIniciado) {
          if (Input.buttonE) {
            dialogoIniciado = true;
            ativarDialogo = true;

            console.log("COLISÃO DETECTADA!");

            iniciarDialogos();
        }}

        

        let bloquearDireita: boolean = false;
        let bloquearEsquerda: boolean = false;
        let bloquearCima: boolean = false;
        let bloquearBaixo: boolean = false;

        if (ativarDialogo == true || estado.dicas == true) {
                {bloquearDireita = true, bloquearEsquerda = true, bloquearCima = true, bloquearBaixo = true}
        }

        buttonEventE =
        (colisaoPersonagens !== "" && !dialogoIniciado) ||
        (interacoes.bebedouro && estado.curaLiberada) ||
        (interacoes.cafeteira && estado.curaLiberada) ||
        (interacoes.papel_dicas && !estado.dicas)

        for (let i: number = 0; i < colisaoObj.length; i++) {
            let colidiu: string = colisaoObjetos(colisaoObj[i], playerDiv);
            let colidiuCenario : string[] = colisaoCenario(cenario, playerDiv)
            

            //interações da cena
            if (i == 6) {
                if (interacoes.bebedouro = colidiu != "" && estado.curaLiberada) {bebedouro.style.filter = "brightness(1.2)"}
                else if(interacoes.bebedouro = colidiu != "" && !estado.curaLiberada) {bebedouro.style.filter = "brightness(0.6)"}
                else {bebedouro.style.filter = "brightness(1)"}
            }
            if (i == 13) {
                if (interacoes.cafeteira = colidiu != "" && estado.curaLiberada && !interagir) {cafeteira.style.filter = "brightness(1.2)"}
                else if(interacoes.cafeteira = colidiu != "" && !estado.curaLiberada) {cafeteira.style.filter = "brightness(0.6)"}
                else {cafeteira.style.filter = "brightness(1)"}
            }

            if (i == 17) {
                if (interacoes.papel_dicas = colidiu != "" && !estado.dicas && !interagir) {papelDicas.style.filter = "brightness(1.2)"}
                else if(interacoes.papel_dicas = colidiu != "" && !estado.dicas) {papelDicas.style.filter = "brightness(0.6)"}
                else {papelDicas.style.filter = "brightness(1)"}
            }

            

            if (colidiu == "Colidiu direita" || colidiuCenario.includes("Colidiu direita")) bloquearDireita = true;
            if (colidiu == "Colidiu esquerda" || colidiuCenario.includes("Colidiu esquerda")) bloquearEsquerda = true;
            if (colidiu == "Colidiu cima" || colidiuCenario.includes("Colidiu cima")) bloquearCima = true;
            if (colidiu == "Colidiu baixo" || colidiuCenario.includes("Colidiu baixo")) bloquearBaixo = true;

            if (colisaoPersonagens == "Colidiu direita") bloquearDireita = true
            if (colisaoPersonagens == "Colidiu esquerda") bloquearEsquerda = true
            if (colisaoPersonagens == "Colidiu cima") bloquearCima = true
            if (colisaoPersonagens == "Colidiu baixo") bloquearBaixo = true

            
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
            let colisaoPersonagens : string = colisaoPersonagem(funcionarioDiv, playerDiv)
            let colidiuCenario : string[] = colisaoCenario(cenario, funcionarioDiv)

            if (colidiu == "Colidiu direita" || colidiuCenario.includes("Colidiu direita")) bloquearDireita = true;
            if (colidiu == "Colidiu esquerda" || colidiuCenario.includes("Colidiu esquerda")) bloquearEsquerda = true;
            if (colidiu == "Colidiu cima" || colidiuCenario.includes("Colidiu cima")) bloquearCima = true;
            if (colidiu == "Colidiu baixo" || colidiuCenario.includes("Colidiu baixo")) bloquearBaixo = true;

            if (colisaoPersonagens == "Colidiu direita") bloquearDireita = true
            if (colisaoPersonagens == "Colidiu esquerda") bloquearEsquerda = true
            if (colisaoPersonagens == "Colidiu cima") bloquearCima = true
            if (colisaoPersonagens == "Colidiu baixo") bloquearBaixo = true

            if (ativarDialogo == true) 
                {bloquearDireita = true, bloquearEsquerda = true, bloquearCima = true, bloquearBaixo = true}
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
    
    async function iniciarDialogos() {
         
    for (let i = 0; i < dialogos.length; i++) {
        textoVisivel = "";
        personagem = dialogos[i].personagem;
        iniciarSomDialogo()

        for (let j = 0; j < dialogos[i].texto.length; j++) {
            
            textoVisivel += dialogos[i].texto[j];
            await intervalo(50);
        }

        await intervalo(400);
        pausarSomDialogo();

        await intervalo(500);
        enter = "ENTER";

      continuarDialogo = false;

      while (!continuarDialogo) {
        await intervalo(20);
      }

      enter = "";
    }
    ativarDialogo = false
}

    onMount(() => {

        if(ativarDialogo) {console.log("opa")}

        const pressionarEnter = (e: KeyboardEvent) => {
        if (e.key === "Enter" && enter == "ENTER") {
            continuarDialogo = true;
        }}

        window.addEventListener("keydown", pressionarEnter)
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


{#if estado.dicas}
<div class="dicas"><img id="dica-img" src="{ImgDicas}" alt="Dicas"></div>
{/if}

<LifeBar />
{#if ativarDialogo}
 <div class="background-dialog"> <div class="dialog-box">
        <p id="dialog-text"><strong id="personagem-name">{personagem}:</strong> {textoVisivel}</p>
        <p id="enter-btn"><strong>{enter}</strong></p>
    </div></div>
{/if}
{#if buttonEventE}
<ButtonE />
{/if}
<div class="scene" bind:this={cenario}> 
    
    <div class="player" bind:this={playerDiv}></div>
    <div class="funcionarios" bind:this={funcionarioDiv}></div>
    <div class="parede"><div class="colisao" bind:this={colisaoObj[0]}></div></div>
   
    <div id="mesa1"><div class="colisao" bind:this={colisaoObj[1]}></div></div>
    <div id="cadeira1"><div class="colisao" bind:this={colisaoObj[2]}></div></div>
    <div id="mesa2"><div class="colisao" bind:this={colisaoObj[3]}></div></div>
    <div id="mesa3"><div class="colisao" bind:this={colisaoObj[4]}></div></div>
    <div id="mesa4"><div class="colisao" bind:this={colisaoObj[5]}></div></div>
    <div id="bebedouro" bind:this={bebedouro}><div class="colisao" bind:this={colisaoObj[6]}></div></div>
    <div id="planta1"><div class="colisao" bind:this={colisaoObj[7]}></div></div>
    <div id="impressora1"><div class="colisao" bind:this={colisaoObj[8]}></div></div>
    <div id="impressora2"><div class="colisao" bind:this={colisaoObj[9]}></div></div>
    <div id="cadeira2"><div class="colisao" bind:this={colisaoObj[10]}></div></div>
    <div id="estante1"><div class="colisao" bind:this={colisaoObj[11]}></div></div>
    <div id="estante2"><div class="colisao" bind:this={colisaoObj[12]}></div></div>
    <div id="cafeteira" bind:this={cafeteira} ><div class="colisao" bind:this={colisaoObj[13]}></div></div>
    <div id="estante3"><div class="colisao" bind:this={colisaoObj[14]}></div></div>
    <div id="estante4"><div class="colisao" bind:this={colisaoObj[15]}></div></div>
    <div id="lixeira"><div class="colisao" bind:this={colisaoObj[16]}></div></div>
    <div id="pilha-papel" bind:this={papelDicas} ><div class="colisao" bind:this={colisaoObj[17]}></div></div>

    
</div>