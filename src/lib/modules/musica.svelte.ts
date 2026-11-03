import SoundDialog from "../assets/music/dialog-sound.mp3"

// Musicas
let musica: HTMLAudioElement;
let musicaOn : boolean = false;

export async function ativarMusica(music : string, loop : boolean = false,): Promise<void>{
    if (!musica) {
        musica = new Audio(music);
        musica.loop = loop;
        musica.volume = 0.7
       
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


// Som do dialogo
let sound : HTMLAudioElement | null = null;
let soundOn : boolean = false
export async function iniciarSomDialogo(): Promise<void> {
    if (!sound) {
        sound = new Audio(SoundDialog);
    }

    if (!sound.paused) return

    sound.play();
    soundOn = true
}

export function pausarSomDialogo(): void {
    if (sound) {
        sound.pause();
        sound.currentTime = 0
        soundOn = false
    }
    
}


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