let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value = '';
});

const getWeather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7d32588ce415d75034365a2ba08b65db`, { mode: 'cors' });

        const WeatherData = await response.json();
        console.log(WeatherData);
        const { name } = WeatherData;
        const { feels_like } = WeatherData.main;
        const { id, main } = WeatherData.weather[0];
        loc.textContent = name;
        climate.textContent = main;
        tempvalue.textContent = Math.round(feels_like - 273.15); // Convert Kelvin to Celsius
        if (id < 300 && id >= 200) {
            tempicon.src = "./icons/thunderstorms.png";
        } else if (id < 400 && id >= 300) {
            tempicon.src = "./icons/clouds.png";
        } else if (id < 600 && id >= 500) {
            tempicon.src = "./icons/rain.png";
        } else if (id < 700 && id >= 600) { // Corrected this range
            tempicon.src = "./icons/snow.png";
        } else if (id < 800 && id >= 700) {
            tempicon.src = "./icons/cloudy-sunny.png";
        } else if (id === 800) {
            tempicon.src = "./icons/sun.png";
        }
    } catch (error) {
        alert('City not found');
    }
};

window.addEventListener("load", () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=7d32588ce415d75034365a2ba08b65db`;

            fetch(api)
                .then((response) => {
                    return response.json();
                })
                .then(data => {
                    const { name } = data;
                    const { feels_like } = data.main;
                    const { id, main } = data.weather[0];

                    loc.textContent = name;
                    climate.textContent = main;
                    tempvalue.textContent = Math.round(feels_like - 273.15); // Convert Kelvin to Celsius
                    
                    if (id < 300 && id >= 200) {
                        tempicon.src = "./icons/thunderstorms.png";
                    } else if (id < 400 && id >= 300) {
                        tempicon.src = "./icons/clouds.png";
                    } else if (id < 600 && id >= 500) {
                        tempicon.src = "./icons/rain.png";
                    } else if (id < 700 && id >= 600) { // Corrected this range
                        tempicon.src = "./icons/snow.png";
                    } else if (id < 800 && id >= 700) {
                        tempicon.src = "./icons/cloudy-sunny.png";
                    } else if (id === 800) {
                        tempicon.src = "./icons/sun.png";
                    }

                    console.log(data);
                });
        });
    }
});

