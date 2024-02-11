document.querySelector('.close-button').addEventListener('click', function() {
  document.querySelector('.modal').style.display = 'none';
});

//another thing
const modeToggle = document.getElementById('modeToggle');
modeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode'); // Toggle dark mode class on body
});

document.addEventListener('DOMContentLoaded', function () {
    const addClassForm = document.querySelector('form'); // Adjust selector as needed

    addClassForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form from submitting in the traditional way

        // Capture form data
        const className = document.getElementById('courseInput').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const classDetails = { className, startDate, endDate };

        // Store in cookies - You'll need to implement setCookie yourself or use an existing library
        setCookie('classDetails', JSON.stringify(classDetails), 7); // Example function call

        // Optionally, add to calendar immediately
        addToCalendar(classDetails);
    });
});

// Function to read cookie and populate calendar on load
window.onload = function() {
    // Implement getCookie yourself or use an existing library
    const storedClass = getCookie('classDetails');
    if (storedClass) {
        const classDetails = JSON.parse(storedClass);
        addToCalendar(classDetails);
    }
};

// Example function to add class details to calendar
function addToCalendar(details) {
    // Assuming calendar is already initialized and available
    calendar.addEvent({
        title: details.className,
        start: details.startDate,
        end: details.endDate
    });
}

// Placeholder functions for cookie management
function setCookie(name, value, days) {
    // Implementation required
}

function getCookie(name) {
    // Implementation required
}




// Add event listeners for social buttons if needed

/*
  adding stuff:   git add .
  specific file:  git add filename.whatever

  git commit -m "message"

  git push



*/