const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

// Load state dropdown on page load
window.onload = function () {
  const stateSelect = document.getElementById("stateSelect");
  for (let state in stateDistricts) {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
  }
};

// Load districts when a state is selected
function loadDistricts() {
  const districtSelect = document.getElementById("districtSelect");
  districtSelect.innerHTML = `<option value="">Select District</option>`;
  const selectedState = document.getElementById("stateSelect").value;
  
  if (selectedState) {
    const districts = stateDistricts[selectedState];
    districts.forEach(district => {
      const option = document.createElement("option");
      option.value = district;
      option.textContent = district;
      districtSelect.appendChild(option);
    });
  }
}

// Fetch weather data
async function getWeather() {
  const city = document.getElementById("districtSelect").value;
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Weather data not found");

    const data = await res.json();
    showWeather(data);
  } catch (error) {
    alert("Error: " + error.message);
  }
}

// Display weather info
function showWeather(data) {
  const dateTime = new Date(data.dt * 1000).toLocaleString();

  document.getElementById("cityName").textContent = data.name;
  document.getElementById("dateTime").textContent = `Date & Time: ${dateTime}`;
  document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById("description").textContent = `Condition: ${data.weather[0].description}`;
  document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById("windSpeed").textContent = `Wind Speed: ${data.wind.speed} m/s`;
  document.getElementById("pressure").textContent = `Pressure: ${data.main.pressure} hPa`;
  document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  document.getElementById("weatherResult").classList.remove("hidden");
}
