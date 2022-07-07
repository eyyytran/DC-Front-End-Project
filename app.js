const button = document.getElementById('togglePlay')

window.onSpotifyWebPlaybackSDKReady = () => {
    const token =
        'BQBHvwABLNYbr2vBl3ppEX9uaxWyopV6r67SfMHG09WMVukQEEwwlYLix3j9-Xg8NVesuRBi6gYMy83kIynt2fUmXCp5HvvrSTdC_1uaBM68903IektGOrW1j0WWKy3PoZdsJwCrQxjzzULr47Bmcq0Hqu_OzTCInBcHQNLad7-qKmE6U3LTl13bNJnfCE9ZdtDURdkoJdn_D1zlSbJAoy0'
    const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => {
            cb(token)
        },
        volume: 0.5,
    })

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
    })

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
    })

    player.addListener('initialization_error', ({ message }) => {
        console.error(message)
    })

    player.addListener('authentication_error', ({ message }) => {
        console.error(message)
    })

    player.addListener('account_error', ({ message }) => {
        console.error(message)
    })

    document.getElementById('togglePlay').onclick = function () {
        player.togglePlay()
    }

    player.connect()
}
