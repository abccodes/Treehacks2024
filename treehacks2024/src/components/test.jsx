import React, { useEffect, useState } from "react";

const Test = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Replace "http://localhost:5000" with the actual base URL of your Flask app
    fetch("http://127.0.0.1:5000/api/items")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // The empty array ensures this effect runs only once after the initial render

  return (
    <div>
      {data ? (
        data.map((item) => {
          return <p>{item.title}</p>;
        })
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};
export default Test;
