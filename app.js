const clientId = config.clientId
const clientSecret = config.clientSecret

const embedIframe = document.querySelector('#embed-iframe')
const makePlayerBtn = document.querySelector('#makeiframe')
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

const getTrack = async () => {
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
    console.log(data)
    console.log('easy playlist', data.items[2].id)
    console.log('medium playlist', data.items[0].id)
    console.log('hard playlist', data.items[1].id)
    const easyMusic = data.items[2].id
    //make the iframe
    const makeIframe = document.createElement('iframe')
    makeIframe.id = 'spotify-player'
    makeIframe.style = 'border-radius:0px'

    makeIframe.src = `https://open.spotify.com/embed/playlist/${easyMusic}?utm_source=generator&theme=0`
    makeIframe.width = '100%'
    makeIframe.height = '130px' //this will need to become 80px in web mode
    makeIframe.frameBorder = '0'
    makeIframe.allowfullscreen = ''
    makeIframe.allow =
        'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
    embedIframe.append(makeIframe)
}

makePlayerBtn.addEventListener('click', () => {
    getTrack()
    greeting.style.display = 'none'
})
