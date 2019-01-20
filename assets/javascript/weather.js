$(document).ready(function () {

    var latitude;
    var longitude;

    function displayWeather() {
        var APIKey = "dd90b036fea16c286d0b1e900c84157c";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + APIKey

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // Show the user the city we are displaying weather for
            var locationHeader = $("<small>");
            locationHeader.addClass("text-muted");
            locationHeader.text(" in " + response.name);
            $("#weather-location").append(locationHeader);
            // Note the last time the weather was updated - should be roughly every 20 minutes
            var lastUpdateDisplay = $("<span>");
            lastUpdateDisplay.addClass("text-muted");
            lastUpdateDisplay.text(" Last Update: " + moment(response.dt, "X").format("dddd, MMMM Do YYYY, h:mm a"));
            $("#weather-header").append(lastUpdateDisplay);
            //Create weather icon
            var weatherIconURL = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            var weatherIcon = $("<img>");
            weatherIcon.attr("src", weatherIconURL);
            //Display weather and temperature
            $("#weather").append("<h6 class='d-inline'>" + (Math.floor(response.main.temp)) + "&#8457; </h5>");
            $("#weather").append(weatherIcon);
            $("#weather").append("<h6 class='d-inline'> " + response.weather[0].main + "</h6>");
            $("#weather").append("<h6>Humidity: " + response.main.humidity + "%</h6>");
            $("#weather").append("<h6>Wind speed: " + response.wind.speed + " mph</h6>");

            displayForecast();

        });
    };

    function displayForecast() {
        var APIKey = "dd90b036fea16c286d0b1e900c84157c";
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + APIKey

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var forecasts = response.list;
            console.log(forecasts);
            var temps = [];
            var weatherCodes = [];

            var forecastDisplay = $("<div>");
            forecastDisplay.addClass("row");
            $("#weather").append("<hr>")
            $("#weather").append("<h4>Forecast</h4>")

            $.each(forecasts, function (i, forecast) {
                var today = moment().format("MMM D");
                var forecastDay = moment(forecast.dt, "X").format("MMM D");

                if (forecastDay !== today) {
                    temps.push(forecast.main.temp);
                    weatherCodes.push(forecast.weather[0].icon);
                    console.log(forecastDay);

                    if (temps.length === 8) {
                        var forecastDayDisplay = $("<div>");
                        forecastDayDisplay.addClass("col text-center weatherBorder m-1")
                        forecastDayDisplay.append("<h6>" + moment(forecast.dt, "X").format("ddd, MMM Do") + "</h6>");
                        var highTemp = Math.max.apply(null, temps);
                        var lowTemp = Math.min.apply(null, temps);

                        var weatherIconURL = "https://openweathermap.org/img/w/" + weatherCodes[5] + ".png";
                        var weatherIcon = $("<img>");
                        weatherIcon.attr("src", weatherIconURL);
                        forecastDayDisplay.append(weatherIcon);
                        forecastDayDisplay.append("<div class='row'><div class='col'><h6>High</h6>" + Math.floor(highTemp) + "&#8457;</div><div class='col'><h6>Low</h6>" + Math.floor(lowTemp) + "&#8457;</div></div>");
                        forecastDisplay.append(forecastDayDisplay);
                        $("#weather").append(forecastDisplay);
                        temps = [];
                        weatherCodes = [];
                    }
                }
                else {
                    console.log(today);
                };
            });
        });
    };

    function googleLocation() {
        var APIKey = "AIzaSyCh4H_JTQPRDjRLXjGkPYaYmfdaX6y5ncI";
        var queryURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "POST"
        }).then(function (response) {
            console.log(response);
            latitude = response.location.lat;
            longitude = response.location.lng;
            displayWeather();
        });
    };
    googleLocation();
});
