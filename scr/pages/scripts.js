//load
let SPREADSHEET_ID = "1FSYDSZ2zKpqO1Px5UwO1J64WXyA8DQil";
let SHEET_NAME = "Sheet1";
let RANGE = "A1:H"; // Updated range
let SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?sheet=${SHEET_NAME}&range=${RANGE}`;

console.log(SPREADSHEET_URL);

fetch(SPREADSHEET_URL)
    .then(res => res.text())
    .then(rep => {
        let data = JSON.parse(rep.substr(47).slice(0, -2));
        let rows = data.table.rows;
        let hourlyData = {};
        for (let i = 1; i < rows.length; i++) {
            let timeStr = rows[i].c[0].f;
            let hour = parseInt(timeStr.split(':')[0]);
            let value2 = parseFloat(rows[i].c[1].f);

            if (!hourlyData[hour]) {
                hourlyData[hour] = { count: 0, total2: 0 };
            }

            hourlyData[hour].count++;
            hourlyData[hour].total2 += value2;
        }

        // Calculate the average for each hour
        let labels = [];
        let data2 = [];
        for (let hour in hourlyData) {
            let hourInSeconds = parseInt(hour); // Convert hour from string to integer
            let hourIn24Format = new Date(hourInSeconds * 1000).toISOString().substr(11, 5); // Convert seconds to milliseconds, then to 24-hour format
            labels.push(hourIn24Format);
            data2.push(hourlyData[hour].total2 / hourlyData[hour].count); // Corrected to use total2 instead of total1
        }
  
        // Create the chart
        let ctx = document.getElementById('chart-voltage').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Load',
                    data: data2,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Time in Hours',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Load in MW',
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    });

//current

fetch(SPREADSHEET_URL)
.then(res => res.text())
.then(rep => {
  let data = JSON.parse(rep.substr(47).slice(0, -2));
  let rows = data.table.rows;

  // Group the data by hour and calculate the average for each hour
  let hourlyData = {};
  for (let i = 1; i < rows.length; i++) {
      let timeStr = rows[i].c[0].f;
      let hour = parseInt(timeStr.split(':')[0]);
      let value1 = parseFloat(rows[i].c[2].f);

      if (!hourlyData[hour]) {
          hourlyData[hour] = { count: 0, total1: 0 };
      }

      hourlyData[hour].count++;
      hourlyData[hour].total1 += value1;
  }

  // Calculate the average for each hour
  let labels = [];
let data1 = [];
for (let hour in hourlyData) {
    let hourInSeconds = parseInt(hour); // Convert hour from string to integer
    let hourIn24Format = new Date(hourInSeconds * 1000).toISOString().substr(11, 5); // Convert seconds to milliseconds, then to 24-hour format
    labels.push(hourIn24Format);
    data1.push(hourlyData[hour].total1 / hourlyData[hour].count);
}

  // Create the chart
  let ctx = document.getElementById('chart-current').getContext('2d');
  new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: 'Total power',
              data: data1,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time in Hours',
                },
            },
              y: {
                title: {
                    display: true,
                    text: 'Power in MW',
                },
                  beginAtZero: true
              }
          }
      }
  });
});
//
fetch(SPREADSHEET_URL)
.then(res => res.text())
.then(rep => {
  let data = JSON.parse(rep.substr(47).slice(0, -2));
  let rows = data.table.rows;

  // Group the data by hour and calculate the average for each hour
  let hourlyData = {};
  for (let i = 1; i < rows.length; i++) {
      let timeStr = rows[i].c[0].f;
      let hour = parseInt(timeStr.split(':')[0]);
      let value4 = parseFloat(rows[i].c[3].f);

      if (!hourlyData[hour]) {
          hourlyData[hour] = { count: 0, total4: 0 };
      }

      hourlyData[hour].count++;
      hourlyData[hour].total4 += value4;
  }
  let labels = [];
  let data4 = [];
  for (let hour in hourlyData) {
      let hourInSeconds = parseInt(hour); // Convert hour from string to integer (assumed to be in seconds)
      let hourInHours = Math.floor(hourInSeconds / 3600); // Convert seconds to hours
      let hourInMinutes = Math.floor((hourInSeconds % 3600) / 60); // Convert remaining seconds to minutes
      let formattedHour = `${hourInHours < 10 ? '0' + hourInHours : hourInHours}:${hourInMinutes < 10 ? '0' + hourInMinutes : hourInMinutes}`;
      labels.push(formattedHour);
      data4.push(hourlyData[hour].total4 / hourlyData[hour].count);
  }
  let ctx = document.getElementById('chart-power').getContext('2d');
  new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: 'Diesel',
              data: data4,
              backgroundColor: 'rgba(153, 102, 150, 0.2)',
              borderColor: 'rgba(153, 102, 150, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time in Hours',
                },
            },
              y: {
                title: {
                    display: true,
                    text: 'Power in MW',
                },
                  beginAtZero: true
              }
          }
      }
  });
});

// Energy

fetch(SPREADSHEET_URL)
.then(res => res.text())
.then(rep => {
  let data = JSON.parse(rep.substr(47).slice(0, -2));
  let rows = data.table.rows;

  // Group the data by hour and calculate the average for each hour
  let hourlyData = {};
  for (let i = 1; i < rows.length; i++) {
      let timeStr = rows[i].c[0].f;
      let hour = parseInt(timeStr.split(':')[0]);
      let value4 = parseFloat(rows[i].c[4].f);

      if (!hourlyData[hour]) {
          hourlyData[hour] = { count: 0, total4: 0 };
      }

      hourlyData[hour].count++;
      hourlyData[hour].total4 += value4;
  }
  let labels = [];
  let data4 = [];
  for (let hour in hourlyData) {
      let hourInSeconds = parseInt(hour); // Convert hour from string to integer (assumed to be in seconds)
      let hourInHours = Math.floor(hourInSeconds / 3600); // Convert seconds to hours
      let hourInMinutes = Math.floor((hourInSeconds % 3600) / 60); // Convert remaining seconds to minutes
      let formattedHour = `${hourInHours < 10 ? '0' + hourInHours : hourInHours}:${hourInMinutes < 10 ? '0' + hourInMinutes : hourInMinutes}`;
      labels.push(formattedHour);
      data4.push(hourlyData[hour].total4 / hourlyData[hour].count);
  }
  let ctx = document.getElementById('chart-energy').getContext('2d');
  new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: 'Solar',
              data: data4,
              backgroundColor: 'rgba(153, 102, 150, 0.2)',
              borderColor: 'rgba(153, 102, 150, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time in Hours',
                },
            },
              y: {
                title: {
                    display: true,
                    text: 'Power in MW',
                },
                  beginAtZero: true
              }
          }
      }
  });
});

// Temperature
fetch(SPREADSHEET_URL)
.then(res => res.text())
.then(rep => {
  let data = JSON.parse(rep.substr(47).slice(0, -2));
  let rows = data.table.rows;

  // Group the data by hour and calculate the average for each hour
  let hourlyData = {};
  for (let i = 1; i < rows.length; i++) {
      let timeStr = rows[i].c[0].f;
      let hour = parseInt(timeStr.split(':')[0]);
      let valueSecondLast = parseFloat(rows[i].c[5].f); // Fetch the second last column data

      if (!hourlyData[hour]) {
          hourlyData[hour] = { count: 0, totalSecondLast: 0 };
      }

      hourlyData[hour].count++;
      hourlyData[hour].totalSecondLast += valueSecondLast;
  }

  // Calculate the average for each hour
  let labels = [];
  let dataSecondLast = [];
  for (let hour in hourlyData) {
      let hourInSeconds = parseInt(hour); // Convert hour from string to integer (assumed to be in seconds)
      let hourInHours = Math.floor(hourInSeconds / 3600); // Convert seconds to hours
      let hourInMinutes = Math.floor((hourInSeconds % 3600) / 60); // Convert remaining seconds to minutes
      let formattedHour = `${hourInHours < 10 ? '0' + hourInHours : hourInHours}:${hourInMinutes < 10 ? '0' + hourInMinutes : hourInMinutes}`;
      labels.push(formattedHour);
      dataSecondLast.push(hourlyData[hour].totalSecondLast / hourlyData[hour].count);
  }

  // Create the chart
  let ctx = document.getElementById('chart-temperature').getContext('2d');
  new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: 'Wind',
              data: dataSecondLast,
              backgroundColor: 'rgba(111, 75, 192, 0.2)',
              borderColor: 'rgba(111, 75, 192, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
            x:
            {
                title: {
                    display: true,
                    text: 'Time in Hours',
                },
            },
              y: {
                title: {
                    display: true,
                    text: 'Power in MW',
                },
                  beginAtZero: true
              }
          }
      }
  });
});
// Humidity
fetch(SPREADSHEET_URL)
.then(res => res.text())
.then(rep => {
  let data = JSON.parse(rep.substr(47).slice(0, -2));
  let rows = data.table.rows;

  // Group the data by hour and calculate the average for each hour
  let hourlyData = {};
  for (let i = 1; i < rows.length; i++) {
      let timeStr = rows[i].c[0].f;
      let hour = parseInt(timeStr.split(':')[0]);
      let valueLast = parseFloat(rows[i].c[6].f); // Fetch the last column data

      if (!hourlyData[hour]) {
          hourlyData[hour] = { count: 0, totalLast: 0 };
      }

      hourlyData[hour].count++;
      hourlyData[hour].totalLast += valueLast;
  }

  // Calculate the average for each hour
// Calculate the average for each hour
let labels = [];
let dataLast = [];
for (let hour in hourlyData) {
    let hourInSeconds = parseInt(hour); // Convert hour from string to integer (assumed to be in seconds)
    let hourInHours = Math.floor(hourInSeconds / 3600); // Convert seconds to hours
    let hourInMinutes = Math.floor((hourInSeconds % 3600) / 60); // Convert remaining seconds to minutes
    let formattedHour = `${hourInHours < 10 ? '0' + hourInHours : hourInHours}:${hourInMinutes < 10 ? '0' + hourInMinutes : hourInMinutes}`;
    labels.push(formattedHour);
    dataLast.push(hourlyData[hour].totalLast / hourlyData[hour].count);
}
  // Create the chart
  let ctx = document.getElementById('chart-humidity').getContext('2d');
  new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: 'Reserved Power',
              data: dataLast,
              backgroundColor: 'rgba(255, 159, 64, 0.2)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
            x:
            {
                title: {
                    display: true,
                    text: 'Time in Hours',
                },
            },
              y: {
                title: {
                    display: true,
                    text: 'Power in MW',
                },
                  beginAtZero: true
              }
          }
      }
  });
});

// Humidity
fetch(SPREADSHEET_URL)
.then(res => res.text())
.then(rep => {
  let data = JSON.parse(rep.substr(47).slice(0, -2));
  let rows = data.table.rows;

  // Group the data by hour and calculate the average for each hour
  let hourlyData = {};
  for (let i = 1; i < rows.length; i++) {
      let timeStr = rows[i].c[0].f;
      let hour = parseInt(timeStr.split(':')[0]);
      let valueLast = parseFloat(rows[i].c[7].f); // Fetch the last column data

      if (!hourlyData[hour]) {
          hourlyData[hour] = { count: 0, totalLast: 0 };
      }

      hourlyData[hour].count++;
      hourlyData[hour].totalLast += valueLast;
  }

  // Calculate the average for each hour
// Calculate the average for each hour
let labels = [];
let dataLast = [];
for (let hour in hourlyData) {
    let hourInSeconds = parseInt(hour); // Convert hour from string to integer (assumed to be in seconds)
    let hourInHours = Math.floor(hourInSeconds / 3600); // Convert seconds to hours
    let hourInMinutes = Math.floor((hourInSeconds % 3600) / 60); // Convert remaining seconds to minutes
    let formattedHour = `${hourInHours < 10 ? '0' + hourInHours : hourInHours}:${hourInMinutes < 10 ? '0' + hourInMinutes : hourInMinutes}`;
    labels.push(formattedHour);
    dataLast.push(hourlyData[hour].totalLast / hourlyData[hour].count);
}
  // Create the chart
  let ctx = document.getElementById('chart-v2g').getContext('2d');
  new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: 'V2G',
              data: dataLast,
              backgroundColor: 'rgba(200, 199, 64, 0.2)',
              borderColor: 'rgba(200, 199, 64, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
            x:{
                title: {
                    display: true,
                    text: 'Time in Hours',
                },
            },
              y: {
                title: {
                    display: true,
                    text: 'Power in MW',
                },
                  beginAtZero: true
              }
          }
      }
  });
});
