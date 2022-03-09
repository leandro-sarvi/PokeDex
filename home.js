function fetchPokemon (){
  const promises = [];
  for (let i = 1; i <= CANT_POKE; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(fetch(url).then((res) => res.json()));
  }/*
  1- Promise.all(iterable)
   Este método puede ser útil para agregar resultados de múltiples promesas
  */
  Promise.all(promises).then(results => {
      const pokemon = results.map(result => ({
          name: result.name,
          image: result.sprites['other']['official-artwork']['front_default'],
          type: result.types.map((type) => type.type.name),
          id: result.id
      }));//destructuring result
      displayPokemon(pokemon);
      preloader.classList.toggle("hidden");
  });
};
function displayPokemon (pokemon){
  const pokemonHTMLString = pokemon
      .map(
          son => `
          <div class="card">
          <div class="info">
          <div class="info-name">
          <span class="number">#${son.id
                          .toString()
                          .padStart(3, '0')}</span>
          <h3 class="name">${son.name}</h3>
          </div>
          <div class="iconsTypes">
          <div class="tipos ${son.type[0]}">
          <i class="fas ${cons(son.type[0])}"></i>
          </div>
          <div class="tipos ${son.type[1]}">
          <i class="fas ${cons(son.type[1])}"></i>
          </div>
          </div>
      </div>
      <div>
          <img src=${son.image} />
          </div>
          <div class="tipos normal infom" id="${son.id}">
          <i class="fas fa-info"></i>
          </div>
          </div>
  `
      )
      .join('');
  app.innerHTML = pokemonHTMLString;
};
function cons(type){
  switch (type) {
    case "fire":
      return "fa-fire"
      case "electric":
        return "fa-bolt"
        case "poison":
          return "fa-skull-crossbones"
          case "grass":
            return "fa-leaf";
            case "water":
            return "fa-water";
            case "bug":
            return "fa-bug";
            case "flying":
              return "fa-wind";
              case "fairy":
              return "fa-syringe";
              case "psychic":
              return "fa-bullseye";
              case "fighting":
              return "fa-fist-raised";
              case "dragon":
              return "fa-dragon";
              case "ice":
              return "fa-snowflake";
              case "normal":
                return "fa-circle-notch";
                case "rock":
              return "fa-octagon";
              case "ground":
              return "fa-mountain";
              case "ghost":
              return "fa-ghost";
              case "dark":
              return "fa-adjust";
              case "steel":
                return "far fa-wrench";
}
};
 //----------------------------------------------------------------------------------------
function clickPoke(e){
 if(e.target.classList.contains("infom")){
   con.textContent="";
   getPokemon(e.target.id);
   con.classList.toggle("hidden");
 }
};
function hiddenDetail(){
  con.classList.toggle("hidden");
}
function getPokemon(id){
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  .then(res => res.json())
  .then(data => {
    const poke_types = data.types.map(type => type.type.name);
let secu ="";
    if(poke_types[1]){
      secu = poke_types[1];
    }
      con.textContent="";
      con.innerHTML = `
      <div class="pCards">
      <div class="n ${poke_types[0]}">
      <h3>${data.name}</h3>
      </div>
      <div class="cards">
      <div class="infos">
      <div class="base rot1">
      <small class="type">Id: <span class="t ${poke_types[0]}">#${data.id}</span></small>
      <small class="type">Type: <span class="t ${poke_types[0]}">${poke_types[0]}</span></small>
      <small class="type"><span class="t ${secu}">${secu}</span></small>
      <small class="type">Peso: <span class="t ${poke_types[0]}">${data.weight/10} Kg</span></small>
      <small class="type">Altura: <span class="t ${poke_types[0]}">${data.height/10} m</span></small>
      </div>
      <div>
      <img src=${data.sprites['other']['official-artwork']['front_default']} />
      </div>
      <div class="base rot2">
      <small class="type">Vida: <span class="t ${poke_types[0]}">${data.stats[0].base_stat}</span></small>
      <small class="type">Ataque: <span class="t ${poke_types[0]}">${data.stats[1].base_stat}</span></small>
      <small class="type">Defensa: <span class="t ${poke_types[0]}">${data.stats[2].base_stat}</span></small>
      <small class="type">Speed: <span class="t ${poke_types[0]}">${data.stats[5].base_stat}</span></small>
      </div>
     </div>
     </div>
     </div>
      `
  });
 };