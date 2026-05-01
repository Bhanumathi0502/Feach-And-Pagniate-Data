import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [url, setUrl] = useState("https://hn.algolia.com/api/v1/search?query=india");
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      let result = await axios(url);
      setData(result.data);
      setPage(1);
    }
    fetchData();
  }, [url]);

  function handleClick() {
    setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`);
  }

  const itemsPerPage = 5;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.hits.slice(startIndex, endIndex);

  return (
    <>
      <h1>React - Get Data</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleClick}>Search</button>


      {currentItems.map((item, index) => (
        <p key={index}>{item.title}</p>
      ))}

      
      <div>
        <button onClick={() => setPage(1)}>1</button>
        <button onClick={() => setPage(2)}>2</button>
        <button onClick={() => setPage(3)}>3</button>
        <button onClick={() => setPage(4)}>4</button>
        <button onClick={() => setPage(5)}>5</button>
      </div>
    </>
  );
}
