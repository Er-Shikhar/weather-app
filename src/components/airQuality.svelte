<!-- <script lang="ts">
    import { onMount } from 'svelte';
    import forcastDetails from '../routes/forcastDetails/+page.svelte'

    // export airInfo;
    console.log(forcastDetails)
    let aqi: number | null = null;

    // Define the calculateAQI function
    function calculateAQI(pm2_5: number, pm10: number): number {
        function getAQIIndex(concentration: number, breakpoints: Array<{ min: number, max: number, aqiLow: number, aqiHigh: number }>): number | null {
            for (let i = 0; i < breakpoints.length; i++) {
                if (concentration <= breakpoints[i].max) {
                    const aqiRange = breakpoints[i].aqiHigh - breakpoints[i].aqiLow;
                    const concRange = breakpoints[i].max - breakpoints[i].min;
                    const aqi = ((concentration - breakpoints[i].min) / concRange) * aqiRange + breakpoints[i].aqiLow;
                    return Math.round(aqi);
                }
            }
            return null;
        }

        // Breakpoints for PM2.5 and PM10 as per US-EPA
        const pm25Breakpoints: Array<{ min: number, max: number, aqiLow: number, aqiHigh: number }> = [
            { min: 0.0, max: 12.0, aqiLow: 0, aqiHigh: 50 },
            { min: 12.1, max: 35.4, aqiLow: 51, aqiHigh: 100 },
            { min: 35.5, max: 55.4, aqiLow: 101, aqiHigh: 150 },
            { min: 55.5, max: 150.4, aqiLow: 151, aqiHigh: 200 },
            { min: 150.5, max: 250.4, aqiLow: 201, aqiHigh: 300 },
            { min: 250.5, max: 500.4, aqiLow: 301, aqiHigh: 500 }
        ];

        const pm10Breakpoints: Array<{ min: number, max: number, aqiLow: number, aqiHigh: number }> = [
            { min: 0, max: 54, aqiLow: 0, aqiHigh: 50 },
            { min: 55, max: 154, aqiLow: 51, aqiHigh: 100 },
            { min: 155, max: 254, aqiLow: 101, aqiHigh: 150 },
            { min: 255, max: 354, aqiLow: 151, aqiHigh: 200 },
            { min: 355, max: 424, aqiLow: 201, aqiHigh: 300 },
            { min: 425, max: 604, aqiLow: 301, aqiHigh: 500 }
        ];

        const aqiPm25 = getAQIIndex(pm2_5, pm25Breakpoints);
        const aqiPm10 = getAQIIndex(pm10, pm10Breakpoints);

        // Return the higher AQI value
        return Math.max(aqiPm25 ?? 0, aqiPm10 ?? 0);
    }

    // Example data
    const airQualityData = {
        pm2_5: 11.8,
        pm10: 13.2
    };

    // On component mount, calculate AQI
    onMount(() => {
        aqi = calculateAQI(airQualityData.pm2_5, airQualityData.pm10);
    });
</script>

<style>
    .aqi {
        font-size: 1.5em;
        margin: 1em 0;
    }
</style>

<h1>Air Quality Index</h1>
<p class="aqi">
    The calculated AQI is: {aqi !== null ? aqi : 'Loading...'}
</p> -->
