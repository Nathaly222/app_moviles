import * as Tone from 'tone'; 

export default function useSound(note: string) {
    const playSound = () => {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease(note, '8n');
    };
    return playSound;
}
