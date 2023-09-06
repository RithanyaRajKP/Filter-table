import Table from "./component/Table";
import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [total, setTotal] = useState([]);
  useEffect(() => {
    const api = "https://api.punkapi.com/v2/beers";
    axios.get(api).then((res) => {
      setTotal(Math.ceil(res.data.length / 10));
    });
  }, [total]);
  return (
    <div className="App">
        <Table totalpages={total} />
    </div>
  );
}

export default App;
