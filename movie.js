const axios = require("axios")
let headers = {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGIyZmIzNWUxMzQzMmM2NjJiY2ViMWY0NTA1MWZlMiIsInN1YiI6IjY0NTkxODBiMWI3MGFlMDE0NWVkOTUxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qteb_gU8E7SRqX_lk0CAUdZ_TjHfHschoIDZ4XUrFt4"
}
let moviecache = {}
async function getmovies(movie) {
    let movieResponse = moviecache[movie]
    if (movieResponse == undefined) {
        movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movie}`, headers = headers)
        moviecache[movie] = movieResponse
    }
    return movieResponse.data.results
}

module.exports = getmovies