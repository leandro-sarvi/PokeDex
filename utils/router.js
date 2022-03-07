const details = document.querySelector("#pokemonContent");
const app = document.querySelector(".app");
function router(){
    let { hash } = window.location; 
  
    if(/#\/pokemon\/[0-9]+/.test(hash)){
      const id = hash.match(/[0-9]+/);
      detail(details, id);
    }
    else{
      switch(hash){
        case '': 
          fetchPokemon (app);
          break;
      }
    }
    
  }