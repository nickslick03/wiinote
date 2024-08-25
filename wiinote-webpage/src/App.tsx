import { createSignal, For } from 'solid-js'

import './App.css'
import { killOscillator, startOscillator, updateFrequency } from './lib/oscillator'
import { C_FREQUENCIES } from './static/frequencies'
import { getFrequency } from './lib/getFrequency'

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
        style={{ display: initialClick() ? 'none' : '' }}
      >
        <p>Click to start the page.</p>
      </div>
      <h1>Wiinote</h1>
      <form id="input-container">
        <label>
          <span>Base Note: </span>
          <select name="base-letter">
            <option value="0" selected>C</option>
            <option value="1">C♯ / D♭</option>
            <option value="2">D</option>
            <option value="3">D♯ / E♭</option>
            <option value="4">E</option>
            <option value="5">F</option>
            <option value="6">F♯ / G♭</option>
            <option value="7">G</option>
            <option value="8">G♯ / A♭</option>
            <option value="9">A</option>
            <option value="10">A♯ / B♭</option>
            <option value="11">B</option>
          </select>
          <select name="base-octave">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5" selected>5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </label>
      </form>
      <div 
        id="notebar"
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
      ></div>
      <div id="notebar-colors">
        <For each={Array(NOTE_BLOCKS).fill(0)}>{(_, i) =>
          <div
            data-semitone={(NOTE_BLOCKS + 1) - i()}
            style={{ opacity: (i() / NOTE_BLOCKS) }}
          ></div>
        }</For>
      </div>
    </>
  )
}

export default App
