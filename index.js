'use strict'
const express = require('express');  // pulls in express and other modules
const bodyParser = require('body-parser');
const hbars = require('express-handlebars');
const Novel = require('./models/novels.js');

const app = express();  // creates instance of express app (general convention is "app")
app.engine('handlebars', hbars({defaultLayout: false}));  // look for files with .handlebars extension and process them with handlebars (pulled in above)
app.set('view engine', 'handlebars');  // view engine should use hbars for processing templates

app.set('port', process.env.PORT || 3000);
// app.use(express.static(__dirname + '/cheese'));  // set location for static files -- css, html, js etc
app.use(bodyParser.urlencoded({extended: true}));  // parse form submissions


// APP START ----------------------------------------------

app.get('/', (req, res, next) => {
  Novel.find({}).lean()
    .then((books) => {
        res.render('home', { books });
    })
    .catch(err => next(err));
});


app.get('/detail', (req, res, next) => {
  Novel.find({}).lean()
    .then((book) => {
        res.render('detail', { book: req.query.item });
    })
    .catch(err => next(err));
});


app.get('/delete', (req, res, next) => {
  return Novel.deleteOne( { "title": req.query.item } ).lean()
    .then( (result) => {
      res.type('text/html');
      res.send( `${req.query.item} has been deleted.
        <br />
        <br />
        <a href="/">Back to home.</a>` );
    })
    .catch(err => next(err));
});


app.use( (req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send("404 Error - Not Found");
});


// starts the server
app.listen(app.get('port'), () => {
    console.log("Express started");
});
