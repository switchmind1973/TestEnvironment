// Update the clock every second
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();
    document.getElementById('clock').textContent = timeString;
    document.getElementById('date').textContent = dateString;
  }
  setInterval(updateTime, 1000);
  
  // Log in function
async function login() {
  const employeeId = document.getElementById('employeeId').value;
  if (!employeeId) {
      alert("Please enter your Employee ID.");
      return;
  }

  try {
      // Fetch employee data from Google Sheets
      const response = await fetch('https://script.google.com/macros/s/AKfycbxox5GEWtCGmXhss01iHzZYTTlcliaqfku3xKPs2tteUbis16C8PTPEYvClnaOS_SWnlA/exec?action=getEmployees');
      const employees = await response.json();

      // Check if the employee ID exists in the fetched data
      const employeeExists = employees.some(employee => employee.employeeNo === employeeId);

      if (employeeExists) {
          document.getElementById('loginSection').classList.add('hidden');
          document.getElementById('timeSection').classList.remove('hidden');
      } else {
          alert("Employee ID not found. Please enter a valid Employee ID.");
      }
  } catch (error) {
      console.error("Error fetching employee data:", error);
      alert("Failed to fetch employee data. Please try again.");
  }
}
  
  // Log out function
  function logout() {
    document.getElementById('timeSection').classList.add('hidden');
    document.getElementById('loginSection').classList.remove('hidden');
  }
  
  // Show overtime form
  function showOvertimeForm() {
    document.getElementById('timeSection').classList.add('hidden');
    document.getElementById('overtimeSection').classList.remove('hidden');
  }
  
  // Hide overtime form
  function hideOvertimeForm() {
    document.getElementById('overtimeSection').classList.add('hidden');
    document.getElementById('timeSection').classList.remove('hidden');
  }
  
  // Submit overtime reason
  function submitOvertime() {
    const reason = document.getElementById('overtimeReason').value;
    if (!reason) {
      alert("Please enter a reason for overtime.");
      return;
    }
  
    const employeeId = document.getElementById('employeeId').value;
  
    fetch('https://script.google.com/macros/s/AKfycbxox5GEWtCGmXhss01iHzZYTTlcliaqfku3xKPs2tteUbis16C8PTPEYvClnaOS_SWnlA/exec', {
      method: 'POST',
      body: JSON.stringify({ employeeId: employeeId, reason: reason }),
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors'
    })
      .then(() => {
        alert("Overtime request submitted!");
        hideOvertimeForm();
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Failed to submit overtime request.");
      });
  }
  
  // Time in function
  function timeIn() {
    const employeeId = document.getElementById('employeeId').value;
  
    fetch('https://script.google.com/macros/s/AKfycbxox5GEWtCGmXhss01iHzZYTTlcliaqfku3xKPs2tteUbis16C8PTPEYvClnaOS_SWnlA/exec', {
      method: 'POST',
      body: JSON.stringify({ employeeId: employeeId, action: 'in' }),
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors'
    })
      .then(() => {
        alert("Time In recorded!");
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Failed to record Time In.");
      });
  }
  
  // Time out function
  function timeOut() {
    const employeeId = document.getElementById('employeeId').value;
  
    fetch('https://script.google.com/macros/s/AKfycbxox5GEWtCGmXhss01iHzZYTTlcliaqfku3xKPs2tteUbis16C8PTPEYvClnaOS_SWnlA/exec', {
      method: 'POST',
      body: JSON.stringify({ employeeId: employeeId, action: 'out' }),
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors'
    })
      .then(() => {
        alert("Time Out recorded!");
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Failed to record Time Out.");
      });
  }