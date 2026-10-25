<script lang="ts">
    //Musicas
    import MusicMenu from "../lib/assets/music/music-menu.mp3";
    import {ativarMusica} from "../lib/modules/musica"
    import SoundBtn from "../lib/assets/icons/sound-btn.png";
    import "./style.css";

  
</script>

<div class="background">
    <div class="options">
        <a href="/inicio">Jogar</a>
        <a href="/sobre">Sobre</a>
    </div>

    <button onclick={() => ativarMusica(MusicMenu, true)} aria-label="AtivarMusica">
        <img src={SoundBtn} id="sound-btn" alt="Botão de Som">
    </button>
</div>
