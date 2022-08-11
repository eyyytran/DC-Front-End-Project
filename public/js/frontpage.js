const clientId = process.env.CLIENTID
const clientSecret = process.env.CLIENTSECRET

const loginBtn = document.querySelector('.log-in')

//Enable the user to log into their Spotify Account
const SPOTIFY_AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize'
const REDIRECT_URI_AFTER_LOGIN = 'http://localhost:3001/app'
const SCOPES = [
    'user-read-currently-playing',
    'user-read-playback-state',
    'playlist-read-private',
    'playlist-read-collaborative',
]
const SPACE_DELIMITER = '%20'
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER)

const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${clientId}&redirect_uri=${REDIRECT_URI_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`
}

loginBtn.addEventListener('click', () => {
    handleLogin()
})
