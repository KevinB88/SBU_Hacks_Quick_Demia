//this for loop is for min
document.addEventListener('DOMContentLoaded', function () {
    const minuteSelectElement = document.getElementById('minuteSelect');

    for (let i = 1; i <= 59; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i; // Change "text" to "textContent"
        minuteSelectElement.appendChild(option);
    }
});

//this for loop is for hours
document.addEventListener('DOMContentLoaded', function () {
    const hourSelectElement = document.getElementById('hourSelect');
    hourSelectElement.innerHTML = ''; // Clear existing options

    // Generate hours with AM/PM
    for (let period of ['AM', 'PM']) {
        for (let i = 1; i <= 12; i++) {
            const option = document.createElement("option");
            option.value = `${i} ${period}`;
            option.text = `${i} ${period}`;
            hourSelectElement.appendChild(option);
        }
    }
});


//this is for the days of the week
// scripts.js

// Assuming addClass() is defined elsewhere or in this script
function addClass() {
    // Functionality for adding a class
}

// Function to toggle the display of the dayForm
function toggleForm() {
    var form = document.getElementById("dayForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

// Event listener for the Day button
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('dayButton').addEventListener('click', toggleForm);
    // Populate the day checkboxes
    const dayForm = document.getElementById('dayForm');
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    daysOfWeek.forEach(day => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = day;
        checkbox.name = day;
        checkbox.value = day;

        const label = document.createElement('label');
        label.htmlFor = day;
        label.appendChild(document.createTextNode(' ' + day));

        dayForm.appendChild(checkbox);
        dayForm.appendChild(label);
        dayForm.appendChild(document.createElement('br'));
    });
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

// Function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie by name
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
// Add these functions to your script to manage cookie-based storage of class details.






