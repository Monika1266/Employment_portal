// JavaScript code to fetch and filter data from governmentjobs.csv

// Function to fetch CSV data
function fetchCSV() {
    fetch('government_jobs_dataset.csv')
      .then(response => response.text())
      .then(data => processData(data));
  }
  
  // Function to process CSV data
  function processData(csvData) {
    const rows = csvData.split('\n').slice(1);
    const jobsContainer = document.getElementById('jobs-container');
    jobsContainer.innerHTML = '';
  
    rows.forEach(row => {
      const [jobTitle, department, qualification, exam, salary] = row.split(',');
      const jobCard = document.createElement('div');
      jobCard.classList.add('job-card');
      jobCard.innerHTML = `
        <h3>${jobTitle}</h3>
        <p><strong>Department:</strong> ${department}</p>
        <p><strong>Qualification Required:</strong> ${qualification}</p>
        <p><strong>Exam Required:</strong> ${exam}</p>
        <p><strong>Salary:</strong> ${salary}</p>
      `;
      jobsContainer.appendChild(jobCard);
    });
  }
  
  // Function to filter data based on job title and salary
  function filterData() {
    const jobTitleFilter = document.getElementById('job-title-filter').value.toLowerCase();
    const salaryFilter = parseInt(document.getElementById('salary-filter').value);
  
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
      const jobTitle = card.querySelector('h3').textContent.toLowerCase();
      const salary = parseInt(card.querySelector('p:nth-child(5)').textContent.split(':')[1]);
      if (jobTitle.includes(jobTitleFilter) && (!salaryFilter || salary >= salaryFilter)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  // Event listeners
  document.addEventListener('DOMContentLoaded', fetchCSV);
  document.getElementById('job-title-filter').addEventListener('input', filterData);
  document.getElementById('salary-filter').addEventListener('input', filterData);
  