import { useState, useEffect } from "react";
import Cards from "./components/Cards.jsx";
import "./styles/container.css";

import "./App.css";

function randomize(array) {
  let randomArray = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]];
  }
  return randomArray;
}

async function fetchPokemon() {
  const allCharacters = `https://pokeapi.co/api/v2/pokemon/`;
  try {
    const response = await fetch(allCharacters);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    const persons = result.results;
    persons.map((character) => {
      // console.log(character.name);
    });
    return persons;
  } catch (error) {
    console.error(error);
  }
}

async function fetchCards() {
  const pokemonArray = [];
  const pokemonObj = await fetchPokemon();
  pokemonObj.map((obj) => pokemonArray.push(obj.name));
  console.log(90, pokemonArray);

  const results = await Promise.allSettled(
    pokemonArray.map(async (name) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!res.ok) throw new Error(`Failed to fetch ${names}`);

      return res.json();
    })
  );
  const cardsObj = results
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.value);
  console.log(cardsObj, 3);
  return cardsObj;
}

export default function App() {
  const [pokemonList, setImageList] = useState([]);
  const [randomPokemonList, randomSetImageList] = useState([]);

  function changePositions() {
    const copyPokemonList = [...pokemonList];
    const newOrderPokemon = randomize(copyPokemonList);
    console.clear();

    setImageList(newOrderPokemon);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCards();
      setImageList(response);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      {pokemonList.map((p, i) => (
        <Cards
          key={p.name + "_20"}
          image={p.sprites.other["official-artwork"].front_default}
          name={p.name}
          number={i}
          onClick={() => {
            changePositions();
          }}
        />
      ))}
    </div>
  );
}
