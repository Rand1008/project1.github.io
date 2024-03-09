const attendanceBoxes = document.querySelectorAll('.attendance-box');
const infoForm = document.getElementById('infoForm');
const attendanceTableBody = document.getElementById('myTableBody');
let currentBoxId;
let numSubmissions = 0;

attendanceBoxes.forEach((attendanceBox) => {
  attendanceBox.addEventListener('click', () => {
    // Hide all attendance-boxes
    attendanceBoxes.forEach((box) => box.classList.remove('active'));

    // Show the selected attendance-box
    attendanceBox.classList.add('active');
    currentBoxId = attendanceBox.dataset.boxId;
  });
});

infoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const section = document.getElementById('section').value;
  const id = document.getElementById('studid').value;

  const tdAttendanceBox = document.createElement('td');
  const tr = document.createElement('tr');
  const tdStudid = document.createElement('td');
  const tdName = document.createElement('td');
  const tdSection = document.createElement('td');
  const tdDate = document.createElement('td');
  
  tdAttendanceBox.textContent = currentBoxId;
  tdStudid.textContent = id
  tdName.textContent = name;
  tdSection.textContent = section;
  tdDate.textContent = new Date().toLocaleString();
  
  tr.appendChild(tdAttendanceBox);
  tr.appendChild(tdStudid);
  tr.appendChild(tdName);
  tr.appendChild(tdSection);
  tr.appendChild(tdDate);
  
  attendanceTableBody.appendChild(tr);

  const box = document.querySelector(`.attendance-box[data-box-id="${currentBoxId}"]`);
  if (box) {
    box.innerText = `${id} \n ${name} \n ${section}`;
    box.dataset.boxColor = '#ff0000';
    box.style.backgroundColor = '#00FF00';

    const dateTimeElement = document.createElement('p');
    dateTimeElement.textContent = new Date().toLocaleString();
    box.appendChild(dateTimeElement);

    numSubmissions++;
    document.getElementById("submission-count").innerHTML = numSubmissions + " /60 submissions";
  }

  infoForm.style.display = 'none';

  const formData = new FormData(infoForm);
  formData.append("currentDateTime", new Date().toISOString());

  const dateTimeElement = document.getElementById("currentDateTime");
  dateTimeElement.textContent = new Date().toLocaleString();

});

  function resetInfoForm() {
    // Clear the form fields
    const id = document.querySelector('#studid');
    name.value = '';
    
    const name = document.querySelector('#name');
    name.value = '';
  
    const section = document.querySelector('#section');
    section.selectedIndex = 0;

    localStorage.removeItem('submittedData');
  }


  
document.getElementById('infoForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const now = new Date();
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  const timeString = now.toLocaleTimeString('en-US', options);

  document.getElementById('timeBox').textContent = timeString;
});

const boxes = document.querySelectorAll('.attendance-box');
boxes.forEach(box => {
  box.addEventListener('click', () => {
    currentBoxId = box.dataset.boxId;
    infoForm.style.display = 'block';
  });
});

const attendanceContainer = document.getElementById('attendance-container');
const numRows = 2;
const numBoxesPerRow = 10;

for (let i = 0; i < numRows; i++) {
  const row = document.createElement('div');
  row.className = 'attendance-container';

  for (let j = 0; j < numBoxesPerRow; j++) {
    const box = document.createElement('div');
    box.className = 'attendance-box attendance-box-unchecked';
    box.id = 'box-' + (i * numBoxesPerRow + j + 1);
    box.textContent = i * numBoxesPerRow + j + 1;
    box.dataset.boxId = i * numBoxesPerRow + j + 1;
    row.appendChild(box);
  }

  attendanceContainer.appendChild(row);
}
function hideInfoForm() {
  infoForm.style.display = 'none';
}

const submissionCount = document.getElementById("submission-count");
submissionCount.innerHTML = 0 + " /60 submissions";
submissionCount.style.position = 'absolute';
submissionCount.style.top = '10px';
submissionCount.style.left = '10px';
submissionCount.style.backgroundColor = '#f2f2f2';
submissionCount.style.padding = '10px';
submissionCount.style.borderRadius = '5px';

function sortTable() {
  const sortSelect = document.querySelector('#sort-select');
  const sortType = sortSelect.value;

  if (!sortType) {
    alert('Please select a sort type.');
    return;
}

  const table = document.querySelector('#attendanceTable tbody');
  const rows = Array.from(table.rows);


  function customSort(a, b) {
    const aValues = a.cells[sortType].innerText;
    const bValues = b.cells[sortType].innerText;
  
    if (sortType === '0') {
      const aNumbers = Array.from(aValues.matchAll(/\d+/g)).map(match => parseInt(match[0]));
      const bNumbers = Array.from(bValues.matchAll(/\d+/g)).map(match => parseInt(match[0]));
  
      for (let i = 0; i < aNumbers.length; i++) {
        if (aNumbers[i] < bNumbers[i]) {
          return -1;
        } else if (aNumbers[i] > bNumbers[i]) {
          return 1;
        }
      }
  
      return 0;
    } else {
      return aValues.localeCompare(bValues);
    }
  }
if (sortType === '0') {
    rows.sort(customSort);
} else if (sortType === '1') {
    rows.sort((a, b) => customSort(a, b) || a.cells[1].innerText.localeCompare(b.cells[1].innerText));
} else if (sortType === '2') {
    rows.sort((a, b) => customSort(a, b) || new Date(a.cells[4].innerText) - new Date(b.cells[4].innerText));
}

table.innerHTML = '';
rows.forEach(row => table.appendChild(row));
}



  