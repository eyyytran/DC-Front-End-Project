const mainBtn = document.querySelector('#main-button')
const modeBtns = document.querySelector('#mode-buttons')

const timer = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
}

let interval

const startTimer = () => {
    let { total } = timer.remainingTime
    const endTime = Date.parse(new Date()) + total * 1000

    mainBtn.dataset.action = 'stop'
    mainBtn.textContent = 'stop'
    mainBtn.classList.add('active')

    interval = setInterval(function () {
        timer.remainingTime = getRemainingTime(endTime)
        updateClock()

        total = timer.remainingTime.total
        if (total <= 0) {
            clearInterval(interval)
        }
    }, 1000)
}

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

const handleMode = event => {
    const { mode } = event.target.dataset
    if (!mode) return
    switchMode(mode)
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
    circle.style.backgroundColor = `var(--${mode})`

    updateClock()
}

const updateClock = () => {
    const { remainingTime } = timer
    const minutes = `${remainingTime.minutes}`.padStart(2, '0')
    const seconds = `${remainingTime.seconds}`.padStart(2, '0')

    const min = document.getElementById('minutes')
    const sec = document.getElementById('seconds')
}

mainBtn.addEventListener('click', () => {
    const { action } = mainBtn.dataset
    if (action === 'start') {
        startTimer()
    }
})

document.addEventListener('DOMContentLoaded', () => {
    switchMode('pomodoro')
})
