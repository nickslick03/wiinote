import { createSignal, For } from 'solid-js'

import { killOscillator, setVolume, startOscillator, updateFrequency } from './lib/oscillator'
import { C_FREQUENCIES } from './static/frequencies'
import { getFrequency } from './lib/getFrequency'
import { NOTE_LETTERS } from './static/notesLetters'

const NOTE_BLOCKS = 13
const BASE_OCTAVE = 2
const OCTAVE_RANGE = 6

function App() {

  const [initialClick, setInitailClick] = createSignal(false)
  const [isHovering, setIsHovering] = createSignal(false)

  const [baseSemitone, setBaseSemitone] = createSignal(0)

  let audioContext: AudioContext
  let oscillator: OscillatorNode
  let gainNode: GainNode

  const handleInitialClick = () => {
    audioContext = new window.AudioContext()
    setInitailClick(true)
  }

  const handleMouseMove = (e: MouseEvent) => {
    const target = (e.target as HTMLDivElement)

    const octaveIndex = Math.floor((e.clientX / target.clientWidth) * OCTAVE_RANGE) + BASE_OCTAVE
    const octaveBlockWidth = target.clientWidth / OCTAVE_RANGE
    const xAxisSemitone = ((e.clientX - ((octaveIndex - BASE_OCTAVE) / OCTAVE_RANGE * target.clientWidth)) / (octaveBlockWidth / 12)) - 6

    const semitone = ((1 - (e.clientY / target.clientHeight)) * NOTE_BLOCKS) - 0.5
    
    console.log({ semitone })
    const freq = getFrequency(C_FREQUENCIES[octaveIndex], (semitone + baseSemitone()) + xAxisSemitone)
    if (!isHovering()) {
      setIsHovering(true)
      const start = startOscillator(audioContext, freq)
      oscillator = start.oscillator
      gainNode = start.gainNode
      setVolume(audioContext, gainNode, 0, 0.1)

    } else {
      updateFrequency(audioContext, oscillator, freq)
    }
  }

  return (
    <>
      <div
        id="cover"
        onclick={handleInitialClick}
        class={`fixed z-20 top-0 left-0 w-screen h-screen 
      bg-white flex justify-center items-center 
        ${initialClick() ? 'hidden' : ''}`}
      >
        <p class='text-3xl'>Click to start the page.</p>
      </div>
      {/* {<h1 class='text-3xl font-bold mb-5'>Wiinote</h1>
      <form id="input-container" class="w-fit flex flex-col gap-3">
        <label class='flex'>
          <span class='pr-2'>Base Note: </span>
          <select 
            name="base-letter" 
            class='flex-1 text-sm border-black border rounded-sm'
            onChange={(e) => setBaseSemitone((e.target as HTMLSelectElement).selectedIndex)}  
          >
            <For each={NOTE_LETTERS}>{(letter) =>
              <option>{letter}</option>
            }</For>
          </select>
        </label>
      </form>} */}
      <div 
        id="notegrid"
        class='absolute top-0 left-0 w-screen h-screen z-10'
        onMouseMove={handleMouseMove}
        onMouseDown={() => {
          setVolume(audioContext, gainNode, 1, 0.1)
        }}
        onMouseUp={() => {
          setVolume(audioContext, gainNode, 0, 0.1)
        }}
      ></div>
      <div class='grid grid-cols-6 h-screen select-none'>
        <For each={Array(13)}>{(_, semitone) => 
          <For each={Array(OCTAVE_RANGE)}>{(_, octave) => 
            <div 
              class='border border-black flex items-center justify-end pr-2 text-3xl font-bold'
              style={{
                'background-color': `hsl(${((semitone() / 12) * 356)}, 65%, ${((octave() / OCTAVE_RANGE) * 80) + 20}%)`
              }}
            >
              {(semitone() === 0 ? 'C' : NOTE_LETTERS[12 - semitone()]) 
              + (octave() + (semitone() === 0 ? 2 : 1))}
            </div>
          }</For>
        }</For>
      </div>
    </>
  )
}

export default App
