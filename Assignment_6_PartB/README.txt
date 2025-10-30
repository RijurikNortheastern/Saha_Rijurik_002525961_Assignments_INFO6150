Event Stopwatch Web Application

Overview

This project implements an event-based stopwatch using HTML, CSS, JavaScript, and jQuery.
The application allows the user to time activities, associate them with a selected date and event name, and store recorded sessions in localStorage. It includes validation, filtering, pause/resume, and a history view with basic statistics.

Features
Stopwatch Functions

Start, pause, resume, stop, and reset timer

Timer updates every second

Form fields disabled during active timing

Duration displayed in HH:MM:SS format

Session Logging

Event name and date required to start

Saves each session (date, name, duration, seconds) to localStorage

Shows recorded history in reverse order (latest first)

Displays total number of sessions and total time recorded

Validation

Date cannot be empty

Event name must be between 3 and 100 characters

Only letters, numbers, spaces, hyphens, and apostrophes allowed

Inline error messages (no alerts)

Filters

Filter recorded sessions by date

Clear filter option to show all records

Modern JavaScript Techniques

Uses async/await and Promises

Uses setInterval and clearInterval

Uses localStorage for persistent data


How to Run

Open index.html in any modern browser.

Select a date and enter an event name.

Click Start to begin the timer.

Pause/Resume as needed.

Click Stop & Save to store the session.

Check recorded history and use filter options if needed.

Technologies Used

HTML5

CSS3

JavaScript ES6+

jQuery

LocalStorage