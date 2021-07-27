import React from "react";
import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [pokedex, setPokedex] = useState<any | null>([]);
  const [types, setTypes] = useState<any>([]);
  const [pokemons, setPokemons] = useState(pokedex);
  const [search, setSearch] = useState("");

  // We define what's a Pokemon to fetch data from the global pokemon list
  type Pokemon = {
    name: string;
    url: string;
  };

  // We define what's a type is for pokemon's types
  type Type = {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  };

  // We define what's a Pokemon in detail
  type PokemonDetail = {
    name: string;
    id: number;
    types: Type[];
    height: number;
    weight: number;
    image: string;
  };

  const ApiAllPokemon = () => {
    // Use a React Hook with effect
    // We can execute UseEffect only one time if [] in the dependance array or many time depending of what we put inside
    useEffect(() => {
      // GET request using fetch inside useEffect React hook
      fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then((response) => response.json())
        .then((data) => {
          const newPokedex: any = [];
          // Fetch data for each pokemon
          data.results.forEach((element: Pokemon) => {
            fetch("https://pokeapi.co/api/v2/pokemon/" + element.name)
              .then((response) => response.json())
              .then((result) => {
                const poke: PokemonDetail = {
                  name: result.name,
                  id: result.id,
                  types: result.types,
                  height: result.height,
                  weight: result.weight,
                  image: result.sprites["front_default"]
                };
                newPokedex.push(poke);
                setPokedex([...newPokedex]);
                setPokemons([...newPokedex]);
              });
          });
        });
      // Get all the possible types as well
      fetch("https://pokeapi.co/api/v2/type")
        .then((response) => response.json())
        .then((data) => {
          setTypes([...data.results]);
        })

        .catch((error) => console.log(error, "error"));
      // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    // Return a list of Pokemon {name, url}
    return pokedex;
  };

  // Filter pokemon by their type
  const FilterByType = (pokedex: PokemonDetail[], type: string) => {
    setPokedex(pokemons);
    var newPokedex: PokemonDetail[] = [];
    if (type === "") {
      setPokedex(pokemons);
    } else {
      pokedex.forEach((pokemon) =>
        pokemon.types.map((poke) => {
          if (poke.type.name === type) {
            newPokedex.push(pokemon);
            return pokedex;
          }
          setPokedex(newPokedex);
          return pokedex;
        })
      );
    }
    return newPokedex;
  };

  // Title component H1
  const Title = (props: { title: string }) => {
    return <h1 className="red"> {props.title}</h1>;
  };

  // Pokemon item
  const DisplayPokemon = (props: { pokemon: PokemonDetail; action: any }) => {
    return (
      <li onClick={props.action}>
        <p className="bold">
          {props.pokemon.id}. {props.pokemon.name}
        </p>
        <img src={props.pokemon.image} alt={props.pokemon.name} />
      </li>
    );
  };

  const Popup = (props: {
    pokemon: PokemonDetail;
    class: string;
    action: any;
  }) => {
    return (
      <div onClick={props.action} className={props.class}>
        <h2>ID : {props.pokemon.id}</h2>
        <h3>{props.pokemon.name}</h3>
        <img src={props.pokemon.image} alt={props.pokemon.name} />
        <p>Height : {props.pokemon.height}</p>
        <p>Weight : {props.pokemon.weight}</p>
        {props.pokemon.types.map((types: Type, key: number) => (
          <p>
            Type {key + 1} : {types.type.name}
          </p>
        ))}
        <button>Fermer</button>
      </div>
    );
  };

  // Pokemon Card = item + popup

  const Card = (props: { pokemon: PokemonDetail }) => {
    const [isActive, setActive] = useState(false);

    return (
      <div className={"pokemonCard"}>
        <DisplayPokemon
          action={() => {
            setActive(!isActive);
          }}
          pokemon={props.pokemon}
        />

        <Popup
          action={() => {
            setActive(!isActive);
          }}
          class={isActive ? "visible" : "hidden"}
          pokemon={props.pokemon}
        />
      </div>
    );
  };

  // We display a list based on a array of Pokemon.
  const List = (props: { pokemons: PokemonDetail[] }) => {
    return (
      <ul className={"container"}>
        {props.pokemons.map((pokemon: PokemonDetail, key: number) => (
          <Card key={key} pokemon={pokemon} />
        ))}
      </ul>
    );
  };

  // Component to display every type filter
  const DisplayTypes = (props: { types: Type["type"][] }) => {
    return (
      <div>
        <button onClick={() => FilterByType(pokemons, "")}>Tous</button>
        {props.types.map((type, key) => (
          <button key={key} onClick={() => FilterByType(pokemons, type.name)}>
            {type.name}
          </button>
        ))}
      </div>
    );
  };

  // Searchbar handler to fix what we write in the sidebar
  // [BUG] without i can't see what i'm writting but with i have to stop on every letter [BUG]
  const handleChange = (event: any) => {
    setSearch(event.target.value);
  };

  const handleSearch = (event: any) => {
    handleChange(event);
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = pokemons.filter((data: PokemonDetail) => {
      return data.name.search(value) !== -1;
    });
    setPokedex(result);
  };

  // Searchbar
  const Search = () => {
    return (
      <form action="/" method="get">
        <input
          type="text"
          id="header-search"
          placeholder="Search pokemon"
          name="search"
          value={search}
          onChange={(event) => handleSearch(event)}
        />
      </form>
    );
  };

  return (
    <div className="App">
      <Title title="Pokédex" />
      <Search />
      <DisplayTypes types={types} />
      <List
        pokemons={ApiAllPokemon().sort((a: PokemonDetail, b: PokemonDetail) =>
          a.id > b.id ? 1 : -1
        )}
      />
    </div>
  );
}

export default App;
