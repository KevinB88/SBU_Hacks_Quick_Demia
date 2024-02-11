document.getElementById('description-btn').addEventListener('click', function() {
    const descriptionBox = document.getElementById('assignment-description');
    descriptionBox.style.display = descriptionBox.style.display === 'none' ? 'block' : 'none';
});

const assignments = [];

            //document.getElementById('assignment-form').addEventListener('submit', function(e) {
            //    e.preventDefault();
            //    const courseName = document.getElementById('course-name').value;
            //    const assignmentName = document.getElementById('assignment-name').value;
            //    const dueDate = document.getElementById('due-date').value;
            //    const dueTime = document.getElementById('due-time').value;
            //    const priorityColor = document.getElementById('priority-color').value;
            //
            //    const assignment = {
            //        courseName,
            //        assignmentName,
            //        dueDate,
            //        dueTime,
            //        priority: priorityColor, // Assuming a color to priority mapping exists
            //    };
            //
            //    assignments.push(assignment);
            //    displayAssignments(); // Function to display assignments
            //});
            //
            //document.getElementById('sort-assignments').addEventListener('click', function() {
            //    assignments.sort((a, b) => {
            //        // Assuming a function getColorPriority(color) that returns numerical priority
            //        return getColorPriority(a.priority) - getColorPriority(b.priority);
            //    });
            //    displayAssignments(); // Update the display after sorting
            //});


document.getElementById('assignment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const courseName = document.getElementById('course-name').value;
    const assignmentName = document.getElementById('assignment-name').value;
    const dueDate = document.getElementById('due-date').value;
    const dueTime = document.getElementById('due-time').value;
    const priorityColor = document.getElementById('priority-color').value;

    // Format the start time as FullCalendar expects
    const startTime = `${dueDate}T${dueTime}`;

    // Optionally, you can adjust the end time. Here, we simply use the start time
    // Adjust this based on your needs, perhaps adding a fixed duration to the assignment
    const endTime = startTime; // Simple example, consider customizing

    const assignment = {
        title: `${courseName}: ${assignmentName}`,
        start: startTime,
        end: endTime,
        color: priorityColor, // Use the color as the event's background color
        description: `Due: ${dueDate} at ${dueTime}`, // Example description
    };

    // Add the assignment as an event to the calendar
    calendar.addEvent(assignment);
    displayAssignments(); // Your existing function to display assignments elsewhere
});



function getColorPriority(color) {
    const colorPriority = {
        'black': 1,
        'darkgray': 2,
        'gray': 3,
        'lightgray': 4,
        'white': 5,
    };
    return colorPriority[color];
}

function displayAssignments() {
    const list = document.getElementById('assignments-list');
    list.innerHTML = ''; // Clear current list

    assignments.forEach((assignment, index) => {
        const item = document.createElement('div');
        const removeBtn = document.createElement('button');

        // Set the text content for the assignment item
        item.textContent = `${assignment.courseName}: ${assignment.assignmentName} due ${assignment.dueDate} at ${assignment.dueTime} - Priority: ${assignment.priority}`;

        // Configure the Remove button
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = function() {
            // Remove the assignment from the array
            assignments.splice(index, 1);
            displayAssignments(); // Re-display the assignments
        };

        // Append the Remove button to the assignment item
        item.appendChild(removeBtn);

        // Append the assignment item to the list
        list.appendChild(item);
    });
}
