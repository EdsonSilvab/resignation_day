<script lang="ts">
    import "./style.css"
    import Retrato1 from "../../lib/assets/retrato-inicio1.png"
    import Retrato2 from "../../lib/assets/retrato-inicio2.png"

    import {iniciarSomDialogo, pausarSomDialogo, iniciarSom, pausarSom} from "../../lib/modules/musica"
    import ChamadaTelefone from "../../lib/assets/music/chamada-telefone.mp3"


    import {onMount} from "svelte"

    // transições
    let backgroundCena : string = $state(Retrato1)

    let continuarDialogo : boolean = false

    let textoVisivel : string = $state("")
    let enter : string =  $state("")
    
    
    let dialogos = [
    { personagem: "NOLAN", texto: "SÓ MAIS UM POUCO... PROMETO." },
    { personagem: "CELULAR", texto: "BRRR... BRRR... BRRR..." },
    { personagem: "NOLAN", texto: "EITA... A SOPHIE." },
    { personagem: "NOLAN", texto: "OI, MEU AMOR." },
    { personagem: "SOPHIE", texto: "NOSSA, ATÉ QUE ENFIM." },
    { personagem: "NOLAN", texto: "EU SEI, DESCULPA. TAVA TERMINANDO UMAS COISAS AQUI." },
    { personagem: "SOPHIE", texto: "VOCÊ SEMPRE TÁ TERMINANDO UMAS COISAS AÍ." },
    { personagem: "NOLAN", texto: "EU SEI..." },
    { personagem: "SOPHIE", texto: "NÃO, VOCÊ NÃO SABE. A SUA FILHA PERGUNTOU POR VOCÊ HOJE." },
    { personagem: "NOLAN", texto: "É MESMO? O QUE ELA FALOU?" },
    { personagem: "SOPHIE", texto: "PERGUNTOU SE VOCÊ IA CHEGAR ANTES DELA DORMIR." },
    { personagem: "NOLAN", texto: "POXA..." },
    { personagem: "SOPHIE", texto: "ELA FICOU ESPERANDO SEGURANDO AQUELE DESENHO QUE FEZ PRA VOCÊ." },
    { personagem: "NOLAN", texto: "EU QUERIA MUITO TER CHEGADO." },
    { personagem: "SOPHIE", texto: "EU SEI QUE QUERIA. MAS QUERER NÃO É A MESMA COISA QUE ESTAR AQUI." },
    { personagem: "NOLAN", texto: "EU TÔ TENTANDO RESOLVER ISSO. SÓ PRECISO TERMINAR ESSE PROJETO E..." },
    { personagem: "SOPHIE", texto: "VOCÊ FALOU ISSO SEMANA PASSADA." },
    { personagem: "NOLAN", texto: "EU SEI, AMOR. MAS, SE EU PARAR, TUDO FICA PRA AMANHÃ." },
    { personagem: "SOPHIE", texto: "E EU FAÇO O QUÊ COM A SAUDADE ATÉ AMANHÃ?" },
    { personagem: "NOLAN", texto: "...EU TAMBÉM TÔ COM SAUDADE." },
    { personagem: "SOPHIE", texto: "EU NÃO QUERO FICAR BRIGANDO COM VOCÊ. SÓ QUERIA MEU MARIDO EM CASA." },
    { personagem: "NOLAN", texto: "EU VOU VOLTAR ASSIM QUE PUDER. TÁ?" },
    { personagem: "SOPHIE", texto: "VOCÊ PROMETE?" },
    { personagem: "NOLAN", texto: "PROMETO." },
];

    let personagem : string = $state("")
    let somCelular : HTMLAudioElement | null = null

    
    // funcão de intervalo
    const intervalo = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

    
   
    onMount(async () => {
        
        const pressionarEnter = (e: KeyboardEvent) => {
            if (e.key === "Enter" && enter == "ENTER") {
                continuarDialogo = true;
            }
        };

        window.addEventListener("keydown", pressionarEnter);

        for (let i = 0; i < dialogos.length; i++) {
            textoVisivel = "";
            personagem  = dialogos[i].personagem;
            
            if (i == 1) {
                pausarSomDialogo()
                somCelular = iniciarSom(ChamadaTelefone, true)
            } else if (i == 3) {
                if (somCelular) {
                    backgroundCena = Retrato2
                    pausarSom(somCelular!)
                    somCelular = null
                }
                
            }

                if (i != 1) {
                    await iniciarSomDialogo();
                }

            for (let j = 0; j < dialogos[i].texto.length; j++) {
                textoVisivel += dialogos[i].texto[j];
                await intervalo(50);
            }

            await intervalo(400)
            pausarSomDialogo();

            await intervalo(500);
            enter = "ENTER";

            continuarDialogo = false;

            while (!continuarDialogo) {
                await intervalo(20);
            }

            enter = "";
        }

        window.removeEventListener("keydown", pressionarEnter);
    });
</script>

<div class="background-ini"
style={`background-image: url('${backgroundCena}')`}>
    <div class="dialog-box">
        <p id="dialog-text"><strong>{personagem}:</strong> {textoVisivel}</p>
        <p id="enter-btn"><strong>{enter}</strong></p>
    </div>
</div>