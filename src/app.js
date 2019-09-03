const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vijay'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me!',
        name: 'Vijay'    
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'Email us at support@weather.com',
        title: 'Help!',
        name: 'Vijay'
    })
})

app.get('', (req, res) => {
    res.send('Hello express!')
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address!'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location}={}) => {
        if (error) {
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        error: 'Can\'t help you here!',
        name: 'Vijay',
        title: 'Error!'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        error: 'You are lost mate! Check above links to navigate',
        name: 'Vijay',
        title: 'Error!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000!')
})