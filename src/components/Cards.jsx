import React, { useState, useEffect } from "react";

function Cards({
  name,
  image,
  number,
  cheating,
  onClick,
  borderImage,
  className,
  onMouseDown,
  onMouseUp,
}) {
  return (
    <div className="Cards">
      <br />
      <br />
      <img
        src={image}
        alt={name}
        className={className}
        onClick={() => onClick(name, number)}
        onMouseDown={(event) => {
          onMouseDown(event);
        }}
        onMouseUp={(event) => {
          onMouseUp(event);
        }}
      />

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
