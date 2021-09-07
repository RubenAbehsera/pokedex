import {Pokemon} from "../../application/models/pokemon";
import {PokemonDetail} from "../../application/models/pokemon_detail";

export const fetchAllPokemons = async () => {
    let arrayPokemon: Pokemon[] = []
     arrayPokemon = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then((response) => response.json())
        .then((data) => {
            data.results.forEach((pokemon: Pokemon) => {
                arrayPokemon.push(pokemon)
            })
            return arrayPokemon
        })
    return arrayPokemon
}

export const fetchOnePokemon = async (pokemon : Pokemon) => {
    let pokemenDetails : PokemonDetail = {height: 0, id: 0, image: "", name: "", types: [], weight: 0}
    pokemenDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        .then((response) => response.json())
        .then((result) => {
            pokemenDetails = {
                name: result.name,
                id: result.id,
                types: result.types,
                height: result.height,
                weight: result.weight,
                image: result.sprites["front_default"]
            }
            return pokemenDetails
        })

    return pokemenDetails
}

