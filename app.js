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
normal: '#FFFFFF'
}
const main_types = Object.keys(colors);
const app = document.querySelector(".app");
let frag = document.createDocumentFragment();
const CANT_POKE = 60;
window.addEventListener("load",drawPokemon());
async function drawPokemon () {
  for (let i = 1; i <= CANT_POKE; i++) {
  await getPok(i);
}
app.appendChild(frag);
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
    div.classList.add(`${type}`)
    div.innerHTML = `
    <div class="img-container">
    <img src=${son.sprites.front_default} />
    </div>
    <div class="info">
    <span class="number">#${son.id
                    .toString()
                    .padStart(3, '0')}</span>
    <h3 class="name">${son.name}</h3>
</div>
    `
    return div;
   /*<small class="type">Tipo: <span>${son.types[0].type.name}</span></small>*/
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
  const ajax = new XMLHttpRequest();
  ajax.addEventListener("load", e=> {
      let json = JSON.parse(ajax.response);
      
      const poke_types = json.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
      pokeContent.textContent="";
      pokeContent.innerHTML = `
      <div class="pCards ${type}">
      <div class="n">
      <h3>${json.name}</h3>
      </div>
      <div class="cards ">
      <div class="img-container">
      <img src=${json.sprites.front_default} />
      </div>
      <div class="infos">
      <small class="type">Tipo: <span>${type}</span></small>
      <small class="type">Vida: <span>${json.stats[0].base_stat}</span></small>
      <small class="type">Ataque: <span>${json.stats[1].base_stat}</span></small>
      <small class="type">Defensa: <span>${json.stats[2].base_stat}</span></small>
      <small class="type">Speed: <span>${json.stats[5].base_stat}</span></small>
      <small class="type">Peso: <span>${json.weight/10} Kg</span></small>
     </div>
     </div>
     </div>
      `
      
  });
  ajax.open("GET",`https://pokeapi.co/api/v2/pokemon/${id}`);
  ajax.send();
 }

   
