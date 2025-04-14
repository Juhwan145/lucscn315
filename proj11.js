const apiKey = "a35432cb8bc41799810f42672d50490e";  // Replace this with your real API key
const city = "Lynchburg";
const units = "imperial"; // Fahrenheit

// ======= FETCH API version =======
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`)
  .then(response => {
    if (!response.ok) throw new Error("Weather data not available");
    return response.json();
  })
  .then(data => {
    document.getElementById("weather-fetch").innerHTML = `
      <h3>Using fetch()</h3>
      <p>Temperature: ${data.main.temp}°F</p>
      <p>Condition: ${data.weather[0].description}</p>
    `;
  })
  .catch(err => {
    document.getElementById("weather-fetch").innerHTML = `<p>Error fetching weather: ${err.message}</p>`;
  });


// ======= XMLHttpRequest version =======
const xhr = new XMLHttpRequest();
xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`);
xhr.onload = function () {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    document.getElementById("weather-xhr").innerHTML = `
      <h3>Using XMLHttpRequest</h3>
      <p>Temperature: ${data.main.temp}°F</p>
      <p>Condition: ${data.weather[0].description}</p>
    `;
  } else {
    document.getElementById("weather-xhr").innerHTML = `<p>Error loading weather via XHR.</p>`;
  }
};
xhr.onerror = function () {
  document.getElementById("weather-xhr").innerHTML = `<p>XHR request failed.</p>`;
};
xhr.send();

/*
======== EXPLANATION ========
- fetch() is modern and returns a Promise. Easier to read and chain.
- XMLHttpRequest is older and uses callbacks/events. More verbose and prone to nesting.
- Both accomplish the same result, but fetch is recommended for newer projects.
*/
