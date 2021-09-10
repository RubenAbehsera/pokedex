import {FunctionComponent, useEffect, useState} from "react";
import {PokemonDetail} from "../../models/pokemon_detail";
import {PopupPokemon} from "../popup/popup";
import {CardPokemon} from "../card/cardPokemon";
import {usePokemonPopup} from "./listController";

interface listPokemonProps {
    pokemons: PokemonDetail[];

}

export const  ListPokemon: FunctionComponent<listPokemonProps> = ({ pokemons }: listPokemonProps) => {
const {handleClick, pokemonToShow, isActive} = usePokemonPopup()

    return(
    <div className={"PokemonContainer"}>
        <ul>
            {pokemons.map((pokemon: PokemonDetail, index: number) => {
                return (
                    <li
                        key={index}
                        onClick={()=>{
                            handleClick(pokemon)
                        }
                        }>
                        <CardPokemon pokemon={pokemon}/>
                    </li>
                )
            })}
        </ul>
        <PopupPokemon pokemon={pokemonToShow} state={isActive}/>
    </div>)
};