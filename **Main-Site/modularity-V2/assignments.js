// assignments.js
export const assignments = [];

function getColorPriority(color) {
    const colorPriority = {
        'black': 1,
        'darkgray': 2,
        'gray': 3,
        'lightgray': 4,
        'white': 5,
    };
    return colorPriority[color] || 0;
}

function displayAssignments(calendar) {
    const list = document.getElementById('assignments-list');
    if (!list) {
        console.error('Assignments list element not found!');
        return;
    }
    list.innerHTML = ''; // Clear current list

    assignments.forEach((assignment, index) => {
        const item = document.createElement('div');
        item.className = 'assignment-item'; // For styling purposes

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-assignment-btn'; // For styling purposes
        removeBtn.addEventListener('click', function() {
            assignments.splice(index, 1); // Remove the assignment from the array
            calendar.getEventById(assignment.id).remove(); // Remove from calendar
            displayAssignments(calendar); // Re-display the assignments
        });

        // Construct the display text for each assignment
        const assignmentText = `${assignment.title} due ${assignment.start} - Priority: ${assignment.color}`;
        item.textContent = assignmentText;

        // Append the Remove button to the assignment item
        item.appendChild(removeBtn);

        // Append the assignment item to the list
        list.appendChild(item);
    });
}

export function initAssignments(calendar) {
    document.getElementById('description-btn').addEventListener('click', function() {
        const descriptionBox = document.getElementById('assignment-description');
        descriptionBox.style.display = descriptionBox.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('assignment-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const courseName = document.getElementById('course-name').value;
        const assignmentName = document.getElementById('assignment-name').value;
        const dueDate = document.getElementById('due-date').value;
        const dueTime = document.getElementById('due-time').value;
        const priorityColor = document.getElementById('priority-color').value;

        const assignment = {
            id: `${Date.now()}`, // Unique ID for the calendar event
            title: `${courseName}: ${assignmentName}`,
            start: `${dueDate}T${dueTime}`,
            color: priorityColor,
            description: `Due: ${dueDate} at ${dueTime}`,
        };

        assignments.push(assignment);
        calendar.addEvent(assignment); // Add the assignment as an event to the calendar
        displayAssignments(calendar);
    });

    document.getElementById('sort-assignments').addEventListener('click', function() {
        assignments.sort((a, b) => getColorPriority(a.color) - getColorPriority(b.color));
        displayAssignments(calendar);
    });
}
