<script lang="ts">
    import "./style.css"
    import {onMount} from "svelte"
    import {goto} from "$app/navigation"
    

    let pararTexto : boolean = $state(false)

    let textoVisivel : string = $state("")
    let sobre : string = `Nolan é um homem dedicado ao trabalho, mas sua rotina está se tornando cada vez mais sufocante. Preso em um ciclo interminável de horas extras e dias exaustivos no escritório, ele mal consegue passar tempo com as pessoas que mais ama: sua esposa e sua filha. A cada dia, o trabalho exige mais dele, enquanto sua vida pessoal fica cada vez mais distante. Cansado de viver assim, Nolan começa a considerar uma decisão que pode mudar tudo: pedir demissão e finalmente recuperar o tempo que perdeu com sua família. Mas tomar essa decisão não é tão simples quanto parece. Entre a pressão do trabalho, as responsabilidades e os acontecimentos que podem surgir pelo caminho, Nolan precisará enfrentar as consequências de suas escolhas.`

    function completarTexto() : string {
        textoVisivel = sobre
        pararTexto = true
        return textoVisivel
    }
    onMount(() => {

        // Animação do texto
        for (let i : number = 0; i < sobre.length; i++) {
            setTimeout(() => {
                if (pararTexto) return;
                textoVisivel += sobre[i];
                    
            }, i * 50)
        }

        //Esc pra sair
        function voltarMenu(event: KeyboardEvent) : void {
            if (event.key === "Escape") {
                goto("/")
            }
        }

        window.addEventListener("keyup", voltarMenu);

        return () => {
            window.removeEventListener("keyup", voltarMenu);
        };
        
           
    })

    
</script>

<div class="background-sobre" onclick={completarTexto}>
    <h1>Sobre</h1>
    <p id="text-sobre">{textoVisivel}</p>
    <footer>
        <h3>Criadores</h3>
        <p>Edson, Patricia, Danilo e Priscila</p>
    </footer>
</div>
