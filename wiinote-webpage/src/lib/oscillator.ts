export function startOscillator(audioContext: AudioContext, startingFreq = 440) {
    const oscillator = audioContext.createOscillator();
    oscillator.frequency.setValueAtTime(startingFreq, audioContext.currentTime); // A4 note
    oscillator.type = 'sine';
    oscillator.connect(audioContext.destination);
    oscillator.start();
    return oscillator;
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