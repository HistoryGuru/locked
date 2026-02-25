let timeLeft;
let timerId = null;
let isStudyTime = true;
let pipWindow = null;

const display = document.getElementById('countdown');
const statusText = document.getElementById('status');
const pipBtn = document.getElementById('pipBtn');
const pipContent = document.getElementById('pipContent');
const mainContainer = document.getElementById('mainContainer');

// --- Timer Logic ---
function updateDisplay(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    display.textContent = timeStr;
    document.title = `(${timeStr}) Study Clock`; // Update browser tab title too
}

function startTimer() {
    if (timerId !== null) return;
    const studyMins = document.getElementById('studyInput').value;
    const breakMins = document.getElementById('breakInput').value;
    if (!timeLeft) timeLeft = studyMins * 60;

    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerId = null;
            isStudyTime = !isStudyTime;
            statusText.textContent = isStudyTime ? "Focus!" : "Break!";
            timeLeft = (isStudyTime ? studyMins : breakMins) * 60;
            alert(isStudyTime ? "Break over!" : "Session done!");
            startTimer();
        }
    }, 1000);
}

// --- Floating Window (PiP) Logic ---
pipBtn.addEventListener('click', async () => {
    if (!window.documentPictureInPicture) {
        return alert("Your browser doesn't support floating windows. Try Chrome or Edge.");
    }

    // Open the floating window
    pipWindow = await window.documentPictureInPicture.requestWindow({
        width: 250,
        height: 180,
    });

    // Copy styles so the floating window looks right
    [...document.styleSheets].forEach((styleSheet) => {
        try {
            const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
            const style = document.createElement('style');
            style.textContent = cssRules;
            pipWindow.document.head.appendChild(style);
        } catch (e) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = styleSheet.href;
            pipWindow.document.head.appendChild(link);
        }
    });

    // Move the timer display into the floating window
    pipWindow.document.body.append(pipContent);

    // Return the timer to the main page when the floating window is closed
    pipWindow.addEventListener("pagehide", () => {
        const controls = document.querySelector('.controls');
        mainContainer.insertBefore(pipContent, controls);
        pipWindow = null;
    });
});

// Reset logic
document.getElementById('resetBtn').addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    timeLeft = null;
    updateDisplay(document.getElementById('studyInput').value * 60);
});

document.getElementById('startBtn').addEventListener('click', startTimer);
