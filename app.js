const colors = {
  fire: '#FFA05D',
grass: '#8FD594',
electric: '#FFE43B',
water: '#7E97C0',
ground: '#CAAC4D',
rock: '#90642D',
poison: '#9D5B9B',
bug: '#EAFD71',
dragon: '#97b3e6',
psychic: '#FF96B5',
flying: '#CDCDCD',
fighting: '#FF5D5D',
normal: '#FFFFFF',
fairy: '#ff0080'
};
const main_types = Object.keys(colors);
let preloader = document.querySelector(".preloader");
let footer = document.querySelector(".footer");
const app = document.querySelector(".app");
let frag = document.createDocumentFragment();
const CANT_POKE = 151;
window.addEventListener("load",drawPokemon());

async function drawPokemon () {
  for (let i = 1; i <= CANT_POKE; i++) {
  await getPok(i);
}
app.appendChild(frag);
footer.classList.toggle("hidden");
//eventos para click img(dentro del div app)
const enlaces = app.querySelectorAll("img");
enlaces.forEach(function(img){
  img.addEventListener('click', clickPoke); 
});
preloader.classList.toggle("hidden");
}

 async function getPok (id){
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const rest = await fetch(url);
  const pokemon = await rest.json();
  frag.appendChild(createPokemon(pokemon));
}
   function createPokemon(son){
    const poke_types = son.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    let div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <div class="info">
    <div>
    <span class="number">#${son.id
                    .toString()
                    .padStart(3, '0')}</span>
    <h3 class="name">${son.name}</h3>
    </div>
    <div class="tipos ${type}">
    <i class="fas ${cons(type)}"></i>
    </div>
</div>
<div>
    <img id="${son.id}" src=${son.sprites.front_default} />
    </div>
    `
    return div;
   /*<small class="type">Tipo: <span>${son.types[0].type.name}</span></small>*/
   }
function cons(type){
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
                return "fa-helmet-battle";
                break;
    default:
      break;
  }
  if(type=="fire"){
    return "fa-fire";
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
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
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
      <small class="type"><span class="t ${type}">${type}</span></small>
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
//----------------------menu--------------------------------------------------------------
let overlay = document.querySelector(".overlay");
let menu = document.querySelector("i");
let modal = document.querySelector(".modal");
let enlaces = modal.querySelectorAll("a");
enlaces.forEach(function(a){
  a.addEventListener('click', clickMenuModal); 
});
menu.addEventListener("click",clickMenu);
function clickMenuModal(){
  modal.classList.toggle("open");
  overlay.classList.toggle("hidden");
}
function clickMenu(){
  modal.classList.toggle("open");
  overlay.classList.toggle("hidden");
}
overlay.addEventListener("click",clickOverlay);
function clickOverlay(){
  modal.classList.toggle("open");
  overlay.classList.toggle("hidden");
}
