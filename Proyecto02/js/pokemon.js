//pedir datos de pokemon de pokeapi

const container = document.querySelector(".poke-container");
const search = document.querySelector("#search");

search.addEventListener("click", () => {
  const input = document.querySelector("#input").value;
  container.innerHTML = "";
  fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const pokemon = {
        name: data.name,
        id: `#${data.id.toString().padStart(3, "0")}`,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        types: data.types.map((type) => type.type.name),
        abilities: data.abilities.map((ability) => ability.ability.name),
        height: `${data.height / 10} m`,
        weight: `${data.weight / 10} kg`,
        stats: {
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          specialAttack: data.stats[3].base_stat,
          specialDefense: data.stats[4].base_stat,
          speed: data.stats[5].base_stat,
        },
      };
      console.log(pokemon);
      createBigPokemon(pokemon);

  });
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

}

function createBigPokemon(pokemon) {
  const card = document.createElement("div");
  card.classList.add("big-card");

  const left = document.createElement("div");
  left.classList.add("card-body");
  left.classList.add("left");

  const right = document.createElement("div");
  right.classList.add("card-body");
  right.classList.add("right");

  const sprite = document.createElement("img");
  sprite.src = pokemon.image;

  const name = document.createElement("h3");
  name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  const number = document.createElement("h3");
  number.textContent = pokemon.id;

  const types = document.createElement("div");
  types.classList.add("types");

  pokemon.types.forEach((type) => {
    const typeElement = document.createElement("span");
    typeElement.classList.add("type");
    typeElement.textContent = type;
    types.appendChild(typeElement);
  });

  const abilities = document.createElement("div");
  abilities.classList.add("abilities");

  pokemon.abilities.forEach((ability) => {
    const abilityElement = document.createElement("span");
    abilityElement.classList.add("ability");
    abilityElement.textContent = ability;
    abilities.appendChild(abilityElement);
  });

  const height = document.createElement("div");
  height.classList.add("height");
  height.textContent = `Height: ${pokemon.height}`;

  const weight = document.createElement("div");
  weight.classList.add("weight");
  weight.textContent = `Weight: ${pokemon.weight}`;

  const stats = document.createElement("table");
  stats.classList.add("charts-css");
  stats.classList.add("bar");
  stats.classList.add("show-labels");

  stats.innerHTML = `
    <tr>
      <th scope="row">HP</th>
      <td style="--size:${pokemon.stats.hp * 100 / 12000 }">
        <span class="data"> ${pokemon.stats.hp} </span>
      </td>
    </tr>
    <tr>
      <th scope="row">Attack</th>
      <td style="--size:${pokemon.stats.attack * 100 / 12000 }">
        <span class="data"> ${pokemon.stats.attack} </span>
      </td>
    </tr>
    <tr>
      <th scope="row">Defense</th>
      <td style="--size:${pokemon.stats.defense * 100 / 12000 }">
        <span class="data"> ${pokemon.stats.defense} </span>
      </td>
    </tr>
    <tr>
      <th scope="row">Sp. Attack</th>
      <td style="--size:${pokemon.stats.specialAttack * 100 / 12000 }">
        <span class="data"> ${pokemon.stats.specialAttack} </span>
      </td>
    </tr>
    <tr>
      <th scope="row">Sp. Defense</th>
      <td style="--size:${pokemon.stats.specialDefense * 100 / 12000 }">
        <span class="data"> ${pokemon.stats.specialDefense} </span>
      </td>
    </tr>
    <tr>
      <th scope="row">Speed</th>
      <td style="--size:${pokemon.stats.speed * 100 / 12000 }">
        <span class="data"> ${pokemon.stats.speed} </span>
      </td>
    </tr>

  `;

  left.appendChild(sprite);
  left.appendChild(name);
  left.appendChild(number);
  left.appendChild(types);
  left.appendChild(abilities);
  left.appendChild(height);
  left.appendChild(weight);

  right.appendChild(stats);

  card.appendChild(left);
  card.appendChild(right);

  container.appendChild(card);

  container.classList.remove("poke-container");
  container.classList.add("container");

}

fetchPokemons(24);