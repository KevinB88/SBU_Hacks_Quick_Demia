// calendarLogic.js
import { setCookie } from './utils.js';
import { showNotification } from './notifications.js';
import { initAssignments } from './assignments.js';


document.getElementById('suggestStudyTime').addEventListener('click', function() {
    var generationScope = prompt('Generate for (day/week):', 'day');
    suggestStudyTimes(generationScope);
});

function suggestStudyTimes(scope) {
    var events = calendar.getEvents();
    var suggestions = [];
    var currentDate = new Date();
    var endDate = new Date();

    if (scope === 'week') {
        endDate.setDate(currentDate.getDate() + 7); // Set to one week from now
    } else {
        endDate.setDate(currentDate.getDate() + 1); // Only consider today for 'day' scope
    }

    // Convert events to a more manageable format
    var eventTimes = events.map(event => ({
        start: new Date(event.start),
        end: new Date(event.end)
    }));

    // Loop through each day in the scope
    for (var d = currentDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        var dayStart = new Date(d.setHours(7, 0, 0, 0)); // 7 AM
        var dayEnd = new Date(d.setHours(23, 0, 0, 0)); // 11 PM
        var freeSlots = findFreeSlots(dayStart, dayEnd, eventTimes);

        // Prioritize days with no events at all
        if (freeSlots.length > 0 && freeSlots.some(slot => slot.fullDay)) {
            suggestions.push({
                date: new Date(d),
                slots: freeSlots
            });
        } else if (freeSlots.length > 0) {
            suggestions.push({
                date: new Date(d),
                slots: freeSlots
            });
        }
    }

    // Present suggestions to the user
    presentStudyTimeSuggestions(suggestions);
}


   function findFreeSlots(dayStart, dayEnd, eventTimes) {
    // Ensure events are sorted by start time
    eventTimes.sort((a, b) => a.start - b.start);

    let freeSlots = [];
    let searchStart = dayStart;

    // Iterate through each event to find gaps
    for (let i = 0; i < eventTimes.length; i++) {
        const event = eventTimes[i];

        // If there is a gap between the search start and the event start, add it as a free slot
        if (searchStart < event.start) {
            freeSlots.push({start: new Date(searchStart), end: new Date(event.start)});
        }

        // Update searchStart to the end of the current event, if it's later than the current searchStart
        searchStart = event.end > searchStart ? event.end : searchStart;
    }

    // After checking all events, check if there's time left in the day for a final slot
    if (searchStart < dayEnd) {
        freeSlots.push({start: new Date(searchStart), end: new Date(dayEnd)});
    }

    return freeSlots.map(slot => ({
        start: slot.start.toISOString(),
        end: slot.end.toISOString()
    }));
}



   function presentStudyTimeSuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('suggestions-list');
    // Clear previous suggestions
    suggestionsContainer.innerHTML = '';

    if (suggestions.length === 0) {
        suggestionsContainer.innerHTML = '<p>No study time suggestions available.</p>';
        return;
    }

    // Create a list element to hold the suggestions
    const list = document.createElement('ul');

    // Generate list items for each suggestion
    suggestions.forEach(suggestion => {
        suggestion.slots.forEach(slot => {
            const item = document.createElement('li');
            const startDate = new Date(slot.start);
            const endDate = new Date(slot.end);
            const startStr = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const endStr = endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const dateStr = startDate.toLocaleDateString();

            item.textContent = `Study time on ${dateStr} from ${startStr} to ${endStr}`;
            list.appendChild(item);
        });
    });

    // Append the list of suggestions to the container
    suggestionsContainer.appendChild(list);
}




document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var selectedEvent = null;

    var calendar = new FullCalendar.Calendar(calendarEl, {

      headerToolbar: {
      left: 'prev,next,today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialDate: new Date().toISOString().slice(0, 10),
    navLinks: true,
    selectable: true,
    selectMirror: true,
    slotDuration: '00:15:00',
    slotLabelInterval: '01:00',
    editable: true,
    dayMaxEvents: true,
    events: [],
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
     eventContent: function(arg) {
      var startTime = arg.event.startStr.substring(11, 16);
      var endTime = arg.event.endStr.substring(11, 16);
      var timeDisplay = startTime + ' - ' + endTime;

      var description = arg.event.extendedProps.description || '';
      var isUrl = description.startsWith('http://') || description.startsWith('https://');
      var contentHtml;

      if (isUrl) {
        contentHtml = `
          <b>${arg.event.title}</b><br>
          ${timeDisplay}<br>
          <a href="${description}" target="_blank">Link</a>
        `;
      } else {
        contentHtml = `
          <b>${arg.event.title}</b><br>
          ${timeDisplay}<br>
          ${description}
        `;
      }

      return { html: contentHtml };
    },
    select: function(arg) {
      var title = prompt('Event Title:');
      if (title) {
        var description = prompt('Event Description:');
        var event = {
          title: title,
          start: arg.startStr,
          end: arg.endStr,
          allDay: arg.allDay,
          description: description,
        };
        calendar.addEvent(event);
        setCookie('lastSelectedEvent', title, 7); // Save the event title as a cookie

        var now = new Date();
        var start = new Date(arg.start);
        var delay = start.getTime() - now.getTime();

        if (delay > 0) {
          setTimeout(() => {
            showNotification('Event Starting', title + ' is starting now.');
          }, delay);
              }
      }
      calendar.unselect();
    },
    eventClick: function(arg) {
      selectedEvent = arg.event;
      alert('Event selected. Click the delete button to remove this event.');
    }
   });

    calendar.render();

    initAssignments(calendar);

    document.getElementById('deleteEvent').addEventListener('click', function() {

        if (selectedEvent) {
            if (confirm('Are you sure you want to delete the selected event?')) {
                selectedEvent.remove();
                selectedEvent = null;
            }
        } else {
            alert('Please select an event to delete.');
        }
    });
});
