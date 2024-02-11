// calendarLogic.js
import { setCookie } from './utils.js';
import { showNotification } from './notifications.js';
import { initAssignments } from './assignments.js';

function loadEventsFromCookies() {
    const events = JSON.parse(getCookie('scheduledClasses') || '[]'); // Assuming the cookie stores an array of events
    events.forEach(event => {
        calendar.addEvent({
            title: event.title,
            start: event.start,
            end: event.end,
            description: event.description || ''
        });
    });
}

// Assuming getCookie is implemented in utils.js
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
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
