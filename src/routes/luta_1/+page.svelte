<script lang="ts">
  import "./style.css";
  import Oliver from "../../lib/assets/personagens/oliver.png";
  import OliverDano from "../../lib/assets/personagens/oliverDano.png";
  import { player } from "#lib/modules/personagens.svelte.ts";
  import { oliver } from "#lib/modules/personagens.svelte.ts";

  let oliverDiv: HTMLDivElement;
  let playerDiv: HTMLDivElement


  let selected : number = $state(0);

    const attacks = [
        "TAPA",
        "CANETADA",
        "SOCO",
        "CHUTE"
    ];

    function handleKeydown(e: KeyboardEvent) {
        switch (e.key) {
            case "ArrowRight":
                selected = selected % 2 === 0 ? selected + 1 : selected;
                break;

            case "ArrowLeft":
                selected = selected % 2 === 1 ? selected - 1 : selected;
                break;

            case "ArrowDown":
                selected = selected < 2 ? selected + 2 : selected;
                break;

            case "ArrowUp":
                selected = selected >= 2 ? selected - 2 : selected;
                break;

            case "Enter":
                oliverDiv.style.animation = "none";
                oliverDiv.offsetHeight;
                oliverDiv.style.animation = "dano 1.5s ease-out";
                let dano = Math.floor(oliver.vida * 0.15)
                oliver.vida -= dano
                console.log("Ataque escolhido:", attacks[selected]);
                break;
        }
    }
  
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="teste">
  
  <div class="bar">
    <div
      class="lifebar"
      style="width: {oliver.vida}%; height: 100%; background-color: green"
    >
      <p>{oliver.vida}%</p>
    </div>
  </div>

  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="oliver"
    bind:this={oliverDiv}
  ></div>
  <div class="nolan" bind:this={playerDiv}>

  </div>

 <div class="attack-bar">
    {#each attacks as attack, index}
        <h1 class:selected={selected === index}>
            {attack}
        </h1>
    {/each}
</div>
</div>
