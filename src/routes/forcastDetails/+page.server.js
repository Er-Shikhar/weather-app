// src/routes/forcastDetails/page.server.js
export const load = async ({ url }) => {
  const city = url.searchParams.get('city') || 'Varanasi'; // Default city
  console.log(city);
  const apiKey = '6c615265a886489c80062725242708';

  try {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`);
    if (!response.ok) throw new Error('Failed to fetch weather data');
    const weatherData = await response.json();
    return {
      weatherData
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};
