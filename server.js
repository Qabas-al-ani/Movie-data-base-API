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
    if(err) {
      console, log(err);
    } else {
      res.json(results);
    }
  });
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
