const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/059d4bfd05a415ac5b1990d221a23d63/' + latitude + ',' + longitude + '?units=si'

request( { url, json: true}, (error, {body} = {}) => {
    if(error) {
        console.log('Unable to connect!', undefined)
    } else if(body.error) {
        console.log('Location not found!', undefined)
    } else {
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        
    }
        
})
}

module.exports = forecast