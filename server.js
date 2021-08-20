const express = require("express");
// importing mysql
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// concat to data base
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "movie_db",
});
// connected to the database
db.connect(err => {
  if (err) {
    console, log("error");
  } else {
    console.log("connected");
  }
});

// GET method that will select all movies in data base and return the results as json
app.get("/api/movies", (req, res) => {
  db.query("SELECT * FROM movies", function (err, results) {
    if (err) {
      console, log(err);
    } else {
      res.json(results);
    }
  });
});

// POST method that will add new movie to the list in database
app.post("/api/add-movie", (req, res) => {
  db.query(
    "INSERT INTO movies (movie_name) VALUES (?)",
    req.body.movie,
    function (err, results) {
      if (err) {
        console, log(err);
      } else {
        res.json(`This movie ${req.body.movie.toUpperCase()} was added`);
      }
    }
  );
});

// POST method that will add new review
app.post("/api/update-review", (req, res) => {
  db.query(
    "UPDATE reviews SET review = ? WHERE id = ?",
    [req.body.review, req.body.id],
    function (err, results) {
      if (err) {
        console, log(err);
      } else {
        res.json(`This review ${req.body.review} was added`);
      }
    }
  );
});

// DELETE method that will delete movie with the right id
app.delete("/api/movie/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM movies WHERE id = ?", id, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      res.json(`This movie ${id} was deleted`);
    }
  });
});

// if there is no response show the error message 404
app.use((req, res) => {
  res.status(404).end();
});

// listen to PORT
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
