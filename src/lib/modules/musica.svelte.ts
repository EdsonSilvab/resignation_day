import SoundDialog from "../assets/music/dialog-sound.mp3"

// Musicas
let musica: HTMLAudioElement;
export function ativarMusica(music : string, loop : boolean = false): void{
    if (!musica) {
        musica = new Audio(music);
        musica.loop = loop;
        musica.volume = 0.7

        musica.play();
       
    } else if (musica.paused) {
        musica.play()
    }
    else {
        musica.pause();
    }
}

// Som do dialogo
let sound : HTMLAudioElement;
export function iniciarSomDialogo(): void {
    if (!sound) {
        sound = new Audio(SoundDialog);
    }

    if (!sound.paused) return

    sound.play();

}

export function pausarSomDialogo(): void {
    if (sound) {
        sound.pause();
        sound.currentTime = 0
    }
    
}

//Sons em geral
export function iniciarSom(som: string, loop: boolean = false
): HTMLAudioElement {
    const audio = new Audio(som);
    audio.loop = loop;
    audio.play();

    return audio;
}

export function pausarSom(audio: HTMLAudioElement) : void {
    audio.pause();
    audio.currentTime = 0;
}