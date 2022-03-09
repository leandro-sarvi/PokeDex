const CANT_POKE = 807;
let preloader = document.querySelector(".preloader");
let footer = document.querySelector(".footer");
let con = document.querySelector("#pokemonContent");
let app = document.querySelector(".app");
app.addEventListener("click", clickPoke);
con.addEventListener("click", hiddenDetail);
window.addEventListener("load", fetchPokemon);