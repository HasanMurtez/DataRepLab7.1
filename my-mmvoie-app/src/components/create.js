import axios from "axios"; // Importing axios for making HTTP requests
import { useState } from "react"; // Importing useState hook for state management

const Create = () => {

    // State variables for storing input values
    const [title, setTitle] = useState(''); // Title of the movie
    const [year, setYear] = useState(''); // Year of the movie
    const [poster, setPoster] = useState(''); // URL for the movie poster

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const movie = { title, year, poster }; // Create a movie object with form data
        console.log(movie); // Log the movie object to the console for debugging

        // Make a POST request to the server to add the movie
        axios.post('http://localhost:4000/api/movies', movie)
        .then((res) => { console.log(res.data); }) // Log the response data from the server
        .catch(); // Catch and handle any errors (consider adding error handling here)
    }

    return (
        <div>
            <h3>Hello from create component!</h3>
            <form onSubmit={handleSubmit}> {/* Attach the handleSubmit function to the form */}
                <div className="form-group">
                    <label>Add Movie Title: </label>
                    <input type="text"
                        className="form-control" // Bootstrap class for styling
                        value={title} // Bind the input value to the title state
                        onChange={(e) => { setTitle(e.target.value); }} // Update title state on change
                    />
                </div>
                <div className="form-group">
                    <label>Add Movie Year: </label>
                    <input type="text"
                        className="form-control" // Bootstrap class for styling
                        value={year} // Bind the input value to the year state
                        onChange={(e) => { setYear(e.target.value); }} // Update year state on change
                    />
                </div>
                <div className="form-group">
                    <label>Add Movie Poster: </label>
                    <input type="text"
                        className="form-control" // Bootstrap class for styling
                        value={poster} // Bind the input value to the poster state
                        onChange={(e) => { setPoster(e.target.value); }} // Update poster state on change
                    />
                </div>
                <div>
                    <input type="submit" value="Add Movie" /> {/* Submit button for the form */}
                </div>
            </form>
        </div>
    );
}

export default Create; // Export the Create component for use in other parts of the app
