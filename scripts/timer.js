const mainButton = document.getElementById('main-button')
const modeButtons = document.querySelector('#mode-buttons')
const pomodoroBtn = document.querySelector('#pomodoro')
const shortBreakBtn = document.querySelector('#short-break')
const longBreakBtn = document.querySelector('#long-break')
const timerSound = new Audio('/DC-Front-End-Project/alarms/starttimer.mp3')

const timer = {
    pomodoro: 0.5, //change to 25
    shortBreak: 5, //change to 5
    longBreak: 15, //change to 15
    longBreakInterval: 2, //change to 4
    sessions: 0,
}

let interval

const getRemainingTime = endTime => {
    const currentTime = Date.parse(new Date())
    const difference = endTime - currentTime

    const total = Number.parseInt(difference / 1000, 10)
    const minutes = Number.parseInt((total / 60) % 60, 10)
    const seconds = Number.parseInt(total % 60, 10)

    return {
        total,
        minutes,
        seconds,
    }
}

const startTimer = () => {
    let { total } = timer.remainingTime
    const endTime = Date.parse(new Date()) + total * 1000

    if (timer.mode === 'pomodoro') timer.sessions++

    mainButton.dataset.action = 'stop'
    mainButton.textContent = 'STOP'
    mainButton.classList.add('active')

    interval = setInterval(function () {
        timer.remainingTime = getRemainingTime(endTime)
        updateClock()

        total = timer.remainingTime.total
        if (total < 0) {
            clearInterval(interval)
            switch (timer.mode) {
                case 'pomodoro':
                    if (timer.sessions % timer.longBreakInterval === 0) {
                        switchMode('longBreak')
                    } else {
                        switchMode('shortBreak')
                    }
                    break
                default:
                    switchMode('pomodoro')
            }
            document.querySelector(`[data-sound="${timer.mode}"]`).play()
            startTimer()
        }
    }, 1000)
}

const updateClock = () => {
    const { remainingTime } = timer
    const minutes = `${remainingTime.minutes}`.padStart(2, '0')
    const seconds = `${remainingTime.seconds}`.padStart(2, '0')

    const min = document.getElementById('minutes')
    const sec = document.getElementById('seconds')
    min.textContent = minutes
    sec.textContent = seconds

    perc = Math.ceil(
        ((timer[timer.mode] * 60 - timer.remainingTime.total) /
            (timer[timer.mode] * 60)) *
            100
    )
    setProgress(perc)
}

const switchMode = mode => {
    timer.mode = mode
    timer.remainingTime = {
        total: timer[mode] * 60,
        minutes: timer[mode],
        seconds: 0,
    }

    document
        .querySelectorAll('button[data-mode]')
        .forEach(e => e.classList.remove('active'))
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active')
    if (mode === 'pomodoro') {
        pomodoroBtn.style.background = 'var(--coral)'
        longBreakBtn.style.background = 'rgba(102, 102, 102, 0.2)'
        shortBreakBtn.style.background = 'rgba(102, 102, 102, 0.2)'
    } else if (mode === 'shortBreak') {
        shortBreakBtn.style.background = 'var(--coral)'
        longBreakBtn.style.background = 'rgba(102, 102, 102, 0.2)'
        pomodoroBtn.style.background = 'rgba(102, 102, 102, 0.2)'
    } else {
        longBreakBtn.style.background = 'var(--coral)'
        shortBreakBtn.style.background = 'rgba(102, 102, 102, 0.2)'
        pomodoroBtn.style.background = 'rgba(102, 102, 102, 0.2)'
    }

    updateClock()
}

const handleMode = event => {
    const { mode } = event.target.dataset

    if (!mode) return

    switchMode(mode)
    stopTimer()
}

const stopTimer = () => {
    clearInterval(interval)

    mainButton.dataset.action = 'start'
    mainButton.textContent = 'START'
    mainButton.classList.remove('active')
}

mainButton.addEventListener('click', () => {
    timerSound.play()
    const { action } = mainButton.dataset
    if (action === 'start') {
        startTimer()
    } else {
        stopTimer()
    }
})

modeButtons.addEventListener('click', handleMode)

document.addEventListener('DOMContentLoaded', () => {
    switchMode('pomodoro')
})
