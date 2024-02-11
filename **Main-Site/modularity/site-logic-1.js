function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

var sound = new Audio("sound.mp3"); // Adjust the path to your alarm sound


// Function to show notifications
function showNotification(title, body) {
  if (Notification.permission === "granted") {
    new Notification(title, { body });
    sound.play(); // Play alarm sound when notification is shown
  } else {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification(title, { body });
        sound.play(); // Play alarm sound after permission is granted
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
    if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Notification permission granted.");
            }
        });
    }

    var calendarEl = document.getElementById('calendar');
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
        eventContent: function(arg) {
            var startTime = new Date(arg.event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            var endTime = new Date(arg.event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            var timeDisplay = startTime + ' - ' + endTime;
            var description = arg.event.extendedProps.description || '';
            var isUrl = description.startsWith('http://') || description.startsWith('https://');
            var contentHtml = isUrl ? `<b>${arg.event.title}</b><br>${timeDisplay}<br><a href="${description}" target="_blank">Link</a>` : `<b>${arg.event.title}</b><br>${timeDisplay}<br>${description}`;
            return { html: contentHtml };
        },
        select: function(arg) {
            var title = prompt('Event Title:');
            if (title) {
                var description = prompt('Event Description:');
                calendar.addEvent({
                    title: title,
                    start: arg.start,
                    end: arg.end,
                    allDay: arg.allDay,
                    description: description
                });

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
            if(confirm('Are you sure you want to delete the selected event?')) {
                arg.event.remove();
            }
        }
    });

    calendar.render();

    document.getElementById('saveEventsBtn').addEventListener('click', function() {
        var events = calendar.getEvents().map(event => ({
            title: event.title,
            start: event.startStr,
            end: event.endStr,
            allDay: event.allDay,
            description: event.extendedProps.description
        }));
        setCookie('savedEvents', JSON.stringify(events), 7);
        alert('Events saved!');
    });

    document.getElementById('loadEventsBtn').addEventListener('click', function() {
        var savedEvents = JSON.parse(getCookie('savedEvents') || '[]');
        calendar.removeAllEvents();
        savedEvents.forEach(function(event) {
            calendar.addEvent(event);
        });
        alert('Events loaded!');
    });
});

// Prompt before leaving/reloading the page
window.addEventListener('beforeunload', function (e) {
    // Cancel the event as stated by the standard.
    e.preventDefault();
    // Chrome requires returnValue to be set.
    e.returnValue = '';
});

function requestAndTestNotification() {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      new Notification("Test Notification", { body: "This is a test notification." });
      // Optionally play sound here as well for the test notification
      sound.play();
    }
  });
}

function showNotification(title, body) {
   if (Notification.permission === "granted") {
    new Notification(title, { body });
  } else {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification(title, { body });
      }
    });
  }
}

function requestAndTestNotification() {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      new Notification("Test Notification", { body: "This is a test notification." });
    }
  });

}