document.querySelector('.close-button').addEventListener('click', function() {
  document.querySelector('.modal').style.display = 'none';
});

//another thing
const modeToggle = document.getElementById('modeToggle');
modeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode'); // Toggle dark mode class on body
});


// Add event listeners for social buttons if needed

/*
  adding stuff:   git add .
  specific file:  git add filename.whatever

  git commit -m "message"

  git push



*/