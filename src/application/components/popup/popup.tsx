import {FunctionComponent, useState} from "react";
import {PokemonDetail} from "../../models/pokemon_detail";
import  "./popup.css"

interface popupProps {
    pokemon : PokemonDetail | null
    state : boolean
}

export const PopupPokemon: FunctionComponent<popupProps> = ({pokemon, state}: popupProps) => (
    <div className={state ? "visibile" :  "hidden"}>
        <h2>Name: {pokemon?.name}</h2>
        <p>State : {state}</p>
    </div>
)