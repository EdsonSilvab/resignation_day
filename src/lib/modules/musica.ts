
import MusicMenu from "../assets/music/music-menu.mp3";

let musica: HTMLAudioElement;
let musicaOn : boolean = false;

export async function ativarMusica(): void{
    if (!musica) {
        musica = new Audio(MusicMenu);
        musica.loop = true;
    }

    if (!musicaOn) {
        musica.play();
        musicaOn = true;
        console.log("Música ativada!");
    } else {
        musica.pause();
        musicaOn = false;
        console.log("Música pausada!");
    }
}
