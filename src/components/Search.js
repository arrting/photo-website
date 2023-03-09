import React, { useState } from "react";

const Search = ({ search, setInput }) => {
  const inputHandeler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="search">
      <input onChange={inputHandeler} type="text" />
      <button onClick={search}>Search</button>
    </div>
  );
};

export default Search;
