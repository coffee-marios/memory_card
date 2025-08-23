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
    persons.map((character) => {});
    return persons;
  } catch (error) {
    console.error(error);
  }
}

async function fetchCards() {
  const pokemonArray = [];
  const pokemonObj = await fetchPokemon();
  pokemonObj.map((obj) => pokemonArray.push(obj.name));

  const results = await Promise.allSettled(
    pokemonArray.map(async (name) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!res.ok) throw new Error(`Failed to fetch ${names}`);

      return res.json();
    })
  );
  const cardsObj = results
    .filter((r) => r.status === "fulfilled")
    .map((r) => ({
      ...r.value,
      number: 0,
    }));
  console.log(cardsObj, 3);
  return cardsObj;
}

export default function App() {
  const [pokemonList, setImageList] = useState([]);
  const [randomPokemonList, randomSetImageList] = useState([]);
  const [shouldReorder, setShouldReorder] = useState(false);
  const [score, setScore] = useState([0, 0]);
  const [cheating, setCheating] = useState(false);

  function startNewGame() {
    setImageList((prev) => prev.map((poke) => ({ ...poke, number: 0 })));
    setScore([0, 0]);
    setShouldReorder(true);
    setCheating(false);
  }

  function handleClick(name, number) {
    let scoreCopy = [...score];
    if (scoreCopy[0] >= 20) {
      startNewGame();
      return;
    }

    if (number === 0) {
      let hits = score[0];
      hits += 1;
      scoreCopy[0] = hits;
    } else {
      let loses = score[1];
      loses += 1;
      scoreCopy[1] = loses;
    }
    setScore(scoreCopy);

    let newNumber = number + 1;

    const copyPokemonList = [...pokemonList];
    const newOrderPokemon = randomize(copyPokemonList);

    setImageList((prev) =>
      prev.map((poke) =>
        poke.name === name ? { ...poke, number: newNumber } : poke
      )
    );
    setShouldReorder(true);
  }

  useEffect(() => {
    const copyPokemonList = [...pokemonList];
    const newOrderPokemon = randomize(copyPokemonList);
    if (shouldReorder) {
      setImageList(() => newOrderPokemon);
      setShouldReorder(false);
    }
  }, [shouldReorder]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCards();
      setImageList(response);
      setShouldReorder(true);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="side-bar">
          <div className="instruction">
            <p>
              {score[0] < 20
                ? "Try to click each picture only one time until you click all of them."
                : "Click any picture to start a new game"}
            </p>
          </div>

          <div className="keepScore">
            <p className="hits">HITS: {score[0]}</p>
            <p className="losses">LOSSES: {score[1]}</p>
          </div>
        </div>

        <div className="container-pokemon">
          {pokemonList.map((p, i) => (
            <Cards
              key={p.name + "_20"}
              image={p.sprites.other["official-artwork"].front_default}
              name={p.name}
              number={p.number}
              onClick={(name, number) => handleClick(name, number)}
              cheating={cheating}
            />
          ))}
        </div>
      </div>
      <div className="buttons-bottom-div">
        <button onClick={() => startNewGame()}>Restart</button>
        <button onClick={() => setCheating(!cheating)}>
          {cheating ? "Clear" : "Cheat"}{" "}
        </button>
      </div>
    </div>
  );
}
