import React, { useState, useEffect } from "react";
import "../styles/container.css";

function Cards({ name, image, number, cheating, onClick }) {
  return (
    <div className="Cards" onClick={() => onClick(name, number)}>
      <img src={image} alt={name} />

      {
        <div className={cheating ? "hide-names" : "show-names"}>
          <p>
            {name.toUpperCase()}:&nbsp;&nbsp;&nbsp;&nbsp; {number}
          </p>
        </div>
      }
    </div>
  );
}

export default Cards;
