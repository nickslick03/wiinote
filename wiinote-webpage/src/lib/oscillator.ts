export function startOscillator(audioContext: AudioContext, startingFreq = 440) {
    const oscillator = audioContext.createOscillator();
    oscillator.frequency.setValueAtTime(startingFreq, audioContext.currentTime); // A4 note
    oscillator.type = 'sine';
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();
    return { oscillator, gainNode }
}

export function updateFrequency(
    audioContext: AudioContext, 
    oscillator: OscillatorNode, 
    newFrequency: number) {
    oscillator.frequency.setValueAtTime(newFrequency, audioContext.currentTime);
}

export function killOscillator(oscillator: OscillatorNode) {
    oscillator.stop();
    oscillator.disconnect();
}

export function setVolume(audioContext: AudioContext, gainNode: GainNode, toVolume: number, duration: number) {
    const now = audioContext.currentTime;
    const fadeEnd = now + duration;
    gainNode.gain.linearRampToValueAtTime(toVolume, fadeEnd);
}