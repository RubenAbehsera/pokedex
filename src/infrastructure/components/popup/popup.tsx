import {FunctionComponent} from "react";
import {PokemonDetail} from "../../../application/models/pokemon_detail";
import  "./popup.css"

interface popupProps {
    pokemon : PokemonDetail
    state : boolean
}

export const Popup: FunctionComponent<popupProps> = ({pokemon, state}: popupProps) => (
    <div className={state ? "visibile" :  "hidden"}>
        <h2>Name: {pokemon.name}</h2>
        <p>State : {state}</p>
    </div>
)