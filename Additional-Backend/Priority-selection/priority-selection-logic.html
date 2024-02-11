document.getElementById('description-btn').addEventListener('click', function() {
    const descriptionBox = document.getElementById('assignment-description');
    descriptionBox.style.display = descriptionBox.style.display === 'none' ? 'block' : 'none';
});

const assignments = [];

document.getElementById('assignment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const courseName = document.getElementById('course-name').value;
    const assignmentName = document.getElementById('assignment-name').value;
    const dueDate = document.getElementById('due-date').value;
    const dueTime = document.getElementById('due-time').value;
    const priorityColor = document.getElementById('priority-color').value;

    const assignment = {
        courseName,
        assignmentName,
        dueDate,
        dueTime,
        priority: priorityColor, // Assuming a color to priority mapping exists
    };

    assignments.push(assignment);
    displayAssignments(); // Function to display assignments
});

document.getElementById('sort-assignments').addEventListener('click', function() {
    assignments.sort((a, b) => {
        // Assuming a function getColorPriority(color) that returns numerical priority
        return getColorPriority(a.priority) - getColorPriority(b.priority);
    });
    displayAssignments(); // Update the display after sorting
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
