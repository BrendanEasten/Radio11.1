const playButton = document.getElementById('play-btn');
const audioPlayer = document.getElementById('audio-player');
const cdImage = document.getElementById('cd');
const trackInfo = document.getElementById('track-info');
const trackTitle = document.getElementById('track-title');
const shuffleButton = document.getElementById('shuffle-btn');
const nextButton = document.getElementById('next-btn');
const prevButton = document.getElementById('prev-btn');

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
        playButton.textContent = 'Play';
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
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audioPlayer.play();
    }
    trackInfo.style.display = 'block'; // Ensure track info is visible when playing
}

// Play previous track
function playPreviousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audioPlayer.play();
    }
    trackInfo.style.display = 'block'; // Ensure track info is visible when playing
}

// Initial setup
loadTrack(currentTrackIndex);
trackInfo.style.display = 'none'; // Hide track info by default

// Event Listeners for Buttons
playButton.addEventListener('click', togglePlay);
audioPlayer.addEventListener('ended', playNextTrack);
shuffleButton.addEventListener('click', toggleShuffle);
nextButton.addEventListener('click', playNextTrack); // Click next to play next track
prevButton.addEventListener('click', playPreviousTrack); // Click previous to play previous track