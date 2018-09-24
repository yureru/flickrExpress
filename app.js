const express = require('express')
const app = express()
const path = require('path')
// const bodyParser = require('body-parser')
const hbs = require('hbs')
const port = 3000

// handlebar / hbs
app.engine('html', hbs.__express);
app.set('view engine', 'html');

// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(bodyParser.json());

// serving
app.use(express.static(path.join(__dirname, 'media')))
app.use(express.static(path.join(__dirname, 'scripts')))

// rendering
app.get('/', (req, res) => {
    let data = {};
    data.name = req.query.name;
    data.images = [1,2,3,4,5,6,7,8,9];
    var name = "test";
    res.render(path.join(__dirname + '/index.html'), data)
})

// hbs.registerHelper("if", function(conditional, options) {
//     return options.fn(this);
//     // if (options.hash.index === options.hash.type) {
//     //   options.fn(this);
//     // } else {
//     //   options.inverse(this);
//     // }
//   });

app.listen(port, () =>  console.log(`FlickrExpress listening on port ${port}!`))