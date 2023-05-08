// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// c3cf83153cc5621fca54b5f97fc73909

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

var button = document.getElementsByClassName('.btn-primary');
var input = document.getElementById('#input');

var city = 'Chicago';

function geoCodeApi(){
    var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=Chicago,US&limit=5&appid=c3cf83153cc5621fca54b5f97fc73909';

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
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + coordinates[0] + '&lon=' + coordinates[1] + '&appid=c3cf83153cc5621fca54b5f97fc73909'

    // console.log(coordinates[0]);
    // console.log(coordinates[1]);

    fetch(weatherUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
        });
}

geoCodeApi();
