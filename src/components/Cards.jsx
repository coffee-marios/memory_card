import React, { useState, useEffect } from "react";
import "../styles/container.css";

function Cards({ name, image, number }) {
  console.log(name, image);
  return (
    <div className="Cards">
      <img src={image} alt={name} />

      {/* <p>
        {name}&nbsp;&nbsp;&nbsp;&nbsp; {number + 1}
      </p> */}
    </div>
  );
}

export default Cards;
