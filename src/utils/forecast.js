const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5d4c3e50f35dd480c0583bfc0de597ed&query=' + latitude + ',' + longitude
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the API', undefined)
        } else if (body.error) {
            callback('No matches found for thoose coordinates', undefined)
        } else {
            callback(undefined, (body.current.weather_descriptions[0] + ', currently '
                + body.current.temperature + 'ºC and it feels like ' + body.current.feelslike + 'ºC')
            )
        }
    })
}

module.exports = forecast