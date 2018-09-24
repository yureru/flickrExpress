const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const port = 3000

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// serving
app.use(express.static(path.join(__dirname, 'media')))
app.use(express.static(path.join(__dirname, 'scripts')))
// app.get('/', (req, res) => res.send(`Hello! ${req.query.name}`))
// app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')))

//third

// app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')))
app.get('/', (req, res) => {
    let data = {};
    data.name = req.query.name;
    var name = "test";
    // res.render(path.join(__dirname + '/index.html'), {name:name})
    res.render(path.join(__dirname + '/index.html'), data)

})

app.listen(port, () =>  console.log(`FlickrExpress listening on port ${port}!`))