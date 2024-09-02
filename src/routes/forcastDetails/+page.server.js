// src/routes/forcastDetails/page.server.js
export const load = async ({ url }) => {
  const city = url.searchParams.get('city') || 'Varanasi'; // Default city
  const apiKey = '6c615265a886489c80062725242708';
  console.log("Origin", url.origin)

  try {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=10`);
    if (!response.ok) throw new Error('Failed to fetch weather data');
    const weatherData = await response.json();
  console.log("Api Fetched")
    return {
      weatherData
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};
