import Movies from "./movies"; 
import { useEffect, useState } from "react"; 
import axios from "axios"; // Importing axios for making HTTP requests

const Read = () => {

  // State variable to store the list of movies fetched from the server
  const [movies, setMovies] = useState([]);

  // useEffect runs on component mount to fetch data from the server
  useEffect(() => {
    // Axios GET request to fetch movies from the server
    axios.get('http://localhost:4000/api/movies')
      .then((response) => {
        console.log(response.data); // Log the server response for debugging
        setMovies(response.data.movies); // Update the movies state with the data received
      })
      .catch((error) => {
        console.log(error); // Log any errors during the request
      });
  });

  return (
    <div>
      <h3>Hello from read component!</h3>
      {/* Passing the movies array as a prop to the Movies component */}
      <Movies myMovies={movies} />
    </div>
  );
}

export default Read; // Export the Read component for use in other parts of the app
