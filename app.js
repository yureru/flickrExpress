const express = require('express')
const app = express()
const path = require('path')
// const bodyParser = require('body-parser')
const hbs = require('hbs')
const request = require('request')
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
    // data.images = [1,2,3,4,5,6,7,8,9];

    getImagesUrl((images) => {
        data.images = images;
        res.render(path.join(__dirname + '/index.html'), data);
        // console.log("Length of images is: " + images.length);
        // let r = JSON.parse(images);
        // console.log("R object is: " + r.items[0].media.m);
    });
    // getImagesUrl((body) => { flickr = body; });
    // let flickr = getImagesUrl();

    // console.log("Flickr length is: " + flickr.length);
    
});

// hbs.registerHelper("if", function(conditional, options) {
//     return options.fn(this);
//     // if (options.hash.index === options.hash.type) {
//     //   options.fn(this);
//     // } else {
//     //   options.inverse(this);
//     // }
//   });

// basic block variation
// hbs.registerHelper('row', function(options) {
//     return new Handlebars.SafeString(
//         '<div class="img-row">' +
//         options.fn(this) +
//         '</div>');
// });

// each image loop
hbs.registerHelper('eachImage', function(context, options) {
    let rowStr = '<div class="img-row">';
    let rowEnd = '</div>';
    let itemStr = '<img src="';
    let itemEnd = '" class="square">';
    
    let ret = "";

    for (let i = 0; i < context.length; ++i) {
        if (i == 0 || i == 3 || i == 6) {
            ret += rowStr;
        }

        // ret += options.fn(this);
        ret += itemStr + context[i] + itemEnd;

        if (i == 2 || i == 5 || i == 8) {
            ret += rowEnd;
        }
    }


    // return options.fn(ret);
    return ret;
});

// function getImagesUrl(fn) {
//     let data;
//     request('https://api.flickr.com/services/feeds/photos_public.gne?tags=camping&format=json', function(err, resp, body) {
//         console.log("Length of body is: " + body.length)
//         fn(body);
//       });
// }

async function getImagesUrl(fn) {
    try {
    request('https://api.flickr.com/services/feeds/photos_public.gne?tags=camping&format=json&nojsoncallback=1', function(err, resp, body) {
        console.log("Length of body is: " + body.length)
        let jsonbody = JSON.parse(body);
        let images = [];
        for (let i = 0; i < 9; ++i) {
            images.push(jsonbody.items[i].media.m);
        }
        fn(images);
    });
    } catch (err) {
        console.log(err)
    }
};

app.listen(port, () =>  console.log(`FlickrExpress listening on port ${port}!`))