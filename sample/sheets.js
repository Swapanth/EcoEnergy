let SHEET_ID = '10S71Uuyyq3lx0S86AK48idE4GyvzyOjkLP0rqmQFWBA';
let SHEET_TITLE = 'Sheet1';
let SHEET_RANGE = 'A1:I'; // Assuming the data starts from row 1
let FULL_URL = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE;
let batchSize = 1000; // Adjust this value as needed
let currentRow = 1;
let totalRows = 0;

let dataContainer = document.getElementById('data-container');

function fetchSheetData() {
  let url = FULL_URL + '&start-index=' + currentRow + '&max-results=' + batchSize;
  fetch(url)
    .then(res => res.text())
    .then(rep => {
      let data = JSON.parse(rep.substr(47).slice(0, -2));
      let length = data.table.rows.length;

      // Print the JSON data to the HTML
      for (let i = 1; i < length; i++) {
        let row = document.createElement('pre');
        row.textContent = JSON.stringify(data.table.rows[i].c, null, 2);
        dataContainer.appendChild(row);
      }

      currentRow += batchSize;
      totalRows += length - 1; // Subtract the header row

      if (totalRows < data.table.rows.length) {
        fetchSheetData();
      }
    });
}

fetch(FULL_URL + '&start-index=1&max-results=1')
  .then(res => res.text())
  .then(rep => {
    let data = JSON.parse(rep.substr(47).slice(0, -2));
    totalRows = data.table.rows.length;
    fetchSheetData();
  });