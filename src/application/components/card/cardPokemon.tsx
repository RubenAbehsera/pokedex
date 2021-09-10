import {PokemonDetail} from "../../models/pokemon_detail";
import {DOMAttributes, FunctionComponent, MouseEventHandler} from "react";

interface cardPokemonProps {
    pokemon : PokemonDetail,
}

export const CardPokemon : FunctionComponent<cardPokemonProps> = ({pokemon}:cardPokemonProps) => (
        <div>
            <h2>
                {pokemon.name}
            </h2>
        </div>
)
