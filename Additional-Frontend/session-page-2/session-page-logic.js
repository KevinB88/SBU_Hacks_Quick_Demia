//this for loop is for min
document.addEventListener('DOMContentLoaded', function () {
    const minuteSelectElement = document.getElementById('minuteSelect');

    for (let i = 1; i <= 60; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i; // Change "text" to "textContent"
        minuteSelectElement.appendChild(option);
    }
});

//this for loop is for hours
document.addEventListener('DOMContentLoaded', function () {
    const hourSelectElement = document.getElementById('hourSelect');

    for (let i = 1; i <= 24; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = i; // Only the number will be displayed
        hourSelectElement.appendChild(option);
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








