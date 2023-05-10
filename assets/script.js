// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

var button = document.querySelector('.btn-primary');
var input = document.querySelector('#input');
var citiesEl = document.getElementById('cities');
var cardHeaderEl = document.getElementById('header-today');
var currentWeatherEl = document.getElementById('weather-today');
var apiKey = 'cef7710a3e1c8dc71a4ec2409ad5949f';

var getCity = function(event){
    event.preventDefault();

    var city = input.value;
    // console.log(city);
    geoCodeApi(city);
    input.value = " ";
    saveSearch(city);
}

button.addEventListener('click', getCity);

function saveSearch(cityName){
    console.log(citiesEl);
    console.log(cityName);
    var saved = document.createElement('button');
    saved.textContent = cityName;
    saved.setAttribute("class", "btn btn-secondary btn-sm col-8 m-1");
    saved.setAttribute("type", "button");
    saved.setAttribute("id", cityName);

    citiesEl.appendChild(saved);
}

function geoCodeApi(city){
    var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + ',US&limit=5&appid=' + apiKey;

    // console.log('here');

    fetch(geoUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            console.log(data[0].lat);
            console.log(data[0].lon);
            var coord = [];
            coord[0] = data[0].lat;
            coord[1] = data[0].lon;
            weatherApi(coord);
            forecastApi(coord);
        });

}

function weatherApi(coordinates){
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + coordinates[0] + '&lon=' + coordinates[1] + '&units=imperial' +'&appid=' + apiKey;

    fetch(weatherUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            console.log(data.name);

            var temp = data.main.temp;
            var windSpeed = data.wind.speed;
            var humidity = data.main.humidity;

            var description = data.weather[0].main;
            var unix = data.dt;
            // var unixToMilliseconds = unix * 1000;
            var currentDate = new Date(unix * 1000);
            var month = currentDate.getMonth();
            var date = currentDate.getDate();
            var year = currentDate.getFullYear();

            console.log(currentDate);
            console.log(month);
            console.log(date);
            console.log(year);

            console.log(temp);
            console.log(windSpeed);
            console.log(humidity);
            console.log(description);

            cardHeaderEl.textContent = `${data.name}  ${month}/${date}/${year}`;
            currentWeatherEl.innerHTML = `Temp: ${temp} °F <br /> Wind: ${windSpeed} mph <br /> Humidity: ${humidity} %`;
        });
}

function forecastApi(coordinates){
    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + coordinates[0] + '&lon=' + coordinates[1] + '&units=imperial' +'&appid=' + apiKey;

    fetch(forecastUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            // console.log(data.name);
            // cardHeaderEl.textContent = data.name;

            // var temp = data.main.temp;
            // var windSpeed = data.wind.speed;
            // var humidity = data.main.humidity;
            // var description = data.weather[0].main;

            // console.log(temp);
            // console.log(windSpeed);
            // console.log(humidity);
            // console.log(description);
            // currentWeatherEl.innerHTML = `Temp: ${temp} °F <br /> Wind: ${windSpeed} mph <br /> Humidity: ${humidity} %`;
        });
}
