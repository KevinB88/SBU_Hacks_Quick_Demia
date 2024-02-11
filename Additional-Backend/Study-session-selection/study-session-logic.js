let classes = []; // Initialize an empty array for classes
let interval;
let paused = false;
let totalSeconds;

        function startTimer() {
            const timeInput = document.getElementById('timeInput');
            totalSeconds = parseInt(timeInput.value) * 60; // Convert minutes to seconds

            if (isNaN(totalSeconds) || totalSeconds <= 0) {
                alert('Please enter a valid time in minutes.');
                return;
            }

            if (interval) clearInterval(interval); // Clear existing timer

            updateDisplay(totalSeconds); // Initial display update
            paused = false;
            document.getElementById('pauseButton').textContent = 'Pause';

            interval = setInterval(function() {
                if (!paused) {
                    totalSeconds -= 1;
                    updateDisplay(totalSeconds);

                    if (totalSeconds <= 0) {
                        clearInterval(interval);
                        document.getElementById('timerOutput').textContent = 'Time is up!';
                        // Additional actions when timer ends
                    }
                }
            }, 1000); // Update every second
        }

        function updateDisplay(totalSeconds) {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            document.getElementById('timerOutput').textContent = `${pad(minutes)}:${pad(seconds)}`;
        }

        function pad(number) {
            return number < 10 ? `0${number}` : number;
        }

        function togglePause() {
            paused = !paused;
            document.getElementById('pauseButton').textContent = paused ? 'Resume' : 'Pause';
        }

function addClass() {
    const classInput = document.getElementById('classInput');
    const className = classInput.value.trim();
    if (className && !classes.includes(className)) {
        classes.push(className); // Add class to the array
        updateClassDropdown(); // Update the dropdown menu
    }
    classInput.value = ''; // Clear the input field
}

function updateClassDropdown() {
    const classSelect = document.getElementById('classSelect');
    classSelect.innerHTML = ''; // Clear existing options
    classes.forEach((className) => {
        const option = document.createElement('option');
        option.value = className.toLowerCase().replace(/\s+/g, '');
        option.textContent = className;
        classSelect.appendChild(option);
    });
}



window.onload = function() {
    // Populate the class dropdown if you have initial classes or if classes are stored in local storage/session storage
    updateClassDropdown();
};