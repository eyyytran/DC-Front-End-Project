const clock = document.querySelector('.clock')

const minDiv = document.querySelector('.mins')
const secDiv = document.querySelector('.secs')

const startBtn = document.querySelector('#timer-start')
const resetBtn = document.querySelector('#timer-reset')
const pauseBtn = document.querySelector('#timer-pause')

const form = document.querySelector('form')
const focusTimeInput = document.querySelector('#focusTime')
const breakTimeInput = document.querySelector('#breakTime')

localStorage.setItem('btn', 'focus')

let initial, totalsecs, perc, paused, mins, seconds

const decremenT = () => {
    minDiv.textContent = Math.floor(seconds / 60)
    secDiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`

    if (seconds > 0) {
        seconds--
        initial = window.setTimeout('decremenT()', 1000)
    } else {
        mins = 0
        seconds = 0
        //i can put audio or a module here
        let btn = localStorage.getItem('btn')

        if (btn === 'focus') {
            startBtn.textContent = 'Start Break'
            startBtn.classList.add('break')
            localStorage.setItem('btn', 'break')
        } else {
            startBtn.classList.remove('break')
            startBtn.textContent = 'Start Focus'
            localStorage.setItem('btn', 'focus')
        }
        startBtn.style.transform = 'scale(1)'
    }
}

startBtn.addEventListener('click', () => {
    let btn = localStorage.getItem('btn')
    if (btn === 'focus') {
        mins = +localStorage.getItem('focusTime')
    } else {
        mins = +localStorage.getItem('breakTime')
    }
    seconds = mins * 60
    totalsecs = mins * 60
    setTimeout(decremenT(), 60)
    startBtn.getElementsByClassName.transform = 'scale(0)'
    paused = false
})

form.addEventListener('submit', e => {
    e.preventDefault()
    localStorage.setItem('focusTime', focusTimeInput.value)
    localStorage.setItem('breakTime', breakTimeInput.value)
})

resetBtn.addEventListener('click', () => {
    startBtn.style.transform = 'scale(1)'
    clearTimeout(initial)
    setProgress(0)
    minDiv.textContent = 0
    secDiv.textContent = 0
})

pauseBtn.addEventListener('click', () => {
    if (paused === undefined) {
        return
    }
    if (paused) {
        paused = false
        initial = setTimeout(decremenT(), 60)
        pauseBtn.textContent = 'Paused'
        pauseBtn.classList.remove('resume')
    } else {
        clearTimeout(initial)
        pauseBtn.textContent = 'Resume'
        pauseBtn.classList.add = 'resume'
        paused = true
    }
})
