const express = require('express'); // Importing Express for building the server
const app = express(); // Initializing the Express application
const port = 4000; // Defining the port for the server
const mongoose = require('mongoose'); // Add Mongoose for MongoDB connection

// MongoDB connection
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:<db_password>@cluster0.bjz0r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

// Defining a schema and data model for movies
const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  poster: String,
});

const Movie = mongoose.model('Movie', movieSchema);

const cors = require('cors');
app.use(cors()); // Enable CORS for all routes

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

// POST route to add a new movie to the database
app.post('/api/movies', async (req, res) => {
  try {
    const { title, year, poster } = req.body; // Extract data from the request body
    const newMovie = new Movie({ title, year, poster }); // Create a new Movie instance
    await newMovie.save(); // Save the movie to the database
    res.status(201).json({ message: 'Movie created successfully', movie: newMovie }); // Send a success response
  } catch (error) {
    res.status(500).json({ message: 'Error creating movie', error }); // Handle errors
  }
});

// GET route to retrieve all movies from the database
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find({}); // Retrieve all movies
    res.status(200).json(movies); // Send the movies as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies', error }); // Handle errors
  }
});

// GET route to retrieve a movie by its ID
app.get('/api/movie/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id); // Retrieve a movie by its ID
    if (movie) {
      res.status(200).json(movie); // Send the movie as JSON
    } else {
      res.status(404).json({ message: 'Movie not found' }); // Handle movie not found
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movie', error }); // Handle errors
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Log server startup information
});
