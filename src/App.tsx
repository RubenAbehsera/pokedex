import React, { useState, useEffect, FunctionComponent } from "react";
import "./index.css";

function App() {
  const [pokedex, setPokedex] = useState<any | null>([]);
  const [types, setTypes] = useState<any>([]);
  const [pokemons, setPokemons] = useState(pokedex);
  const [search, setSearch] = useState("");

  // Alors, tout ce qui va être type / interface / enum, à ta place
  // je les mettrais dans un dossier models avec 1 ou plusieurs fichiers selon le besoin.
  type Pokemon = {
    name: string;
    url: string;
  };

  
  type Type = {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  };

  
  type PokemonDetail = {
    name: string;
    id: number;
    types: Type[];
    height: number;
    weight: number;
    image: string;
  };

  // La place de ta méthode n'est pas ici. Attention, les majuscules en DÉBUT de nom sont UNIQUEMENT
  // pour le nom des Component comprenant du JSX. Tout ce qui va être considéré comme autre chose doit impérativement commencer par une minuscule.
  const ApiAllPokemon = () => {
    // ta méthode apiAllPokemon est intéressante mais beaucoup trop longue.
    // Afin de faciliter la lecture, je t'encourage à découper cette méthode :
      // D'une part, tu vas avoir une première méthode asynchrone fetchAllPokemons()
      // Cette méthode va ensuite appeler une seconde méthode : fetchAllPokemonDetails(pokemon) où l'argument
      // pokemon entre parenthèse va être ton "element".
      // En pratique, ça signifie que tu auras ton data.results.forEach((element: Pokemon) => fetchAllPokemonDetails(element))
    useEffect(() => {
      // GET request using fetch inside useEffect React hook
      fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then((response) => response.json())
        .then((data) => {
          // Evite les any le plus possible. A prioi c'est quasiment interdit (officieusement). un any ça veut dire : je sais pas trop
          const newPokedex: any = [];
          // Fetch data for each pokemon
          data.results.forEach((element: Pokemon) => {
            // en ES6++ tu peux utiliser ce qu'on appelle les string literals (interpolation) je te montre un exemple
            // ci dessous :
            fetch(`https://pokeapi.co/api/v2/pokemon/${element.name}`)
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
                // je vois que tu as setPokedex ET setPokemons qui font exactement la même chose
                // à mon avis, un seul est suffisant.
                setPokedex([...newPokedex]);
                setPokemons([...newPokedex]);
              });
          });
        });

      // Cette partie là où tu récupères la liste des types peut se trouver dans un autre fichier (comme toutes tes méthodes asynchrones jusqu'ici)
      // Tu peux lui donner un nom comme : fetchAllTypes() et ensuite l'appeler directement dans ton useEffect
      fetch("https://pokeapi.co/api/v2/type")
        .then((response) => response.json())
        .then((data) => {
          // setTypes(data.result); là, je ne connais pas le model de réponse que ça te renvoie mais à priori, je dirai que c'est un tableau de base
          setTypes([...data.results]);
        })

        .catch((error) => console.log(error, "error"));
      // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    // Return a list of Pokemon {name, url}
    return pokedex;
  };

  // Même commentaire ici : ceci n'est pas un Component avec du JSX donc utiliser une minuscule. De plus les méthodes (même que précédemment), 
  // doivent être dans un fichier différent. Ne mélangeons pas logiques / rendering dans l'optique de faciliter la lecture.
  // Je veux savoir où chercher quand ça déconne.
  const FilterByType = (pokedex: PokemonDetail[], type: string) => {
    // Cette partie est probablement la seule qui me pose véritablement un problème et ce que tu as le moins bien réussi.
    // C'est normal, c'était le but de ma demande.
    // essaye de regarder la méthode : filter en Javascript. Le problème que tu rencontres ici selon ta méthode :
    // Si je ne met pas de type, je garde tout
    // Sinon, tu vas recréer / modifier un tableau. 
    // Tu pourrais juste grâce à un filter t'épargner toute logique superflue et ça te retournerai une copie de ton tableau qui répondrait
    // à ta condition. Plus rapide et plus performant :) 
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


  // Ce commentaire s'applique à TOUS tes Components ci dessous :
  // Chaque component doit avoir une interface Props qui reprend ce que tu fais entre tes accolades pour les typer
  // Chacun de tes component sont à priori des FunctionalComponent (typescript/react) qui vont prendre une interface pour les typer
  // je te corrige le premier et je te laisse te renseigner sur pourquoi/comment pour les suivants
  // Je termine avec un petit : 1 fichier par Component et donc du coup, avoir un dossier : components dans lequel se trouve tout, c'est plutôt une bonne pratique
  interface TitleProps {
    title: string;
  }

  const Title: FunctionComponent<TitleProps> = ({ title }: TitleProps) =>  (
    <h1 className="red"> {title}</h1>
  );

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
  // Ce n'est pas un bug, c'est un comportement normal
  // De plus, si ça bug, c'est qu'il faut éviter de faire des call trop rapide. Tu peux par exemple mettre un delay sur l'appel (et attendre quelques secondes)
  // afin d'avoir plusieurs lettres avant d'appeler l'api. (c'est une idée)
  const handleChange = (event: any) => {
    setSearch(event.target.value);
  };

  const handleSearch = (event: any) => {
    handleChange(event);
    let value = event.target.value.toLowerCase();
    let result = [];
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
