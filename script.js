//Music: https://www.fesliyanstudios.com/royalty-free-music/downloads-c/peaceful-and-relaxing-music/22

const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const previousButton = document.getElementById('prev')
const playButton = document.getElementById('play')
const nextButton = document.getElementById('next')

//Music
const songs = [
    {
        name: 'tranquility',
        displayName: 'Tranquility',
        artist: 'David Renda'
    },
    {
        name: 'quiet-time',
        displayName: 'Quiet Time',
        artist: 'Unknown'
    },
    {
        name: 'serenity',
        displayName: 'Serenity',
        artist: 'David Renda'
    },
    {
        name: 'deep-meditation',
        displayName: 'Deep Meditation',
        artist: 'Unknown'
    },
]

//Check Is Playing
let isPlaying = false

//Play
function playSong() {
    music.play()
    playButton.classList.replace('fa-play', 'fa-pause')
    playButton.setAttribute('title', 'Pause')
    isPlaying = true
}

//Pause
function pauseSong() {
    music.pause()
    playButton.classList.replace('fa-pause', 'fa-play')
    playButton.setAttribute('title', 'Play')
    isPlaying = false
}

//Play or Pause
playButton.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))

//Update DOM
function loadSong(song) {
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

//Current Song
let songIndex = 0

//Next Song
function nextSong() {
    songIndex++
    if (songIndex > songs.length -1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

//Previous Song
function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length -1
    }
    loadSong(songs[songIndex])
    playSong()
}

// On Load - Select First Song
loadSong(songs[songIndex])

// Event Listeners
previousButton.addEventListener('click',prevSong)
nextButton.addEventListener('click',nextSong)