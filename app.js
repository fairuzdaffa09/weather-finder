const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){
    const city = req.body.cityName
    const replaced = city.replace(' ', '+')
    const unit = "metric"
    const appid = "d476add4f2c4f9296237c70502f2c096"
    const url = ("https://api.openweathermap.org/data/2.5/weather?q=" + replaced + "&units=" + unit + "&appid=" + appid +"")
    https.get(url, function (resp){
        resp.on("data", function (data) {
            const weatherData = JSON.parse(data);
            console.log(JSON.parse(data));
            const temp = weatherData.main.temp
            const weatherDesc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const iconWeather = "http://openweathermap.org/img/wn/"+ icon + "@2x.png"
            res.write("<h1>The temperature in " + city + " is currently " + temp + " degree celsius")
            res.write("<h1>The weather is currently " + weatherDesc + "</h1>")
            res.write("<img src=" + iconWeather + " alt='weather-icon'>")
        })
        
    })
    
})

app.listen(3000, function(){
    console.log("Server is started in port 3000");
})