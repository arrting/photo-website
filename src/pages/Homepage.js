import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";

function Homepage() {
  const [input, setInput] = useState("");
  let [data, setData] = useState(null);
  let [page, setPage] = useState(2);
  let [currentSearch, setCurrentSearch] = useState("");
  const auth = "ektT6TQCHxRUjFTITPmrZDbxD1AxoUrR6jc4EkXnVYT6obgZBCVRnmC5";
  const intialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const searchUrl = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=1`;

  //fetch data from pexels api

  const search = async (url) => {
    setPage(2);
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parseData = await dataFetch.json();
    setData(parseData.photos);
    // console.log(parseData.photos);
  };
  // load more picture
  const morepicture = async () => {
    let newURL;
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    }
    setPage(page + 1);

    const dataFetch = await fetch(newURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    });
    let parseData = await dataFetch.json();
    setData(data.concat(parseData.photos));
  };

  //feach data when the page load up
  useEffect(() => {
    search(intialURL);
  }, []);

  useEffect(() => {
    if (currentSearch === "") {
      search(intialURL);
    } else {
      search(searchUrl);
    }
  }, [currentSearch]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          setCurrentSearch(input);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Picture data={d} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morepicture}>Load more</button>
      </div>
    </div>
  );
}

export default Homepage;
