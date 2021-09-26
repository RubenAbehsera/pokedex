import {FunctionComponent} from "react";
import {MdFilterList} from "react-icons/md";
import './filter.css'

export const FilterPokemon: FunctionComponent = () => {
    return(
        <div>
            <button className="filterButton" role="button">
                Filter <span> <MdFilterList color={'white'}/></span>
            </button>
        </div>
    )
}