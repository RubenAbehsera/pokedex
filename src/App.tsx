import './App.css';
import {fetchAllPokemons, fetchOnePokemon} from "./infrastructure/api/api";
import {useEffect, useState} from "react";
import {PokemonDetail} from "./application/models/pokemon_detail";
import {ListPokemon} from "./infrastructure/components/pokemon";

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
            <header className="App-header">
                <ListPokemon pokemons={pokedex}/>
            </header>
        </div>
    );
}

export default App;
