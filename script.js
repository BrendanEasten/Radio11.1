const playButton = document.getElementById('play-btn');
const audioPlayer = document.getElementById('audio-player');
const volumeSlider = document.getElementById('volume-slider');
const cdImage = document.getElementById('cd');
const trackInfo = document.getElementById('track-info');
const trackTitle = document.getElementById('track-title');
const shuffleButton = document.getElementById('shuffle-btn');
const nextButton = document.getElementById('next-btn');
const prevButton = document.getElementById('prev-btn');

// Set initial volume
audioPlayer.volume = volumeSlider.value;

// Update audio volume when the slider is adjusted
volumeSlider.addEventListener('input', (event) => {
    audioPlayer.volume = event.target.value;
});

// Playlist of MP3 files
const playlist = [

    { title: "Unconditional Love by Sideluv", src: "song1.mp3" },

    { title: "Joytoy Fire by Lil Jammy", src: "song2.mp3" },

    { title: "Lofi House by Clement クレム ", src: "song3.mp3" },

    { title: "Polish Girl by Neon Indian", src: "song4.mp3" },

    { title: "Dissociation by Indo Silver", src: "song5.mp3" },

];

let isPlaying = false;
let isShuffle = false;
let shuffledPlaylist = [...playlist];
let currentTrackIndex = Math.floor(Math.random() * shuffledPlaylist.length);
let rotationAngle = 0;

// Shuffle function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Toggle shuffle
function toggleShuffle() {
    isShuffle = !isShuffle;
    if (isShuffle) {
        shuffleArray(shuffledPlaylist);
    } else {
        shuffledPlaylist = [...playlist];
    }
    currentTrackIndex = Math.floor(Math.random() * shuffledPlaylist.length);
    loadTrack(currentTrackIndex);
}

// Load the first track
function loadTrack(index) {
    audioPlayer.src = shuffledPlaylist[index].src;
    trackTitle.textContent = shuffledPlaylist[index].title;
}

function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        stopSpinning();
        playButton.textContent = 'Play';
        trackInfo.style.display = 'none';
        document.body.classList.remove('music-playing');
    } else {
        audioPlayer.play();
        startSpinning();
        playButton.textContent = 'Pause';
        trackInfo.style.display = 'block';
        document.body.classList.add('music-playing');
    }
    isPlaying = !isPlaying;
}

function startSpinning() {
    cdImage.style.animation = `spin 3s linear infinite`;
    document.querySelector('.cd-container').classList.add('playing');
}

function stopSpinning() {
    const computedStyle = window.getComputedStyle(cdImage);
    const matrix = computedStyle.transform;

    if (matrix !== 'none') {
        const values = matrix.split('(')[1].split(')')[0].split(',');
        const a = parseFloat(values[0]);
        const b = parseFloat(values[1]);
        rotationAngle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    }

    cdImage.style.animation = 'none';
    cdImage.style.transform = `rotate(${rotationAngle}deg)`;
    document.querySelector('.cd-container').classList.remove('playing');
}

// Play next track
function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % shuffledPlaylist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audioPlayer.play();
    }
    trackInfo.style.display = 'block';
}

// Play previous track
function playPreviousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + shuffledPlaylist.length) % shuffledPlaylist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audioPlayer.play();
    }
    trackInfo.style.display = 'block';
}

// Initial setup
shuffleArray(shuffledPlaylist);
currentTrackIndex = Math.floor(Math.random() * shuffledPlaylist.length);
loadTrack(currentTrackIndex);
trackInfo.style.display = 'none';

// Event Listeners for Buttons
playButton.addEventListener('click', togglePlay);
audioPlayer.addEventListener('ended', playNextTrack);
shuffleButton.addEventListener('click', toggleShuffle);
nextButton.addEventListener('click', playNextTrack);
prevButton.addEventListener('click', playPreviousTrack);