import {FunctionComponent, MouseEventHandler, useState} from "react";
import {PokemonDetail} from "../../models/pokemon_detail";
import  "./popup.css"
import {ucfirst} from "../../methods/strings";

interface popupProps {
    pokemon : PokemonDetail | null
    state : boolean
    action : MouseEventHandler
}

export const PopupPokemon: FunctionComponent<popupProps> = ({pokemon, state,action}: popupProps) => {
    return (
        <div
            className={state ? "popup visibile" :  "hidden"} onClick={action}>
            <div className={"popup_informations"} >
                <h2>Id: {pokemon?.id}</h2>
                <img src={pokemon?.image} alt={pokemon?.name}/>
                <div className={"types"}>
                    {pokemon?.types.map((type)=>{
                        return(
                            <div className={`type ${type.type.name}`}>
                                <p>{type.type.name}</p>
                            </div>
                        )
                    })}
                </div>
                <h3>{ucfirst(pokemon?.name)}</h3>
            </div>
        </div>
    )
}