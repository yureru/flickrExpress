const express = require('express')
const app = express()
const path = require('path')
const port = 3000

let data = {};
// data.name = req.query.name;

// media
app.use(express.static(path.join(__dirname, 'media')))
app.use(express.static(path.join(__dirname, 'scripts')))
// app.get('/', (req, res) => res.send(`Hello! ${req.query.name}`))
// app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')))

//third

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')))

app.listen(port, () =>  console.log(`FlickrExpress listening on port ${port}!`))