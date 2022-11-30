//pedir datos de pokemon de pokeapi

const container = document.querySelector(".poke-container");
const search = document.querySelector("#search");

search.addEventListener("click", () => {
  const input = document.querySelector("#input").value;
  fetchPokemon(input);
});

function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.json())
    .then((data) => {
      createPokemon(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function fetchPokemons(number) {
    for (let i = 1; i <= number; i++) {
        fetchPokemon(i);
    }
}

function createPokemon(pokemon) {

    const card = document.createElement("div");
    card.classList.add("card");

    const body = document.createElement("div");
    body.classList.add("card-body");

    const inside = document.createElement("div");
    inside.classList.add("d-flex");
    inside.classList.add("px-md-1");

    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;

    const text = document.createElement("div");
    text.classList.add("text-end");

    const number = document.createElement("h3");
    number.textContent = `#${pokemon.id.toString().padStart(3, "0")}`;
    number.classList.add("text-info");

    const name = document.createElement("h3");
    name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    inside.appendChild(sprite);
    inside.appendChild(text);
    text.appendChild(number);
    text.appendChild(name);

    body.appendChild(inside);

    card.appendChild(body);


    container.appendChild(card);

    card.addEventListener("click", () => {
      
      const modal = new bootstrap.Modal(document.getElementById("pokemonModal"));
    });

}

fetchPokemons(24);