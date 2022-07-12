const clientId = config.clientId
const clientSecret = config.clientSecret

const header = document.querySelector('.header')
const playlistHeader = document.querySelector('#playlist-header')
const timerHeader = document.querySelector('#timer-header')
const userHeader = document.querySelector('#user-header')
console.log(userHeader)

const playListMenu = document.querySelector('.playlist-menu')
const timerPage = document.querySelector('.timer-page')
const userPage = document.querySelector('.user-page')

const embedIframe = document.querySelector('#embed-iframe')
const playEasy = document.querySelector('#easy')
const playMedium = document.querySelector('#medium')
const playHard = document.querySelector('#hard')

const musicBtn = document.querySelector('#music-button')
const timerBtn = document.querySelector('#timer-button')
const userBtn = document.querySelector('#user-button')

const aboutBtn = document.querySelector('.about-button')

///music player functions
const getToken = async () => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
        },
        body: 'grant_type=client_credentials',
    })
    const data = await result.json()
    return data.access_token
}

const getTrack = async userChoice => {
    const token = await getToken()
    const result = await fetch(
        `https://api.spotify.com/v1/users/22miwnisbrauyz66lvgaxjnqa/playlists`,
        {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }
    )
    const data = await result.json()

    let playlist = ''
    if (userChoice === 'easy') {
        playlist = data.items[2].id
    } else if (userChoice === 'medium') {
        playlist = data.items[0].id
    } else if (userChoice === 'hard') {
        playlist = data.items[1].id
    }

    const makeIframe = document.createElement('iframe')
    makeIframe.id = 'spotify-player'
    makeIframe.style = 'border-radius:5px'
    makeIframe.src = `https://open.spotify.com/embed/playlist/${playlist}?utm_source=generator&theme=0`
    makeIframe.width = '100%'
    makeIframe.height = '120px' //this will need to become 80px in web mode
    makeIframe.frameBorder = '0'
    makeIframe.allowfullscreen = ''
    makeIframe.allow =
        'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
    embedIframe.append(makeIframe)
}

const changeColors = userChoice => {
    if (userChoice === 'easy') {
        document.querySelector('.color-state-gradient').style.background =
            'linear-gradient(133deg,rbga(158,180,241,1) 0%, rgba(242,242,242,1) 12%)'
    } else if (userChoice === 'medium') {
        document.querySelector('.color-state-gradient').style.background =
            'linear-gradient(133deg,rbga(95,187,218,1) 0%, rgba(242,242,242,1) 12%)'
    } else return
}

playEasy.addEventListener('click', () => {
    embedIframe.innerHTML = null
    changeColors('easy')
    getTrack('easy')
})

playMedium.addEventListener('click', () => {
    embedIframe.innerHTML = null
    getTrack('medium')
})
playHard.addEventListener('click', () => {
    embedIframe.innerHTML = null
    getTrack('hard')
})

//Nav Bar Functions

musicBtn.addEventListener('click', () => {
    timerPage.style.display = 'none'
    timerHeader.style.display = 'none'
    userPage.style.display = 'none'
    userHeader.style.display = 'none'
    playlistHeader.style.display = 'inline-block'
    playListMenu.style.display = 'grid'
})

timerBtn.addEventListener('click', () => {
    playListMenu.style.display = 'none'
    playlistHeader.style.display = 'none'
    userPage.style.display = 'none'
    userHeader.style.display = 'none'
    timerHeader.style.display = 'inline-block'
    timerPage.style.display = 'flex'
})

userBtn.addEventListener('click', () => {
    playListMenu.style.display = 'none'
    playlistHeader.style.display = 'none'
    userPage.style.display = 'grid'
    userHeader.style.display = 'inline-block'
    timerHeader.style.display = 'none'
    timerPage.style.display = 'none'
})

//User Account Buttons
aboutBtn.addEventListener('click', () => {
    if (document.querySelector('.credits').style.display === 'none') {
        document.querySelector('.about-title').style.display = 'none'
        document.querySelector('.credits').style.display = 'inline-block'
    } else {
        document.querySelector('.about-title').style.display = 'inline-block'
        document.querySelector('.credits').style.display = 'none'
    }
})
