require("dotenv").config()
const weather = require("./weather")
const express=require("express")
const axios = require("axios")
const cors = require("cors")
const getmovies = require("./movie")
const app = express()
app.use(cors())

class Movie{

}
app.get("/movies", async function (request, response) {
  
    let movie = request.query.movie
    let movieResponse = await getmovies(movie)
    response.send(movieResponse)
})

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
    let weatherreponse = await weather(req.query.searchQuery)
     res.send(weatherreponse)
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(3001)
console.log("app.listen")