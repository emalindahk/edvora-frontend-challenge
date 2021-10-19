import React, { useState, useEffect } from "react";

import { damageTypes } from "../colors";

function PokemonMoves({ id }) {
  const [moves, setMoves] = useState({});
  const damages = moves && moves.name ? moves.damage_class.name : "";

  let fetchMoves = () => {
    fetch(`${process.env.POKEAPI_BASE_URL}move/${(id + 1).toString()}`)
      .then((response) => response.json())
      .then((response) => {
        setMoves(response);
      });
  };

  useEffect(() => {
    fetchMoves();
  }, [id]);

  console.log(moves);

  return (
    <div className="flex flex-col text-lg text-gray-800 space-y-4 items-start font-bold">
      <div className="flex flex-col space-y-2">
        <h2 className="text-lg">Damage</h2>
        <p
          className="text-sm text-white rounded-full px-4 py-2 capitalize"
          style={{ backgroundColor: damageTypes[damages] }}
        >
          {" "}
          {damages}
        </p>
      </div>

      <div className="flex flex-col space-y-2">
        <h2 className="text-lg">Moves</h2>
        <ul className="flex flex-row space-x-2 flex-wrap">
          {moves.contest_combos?.normal.use_before?.map((move, index) => {
            return (
              <li
                key={index}
                className="rounded-full border-2 border-gray-800 px-4 py-1 font-medium
                    text-sm m-2"
              >
                {move.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default PokemonMoves;
