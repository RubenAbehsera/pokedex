import {FunctionComponent, useEffect, useState} from "react";
import {PokemonDetail} from "../../models/pokemon_detail";
import {PopupPokemon} from "../popup/popup";
import {CardPokemon} from "../card/cardPokemon";
import {usePokemonPopup} from "./listController";
import "./list.css"

interface listPokemonProps {
    pokemons: PokemonDetail[];

}

export const  ListPokemon: FunctionComponent<listPokemonProps> = ({ pokemons }: listPokemonProps) => {
const {handleClick, pokemonToShow, isActive, handlePopup} = usePokemonPopup()

    return(
    <div className={"cards-list"}>
            {pokemons.map((pokemon: PokemonDetail, index: number) => {
                return (
                    <div
                        key={index}
                        onClick={()=>{
                            handleClick(pokemon)
                        }
                        }>
                        <CardPokemon pokemon={pokemon}/>
                    </div>
                )
            })}
        <PopupPokemon action={handlePopup} pokemon={pokemonToShow} state={isActive}/>
    </div>)
};