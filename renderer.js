
const sourcePathInput = document.getElementById('source-path');
const destinationPathInput = document.getElementById('destination-path');
const browseSourceBtn = document.getElementById('browse-source');
const browseDestinationBtn = document.getElementById('browse-destination');
const intervalInput = document.getElementById('interval');
const intervalUnitSelect = document.getElementById('interval-unit');
const applySettingsBtn = document.getElementById('apply-settings');
const pauseResumeBtn = document.getElementById('pause-resume');
const timerDisplay = document.getElementById('timer-display');
const spinner = document.getElementById('spinner');

const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
let frameIndex = 0;
setInterval(() => {
    spinner.textContent = spinnerFrames[frameIndex];
    frameIndex = (frameIndex + 1) % spinnerFrames.length;
}, 80);

browseSourceBtn.addEventListener('click', async () => {
    const path = await window.electronAPI.openFolderDialog();
    if (path) {
        sourcePathInput.value = path;
    }
});

browseDestinationBtn.addEventListener('click', async () => {
    const path = await window.electronAPI.openFolderDialog();
    if (path) {
        destinationPathInput.value = path;
    }
});

applySettingsBtn.addEventListener('click', () => {
    const source = sourcePathInput.value;
    const destination = destinationPathInput.value;
    const interval = parseInt(intervalInput.value, 10);
    const intervalUnit = intervalUnitSelect.value;

    if (!source || !destination) {
        alert('Please select both source and destination folders.');
        return;
    }
    if (isNaN(interval) || interval <= 0) {
        alert('Please enter a valid backup interval.');
        return;
    }
    
    window.electronAPI.applySettings({ source, destination, interval, intervalUnit });
});

pauseResumeBtn.addEventListener('click', () => {
    window.electronAPI.togglePauseResume();
});

window.electronAPI.onTimerUpdate((remainingTime) => {
    const totalSeconds = Math.round(remainingTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    timerDisplay.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

window.electronAPI.onTimerState((state) => {
    if (state === 'paused') {
        pauseResumeBtn.textContent = 'Resume';
        pauseResumeBtn.classList.remove('btn-pause');
        pauseResumeBtn.classList.add('btn-resume');
    } else {
        pauseResumeBtn.textContent = 'Pause';
        pauseResumeBtn.classList.remove('btn-resume');
        pauseResumeBtn.classList.add('btn-pause');
    }
});

window.electronAPI.onBackupStatus((status) => {
    flashBorder(status.success ? 'success' : 'error');
});

function flashBorder(type) {
    const className = type === 'success' ? 'flash-success' : 'flash-error';
    timerDisplay.classList.add(className);
    setTimeout(() => {
        timerDisplay.classList.remove(className);
    }, 1500);
}
