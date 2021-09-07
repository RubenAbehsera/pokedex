import {Type} from './type'
export interface PokemonDetail{
    name: string;
    id: number;
    types: Type[];
    height: number;
    weight: number;
    image: string;
}