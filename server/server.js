import express from "express"; //creez un server web
import dotenv from "dotenv"; //accesez variabile din .env file
import cors from "cors"; //permite cereri de la client/frontend
import pg from "pg"; //pt conectarea la baza de date PostgreSQL

dotenv.config(); //citim/ configuram variabilele din .env file=loads env. var.

// initializez aplicatia Express / instansiate the server
const app = express();

// setup MIDDLEWARE
app.use(cors()); //permite cereri cross-origin=my server can talk to other server
app.use(express.json()); //my serveer can read json=citeste date din json

// set up database connection
const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STRING, //conexiunea vine din .env
});

//GET route test
app.get("/", (req, res) => {
  res.status(200).json(`My server ⚒️⚒️💪⚒️🎉🎉`);
});

// GET toate jokes din database
app.get("/jokes", async (req, res) => {
  const result = await db.query(`SELECT * FROM jokes`); // fetch all jokes from sql table si le trimit ca JSON
  res.json(result.rows);
});

// POST adaug o gluma noua in database / make a post route to allow people to make new jokes
app.post("/jokes", async (req, res) => {
  // When the client sends up infromation it is always in the request.body
  const { joke, punchline } = req.body; //iau datele from req

  await db.query(`INSERT INTO jokes (joke, punchline) VALUES ($1, $2)`, [
    joke,
    punchline,
  ]);

  res.json({ status: `Joke inserted successfully into database` }); //confirm.
});

//app.listen(8080, () => {
//console.log("Server started on http://localhost:8080");
//});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

// from 32: aparent pot scrie in 2 moduri-cel de jos e din clasa:
//  const jokeFromClient = req.body.joke
//  const punchlineFromClient = req.body.punchline
// const data = await db.query(`INSERT INTO jokes (joke, punchline) VALUES ($1, $2)`, [jokeFromClient, punchlineFromClient])
