const playButton = document.getElementById('play-btn');
const audioPlayer = document.getElementById('audio-player');
const cdImage = document.getElementById('cd');

let isPlaying = false;
let rotationAngle = 0; // Track the rotation angle

function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        stopSpinning();
        playButton.textContent = '▶ Play';
    } else {
        audioPlayer.play();
        startSpinning();
        playButton.textContent = '⏸ Pause';
    }
    isPlaying = !isPlaying;
}

function startSpinning() {
    cdImage.style.animation = `spin 3s linear infinite`;
}

function stopSpinning() {
    // Get the current computed rotation angle and pause animation
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
}

playButton.addEventListener('click', togglePlay);