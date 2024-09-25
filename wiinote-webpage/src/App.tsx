import { createSignal, For } from 'solid-js'

import { setVolume, startOscillator, updateFrequency } from './lib/oscillator'
import { C_FREQUENCIES } from './static/frequencies'
import { getFrequency } from './lib/getFrequency'
import { NOTE_LETTERS } from './static/notesLetters'

const NOTE_BLOCKS = 13
const BASE_OCTAVE = 2
const OCTAVE_RANGE = 6

function App() {

  const [initialClick, setInitialClick] = createSignal(false)
  const [isHovering, setIsHovering] = createSignal(false)
  const [showMenu, setShowMenu] = createSignal(false)
  const [isInvertedOctaves, setIsInvertedOctaves] = createSignal(false)
  const [autotoneMargin, setAutotoneMargin] = createSignal(.8)
  const [isAutotoneOn, setIsAutotoneOn] = createSignal(true)
  const [baseSemitone, setBaseSemitone] = createSignal(0)


  document.addEventListener('keydown', (e) => {
    switch (e.key.toLowerCase()) {
      case 'a':
        setIsAutotoneOn(autotone => !autotone);
      break;
    }
  });

  let audioContext: AudioContext
  let oscillator: OscillatorNode
  let gainNode: GainNode

  const handleInitialClick = () => {
    audioContext = new window.AudioContext()
    setInitialClick(true)
  }

  const getNoteLetter = (index: number) => {
    return NOTE_LETTERS[(index + baseSemitone()) % 12]
  }

  const calculateColor = (baseSemi: number, currSemi: number) => {
    const baseColor = ((12 - baseSemi) / 12)
    return ((((currSemi) / 12) + baseColor) * 356) % 356
  }

  const handleMouseMove = (e: MouseEvent) => {
    const target = (e.target as HTMLDivElement)
    const octaveIndex = Math.floor((e.clientX / target.clientWidth) * OCTAVE_RANGE) + BASE_OCTAVE
    const isInverted = isInvertedOctaves() && (octaveIndex - BASE_OCTAVE) % 2 === 1
    const octaveBlockWidth = target.clientWidth / OCTAVE_RANGE

    let semitone = ((1 - (e.clientY / target.clientHeight)) * NOTE_BLOCKS) - 0.5
    const margin = (semitone + 0.5) % 1
    const upperBound = (autotoneMargin() / 2) + .5
    const lowerBound = .5 - (autotoneMargin() / 2)
    const inMargin = upperBound > margin && lowerBound < margin
    if (isAutotoneOn() && inMargin) {
      semitone = Math.floor(semitone + .5)
    } else if (isAutotoneOn()) {
      const wholeSemitone = Math.floor(semitone)
      const decimal = semitone - wholeSemitone
      const range = 1 - autotoneMargin()
      semitone = wholeSemitone + (decimal - (autotoneMargin() / 2)) * (1 / range)
    }

    const noteBlockXPos = e.clientX - ((octaveIndex - BASE_OCTAVE) / OCTAVE_RANGE * target.clientWidth)
    const outer = 
      Math.floor(noteBlockXPos / (octaveBlockWidth / 2)) === (((octaveIndex - BASE_OCTAVE) % 2 === 0) ? 1 : 0)
    const xAxisRange = isInvertedOctaves() && outer
      ? 24 - (semitone * 2)
      : isInvertedOctaves()
      ? semitone * 2
      : 12
    const xAxisSemitone = (noteBlockXPos / (octaveBlockWidth / xAxisRange)) - (xAxisRange / 2)
    const freq = getFrequency(C_FREQUENCIES[octaveIndex], ((isInverted ? 12 - semitone : semitone) + baseSemitone()) + xAxisSemitone)

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
        class={`fixed z-30 top-0 left-0 w-screen h-screen 
      bg-white flex justify-center items-center 
        ${initialClick() ? 'hidden' : ''}`}
      >
        <p class='text-3xl'>Click to start the page.</p>
      </div>
      <button 
        class='absolute top-2 left-2 bg-white rounded-full py-1 px-2 z-20 select-none'
        onclick={() => setShowMenu(true)}
      >⚙</button>
      <div
        id='menu-background'
        class={`${showMenu() ? '' : 'hidden'} z-30 absolute top-0 left-0 w-screen h-screen 
      bg-black bg-opacity-50 flex justify-center items-center`}
        onclick={(e) => {
          if (e.target.id === 'menu-background') setShowMenu(false)
        }}
      >
        <div class='bg-white rounded-md p-4 flex flex-col gap-5'>
          <h1 class='text-3xl font-bold text-center'>Wiinote</h1>
          <form id="input-container" class="w-fit flex flex-col gap-5">
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
            <label class='flex'>
              <span class='pr-2'>Invert every other octave: </span>
              <input 
                type="checkbox"
                value={isInvertedOctaves() ? "checked" : undefined}
                onclick={() => setIsInvertedOctaves(o => !o)}
              />
            </label>
            <label class="flex">
              <span class='pr-2'>Autotune Block Percentage: </span>
              <input 
                class='border-black border rounded-sm pl-1'
                type="number" 
                min={10} 
                max={90} 
                value={autotoneMargin() * 100} 
                onChange={(e) => {
                  const newMargin = +e.target.value / 100
                  if (newMargin >= .1 && newMargin <= .9)
                    setAutotoneMargin(newMargin)
                }}
                onblur={(e) => {
                  const newMargin = +e.target.value / 100
                  if (newMargin <= .1 || newMargin >= .9)
                    e.target.value = (autotoneMargin() * 100).toString()
                }}
              />
              <span class='pl-1'>%</span>
            </label>
          </form>
          <footer class='text-center'>
            <a href="https://www.linkedin.com/in/nicholas-epps-597b94295/" class='text-sm text-purple-950 underline'>Nicholas Epps</a>
          </footer> 
        </div>
      </div>
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
        <For each={Array(NOTE_BLOCKS)}>{(_, semitone) => 
          <For each={Array(OCTAVE_RANGE)}>{(_, octave) => 
            <div 
              class='border border-black flex items-center justify-end pr-2 text-3xl font-bold'
              style={{
                'background-color': `hsl(${calculateColor(baseSemitone(), semitone())}, 65%, ${((octave() / OCTAVE_RANGE) * 80) + 20}%)`,
                'order': `${Math.abs(((isInvertedOctaves() && octave() % 2 === 1) ? (NOTE_BLOCKS * OCTAVE_RANGE - OCTAVE_RANGE) : 0) - (semitone() * 6)) + octave()}`
              }}
            >
              {(semitone() === 0 ? getNoteLetter(0) : getNoteLetter(12 - semitone())) 
              + (octave() + (semitone() === 0 ? 2 : 1))}
            </div>
          }</For>
        }</For>
      </div>
    </>
  )
}

export default App
