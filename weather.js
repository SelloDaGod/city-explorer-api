const axios = require("axios")
let weathercache = {}

async function random(searchQuery) {
    let city = weathercache[searchQuery]
    if (city == undefined) {
        city = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=9549f7203f5b47379e586f6e6f700019&city=${searchQuery}`)
        weathercache[searchQuery] = city
    }
    console.log("searchQuery", searchQuery)
    //send a request to weatherBit Api for a city's forecast

    console.log(city.data)

    let newarray = city.data.data.map(function (element) {
        return new Forecast(element.datetime, element.weather.description)
    })
    console.log("============================================")
    console.log(newarray)

    return (newarray);

}
class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}
module.exports = random
