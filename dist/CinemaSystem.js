"use strict";
// 🎟️ Movie Ticket Booking System
// 🍿 Create a system where users can book tickets and check seat availability.
//
// 1. Create an enum called MovieGenre with at least 5 movie genres.
// 2. Create a tuple type called Seat which holds (rowLetter: string, seatNumber: number).
// 3. Create a type alias called Movie which contains: movieId (number), title (string), genre (MovieGenre), availableSeats (Seat[]).
// 4. Create a function called addMovie which adds a movie to the movies array. The function needs to return a Movie object.
// 5. Create a function called bookSeat which removes a seat from availableSeats if available. The return needs to be a string.
// 6. Create a function called checkSeatAvailability which returns true if a seat is available and false otherwise.
var MovieGenre;
(function (MovieGenre) {
    MovieGenre["Action"] = "Action";
    MovieGenre["Comedy"] = "Comedy";
    MovieGenre["SciFi"] = "Scifi";
    MovieGenre["Romance"] = "Romance";
    MovieGenre["Animation"] = "Animation";
    // add 4 more
})(MovieGenre || (MovieGenre = {}));
const movies = [];
function findMovie(movieId) {
    return movies.find((m) => m.movieId === movieId);
}
function addMovie(movieId, title, genre, availableSeats) {
    const newMovie = {
        movieId,
        title,
        genre,
        availableSeats,
    };
    movies.push(newMovie);
    return newMovie;
}
function bookSeat(movieId, rowLetter, seatNumber) {
    const movie = findMovie(movieId);
    if (!movie)
        return 'Movie is not found.';
    const seatIndex = movie.availableSeats.findIndex((seat) => seat[0] === rowLetter && seat[1] === seatNumber);
    if (seatIndex === -1) {
        return `Sorry seat ${rowLetter}${seatNumber} is not available.`;
    }
    movie.availableSeats.splice(seatIndex, 1);
    return `Seat ${rowLetter}${seatNumber} was booked successfully!`;
}
function checkSeatAvailability(movieId, rowLetter, seatNumber) {
    const movie = findMovie(movieId);
    if (!movie)
        return false;
    return movie.availableSeats.some((seat) => seat[0] === rowLetter && seat[1] === seatNumber);
}
// Test cases (Create more if needed)
console.log(addMovie(1, 'Avengers', MovieGenre.Action, [
    ['A', 1],
    ['A', 2],
])); // { movieId: 1, title: "Avengers", genre: MovieGenre.Action, availableSeats: [["A", 1], ["A", 2]] }
console.log(bookSeat(1, 'A', 1)); // "Seat A1 booked successfully"
console.log(checkSeatAvailability(1, 'A', 1)); // false
console.log(addMovie(2, 'Lilo & Stitch', MovieGenre.Animation, [
    ['B', 1],
    ['B', 2],
]));
console.log(bookSeat(2, 'C', 1));
console.log(checkSeatAvailability(2, 'B', 1));
