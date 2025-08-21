import React, { useState, useEffect } from "react";
import "../styles/container.css";

function Cards({ name, image, number, clicked, onClick }) {
  // console.log(name, image);
  return (
    <div className="Cards" onClick={() => onClick(name, number)}>
      <img src={image} alt={name} />

      {
        <p>
          {name}&nbsp;&nbsp;&nbsp;&nbsp; {number}
        </p>
      }
    </div>
  );
}

export default Cards;
