const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')


const app = express()

//define path
const publicPath = path.join(__dirname, '../public')
const viewsPaths = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and  views location
app.set('view engine', 'hbs')
app.set('views', viewsPaths)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Joao Machado'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Joao Machado'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'This is a help message',
        name: 'Joao Machado'
    })
})

app.get('/help', (req, res) => {
    res.send([{
        name: 'Joao',
        age: 27
    }, {
        name: 'Andrew',
        age: 27
    }])
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geoCode(address, (error, { location, latitude, longitude } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: location,
                forcastData,
                address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Joao Machado',
        message: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Joao Machado',
        message: 'Page not found'
    })
})
app.listen(3000, () => {
    console.log('Server is running in port 3000')
})