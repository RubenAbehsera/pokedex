import './App.css';
import {fetchAllPokemons, fetchOnePokemon} from "./application/api/api";
import {useEffect, useState} from "react";
import {PokemonDetail} from "./application/models/pokemon_detail";
import {ListPokemon} from "./application/components/list/listPokemon";
import {FilterPokemon} from "./application/components/filter/filter";

function App() {
    // When the composant as load, fetch all pokemons, get the url of each and fetch each pokemon's information
    const [pokedex, setPokedex] = useState<PokemonDetail[]>([])

    useEffect(()=>{
        fetchAllPokemons()
            .then(async r => r.map((e)=>(
                fetchOnePokemon(e)
                    .then(async r => setPokedex(pokedex =>[...pokedex,r]))
            )))
    },[])

    return (
        <div className="App">
            <FilterPokemon/>
            <ListPokemon pokemons={pokedex}/>
        </div>
    );
}

export default App;
