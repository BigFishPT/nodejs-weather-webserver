const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiMTJqb2FvMTUiLCJhIjoiY2tqYmxpbHlvNXUwczJzbjRhNzh2bzY5ZiJ9._4zccHHi2qtz6RkHsNx4HA&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the API', undefined)
        } else if (body.features.length === 0) {
            callback('No matches found for that city Name', undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports = geoCode