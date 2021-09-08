import {PokemonDetail} from "../../../application/models/pokemon_detail";
import {DOMAttributes, FunctionComponent} from "react";

interface cardPokemonProps {
    pokemon : PokemonDetail
}


export const CardPokemon : FunctionComponent<cardPokemonProps> = ({pokemon}:cardPokemonProps) => (
    <div>
        <h2>
            {pokemon.name}
        </h2>
    </div>
)