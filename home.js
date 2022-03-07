let preloader = document.querySelector(".preloader");
let footer = document.querySelector(".footer");
let con = document.querySelector("#pokemonContent");
let frag = document.createDocumentFragment();
const CANT_POKE = 807;


function fetchPokemon (app){
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
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${result.id}.png`,
          type: result.types.map((type) => type.type.name),
          id: result.id
      }));//destructuring result
      displayPokemon(pokemon,app);
  });
};
function displayPokemon (pokemon,app){
  const pokemonHTMLString = pokemon
      .map(
          son => `
          <a class="card" id="${son.id}">
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
          </a>
  `
      )
      .join('');
  app.innerHTML = pokemonHTMLString;
  preloader.classList.toggle("hidden");
};
function cons(type){
  if(type){
    switch (type) {
      case "fire":
        return "fa-fire"
        break;
        case "electric":
          return "fa-bolt"
          break;
          case "poison":
            return "fa-skull-crossbones"
            break;
            case "grass":
              return "fa-leaf";
              break;
              case "water":
              return "fa-water";
              break;
              case "bug":
              return "fa-bug";
              break;
              case "flying":
                return "fa-wind";
                break;
                case "fairy":
                return "fa-syringe";
                break;
                case "psychic":
                return "fa-bullseye";
                break;
                case "fighting":
                return "fa-fist-raised";
                break;
                case "dragon":
                return "fa-dragon";
                break;
                case "ice":
                return "fa-snowflake";
                break;
                case "normal":
                  return "fa-circle-notch";
                  break;
                  case "rock":
                return "fa-octagon";
                break;
                case "ground":
                return "fa-mountain";
                break;
                case "ghost":
                return "fa-ghost";
                break;
                case "dark":
                return "fa-adjust";
                break;
                case "steel":
                  return "far fa-wrench";
                  break;
      default:
        break;
  }
  }
}
   const pokeContent = document.getElementById('pokemonContent');
   let pokeForm = document.getElementById('searchPokemon');
   pokeContent.addEventListener("click", e =>pokeContent.classList.toggle("hidden"));

   pokeForm.addEventListener('submit', e =>{
    e.preventDefault();
    const expRegEmail = /[0-9]/gi;
    let searchPokemon = document.getElementById('pokemon').value;
    if(document.getElementById('pokemon').value<=898){
      if(expRegEmail.test(searchPokemon) == false){

      }else{
        getPokemon(searchPokemon, true);
        pokeContent.textContent="";
        pokeContent.classList.toggle("hidden");
      }
    }
    

});

function getPokemon(id){
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  .then(res => res.json())
  .then(data => {
    const poke_types = data.types.map(type => type.type.name);
      pokeContent.textContent="";
      pokeContent.innerHTML = `
      <div class="pCards">
      <div class="n">
      <h3>${data.name}</h3>
      </div>
      <div class="cards ">
      <div class="img-container">
      <img src=${data.sprites.front_default} />
      </div>
      <div class="infos">
      <small class="type"><span class="t ${poke_types[0]}">${poke_types[0]}</span></small>
      <small class="type"><span class="t ${poke_types[1]}">${poke_types[1]}</span></small>

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

 //----------------------------------------------------------------------------------------
function clickPoke(e){
  getPokemon(e.target.id);
    pokeContent.textContent="";
    pokeContent.classList.toggle("hidden");
}
