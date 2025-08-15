import { useState, useEffect } from "react";
import Cards from "./components/Cards.jsx";
import "./styles/Container.css";

import "./App.css";

const characters = [
  "charizard",
  "blastoise",
  "venusaur",
  "greninja",
  "infernape",
];

async function fetchCards(names) {
  const results = await Promise.allSettled(
    names.map(async (name) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!res.ok) throw new Error(`Failed to fetch ${names}`);
      return res.json();
    })
  );
  return results.filter((r) => (r.status = "fulfilled")).map((r) => r.value);
}

export default function App() {
  const [pokemonList, setImageList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCards(characters);
      setImageList(response);
    };
    fetchData();
  }, []);
  return (
    <div className="Cards">
      {" "}
      {pokemonList.map((p, i) => (
        <Cards
          key={i}
          image={p.sprites.other["official-artwork"].front_default}
          name={p.name}
        />
      ))}
    </div>
  );
}
