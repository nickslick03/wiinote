import { createSignal, For } from 'solid-js'

import { killOscillator, startOscillator, updateFrequency } from './lib/oscillator'
import { C_FREQUENCIES } from './static/frequencies'
import { getFrequency } from './lib/getFrequency'
import { NOTE_LETTERS } from './static/notesLetters'

const NOTE_BLOCKS = 13

function App() {

  const [initialClick, setInitailClick] = createSignal(false)
  const [isHovering, setIsHovering] = createSignal(false)

  let audioContext: AudioContext
  let oscillator: OscillatorNode

  const handleInitialClick = () => {
    audioContext = new window.AudioContext()
    setInitailClick(true)
  }

  const handleMouseMove = (e: MouseEvent) => {
    const semitone = ((1 - (e.clientY / (e.target as HTMLDivElement).clientHeight)) * NOTE_BLOCKS) - 0.5
    const freq = getFrequency(C_FREQUENCIES[5], semitone)
    if (!isHovering()) {
      setIsHovering(true)
      oscillator = startOscillator(audioContext, freq)
    } else {
      updateFrequency(audioContext, oscillator, freq)
    }
  }

  const handleMouseOut = () => {
    killOscillator(oscillator)
    setIsHovering(false)
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
      <h1 class='text-3xl font-bold mb-5'>Wiinote</h1>
      <form id="input-container" class="w-fit flex flex-col gap-3">
        <label class='flex'>
          <span class='pr-2'>Base Note: </span>
          <select name="base-letter" class='flex-1 text-sm border-black border rounded-sm'>
            <For each={NOTE_LETTERS}>{(letter, i) =>
              <option value={i()}>{letter}</option>
            }</For>
          </select>
        </label>
      </form>
      <div 
        id="notebar"
        class='absolute top-0 left-1/2 -translate-x-1/2 w-24 h-screen z-10'
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
      ></div>
      <div 
        id="notebar-colors"
        class='absolute top-0 left-1/2 -translate-x-1/2 w-24 h-screen 
        border-x-2 border-black flex flex-col'
      >
        <For each={Array(NOTE_BLOCKS).fill(0)}>{(_, i) =>
          <div
            data-semitone={(NOTE_BLOCKS + 1) - i()}
            style={{ opacity: (i() / NOTE_BLOCKS) }}
            class='flex-1 bg-blue-400'
          ></div>
        }</For>
      </div>
    </>
  )
}

export default App
