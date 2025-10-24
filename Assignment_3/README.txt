Overview

This project is a dynamic data management web application built with HTML5, CSS3, and JavaScript
to showcase interactive table functionality, DOM manipulation, and event-driven programming for
Rijurik Saha — MS in Information Systems student at Northeastern University.
It demonstrates proper use of semantic HTML elements, JavaScript event handling,
responsive CSS design, and modern web development practices.

HTML Tags Used and Short Description

div-Container for header info, table container, and button sections.
h1, h3-Main heading and modal title heading.
p-Paragraph elements for name and NUID display.
span-Inline containers for dynamic text content.
table-Main data structure for student records.
thead-Table header section with column titles.
tbody-Table body containing student data rows.
tr-Table rows for data and details.
th, td-Table header and data cells.
input-Checkbox for row selection and text input for editing.
button-Action buttons for submit, add, delete, and edit functions.
img-Arrow icon for expand/collapse functionality.
form-(Conceptually for modal, though not explicitly used).

CSS Features

Flexbox layout for button containers and centering.
Table styling with borders, padding, and collapse structure.
Dynamic row highlighting with yellow background on selection.
Button state changes (gray disabled to orange enabled).
Modal overlay with centered dialog box.
Popup notifications with slide-in animation.
Hover effects on buttons with color transitions.
Expandable detail rows with display toggle.


JavaScript Features

Event-driven architecture with onclick and onchange handlers.
DOM manipulation using getElementById and querySelector.
Dynamic HTML generation with template literals.
State management for checkboxes and button states.
Array methods for finding available student numbers.
Modal dialog handling for edit functionality.
Popup notifications with auto-dismiss timers.
Row expansion/collapse with class toggling.


Interactive Functionality
Checkbox Selection-Highlights row in yellow, shows action buttons.
Add Student-Creates new records with sequential numbering.
Delete Student-Removes selected record with confirmation.
Edit Student-Opens modal for editing student details.
Expand/Collapse-Arrow toggles detailed view of student info.
Submit Button-Enables when rows selected, turns orange.

File Structure
index.html-Main HTML with hardcoded initial 3 students.
styles.css-Complete styling and visual effects.
script.js-JavaScript functionality and event handlers.
arrow.png-Green arrow icon for expand/collapse.
README.md-Project documentation.


Responsive Design
Desktop-Full table width with all columns visible.
Tablet-Table maintains structure with scroll if needed.
Mobile-Horizontal scroll for table preservation.

Key Functions
handleCheckboxChange()-Manages row selection and button visibility.
updateSubmitButton()-Controls submit button state.
toggleDetails()-Expands/collapses student details.
addNewStudent()-Creates new student records.
deleteStudent()-Removes selected students.
editStudent()-Opens edit modal.
showPopup()-Displays notifications.

Credits and Declaration
Developed by: Rijurik Saha
NUID: 002525961
Institution: Northeastern University
Technologies: HTML5, CSS3, JavaScript

End of File