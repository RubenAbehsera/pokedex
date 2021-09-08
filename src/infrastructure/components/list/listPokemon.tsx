import {FunctionComponent, useState} from "react";
import {PokemonDetail} from "../../../application/models/pokemon_detail";
import {Popup} from "../popup/popup";
import {CardPokemon} from "../card/cardPokemon";

interface listPokemonProps {
    pokemons: PokemonDetail[];
}

export const  ListPokemon: FunctionComponent<listPokemonProps> = ({ pokemons }: listPokemonProps) => (

        <div className={"PokemonContainer"}>
            <ul>
                {pokemons.map((pokemon:PokemonDetail, index : number)=>{
                    return (
                        <li  key={index}>
                          <CardPokemon pokemon={pokemon}/>
                            <Popup pokemon={pokemon} state={false}/>
                        </li>
                    )
                })}
            </ul>
        </div>
);