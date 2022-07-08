const chillStudyMusic = '7MMrQJA2EgIgjanx9acsAZ'

const playbutton = document.querySelector('#togglePlay')
const container = document.querySelector('#container')

const clientId = config.clientId
const clientSecret = config.clientSecret

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

const getTrack = async track_id => {
    const token = await getToken()
    const result = await fetch(
        `https://api.spotify.com/v1/tracks/${track_id}`,
        {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }
    )
    const data = await result.json()
    console.log(data)
}

getTrack(chillStudyMusic)
