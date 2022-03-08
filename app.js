let preloader = document.querySelector(".preloader");
let footer = document.querySelector(".footer");
let con = document.querySelector("#pokemonContent");
let app = document.querySelector(".app");
const CANT_POKE = 807;
window.addEventListener("load", fetchPokemon);
app.addEventListener("click", clickPoke);
con.addEventListener("click", hiddenDetail);