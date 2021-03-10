const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGVib2p5b3Rpcm95IiwiYSI6ImNrbHl4aTAwMTJlNm8ycm1weHB2bGo3aTEifQ.J5pVUPkXDPq00hQwpgBd6A'

    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect.');
        }
        else if(response.body.features.length === 0){
            callback('Not valid search item. Try again!!!')
        }
        else{
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;