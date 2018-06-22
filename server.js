const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

// Require all models
const db = require('./models');

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const request = require('request');
const cheerio = require('cheerio');

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/Article';

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

mongoose.connection.once('open', function() {
  console.log('Mongoose connection successful.');
});

mongoose.connection.on('error', function(error) {
  console.log('Mongoose Error: ', error);
});

const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Use express.static to serve the public folder as a static directory
app.use(express.static('public'));

// Use morgan logger for logging requests
app.use(logger('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/text
app.use(bodyParser.text());

// Set Handlebars.
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  partialsDir: path.join(__dirname, '/views/layouts/partials'),
}));
app.set('view engine', 'handlebars');

// A GET route for scraping the echoJS website
app.get('/scrape', function(req, res) {
  // First, we grab the body of the html with request
  request('https://www.nytimes.com/', function(error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(html);
    // Now, we grab every h2 within an article tag, and do the following:
    $('article').each(function() {
      // console.log('LOOK HERE _________---------', $(this).children('div.result'));
      const result = {};

      result.title = $(this)
        .children('h2')
        .text();

      result.summary = $(this)
        .children('.summary')
        .text();


      result.link = $(this)
        .children('h2')
        .children('a')
        .attr('href');

      // console.log('Start of Result **********', result);
      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(`LOOK HERE dbArticle!! ${dbArticle}`);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          console.log(err);
        });
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    res.send('Scrape Complete');
  });
});

// GET requests to render Handlebars pages
app.get('/', function(req, res) {
  db.Article.find({ saved: false }, function(error, data) {
    const hbsObject = {
      article: data,
    };
    res.render('index', hbsObject);
  });
});

// Route for getting all Articles from the db
app.get('/articles', function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({ saved: false })
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get('/articles/:id', function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in
  // our db...
  db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate('note')
    .then(function(dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to
      // the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// // Route for saving/updating an Article's associated Note
// app.post('/articles/:id', function(req, res) {
//   // Create a new note and pass the req.body to the entry
//   db.Note.create(req.body)
//     .then(function(dbNote) {
//       // If a Note was created successfully, find one Article with an `_id` equal to
//       // `req.params.id`. Update the Article to be associated with the new Note
//       // { new: true } tells the query that we want it to return the updated User -- it
//       // returns the original by default
//       // Since our mongoose query returns a promise, we can chain another `.then` which
//       // receives the result of the query
//       return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
//     })
//     .then(function(dbArticle) {
//       // If we were able to successfully update an Article, send it back to the client
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });

// Create a new note
app.post('/notes/save/:id', function(req, res) {
  // Create a new note and pass the req.body to the entry
  const newNote = new db.Note({
    body: req.body.text,
    article: req.params.id,
  });
  console.log(req.body);
  // And save the new note the db
  newNote.save(function(error, note) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise
    else {
      // Use the article id to find and update it's notes
      db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { notes: note } })
      // Execute the above query
        .exec(function(err) {
          // Log any errors
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            // Or send the note to the browser
            res.send(note);
          }
        });
    }
  });
});

app.get('/saved', function(req, res) {
  db.Article.find({ saved: true }).populate('notes').exec(function(error, articles) {
    const hbsObject = {
      article: articles,
    };
    res.render('saved', hbsObject);
  });
});

// Save an article
app.post('/articles/save/:id', function(req, res) {
  // Use the article id to find and update its saved boolean
  console.log(req.params.id);
  db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true })
  // Execute the above query
    .exec(function(err, doc) {
    // Log any errors
      if (err) {
        console.log(err);
      } else {
      // Or send the document to the browser
        res.send(doc);
      }
    });
});

// Delete an article
app.post('/articles/delete/:id', function(req, res) {
  // Use the article id to find and update its saved boolean
  db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false, notes: [] })
  // Execute the above query
    .exec(function(err, doc) {
    // Log any errors
      if (err) {
        console.log(err);
      } else {
      // Or send the document to the browser
        res.send(doc);
      }
    });
});


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log(`Server listening on: http://localhost:${PORT}`);
});

