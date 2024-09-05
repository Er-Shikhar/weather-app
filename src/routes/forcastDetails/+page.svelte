<script>
  export let data;
  let { weatherData, error } = data;

  const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Format date to display in table
  function formatDate(date) {
    const day = date.slice(8);
    const month = monthNames[new Date(date).getMonth()];
    return `${day} ${month}`;
  }

  // Extract day of the week
  function getDayOfWeek(date) {
    return weekDay[new Date(date).getDay()];
  }

 let hours = 0;
  let minutes = 0;
  let seconds = 0;

  // Function to format the time with leading zero
  function formatTime(number) {
    return number.toString().padStart(2, '0');
  }

  const updateClock = () => {
    const now = new Date();
    hours = formatTime(now.getHours() % 12 || 12); // Keep 12-hour format and avoid showing "0"
    minutes = formatTime(now.getMinutes());
    seconds = formatTime(now.getSeconds());
  };

  setInterval(updateClock, 1000);
  updateClock(); // Initialize clock immediately

  let windDirection = 0;

  function getWindDirectionAngle(direction) {
    const directions = {
      'N': 0, 'NNE': 22.5, 'NE': 45, 'ENE': 67.5,
      'E': 90, 'ESE': 112.5, 'SE': 135, 'SSE': 157.5,
      'S': 180, 'SSW': 202.5, 'SW': 225, 'WSW': 247.5,
      'W': 270, 'WNW': 292.5, 'NW': 315, 'NNW': 337.5
    };
    return directions[direction] || 0;  // Default to North if unknown
  }

  $: windDirection = getWindDirectionAngle(weatherData.current.wind_dir);
</script>

<div class="container">
  {#if error}
    <p>{error}</p>
  {:else}
    <div class="section-1">
      <div class="temperatureData glassEffect">
        <div class="areainfo">
          <span class="location">{weatherData.location.name}, {weatherData.location.country}</span>
          <span class="date">{getDayOfWeek(weatherData.forecast.forecastday[0].date)}</span>
        </div>

        <h1 class="temperature">{weatherData.current.temp_c} <small>°C</small></h1>

        <div class="dayInfo">
          <span>{weatherData.current.is_day ? "Day" : "Night"}</span>
          <span class="condition">{weatherData.current.condition.text}</span>
        </div>
      </div>

      <!-- Forecast Table -->
      <table class="table forecast-table glassEffect">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp</th>
            <th>Sunrise</th>
          </tr>
        </thead>
        <tbody>
          {#each weatherData.forecast.forecastday as day}
            <tr>
              <td>{formatDate(day.date)}</td>
              <td>{day.day.avgtemp_c}°C</td>
              <td>{day.astro.sunrise}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Hourly Table -->
    <div class="section-3">
      <table class="table forecast-table glassEffect">
        <thead>
          <tr>
            <th>Time</th>
            <th>Temp</th>
            <th>Condition</th>
          </tr>
        </thead>
        <tbody>
          {#each weatherData.forecast.forecastday[0].hour as hour}
            <tr>
              <td>{hour.time.slice(11)}</td>
              <td>{hour.temp_c}°C</td>
              <td>{hour.condition.text}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="section-2">
      <div class="otherData">
        <div class="datacard text-center glassEffect">
          <div class="clock">
            <h4>{hours} : {minutes} : {seconds}</h4>
            <svg viewBox="0 0 100 100" class="circular-clock">
              <!-- Outer circle -->
              <circle cx="50" cy="50" r="45" stroke-width="5" fill="none" stroke="white"></circle>
        
              <!-- Hour hand -->
              <line
                x1="50" y1="50"
                x2="{50 + 20 * Math.sin(hours * 30 * Math.PI / 180)}"
                y2="{50 - 20 * Math.cos(hours * 30 * Math.PI / 180)}"
                stroke="white" stroke-width="3" />
        
              <!-- Minute hand -->
              <line
                x1="50" y1="50"
                x2="{50 + 30 * Math.sin(minutes * 6 * Math.PI / 180)}"
                y2="{50 - 30 * Math.cos(minutes * 6 * Math.PI / 180)}"
                stroke="white" stroke-width="2" />
        
              <!-- Second hand -->
              <line
                x1="50" y1="50"
                x2="{50 + 40 * Math.sin(seconds * 6 * Math.PI / 180)}"
                y2="{50 - 40 * Math.cos(seconds * 6 * Math.PI / 180)}"
                stroke="red" stroke-width="1" />
        
              <!-- Center point -->
              <circle cx="50" cy="50" r="2" fill="red"></circle>
            </svg>
          </div>
        </div>
        
        <div class="datacard text-center glassEffect">
          <div class="compass">
            <h4>Wind Direction</h4>
            <svg viewBox="0 0 100 100" class="circular-compass">
              <!-- Outer circle (compass frame) -->
              <circle cx="50" cy="50" r="45" stroke-width="5" fill="none" stroke="white"></circle>
        
              <!-- Compass directions -->
              <text x="50" y="15" text-anchor="middle" fill="white" font-size="8">N</text>
              <text x="85" y="55" text-anchor="middle" fill="white" font-size="8">E</text>
              <text x="50" y="95" text-anchor="middle" fill="white" font-size="8">S</text>
              <text x="15" y="55" text-anchor="middle" fill="white" font-size="8">W</text>
        
              <!-- Needle -->
              <line
                x1="50" y1="50"
                x2="50" y2="15"
                stroke="red" stroke-width="2"
                transform="rotate({windDirection} 50 50)" />
        
              <!-- Center point -->
              <circle cx="50" cy="50" r="2" fill="red"></circle>
            </svg>
          </div>
        </div>
        
        <!-- Wind Speed & Direction -->
        <div class="datacard text-center glassEffect">
          <div class="wind">
            <h4>Wind Speed</h4>
            <span class="data">{weatherData.current.wind_kph} <small>km/h</small></span>
          </div>
        </div>
        
        <!-- Humidity -->
        <div class="datacard text-center glassEffect">
          <h4>Humidity</h4>
          <span class="data">{weatherData.current.humidity}<small>%</small></span>
        </div>
        
        <!-- Visibility -->
        <div class="datacard text-center glassEffect">
          <h4>Visibility</h4>
          <span class="data">{weatherData.current.vis_km} <small>km</small></span>
        </div>
        
        <!-- Precipitation -->
        <div class="datacard text-center glassEffect">
          <h4>Precipitation</h4>
          <span class="data">{weatherData.current.precip_mm} <small>mm</small></span>
        </div>
        
        <!-- Pressure -->
        <div class="datacard text-center glassEffect">
          <h4>Pressure</h4>
          <span class="data">{weatherData.current.pressure_mb} <small>mb</small></span>
        </div>

        <!-- Sunrise and Sunset -->
        <div class="datacard text-center glassEffect">
          <h4>🌤️Sunrise</h4>
          <span class="data">{weatherData.forecast.forecastday[0].astro.sunrise.slice(0, 5)} <small>{weatherData.forecast.forecastday[0].astro.sunrise.slice(5)}</small></span>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100vw;
  }

  @media (max-width: 800px) {
    .container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 500px) {
    .container {
      grid-template-columns: 1fr;
    }
  }

  .glassEffect {
    border-radius: 20px;
    backdrop-filter: blur(3px);
    background-color: rgba(0, 0, 0, 0.495);
    color: white;
    box-shadow: 0px 0px 10px 5px rgba(96, 96, 96, 0.837);
  }

  .temperatureData {
    display: grid;
    justify-items: center;
    padding: 20px;
    width: 100%;
    height: 250px;
    margin-bottom: 1.5rem;
  }

  .areainfo {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .temperature {
    font-size: 6rem;
  }

  .temperature small {
    font-size: 2rem;
  }

  .dayInfo {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .table {
    width: 100%;
    text-align: center;
    min-height: 350px;
  }

  .section-1 table{
    width: 100%;
  }

  .table th,
  .table td {
    text-align: center;
    border: none;
    padding: 10px;
  }

  .otherData {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1em;
  }

  .datacard {
    width: 210px;
    min-height: 130px;
    padding: 10px;
  }

  h4 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .data {
    font-size: 2rem;
    font-weight: bold;
  }

  .data small {
    font-size: 1rem;
  }

  .container .section-3 .table {
  width: 100%;
  max-height: 400px; /* Set a max height */
  overflow-y: scroll; /* Enable vertical scrolling */
}

.container .section-3 .table tbody {
  display: block; /* Ensure table body can scroll */
  max-height: 600px; /* Match the table's max height */
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.container .section-3 .table tbody ::-webkit-scrollbar{
  display: none;
}

.container .section-3 .table thead,
.container .section-3 .table tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

.circular-clock {
  width: 150px;
  height: 150px;
  display: block;
  margin: 0 auto;
}

.circular-compass {
  width: 150px;
  height: 150px;
  display: block;
  margin: 0 auto;
}


</style>