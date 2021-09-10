import {useState} from "react";
import {PokemonDetail} from "../../models/pokemon_detail";


export const usePokemonPopup = () => {
    const [isActive, setIsActive] = useState<boolean>(false)
    const [pokemonToShow, setPokemonToShow] = useState<PokemonDetail|null>(null)

    const handleClick = (pokemon: PokemonDetail) => {
        setIsActive(!isActive)
        setPokemonToShow(pokemon)
    }

    return {handleClick, pokemonToShow, isActive}
}
