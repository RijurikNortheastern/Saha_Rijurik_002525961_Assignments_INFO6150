// Global Variables
let currentEditStudent = null;


document.addEventListener('DOMContentLoaded', function() {
    // Set your name and NUID
    document.getElementById('fullName');
    document.getElementById('nuid');
    
    // Add event listener to Add Student button
    document.getElementById('addStudentBtn').addEventListener('click', addNewStudent);
});

// ============================================
// CHECKBOX HANDLING
// ============================================

function handleCheckboxChange(studentId) {
    const checkbox = document.getElementById(`checkbox-${studentId}`);
    const row = document.getElementById(`row-${studentId}`);
    const deleteCell = document.getElementById(`delete-${studentId}`);
    const editCell = document.getElementById(`edit-${studentId}`);
    
    if (checkbox.checked) {
        // Add yellow background
        row.classList.add('selected');
        
        // Add Delete and Edit buttons
        deleteCell.innerHTML = `<button class="delete-btn" onclick="deleteStudent(${studentId})">Delete</button>`;
        editCell.innerHTML = `<button class="edit-btn" onclick="editStudent(${studentId})">Edit</button>`;
    } else {
        // Remove yellow background
        row.classList.remove('selected');
        
        // Remove Delete and Edit buttons
        deleteCell.innerHTML = '';
        editCell.innerHTML = '';
    }
    
    // Update submit button state
    updateSubmitButton();
}

// ============================================
// SUBMIT BUTTON UPDATE
// ============================================

function updateSubmitButton() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const submitBtn = document.getElementById('submitBtn');
    let anyChecked = false;
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            anyChecked = true;
        }
    });
    
    if (anyChecked) {
        submitBtn.classList.add('enabled');
        submitBtn.disabled = false;
    } else {
        submitBtn.classList.remove('enabled');
        submitBtn.disabled = true;
    }
}

// ============================================
// TOGGLE DETAILS (EXPAND/COLLAPSE)
// ============================================

function toggleDetails(studentId) {
    const detailsRow = document.getElementById(`details-${studentId}`);
    const arrow = document.getElementById(`arrow-${studentId}`);
    
    // Toggle expanded class on details row
    if (detailsRow.classList.contains('expanded')) {
        detailsRow.classList.remove('expanded');
        arrow.style.transform = 'rotate(0deg)';
    } else {
        detailsRow.classList.add('expanded');
        arrow.style.transform = 'rotate(90deg)';
    }
}

// ============================================
// ADD NEW STUDENT
// ============================================

function addNewStudent() {
    try {
        // Find all existing student rows
        const existingRows = document.querySelectorAll('tbody tr[id^="row-"]');
        const existingNumbers = [];
        
        existingRows.forEach(row => {
            const studentCell = row.querySelector('td:nth-child(3)');
            if (studentCell) {
                const match = studentCell.textContent.match(/Student (\d+)/);
                if (match) {
                    existingNumbers.push(parseInt(match[1]));
                }
            }
        });
        
        // Find the next available number
        let nextNumber = 1;
        while (existingNumbers.includes(nextNumber)) {
            nextNumber++;
        }
        
        // Create unique ID for this student
        const studentId = Date.now();
        
        // Create the new row HTML
        const newRowHTML = `
            <tr id="row-${studentId}">
                <td class="checkbox-cell">
                    <input type="checkbox" id="checkbox-${studentId}" onchange="handleCheckboxChange(${studentId})">
                </td>
                <td class="arrow-cell">
                    <img src="arrow.png" class="arrow" id="arrow-${studentId}" onclick="toggleDetails(${studentId})" alt="expand">
                </td>
                <td>Student ${nextNumber}</td>
                <td>Teacher ${nextNumber}</td>
                <td>Approved</td>
                <td>Fall</td>
                <td>TA</td>
                <td>${nextNumber}2345</td>
                <td>100%</td>
                <td id="delete-${studentId}"></td>
                <td id="edit-${studentId}"></td>
            </tr>
            <tr id="details-${studentId}" class="details-row">
                <td colspan="11" class="details-cell">
                    <strong>Student ${nextNumber} Details:</strong><br><br>
                    Award Details: Honors Student<br>
                    Fall 1-2024(TA)<br>
                    Comments: Outstanding<br>
                    Award Status: A
                </td>
            </tr>
        `;
        
        // Add the new rows to the table
        document.getElementById('tableBody').insertAdjacentHTML('beforeend', newRowHTML);
        
        // Show success message
        showPopup(`Student ${nextNumber} Record added successfully`, 'success');
    } catch (error) {
        showPopup('Error adding student record', 'error');
    }
}

// ============================================
// DELETE STUDENT
// ============================================

function deleteStudent(studentId) {
    const row = document.getElementById(`row-${studentId}`);
    const detailsRow = document.getElementById(`details-${studentId}`);
    const studentName = row.querySelector('td:nth-child(3)').textContent;
    
    // Remove both rows
    row.remove();
    detailsRow.remove();
    
    // Show success message
    showPopup(`${studentName} Record deleted successfully`, 'success');
    
    // Update submit button state
    updateSubmitButton();
}

// ============================================
// EDIT STUDENT
// ============================================

function editStudent(studentId) {
    const row = document.getElementById(`row-${studentId}`);
    const studentName = row.querySelector('td:nth-child(3)').textContent;
    
    currentEditStudent = studentName;
    document.getElementById('modalTitle').textContent = `Edit details of ${studentName}`;
    document.getElementById('modalInput').value = '';
    document.getElementById('editModal').style.display = 'block';
}

function cancelEdit() {
    document.getElementById('editModal').style.display = 'none';
    document.getElementById('modalInput').value = '';
    currentEditStudent = null;
}

function confirmEdit() {
    const inputValue = document.getElementById('modalInput').value;
    
    if (inputValue.trim()) {
        showPopup(`${currentEditStudent} data updated successfully`, 'success');
    }
    
    cancelEdit();
}

// ============================================
// POPUP NOTIFICATIONS
// ============================================

function showPopup(message, type) {
    const popup = document.createElement('div');
    popup.className = `popup ${type}`;
    popup.textContent = message;
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 3000);
}

// ============================================
// MODAL CLOSE ON OUTSIDE CLICK
// ============================================

window.onclick = function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
        cancelEdit();
    }
}