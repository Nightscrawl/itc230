'use strict'
const express = require('express');  // pulls in express and other modules
const bodyParser = require('body-parser');
const hbars = require('express-handlebars');

const Novel = require('./models/novels.js');  // server side
// const novels = require('./lib/data.js');  // local array

const app = express();  // creates instance of express app (general convention is "app")
app.engine('handlebars', hbars({defaultLayout: false}));  // look for files with .handlebars extension and process them with handlebars (pulled in above)
app.set('view engine', 'handlebars');  // view engine should use hbars for processing templates

app.set('port', process.env.PORT || 3000);
// app.use( express.static(__dirname + '/cheese') );  // set location for static files -- css, html, js etc
app.use( bodyParser.urlencoded({extended: true}) );  // parse form submissions
app.use( '/api', require('cors')() );  // set access-control-allow-origin header for api route


// APP START ----------------------------------------------

app.get('/', (req, res, next) => {
  Novel.find({}).lean()
    .then((books) => {
        // res.render( 'home', { books } );
        res.render('home', {books: JSON.stringify(books)});
    })
    .catch(err => next(err));
});


app.get('/detail', (req, res, next) => {
  Novel.findOne( { title: req.query.item } ).lean()
    .then((book) => {
        res.render( 'detail', { book: book } );
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


// gets all books
app.get('/api/books', (req, res, next) => {
  Novel.find({}).lean()
    .then((books) => {
        res.json( { books } );
    })
    .catch(err => next(err));
});


// gets a single book via title
app.get('/api/books/:title', (req, res, next) => {
  Novel.find( { "title": req.params.title } ).lean()
    .then((books) => {
        res.json( { books } );
    })
    .catch(err => next(err));
});


// delete a single book via title
app.post('/api/books/delete', (req, res) => {
  Novel.deleteOne( {title: req.body.title}, (err, result) => {
    if(err) {
      throw err;
    } else {
      if (result.deletedCount == 1) {
        console.log(`${req.body.title} was deleted.`);
      }      
      res.json(result);
    }
  });
});


// add a new book or update an existing book via title 
app.post('/api/books/update', (req, res) => {
  Novel.updateOne( {title: req.body.title}, req.body, {upsert: true}, (err, result) => {
    if(err) {
      throw err;
    } else {
      if (result.upserted) {
        console.log(`${req.body.title} was added.`);
      }
      else if (result.nModified == 1) {
        console.log(`${req.body.title} was changed.`);
      }
      res.json(result);
    }
  });
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
