// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// c3cf83153cc5621fca54b5f97fc73909

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

var button = document.getElementById('btn-primary');

var city = 'Chicago';

function geoCodeApi(){
    var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=Chicago&limit=5&appid=c3cf83153cc5621fca54b5f97fc73909';

    console.log('here');

    fetch(geoUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
        });
}

function weatherApi(){
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=41.8755616&lon=-87.6244212&appid=c3cf83153cc5621fca54b5f97fc73909'

    fetch(weatherUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
        });
}

geoCodeApi();
weatherApi();