<script lang="ts">
    import "./style.css"
    import {onMount} from "svelte"

    let continuarDialogo : boolean = false

    let textoVisivel : string = $state("")
    let enter : string =  $state("")
    
    
    let dialogos: string[] = [
        "<b>NOLAN:</b> Só mais um pouco... Prometo.",
        "<b>CELULAR:</b> Brrr... Brrr... Brrr...",
        "<b>NOLAN:</b> Eita... a Sophie.",
        "<b>NOLAN:</b> Oi, meu amor.",
        "<b>SOPHIE:</b> Nossa, até que enfim.",
        "<b>NOLAN:</b> Eu sei, desculpa. Tava terminando umas coisas aqui.",
        "<b>SOPHIE:</b> Você sempre tá terminando umas coisas aí.",
        "<b>NOLAN:</b> Eu sei...",
        "<b>SOPHIE:</b> Não, você não sabe. A sua filha perguntou por você hoje.",
        "<b>NOLAN:</b> É mesmo? O que ela falou?",
        "<b>SOPHIE:</b> Perguntou se você ia chegar antes dela dormir.",
        "<b>NOLAN:</b> Poxa...",
        "<b>SOPHIE:</b> Ela ficou esperando ontem também, segurando aquele desenho que fez pra você.",
        "<b>NOLAN:</b> Eu queria muito ter chegado.",
        "<b>SOPHIE:</b> Eu sei que queria. Mas querer não é a mesma coisa que estar aqui.",
        "<b>NOLAN:</b> Olha, eu tô tentando resolver isso. Só preciso terminar esse projeto e...",
        "<b>SOPHIE:</b> Você falou isso semana passada.",
        "<b>NOLAN:</b> Eu sei, amor. Eu sei. Só que, se eu parar agora, vai sobrar tudo pra mim amanhã.",
        "<b>SOPHIE:</b> E eu faço o quê com a saudade até amanhã?",
        "<b>NOLAN:</b> ...Eu também tô com saudade.",
        "<b>SOPHIE:</b> Eu não quero ficar brigando com você. Só queria meu marido em casa.",
        "<b>NOLAN:</b> Eu vou voltar assim que puder. Tá? E amanhã eu ligo pra pequena antes de ela ir pra escola.",
        "<b>SOPHIE:</b> Você promete?",
        "<b>NOLAN:</b> Prometo.",
    ];

    
    // funcão de intervalo
    const intervalo = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

   
    onMount(async () => {
    window.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            continuarDialogo = true;
        }
    });

    for (let i = 0; i < dialogos.length; i++) {
        textoVisivel = "";

        for (let j = 0; j < dialogos[i].length; j++) {

            
            textoVisivel += dialogos[i][j];
            await intervalo(50);
        }

        await intervalo(500);
        enter = "ENTER";

        continuarDialogo = false;

        while (!continuarDialogo) {
            await intervalo(20);
        }

        enter = "";
    }
});
</script>

<div class="background-ini">
    <div class="dialog-box">
        <p>{@html textoVisivel}</p>
        <p id="enter-btn"><strong>{enter}</strong></p>
    </div>
</div>