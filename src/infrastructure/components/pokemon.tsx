import {FunctionComponent} from "react";
import {PokemonDetail} from "../../application/models/pokemon_detail";

interface listPokemonProps {
    pokemons: PokemonDetail[];
}

export const  ListPokemon: FunctionComponent<listPokemonProps> = ({ pokemons }: listPokemonProps) =>  (
        <div className={"PokemonContainer"}>
            <ul>
                {pokemons.map((pokemon:PokemonDetail, index : number)=>{
                    return (<li key={index}>{pokemon.name}</li>)
                })}
            </ul>
        </div>
);