//Music: https://www.fesliyanstudios.com/royalty-free-music/downloads-c/peaceful-and-relaxing-music/22

const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeElement = document.getElementById("current-time");
const durationElement = document.getElementById("duration");
const previousButton = document.getElementById("prev");
const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");

//Music
const songs = [
  {
    name: "tranquility",
    displayName: "Tranquility",
    artist: "David Renda",
  },
  {
    name: "quiet-time",
    displayName: "Quiet Time",
    artist: "Unknown",
  },
  {
    name: "serenity",
    displayName: "Serenity",
    artist: "David Renda",
  },
  {
    name: "deep-meditation",
    displayName: "Deep Meditation",
    artist: "Unknown",
  },
];

//Check Is Playing
let isPlaying = false;

//Play
function playSong() {
  music.play();
  playButton.classList.replace("fa-play", "fa-pause");
  playButton.setAttribute("title", "Pause");
  isPlaying = true;
}

//Pause
function pauseSong() {
  music.pause();
  playButton.classList.replace("fa-pause", "fa-play");
  playButton.setAttribute("title", "Play");
  isPlaying = false;
}

//Play or Pause
playButton.addEventListener("click", () =>
  isPlaying ? pauseSong() : playSong()
);

//Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

//Current Song
let songIndex = 0;

//Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update Progress Bar Width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate Display For Duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay Switching Duration To Avoid NaN
    if (durationSeconds) {
      durationElement.textContent = `${durationMinutes}: ${durationSeconds}`;
    }

    // Calculate Display For Current Time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    // Delay Switching Current To Avoid NaN
    if (currentSeconds) {
      currentTimeElement.textContent = `${currentMinutes}: ${currentSeconds}`;
    }
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
previousButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
