// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

var button = document.querySelector('.btn-primary');
var input = document.querySelector('#input');
var apiKey;

var getCity = function(event){
    event.preventDefault();

    var city = input.value;
    console.log(city);
    geoCodeApi(city);
}

button.addEventListener('click', getCity);

function geoCodeApi(city){
    var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + ',US&limit=5&appid=' + apiKey;

    console.log('here');

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
        });

}

function weatherApi(coordinates){
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + coordinates[0] + '&lon=' + coordinates[1] + '&appid=' + apiKey;

    // console.log(coordinates[0]);
    // console.log(coordinates[1]);

    fetch(weatherUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            console.log(data.city.name);
            console.log((data.list[0].main.temp - 273.15)*9/5 +32); //convert kelvins to fahrenheit
            console.log(data.list[0].main.humidity);
            console.log(data.list[0].weather[0].description);
            console.log(data.list[0].wind.speed);
        });
}
