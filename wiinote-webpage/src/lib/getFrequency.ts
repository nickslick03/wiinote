/**
 * @param base The base frequency.
 * @param semitone The number of semitones, or half notes, above the base octave.
 * @returns The note frequency.
 */
export function getFrequency(base: number, semitone: number) {
    const semitoneRatio = Math.pow(2, 1 / 12);
    return base * Math.pow(semitoneRatio, semitone);
}