// Global array to store attendance records (each record is an object with date and members)
let attendanceRecords = JSON.parse(localStorage.getItem("attendanceRecords")) || [];

// When the DOM is loaded, bind form events and update the display
document.addEventListener("DOMContentLoaded", () => {
  const checkInForm = document.getElementById("checkInForm");
  checkInForm.addEventListener("submit", handleCheckIn);

  // Update display on initial load
  renderTodayAttendance();
  displayDayMessage();
});

/* Handle check-in when a user submits their name.*/
function handleCheckIn(event) {
  event.preventDefault(); // Prevent page reload on form submission

  const nameInput = document.getElementById("memberName");
  const memberName = nameInput.value.trim();

  // Validate name input
  if (!memberName) {
    alert("Please enter your name.");
    return;
  }

  const now = new Date();

  // Check if today is Sunday (0 represents Sunday)
  if (now.getDay() !== 0) {
    alert("Today is not Sunday. Attendance check is only available on Sundays.");
    return;
  }

  // Get today's date string in YYYY-MM-DD format
  const todayString = formatDate(now);

  // Find today's attendance record in the array
  let todayRecord = attendanceRecords.find(record => record.date === todayString);
  if (!todayRecord) {
    todayRecord = { date: todayString, members: [] };
    attendanceRecords.push(todayRecord);
  }

  // Check for duplicate check-in
  if (todayRecord.members.includes(memberName)) {
    alert(`${memberName}, you have already checked in today.`);
  } else {
    todayRecord.members.push(memberName);
    localStorage.setItem("attendanceRecords", JSON.stringify(attendanceRecords));
    alert(`${memberName}, your check-in is complete.`);
  }

  // Clear the input and update display
  nameInput.value = "";
  renderTodayAttendance();
}

/* Render today's attendance list. */
function renderTodayAttendance() {
  const todayAttendanceDiv = document.getElementById("todayAttendance");
  todayAttendanceDiv.innerHTML = "";

  const now = new Date();
  const todayString = formatDate(now);

  // If today is not Sunday, display a message
  if (now.getDay() !== 0) {
    todayAttendanceDiv.innerHTML = "<p>Today is not Sunday.</p>";
    return;
  }

  // Find today's attendance record
  const todayRecord = attendanceRecords.find(record => record.date === todayString);
  if (!todayRecord || todayRecord.members.length === 0) {
    todayAttendanceDiv.innerHTML = "<p>No attendance recorded yet.</p>";
    return;
  }

  // Create a list of members using a for loop
  const ul = document.createElement("ul");
  for (let i = 0; i < todayRecord.members.length; i++) {
    const li = document.createElement("li");
    li.textContent = todayRecord.members[i];
    ul.appendChild(li);
  }
  todayAttendanceDiv.appendChild(ul);
}
