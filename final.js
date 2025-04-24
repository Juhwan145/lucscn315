"use strict";

localStorage.removeItem("attendanceRecords");
if (!localStorage.getItem("attendanceRecords")) {
  const sampleRecords = [
    { date: "2025-03-30", members: ["Sarah", "Paul", "Minji"] },
    { date: "2025-04-06", members: ["Sarah", "Paul", "Minji"] },
    { date: "2025-04-13", members: ["John", "Sarah"] },
    { date: "2025-04-20", members: ["Mina", "Paul", "Daniel", "Grace"] }
  ];
  localStorage.setItem("attendanceRecords", JSON.stringify(sampleRecords));
}

document.addEventListener("DOMContentLoaded", () => {
  const chartCanvas = document.getElementById("attendanceChart");
  if (!chartCanvas) return;

  const attendanceRecords = JSON.parse(localStorage.getItem("attendanceRecords")) || [];

  attendanceRecords.sort((a, b) => new Date(a.date) - new Date(b.date));

  const labels = attendanceRecords.map(record => record.date);
  const data = attendanceRecords.map(record => record.members.length);

  const ctx = chartCanvas.getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Number of Attendees",
        data: data,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Attendees"
          }
        },
        x: {
          title: {
            display: true,
            text: "Date"
          }
        }
      }
    }
  });
});
