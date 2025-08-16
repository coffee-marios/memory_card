import { useState, useEffect } from "react";
import Cards from "./components/Cards.jsx";
import "./styles/container.css";

import "./App.css";

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
      console.log(character.name);
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
  console.log(pokemonArray);

  const results = await Promise.allSettled(
    pokemonArray.map(async (name) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!res.ok) throw new Error(`Failed to fetch ${names}`);
      return res.json();
    })
  );
  return results.filter((r) => r.status === "fulfilled").map((r) => r.value);
}

export default function App() {
  const [pokemonList, setImageList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCards();
      setImageList(response);
    };
    fetchData();
  }, []);
  return (
    <div className="container">
      {" "}
      {pokemonList.map((p, i) => (
        <Cards
          key={i}
          image={p.sprites.other["official-artwork"].front_default}
          name={p.name}
          number={i}
        />
      ))}
    </div>
  );
}
