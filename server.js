const express = require("express");
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

db.connect(err => {
  if (err) {
    console, log("error");
  } else {
    console.log("connected");
  }
});

app.get("/api/movies", (req, res) => {
  db.query("SELECT * FROM movies", function (err, results) {
    if (err) {
      console, log(err);
    } else {
      res.json(results);
    }
  });
});

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

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
