const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { response } = require('express');

const app = express();
const port = process.env.PORT || 3000

const publicDirectory = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
app.use(express.static(publicDirectory))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req, res) => {
    res.render('index', {title: 'Weather App',
    name: 'Debojyoti'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About me',
    name: 'Debojyoti'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        help: 'Help text',
        title: 'Help',
        name: 'Debojyoti'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Provide Address..'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (err, forecastData) => {
            if(err){
                return res.send({
                    err
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        } )
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    
    res.render('404', {
        title: '404',
        name: 'Debojyoti',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Debojyoti',
        errorMessage: 'NOT FOUND'
    })
})

 app.listen(port, () => {
    console.log('Server is running')
}) 