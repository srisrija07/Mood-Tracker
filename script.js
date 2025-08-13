const form = document.getElementById('mood-form');
const moodSelect = document.getElementById('mood');
const noteInput = document.getElementById('note');
const historyList = document.getElementById('mood-history');

// Load saved moods from localStorage when the page loads
window.onload = function () {
  const entries = JSON.parse(localStorage.getItem('moodLogs')) || [];
  historyList.innerHTML = ''; // clear before loading again
  entries.forEach((entry, index) => displayEntry(entry, index));
};

// Save mood when form is submitted
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const mood = moodSelect.value;
  const note = noteInput.value.trim();
  const date = new Date().toLocaleDateString();

  if (!mood) {
    alert('Please select a mood!');
    return;
  }

  const entry = { mood, note, date };

  // Get existing logs or initialize
  const moodLogs = JSON.parse(localStorage.getItem('moodLogs')) || [];

  // Add new entry to the beginning
  moodLogs.unshift(entry);

  // Save updated logs to localStorage
  localStorage.setItem('moodLogs', JSON.stringify(moodLogs));

  // Show on page
  displayEntry(entry, 0); // New entry is at index 0

  // Reset form
  form.reset();
});

// Function to display one mood entry
function displayEntry(entry, index) {
  const li = document.createElement('li');
  li.innerHTML = `
    <strong>${entry.date}</strong>: ${entry.mood}
    <button class="delete-btn" onclick="deleteEntry(${index})">❌</button>
    <br><em>${entry.note}</em>
  `;
  historyList.appendChild(li);
}

// Function to delete a mood entry
function deleteEntry(index) {
  let moodLogs = JSON.parse(localStorage.getItem('moodLogs')) || [];
  moodLogs.splice(index, 1);
  localStorage.setItem('moodLogs', JSON.stringify(moodLogs));
  reloadHistory();
}

// Reload the history list after delete
function reloadHistory() {
  const entries = JSON.parse(localStorage.getItem('moodLogs')) || [];
  historyList.innerHTML = '';
  entries.forEach((entry, index) => displayEntry(entry, index));
}
