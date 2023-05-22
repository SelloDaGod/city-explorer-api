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
        res.send("error")
        
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