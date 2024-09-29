export class Audio {
    audioContext: AudioContext | null;
    gainNode: GainNode | null;
    oscillator: OscillatorNode | null;
    sustainDuration: number;

    constructor(sustainDuration: number) {
        this.audioContext = null;
        this.gainNode = null;
        this.oscillator = null;
        this.sustainDuration = sustainDuration;
    }

    nextOscillator(startingFreq = 440, type: OscillatorType = 'sine') {
        this.audioContext = new AudioContext();
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);
        this.oscillator = this.audioContext.createOscillator();
        this.oscillator.frequency.setValueAtTime(startingFreq, this.audioContext.currentTime);
        this.oscillator.type = type;
        this.oscillator.connect(this.gainNode);
        this.oscillator.start();
    }

    updateFrequency(newFreq: number = 440) {
        this.oscillator?.frequency.setTargetAtTime(newFreq, this.audioContext?.currentTime || 0, .01);
    }

    setVolume(toVolume: number) {
        const now = this.audioContext?.currentTime || 0;
        const fadeEnd = now + this.sustainDuration;
        this.gainNode?.gain.linearRampToValueAtTime(toVolume, fadeEnd);
    }

    killOscillator() {
        this.setVolume(0);
        const oldContext = this.audioContext;
        const oldOscillator = this.oscillator;
        const oldGain = this.gainNode;
        this.oscillator = null;
        this.gainNode = null;
        setTimeout(() => {
            oldContext?.close();
            oldOscillator?.stop();
            oldOscillator?.disconnect();
            oldGain?.disconnect();
        }, this.sustainDuration * 1000 + 500);
    }
}