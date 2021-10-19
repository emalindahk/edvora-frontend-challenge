import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import LinearProgress from "@mui/material/LinearProgress";

import { pokeTypes } from "../colors";
import Gender from "../components/Gender";
import PokemonMoves from "../components/PokemonMoves";

export default function Home({ data }) {
  const [count, setCount] = useState(0);
  const [pokemon, setPokemon] = useState({});
  const [ability, setAbility] = useState({});
  const last = data.results.length - 1;

  const nextPokemon = () => {
    if (count < last) {
      setCount(count + 1);
    } else {
      setCount(0);
    }
  };

  const prevPokemon = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setCount(last);
    }
  };

  let fetchPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${(count + 1).toString()}`)
      .then((response) => response.json())
      .then((response) => {
        setPokemon(response);
      });
  };

  let fetchAbility = () => {
    fetch(`https://pokeapi.co/api/v2/ability/${(count + 1).toString()}`)
      .then((response) => response.json())
      .then((response) => {
        setAbility(response);
      });
  };

  useEffect(() => {
    fetchPokemon();
    fetchAbility();
  }, [count]);

  return (
    <div>
      <Head>
        <title>Poke Catalog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main
        className="flex flex-col items-center justify-center w-full flex-1 px-5 
        lg:px-20 text-center md:py-10 pb-56 sm:pb-20 h-full"
        style={{
          backgroundColor: `${
            pokemon && pokemon.name
              ? pokeTypes[pokemon.types[0].type.name] + "96"
              : "#7ac74c96"
          }`,
        }}
      >
        <div className="flex justify-between w-full py-8">
          <div className="flex flex-row space-x-4 items-center">
            <button
              className="flex items-center justify-center text-white bg-gray-600 h-8 w-8 font-bold rounded-full"
              onClick={prevPokemon}
            >
              <NavigateBeforeIcon />
            </button>
            <p className="font-semibold capitalize text-base">
              {count == 0
                ? data.results[`${last}`].name
                : data.results[`${count - 1}`].name}
            </p>
          </div>

          <div className="flex flex-row space-x-4 items-center ">
            <p className="font-semibold capitalize text-base">
              {count == 0
                ? data.results[`${count + 1}`].name
                : data.results[`${count}`].name}
            </p>
            <button
              className="flex items-center justify-center text-white bg-gray-600 h-8 w-8 font-bold rounded-full"
              onClick={nextPokemon}
            >
              <NavigateNextIcon />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 w-full">
          <div className="flex flex-col space-y-4 font-bold capitalize text-lg text-gray-800 items-center">
            <div className="relative h-48 w-48 md:h-72 md:w-72">
              <Image
                src={
                  pokemon && pokemon.name
                    ? pokemon.sprites.other["dream_world"].front_default
                    : "/pokemons.svg"
                }
                alt={pokemon.name}
                layout="fill"
              />
            </div>

            <span className="flex flex-row space-x-3 text-left items-center text-lg">
              <p className="font-semibold text-base text-gray-600">
                No. {pokemon.id}
              </p>
              <p className="font-bold capitalize text-xl text-gray-800">
                {pokemon.name}
              </p>
            </span>

            <div className="flex flex-col space-y-3 py-8 lg:py-0 w-full item-start">
              <div className="flex justify-start  space-x-2">
                <p className="">Type</p>
                {pokemon.types?.map((type) => (
                  <span
                    key={type.type.name}
                    className="py-2 px-4 rounded-full "
                    style={{ backgroundColor: pokeTypes[type.type.name] }}
                  >
                    <p className="font-semibold capitalize text-white text-sm">
                      {type.type.name}
                    </p>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2 items-center">
                <p>Height:</p>
                <span className="text-base font-medium text-gray-600 lowercase">
                  {pokemon.height / 10} m
                </span>
              </div>
              <div className="flex space-x-2 items-center">
                <p>Weight:</p>
                <span className="text-base font-medium text-gray-600">
                  {pokemon.weight / 10} kg
                </span>
              </div>
              <div className="flex space-x-2 items-center">
                <p>Evolve:</p>
                <span className="text-base font-medium text-gray-600">
                  {pokemon.evolves_from_species
                    ? pokemon.evolves_from_species.name
                    : "None"}
                </span>
              </div>
              <div className="text-left pr-2">
                <span className="flex text-base font-medium text-gray-600 ">
                  <p className="text-lg text-gray-800 font-bold mr-2">
                    Ability:
                  </p>
                  {ability && ability.name
                    ? ability.effect_entries[1].short_effect
                    : ""}
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col rounded-2xl bg-gray-200 ">
            <div className="grid md:grid-cols-2 text-lg text-gray-600 p-4 text-left space-y-8 md:space-y-0">
              <div className="flex flex-col items-centre md:items-start">
                <h2 className="text-xl text-gray-800 font-bold text-center md:text-left">
                  Base Stats
                </h2>
                <h4 className="pb-8 text-center md:text-left">
                  Total (
                  {pokemon.stats?.reduce((a, b) => {
                    return a + b.base_stat;
                  }, 0)}
                  )
                </h4>
                <div className="w-3/4">
                  {pokemon.stats?.map((stat) => (
                    <div
                      className="flex flex-col space-y-2"
                      key={stat.stat.name}
                    >
                      <p className="font-semibold capitalize text-base pt-2">
                        {stat.stat.name}
                      </p>
                      <div className="flex flex-row space-x-1 justify-between items-center">
                        <LinearProgress
                          variant="determinate"
                          value={stat.base_stat}
                          className="w-full h-4 rounded-lg bg-gray-700"
                        />
                        <span className="text-sm">{stat.base_stat}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <h2 className="text-xl text-gray-800 font-bold text-center md:text-left">
                  Characteristics
                </h2>
                <div className="flex flex-col">
                  <Gender
                    id={count}
                    image={
                      pokemon && pokemon.name
                        ? pokemon.sprites.front_default
                        : "/pokemons.svg"
                    }
                  />
                  <PokemonMoves id={count} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const pokeData = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=500`
  ).then((res) => res.json());

  return {
    props: {
      data: pokeData,
    },
  };
}
