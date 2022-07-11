const clientId = config.clientId
const clientSecret = config.clientSecret

const embedIframe = document.querySelector('#embed-iframe')
const playEasy = document.querySelector('#easy')
const playMedium = document.querySelector('#medium')
const playHard = document.querySelector('#hard')
const greeting = document.querySelector('.greeting')

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
    makeIframe.style = 'border-radius:0px'
    makeIframe.src = `https://open.spotify.com/embed/playlist/${playlist}?utm_source=generator&theme=0`
    makeIframe.width = '100%'
    makeIframe.height = '130px' //this will need to become 80px in web mode
    makeIframe.frameBorder = '0'
    makeIframe.allowfullscreen = ''
    makeIframe.allow =
        'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
    embedIframe.append(makeIframe)
}

playEasy.addEventListener('click', () => {
    embedIframe.innerHTML = null
    getTrack('easy')
    greeting.style.display = 'none'
})

playMedium.addEventListener('click', () => {
    embedIframe.innerHTML = null
    getTrack('medium')
    greeting.style.display = 'none'
})
playHard.addEventListener('click', () => {
    embedIframe.innerHTML = null
    getTrack('hard')
    greeting.style.display = 'none'
})
