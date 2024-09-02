<script>
  export let data;
  let { weatherData, error } = data;
  $: weatherData = data.weatherData;
  console.log("in page ",data.weatherData.location.name);
  

</script>

{#if error}
  <p>{error}</p>
{:else}
  <div class="container">
    <!-- First Row -->
    <div class="row">
      <div class="temperatureData col-md-6 col-lg-3">
        <div class="areainfo">
          <span class="location">{weatherData.location.name},<small> {weatherData.location.country}</small></span>
          <span class="date">Monday</span>
        </div>

        <h1 class="temperature">{weatherData.current.temp_c}<small>°C</small></h1>

        <div class="dayInfo">
          <span>{weatherData.current.is_day ? "Day" : "Night"}</span>
          <span class="condition">{weatherData.current.condition.text}</span>
        </div>
      </div>
      <!-- Current Temperature & Weather Condition -->

      <!-- Date & Timezone -->

      <!-- Air Quality Index -->
      <div class="col-md-6 col-lg-2 text-center">
        <div class="aqi-box">
          AQI: <span class="aqi-number">45</span> <small>Good</small>
        </div>
      </div>

      <div class="datacard col-md-4 col-lg-2 text-center">
        <div class="sun-moon">
          <p>Sunrise: {weatherData.forecast.forecastday[0].astro.sunrise}</p>
          <p>Sunset: {weatherData.forecast.forecastday[0].astro.sunset}</p>
          <p>Moonrise: {weatherData.forecast.forecastday[0].astro.moonrise}</p>
          <p>Moonset: {weatherData.forecast.forecastday[0].astro.moonset}</p>
        </div>
      </div>
    </div>

    <!-- Second Row -->
    <div class="otherData row">
      <!-- Wind Speed & Direction -->
      <div class="datacard col-md-4 col-lg-2 text-center">
        <div class="wind">
          <h4>Wind</h4>
          <span class="data wind-speed">{weatherData.current.wind_kph} <small>km/h</small></span>
          <p class="wind-direction">{weatherData.current.wind_dir}</p>
        </div>
      </div>
      <!-- Humidity -->
      <div class="datacard col-md-4 col-lg-2 text-center">
        <div class="humidity">
          <h4>
            Humidity
          </h4>
          <span class="data humidity-value"
              >{weatherData.current.humidity}<small>%</small></span
            >
        </div>
      </div>
      <!-- Precipitation -->
      <div class="datacard col-md-4 col-lg-2 text-center">
        <div class="precipitation">
          <h4>
            Precipitation
          </h4>
          <span class="data precipitation-value"
              >{weatherData.current.precip_mm} <small>mm</small></span
            >
        </div>
      </div>
      <!-- Pressure -->
      <div class="datacard col-md-4 col-lg-2 text-center">
        <div class="pressure">
          <h4>
            Pressure
          </h4>
          <span class="data pressure-value"
              >{weatherData.current.pressure_mb} <small>mb</small></span
            >
        </div>
      </div>
      <!-- Visibility -->
      <div class="datacard col-md-4 col-lg-2 text-center">
        <div class="visibility">
          <h4>
            Visibility
          </h4>
          <span class="data visibility-value"
              >{weatherData.current.vis_km} <small>km</small></span
            >
        </div>
      </div>
      <!-- Sunrise, Sunset, Moonrise, Moonset -->
      
    </div>

    <!-- Third Row - 10-Day Forecast -->
    <div class="row">
      <div class="col-12">
        <table class="table forecast-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Condition</th>
              <th>Average Temp</th>
            </tr>
          </thead>
          <tbody>
            {#each weatherData.forecast.forecastday as days}
              <tr>
                <td>{days.date}</td>
                <td>{days.day.condition.text}</td>
                <td>{days.day.avgtemp_c}°C</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
{/if}

<style>

.container{
  width: 100vw;
  /* padding: 0p; */
}

.row{
  /* display: grid; */
  /* border: 2px solid black; */
  padding-bottom: 20px;
  width: 100%;
  justify-content: space-between;
}

.row .temperatureData{
  display: grid;
  border: 2px solid rgb(255, 22, 22);
  border-radius: 20px;
  padding: 20px;
  height: 300px;
}

.row .temperatureData .areainfo{
  display: flex;
  /* padding: ; */
  font-weight: 600;
  font-size:large;
  justify-content: space-between;
  align-self: center;
}

.row .temperatureData .areainfo .location{
  font-size:xx-large;
  font-weight: 600;
  /* align-self: center; */
}

.row .temperatureData .areainfo .date{
  font-size:xx-large;
  font-weight: 400;
  /* align-self: center; */
}

.row .temperatureData .areainfo .location small{
  /* padding: 10px; */
  font-size: large;
  /* font-weight: 700; */
}

.row .temperatureData .temperature{
  border-radius: 20px;
  padding: 10px;
  font-size: 600%;
  justify-self: center;
  align-items: center;
}

.row .temperatureData .temperature small{
  font-size: 40%;
}

.row .temperatureData .dayInfo{
  display: flex;
  font-size: large;
  font-weight: 600;
  justify-content: space-between;
}

.row .datacard{
  border: 2px solid rgb(255, 15, 15);
  border-radius: 20px;
}

.row .datacard .data{
  font-size: xx-large;
  font-weight: 600;
}

.row .datacard .data small{
  font-size: large;
}

</style>