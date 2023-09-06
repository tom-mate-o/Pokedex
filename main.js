let pkmn_name;
let pkmn_img;
let pkmn_nr;
let pkmn_type;
let pkmn_description;

async function getPokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
  console.log(url);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      pkmn_name = data.name.charAt(0).toUpperCase() + data.name.slice(1); // Erste Buchstabe groß schreiben
      pkmn_nr = "#" + data.id;
      pkmn_img = data.sprites.other["official-artwork"].front_default;
      pkmn_type = data.types[0].type.name;

      fetch(speciesUrl)
        .then((response) => response.json())
        .then((speciesData) => {
          const descriptionArray = speciesData.flavor_text_entries;
          const englishDescription = descriptionArray.find(
            (flavorText) => flavorText.language.name === "en"
          );
          pkmn_description = englishDescription;

          displayPokemon();
        });
    });
}

function getPokemonIdFromUser() {
  const id = document.getElementById("input").value;
  getPokemon(id);
}

// Event-Listener für Enter-Taste hinzufügen
document.getElementById("input").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    getPokemonIdFromUser();
    document.getElementById("input").value = "";
  }
});

document
  .getElementById("button")
  .addEventListener("click", getPokemonIdFromUser);

getPokemon(1);
getPokemonIdFromUser();

function displayPokemon() {
  const typeElement = document.getElementById("pkmn_type");
  typeElement.innerHTML = pkmn_type;
  // entfernt alle klassen um konflikte zu vermeiden
  typeElement.classList.remove(
    "normal",
    "fire",
    "flying",
    "fighting",
    "water",
    "grass",
    "poison",
    "electric",
    "ground",
    "psychic",
    "rock",
    "ice",
    "bug",
    "dragon",
    "ghost",
    "dark",
    "steel",
    "fairy"
  );

  // fügt die klasse die benötigt wird hinzu

  typeElement.classList.add(pkmn_type);

  document.getElementById("pkmn_name").innerHTML = pkmn_name;
  document.getElementById("pkmn_nr").innerHTML = pkmn_nr;
  document.getElementById("pkmn_type").innerHTML = pkmn_type;
  document.getElementById("pkmn_img").src = pkmn_img;

  // Extrahiert den Text aus dem englishDescription-Objekt
  const pkmn_description_text = pkmn_description
    ? pkmn_description.flavor_text
    : "Description not found";

  // Fügen Sie den Text in das entsprechende HTML-Element ein, z.B. "pkmn_text".
  document.getElementById("pkmn_text").innerHTML = pkmn_description_text;
}
