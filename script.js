let timeLeft;
let timerId = null;
let isStudyTime = true;

const display = document.getElementById('countdown');
const statusText = document.getElementById('status');
const startBtn = document.getElementById('startBtn');

function updateDisplay(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timerId !== null) return; // Prevent double clicking

    const studyMins = document.getElementById('studyInput').value;
    const breakMins = document.getElementById('breakInput').value;

    // Initial set
    if (!timeLeft) timeLeft = studyMins * 60;

    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerId = null;
            
            // Switch between study and break
            isStudyTime = !isStudyTime;
            statusText.textContent = isStudyTime ? "Back to work!" : "Take a break!";
            timeLeft = (isStudyTime ? studyMins : breakMins) * 60;
            
            alert(isStudyTime ? "Break over! Time to study." : "Study session done! Take a break.");
            startTimer(); // Auto-start the next phase
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = null;
    statusText.textContent = "Ready?";
    updateDisplay(document.getElementById('studyInput').value * 60);
}

startBtn.addEventListener('click', startTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
