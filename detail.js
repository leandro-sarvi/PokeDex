
function detail(root, idPokemon){
    fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
    .then(res => res.json())
    .then(data => {
        root.textContent="";
        root.innerHTML = `
        <div class="pCards">
        <div class="n">
        <h3>${data.name}</h3>
        </div>
        <div class="cards ">
        <div class="img-container">
        <img src= https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPokemon}.png/>
        </div>
        <div class="infos">
        <small class="type"><span class="t ${data.types[0].type.name}">${data.types[0].type.name}</span></small>
        <small class="type"><span class="t ${data.types[1].type.name}">${data.types[1].type.name}</span></small>
        <small class="type">Vida: <span>${data.stats[0].base_stat}</span></small>
        <small class="type">Ataque: <span>${data.stats[1].base_stat}</span></small>
        <small class="type">Defensa: <span>${data.stats[2].base_stat}</span></small>
        <small class="type">Speed: <span>${data.stats[5].base_stat}</span></small>
        <small class="type">Peso: <span>${data.weight/10} Kg</span></small>
        <small class="type">Altura: <span>${data.height/10} m</span></small>
       </div>
       </div>
       </div>
        `
    });
  }
  