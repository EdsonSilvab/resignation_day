
<script lang="ts">
   import {ativarMusica} from "../lib/modules/musica"
    import SoundBtn from "../lib/assets/icons/sound-btn.png";
    import "./style.css";

  
</script>

<div class="background">
    <div class="options">
        <a href="/inicio">Jogar</a>
        <a href="/sobre">Sobre</a>
    </div>

    <button on:click={ativarMusica}>
        <img src={SoundBtn} id="sound-btn">
    </button>
</div>
