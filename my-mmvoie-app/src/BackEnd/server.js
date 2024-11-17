const express = require('express'); // Importing Express for building the server
const app = express(); // Initializing the Express application
const port = 4000; // Defining the port for the server
const mongoose = require('mongoose'); // Add Mongoose for MongoDB connection

// MongoDB connection
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:<db_password>@cluster0.bjz0r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

const cors = require('cors'); 
app.use(cors()); 

// Middleware to handle CORS headers explicitly
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific HTTP methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Allow specific headers
  next(); // Pass control to the next middleware
});

const bodyParser = require('body-parser'); // Importing body-parser for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

// GET route to return a list of movies
app.get('/api/movies', (req, res) => {
    const movies = [
        {
          "Title": "Avengers: Infinity War (server)",
          "Year": "2018",
          "imdbID": "tt4154756",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
        },
        {
          "Title": "Captain America: Civil War (server)",
          "Year": "2016",
          "imdbID": "tt3498820",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
        },
        {
          "Title": "World War Z (server)",
          "Year": "2013",
          "imdbID": "tt0816711",
          "Type": "movie",
          "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
        }
      ];
    res.status(200).json({ movies }); // Send the movies array as JSON with a 200 status
});


app.post('/api/movies', (req, res) => {
    console.log(req.body.title); // Log the title from the request body to the console
    res.send("Movie Added!"); // Send a response indicating the movie was added
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Log server startup information
});
