const mainButton = document.getElementById('main-button')
const modeButtons = document.querySelector('#mode-buttons')

const timer = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
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
    mainButton.textContent = 'stop'
    mainButton.classList.add('active')

    interval = setInterval(function () {
        timer.remainingTime = getRemainingTime(endTime)
        updateClock()

        total = timer.remainingTime.total
        if (total <= 0) {
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
    //mode color switch here

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
    mainButton.textContent = 'start'
    mainButton.classList.remove('active')
}

mainButton.addEventListener('click', () => {
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
