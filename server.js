require("dotenv").config()
const express=require("express")
const cors = require("cors")
const app = express()
app.use(cors())

const weather= require("./Data/weather.json")
class Forecast {
    constructor(date, description) {
      this.date = date;
      this.description = description;
    }
  }
  function handleAPIError(error, res) {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.statusText);
      console.error("Response Data:", error.response.data);
      res.status(error.response.status).send(error.response.data);
    } else if (error.request) {
      console.error("No response received from the server");
      console.error("Request:", error.request);
      res.status(500).send("No response received from the server");
    } else {
      console.error("Error:", error.message);
      res.status(500).send("An error occurred while making the API request");
    }
  }

app.get("/weather", function(req,res){
    const lat = req.query.lat
    const lon = req.query.lon
    const searchQuery = req.query.searchQuery
    let city 
    
    city = weather.find((i)=>{
        if (searchQuery === i.city_name || i.lat === lat || i.lon === lon){
            return true
        
        }
        else {
            return false;
        }


    });
    if (city === undefined){
        res.status(404).send("Error City Not Found")
        
    }else {
        //creating an array of smaller forcast objects from city.data
       let newarray = city.data.map(function(element){
            return new Forecast(element.datetime , element.weather.description)
       })
       console.log("============================================")
       console.log(newarray)
       
        res.send(newarray);
    }


});

app.listen(3001)
console.log("app.listen")