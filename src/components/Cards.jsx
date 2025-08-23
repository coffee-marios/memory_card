import React, { useState, useEffect } from "react";
import "../styles/container.css";

function Cards({ name, image, number, cheating, onClick }) {
  return (
    <div className="Cards">
      <img src={image} alt={name} onClick={() => onClick(name, number)} />

      {
        <div className={cheating ? "show-names" : "hide-names"}>
          <p>
            {name.toUpperCase()}:&nbsp;&nbsp;&nbsp;&nbsp; {number}
          </p>
        </div>
      }
    </div>
  );
}

export default Cards;
