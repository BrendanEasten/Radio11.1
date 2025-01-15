const playButton = document.getElementById('play-btn');
const audioPlayer = document.getElementById('audio-player');
const cdImage = document.getElementById('cd');
const trackInfo = document.getElementById('track-info');
const trackTitle = document.getElementById('track-title');
const shuffleButton = document.getElementById('shuffle-btn'); // Add a shuffle button in your HTML

// Playlist of MP3 files
const playlist = [
{ title: "Unconditional Love by Sideluv", src: "song1.mp3" },
{ title: "Joytoy Fire by Lil Jammy", src: "song2.mp3" },
{ title: "All Night by Trevor Something", src: "song3.mp3" },
{ title: "Loving You by Cannons", src: "song4.mp3" },
{ title: "Polish Girl by Neon Indian", src: "song5.mp3" },
{ title: "Dissociation by Indo Silver", src: "song6.mp3" },
];

let isPlaying = false;
let isShuffle = false;
let currentTrackIndex = 0;
let rotationAngle = 0;

// Load the first track
function loadTrack(index) {
audioPlayer.src = playlist[index].src;
trackTitle.textContent = playlist[index].title;
}

function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        stopSpinning();
        playButton.textContent = ' Play';
        trackInfo.style.display = 'none'; // Hide track info on pause
        document.body.classList.remove('music-playing'); // Remove background effect
    } else {
        audioPlayer.play();
        startSpinning();
        playButton.textContent = 'Pause';
        trackInfo.style.display = 'block'; // Show track info on play
        document.body.classList.add('music-playing'); // Add background effect
    }
    isPlaying = !isPlaying;
}

function startSpinning() {
    cdImage.style.animation = `spin 3s linear infinite`;
    document.querySelector('.cd-container').classList.add('playing'); // Add color animation
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
    document.querySelector('.cd-container').classList.remove('playing'); // Remove color animation
}

function playNextTrack() {
if (isShuffle) {
currentTrackIndex = Math.floor(Math.random() * playlist.length);
} else {
currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
}
loadTrack(currentTrackIndex);
if (isPlaying) {
audioPlayer.play();
}
}

function toggleShuffle() {
isShuffle = !isShuffle;
shuffleButton.textContent = isShuffle ? 'Shuffle: On' : 'Shuffle: Off';
}

// Initial setup
loadTrack(currentTrackIndex);
trackInfo.style.display = 'none'; // Hide track info by default

playButton.addEventListener('click', togglePlay);
audioPlayer.addEventListener('ended', playNextTrack);
shuffleButton.addEventListener('click', toggleShuffle);
