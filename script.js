document.addEventListener('DOMContentLoaded', function() {
    // Initial load for Delhi
    fetchWeatherData('Delhi');

    // Add event listener to the search form
    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const city = document.getElementById('cityInput').value.trim() || 'Delhi'; // Default to Delhi if no input
        fetchWeatherData(city);
    });
});

async function fetchWeatherData(city) {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
    
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '46015e0208msh518d059df7ba34bp1bad1ejsn51e20d0d20a9',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        // Update the UI with the fetched data
        document.getElementById('cityName').textContent = `Weather for ${data.location.name}`;
        document.getElementById('cityDetails').textContent = `Your city: ${data.location.name}`;
        document.getElementById('currentDay').textContent = new Date().toLocaleDateString();
        document.getElementById('timezone').textContent = data.location.tz_id;
        document.getElementById('feelsLike').textContent = `${data.current.feelslike_c} °C`;
        document.getElementById('windSpeed').textContent = data.current.wind_kph;
        document.getElementById('humidity').textContent = data.current.humidity;
        document.getElementById('temperature').textContent = `${data.current.wind_dir}`;
        document.getElementById('sunrise').textContent = data.current.condition.text;
        document.getElementById('sunset').textContent = data.current.temp_f;
        

    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
}
