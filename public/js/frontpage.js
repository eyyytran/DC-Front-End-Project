const appId = '930ccc5854e1479a998f4f76bd1e4b5b'
const appURL = '62c8a77dfee64d00b26817a07aac5de4'

const loginBtn = document.querySelector('.log-in')

//Enable the user to log into their Spotify Account
const SPOTIFY_AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize'
const REDIRECT_URI_AFTER_LOGIN = 'https://studify-timer.herokuapp.com'
const SCOPES = [
    'user-read-currently-playing',
    'user-read-playback-state',
    'playlist-read-private',
    'playlist-read-collaborative',
]
const SPACE_DELIMITER = '%20'
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER)

const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${appId}&redirect_uri=${REDIRECT_URI_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`
}

loginBtn.addEventListener('click', () => {
    handleLogin()
})
