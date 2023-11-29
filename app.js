const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    
const query = req.body.cityName;
const apiKey = "22a530bbff0bc45604a49264224a4b94";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apiKey +"&units=" + unit + "";

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp1 = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather description is: " + weatherDescription + "<p>");
            res.write("<h2>The Temperature in "+ query +" is:  " + temp1 + " Degrees Celcius</h2>");
            res.write("<img src=" + imageURL + " >");
            res.send() 
            
        })
    });

});

app.listen(3000, function(){
    console.log("Server is running on port 3000.")
})