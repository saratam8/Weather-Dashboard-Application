var button = document.querySelector('.btn-primary');
var input = document.querySelector('#input');
var citiesEl = document.getElementById('cities');
var cardHeaderEl = document.getElementById('header-today');
var currentWeatherEl = document.getElementById('weather-today');
var forecastEl = document.querySelectorAll('.card-text');
var forecastDate = document.querySelectorAll('.card-header');
var cardTitle = document.querySelectorAll('.card-title');
var currentIcon = document.getElementById('card-title-main');
var apiKey = 'cef7710a3e1c8dc71a4ec2409ad5949f';

// This function will take the user's input and pass the city name into geoCodeApi function and saveSearch function
function getCity(event){
    event.preventDefault();

    var city = input.value;
    geoCodeApi(city);
    input.value = " ";
    saveSearch(city);
}

// eventlistener for the submit button. Will call getCity function when Submit button is clicked
button.addEventListener('click', getCity);

// This function will take user's input and save as a button
function saveSearch(cityName){
    var saved = document.createElement('button');
    saved.textContent = cityName;
    saved.setAttribute("class", "btn btn-secondary btn-sm col-8 m-1");
    saved.setAttribute("type", "button");
    saved.setAttribute("id", cityName);

    citiesEl.appendChild(saved);
    savedbutton = document.querySelectorAll('.btn-secondary');

    // For each saved search, there is an event listener for each of those buttons and when clicked, will get openweatherapp api data for the corresponding city
    for(var i = 0; i < savedbutton.length; i++){
            savedbutton[i].addEventListener('click', function getHistory(event){
                event.preventDefault();
                var savedName = this.id;
                geoCodeApi(savedName);
        });
    }

}

// This function calls the geocoding portion of openweatherapp. User can type in a city name and the api will return the longitude and latitude of the city
// The longitude and latitude are then passed into weatherApi function and forecastApi function
// Currently set to only work for cities in the USA
function geoCodeApi(city){
    var geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + ',US&limit=5&appid=' + apiKey;

    fetch(geoUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            var coord = [];
            coord[0] = data[0].lat;
            coord[1] = data[0].lon;
            weatherApi(coord);
            forecastApi(coord);
        });

}

// This function uses coordinates from geoCodeApi function to get current weather data from openweatherapp api
function weatherApi(coordinates){
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + coordinates[0] + '&lon=' + coordinates[1] + '&units=imperial' +'&appid=' + apiKey;

    fetch(weatherUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            var temp = data.main.temp;
            var windSpeed = data.wind.speed;
            var humidity = data.main.humidity;
            // openweatherapi gives date/time in unix, the following lines are to convert unix to standard date
            var description = data.weather[0].main;
            var unix = data.dt;
            var currentDate = new Date(unix * 1000);
            var month = currentDate.getMonth();
            var date = currentDate.getDate();
            var year = currentDate.getFullYear();

            currentIcon.src = getIcon(description);
            // Display data from openweatherapp api to webpage
            cardHeaderEl.textContent = `${data.name}  ${month}/${date}/${year}`;
            currentWeatherEl.innerHTML = `Temp: ${temp} °F <br /> Wind: ${windSpeed} mph <br /> Humidity: ${humidity} %`;
        });
}

// This function uses coordinates from geoCodeApi function to get forecasted data from openweatherapp api
// Only forecast data available under a free subscription is the 5-day/3 hour forecast
function forecastApi(coordinates){
    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + coordinates[0] + '&lon=' + coordinates[1] + '&units=imperial' +'&appid=' + apiKey; 

    fetch(forecastUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            var cityName = data.city.name;
            var dataLength = data.list.length;
            var j = 0;

            for(var i = 7; i < dataLength; i += Math.floor(dataLength/5)){
                // openweatherapi gives date/time in unix, the following lines are to convert unix to standard date
                var unix = data.list[i].dt;
                var currentDate = new Date(unix * 1000);
                var month = currentDate.getMonth();
                var date = currentDate.getDate();
                var year = currentDate.getFullYear();
                // Following lines is assigning the weather data to variables
                var temp = data.list[i].main.temp;
                var windSpeed = data.list[i].wind.speed;
                var humidity = data.list[i].main.humidity;
                var description = data.list[i].weather[0].main;
                // Display data from openweatherapp api to webpage
                forecastDate[j].innerHTML = `${cityName}  ${month}/${date}/${year}`;
                forecastEl[j].innerHTML = `Temp: ${temp} °F <br /> Wind: ${windSpeed} mph <br /> Humidity: ${humidity} %`;
                cardTitle[j].src = getIcon(description);

                j++;

            }
        });
}

//This function will look at the weather description given by openweatherapp api and choose an icon accordingly
function getIcon(description){
    if(description == "Rain" || description == "Drizzle"){
        return "./assets/images/rain.png";
    }
    else if (description == "Clouds"){
        return "./assets/images/clouds.png";
    }
    else if (description == "Clear"){
        return "./assets/images/clear.png";
    }
    else if (description == "Snow"){
        return "./assets/images/snow.png";
    }
    else if (description == "Thunderstorm"){
        return "./assets/images/thunderstorm.png";
    }
    else{
        return "./assets/images/atmosphere.png";
    }
}
