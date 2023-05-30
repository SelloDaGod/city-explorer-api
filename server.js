require("dotenv").config()
const express=require("express")
const axios = require("axios")
const cors = require("cors")
const app = express()
app.use(cors())
let headers = {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGIyZmIzNWUxMzQzMmM2NjJiY2ViMWY0NTA1MWZlMiIsInN1YiI6IjY0NTkxODBiMWI3MGFlMDE0NWVkOTUxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qteb_gU8E7SRqX_lk0CAUdZ_TjHfHschoIDZ4XUrFt4"
}
class Movie{

}
app.get("/movies", async function (request, response) {
    let movie = request.query.movie
    //send a request moviedb api
    //URL: https://api.themoviedb.org/3/movie
    let movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movie}`, headers=headers)
    response.send(movieResponse.data.results)
})
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

app.get("/weather", async function(req,res){
    const lat = req.query.lat
    const lon = req.query.lon
    const searchQuery = req.query.searchQuery
    console.log("searchQuery", searchQuery)
    //send a request to weatherBit Api for a city's forecast
    city = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=9549f7203f5b47379e586f6e6f700019&city=${searchQuery}`)

    console.log(city.data)


    if (city === undefined){
        res.status(404).send("Error City Not Found")
        
    }else {
        //creating an array of smaller forcast objects from city.data
       let newarray = city.data.data.map(function(element){
            return new Forecast(element.datetime , element.weather.description)
       })
       console.log("============================================")
       console.log(newarray)
       
        res.send(newarray);
    }


});
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(3001)
console.log("app.listen")