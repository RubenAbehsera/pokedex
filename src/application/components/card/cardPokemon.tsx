import {PokemonDetail} from "../../models/pokemon_detail";
import {FunctionComponent} from "react";
import "./card.css"
import {ucfirst} from "../../methods/strings";

interface cardPokemonProps {
    pokemon : PokemonDetail,
}

export const CardPokemon : FunctionComponent<cardPokemonProps> = ({pokemon}:cardPokemonProps) => (
    <div className={"card"}>
        <div className={"card_image"}>
            <img src={pokemon.image}/>
        </div>
        <h2 className={"card_title"}>{ucfirst(pokemon.name)}</h2>
    </div>
    )
