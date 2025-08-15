import React, { useState, useEffect } from "react";
import "../styles/Container.css";

function Cards({ name, image }) {
  console.log(name, image);
  return (
    <div className="Cards">
      <img src={image} alt={name} />

      <p>{name}</p>
    </div>
  );
}

export default Cards;
