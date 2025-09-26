import pg from "pg";
import dotenv from "dotenv";

// încarcă variabilele din fișierul .env
dotenv.config();

// creează o conexiune la baza de date
const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STRING,
});

// inserează alta gluma în "jokes table", folosind placeholder pt siguranta
db.query(`INSERT INTO jokes (joke, punchline) VALUES ($1, $2)`, [
  "Why did the chicken cross the road?",
  "To get to the other side",
]);

//insert more jokes in Jokes table from supabase
db.query(`INSERT INTO jokes (joke, punchline) VALUES ($1, $2)`, [
  "Why do birds fly south in the winter?",
  "It’s faster than walking!",
]);

db.query(`INSERT INTO jokes (joke, punchline) VALUES ($1, $2)`, [
  "Why can’t you ever tell a joke around glass?",
  "It could crack up.",
]);
