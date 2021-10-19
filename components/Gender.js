import React, { useEffect, useState } from "react";

import Image from "next/image";

function Gender({ id, image }) {
  const [gender, setGender] = useState({});

  const genderColor = {
    male: "#0089D0",
    female: "#DF478D",
    genderless: "#8284A7"
  }

  let fetchGender = () => {
    fetch(`https://pokeapi.co/api/v2/gender/${(id + 1).toString()}`)
      .then((response) => response.json())
      .then((response) => {
        setGender(response);
      });
  };

  useEffect(() => {
    fetchGender();
  }, [id]);

  return (
    <div className="flex flex-col">
      <h2 className="text-gray-800 font-bold text-lg">Gender</h2>
      <div className="flex flex-row items-center -mt-3">
      <p className="font-normal capitalize text-sm text-white px-4 py-2 rounded-full" 
      style={{backgroundColor: genderColor[gender.name]}}>{gender.name}</p>
      <div className="relative h-24 w-20 -mt-1">
        <Image src={image} layout="fill" />
      </div>
      </div>

      
    </div>
  );
}

export default Gender;
