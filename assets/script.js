// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

var button = document.querySelector('.btn-primary');
var input = document.querySelector('#input');
var citiesEl = document.getElementById('cities');
var cardHeaderEl = document.getElementById('header-today');
var currentWeatherEl = document.getElementById('weather-today');
var forecast1 = document.getElementById('forecast1');
var forecast2 = document.getElementById('forecast2');
var forecast3 = document.getElementById('forecast3');
var forecast4 = document.getElementById('forecast4');
var forecast5 = document.getElementById('forecast5');
var date1 = document.getElementById('date1');
var date2 = document.getElementById('date2');
var date3 = document.getElementById('date3');
var date4 = document.getElementById('date4');
var date5 = document.getElementById('date5');
var icon1 = document.getElementById('icon1');
var icon2 = document.getElementById('icon2');
var icon3 = document.getElementById('icon3');
var icon4 = document.getElementById('icon4');
var icon5 = document.getElementById('icon5');
var currentIcon = document.getElementById('card-title-main');
var forecastArray = [forecast1, forecast2, forecast3, forecast4, forecast5];
var forecastDate = [date1, date2, date3, date4, date5];
var iconArray = [icon1, icon2, icon3, icon4, icon5];
var apiKey = 'cef7710a3e1c8dc71a4ec2409ad5949f';

var getCity = function(event){
    event.preventDefault();

    var city = input.value;
    geoCodeApi(city);
    input.value = " ";
    saveSearch(city);
}

button.addEventListener('click', getCity);

function saveSearch(cityName){
    var saved = document.createElement('button');
    saved.textContent = cityName;
    saved.setAttribute("class", "btn btn-secondary btn-sm col-8 m-1");
    saved.setAttribute("type", "button");
    saved.setAttribute("id", cityName);

    citiesEl.appendChild(saved);
}

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

            var description = data.weather[0].main;
            var unix = data.dt;
            var currentDate = new Date(unix * 1000);
            var month = currentDate.getMonth();
            var date = currentDate.getDate();
            var year = currentDate.getFullYear();

            currentIcon.src = getIcon(description);

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
            var cityName = data.city.name;
            var dataLength = data.list.length;
            var j = 0;

            for(var i = 7; i < dataLength; i += Math.floor(dataLength/5)){
                    var unix = data.list[i].dt;
                    var currentDate = new Date(unix * 1000);
                    var month = currentDate.getMonth();
                    var date = currentDate.getDate();
                    var year = currentDate.getFullYear();

                    var temp = data.list[i].main.temp;
                    var windSpeed = data.list[i].wind.speed;
                    var humidity = data.list[i].main.humidity;
                    var description = data.list[i].weather[0].main;

                    forecastDate[j].innerHTML = `${cityName}  ${month}/${date}/${year}`;
                    forecastArray[j].innerHTML = `Temp: ${temp} °F <br /> Wind: ${windSpeed} mph <br /> Humidity: ${humidity} %`;
                    iconArray[j].src = getIcon(description);

                    j++;

            }
        });
}

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
}
