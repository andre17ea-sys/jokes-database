// selectez <body> ca să pot adăuga acolo glumele
const body = document.querySelector("body");

// URL-ul serverului Express live pe Render
const baseUrl = "https://jokes-database-server.onrender.com";

// GET către serverul meu Express
fetch(`${baseUrl}/jokes`)
  .then((res) => res.json()) // convertim răspunsul în JSON
  .then((data) => {
    console.log("From server:", data);

    data.forEach((joke) => {
      // parcurg lista de glume

      // const div = document.createElement("div");
      // div.classList.add("joke-box");
      // div.textContent = `${joke.joke} - ${joke.punchline}`;
      //body.appendChild(div);
      // });
      //})
      const div = document.createElement("div");
      div.classList.add("joke-box");

      // creez un paragraf pentru gluma propriu-zisă
      const jokeP = document.createElement("p");
      jokeP.textContent = joke.joke;
      jokeP.style.fontWeight = "bold"; // să iasă în evidență gluma

      // creez un paragraf pentru punchline
      const punchlineP = document.createElement("p");
      punchlineP.textContent = joke.punchline;
      punchlineP.style.marginTop = "5px"; // un pic de spațiu de sus

      // adaug paragrafele în container
      div.appendChild(jokeP);
      div.appendChild(punchlineP);

      // adaug containerul în body
      body.appendChild(div);
    });
  })

  .catch((err) => {
    console.error("Error ocured:", err);
  });

const form = document.getElementById("jokeForm"); // select formularul după ID

form.addEventListener("submit", async (event) => {
  // listener pentru evenimentul de submit
  event.preventDefault(); // previn comportamentul implicit (refresh pagină)

  const joke = document.getElementById("joke").value; // iau valorile din cele două input-uri
  const punchline = document.getElementById("punchline").value;

  // trimit datele către server printr-un POST request
  const res = await fetch(`${baseUrl}/jokes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // spun serverului că trimit JSON
    },
    body: JSON.stringify({ joke, punchline }), // trimit gluma ca obiect JSON
  });

  const data = await res.json(); // citit răspunsul de la server

  console.log(data);

  // (opțional) reset formularul
  form.reset();
});
