const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=68c4ae726650b269f108c926efa32937&query=' + longitude + ',' + latitude + '&units=m'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect')
        }
         else if(body.error){
            callback('Wrong search query!')
        } 
        else{
            callback(undefined, 'It is currently ' + body.current.weather_descriptions[0] + ' in ' + body.location.name + ' with temperature ' + body.current.temperature + ' C')
        }
    }) 
};

module.exports = forecast;

