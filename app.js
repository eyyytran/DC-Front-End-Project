const clientId = config.clientId
const clientSecret = config.clientSecret

// https://accounts.spotify.com/authorize?client_id=shfjkdshfkjshkfhsd&redirect_uri=http:fsdfdsjkfhskjfhs.com%2Fcallback&scope=user-read-private&20user-read-email&response_type=token&state=123

const embedIframe = document.querySelector('#embed-iframe')
const button = document.querySelector('.log-in')

const SPOTIFY_AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize'
const REDIRECT_URI_AFTER_LOGIN =
    'http://127.0.0.1:5500/DC-Front-End-Project/index.html/callback'
const SCOPES = ['user-read-currently-playing', 'user-read-playback-state']
const SPACE_DELIMITER = '%20'
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER)

const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${clientId}&redirect_uri=${REDIRECT_URI_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`
}

button.addEventListener('click', () => {
    handleLogin()
})

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
    makeIframe.style = 'border-radius:12px'
    makeIframe.src = `https://open.spotify.com/embed/playlist/${easyMusic}?utm_source=generator`
    makeIframe.width = '100%'
    makeIframe.height = '100%'
    makeIframe.frameBorder = '0'
    makeIframe.allowfullscreen = ''
    makeIframe.allow =
        'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
    embedIframe.append(makeIframe)
}

getTrack()
