import React, { useEffect, useState } from "react";

const Test = () => {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch("http://127.0.0.1:5000/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 4 }}>
        <p>image: </p>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ border: "1px solid gray" }}
        />
        <button style={{ border: "1px solid gray" }} onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {data ? (
        <>
          <img src={url}></img>
          <p>Predicted Result: {data.predicted_label}</p>
          <p>{data.prompt_response}</p>
        </>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Test;
