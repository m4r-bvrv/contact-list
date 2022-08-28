import React from "react";
import PersonInfo from "./components/PersonInfo/PersonInfo";
import usePersonsList from "./hooks/usePersonsList";

function App() {
  const { data, selected, loadMore } = usePersonsList();

  const handleClick = async () => {
    loadMore();
  };

  return (
    <div className="App">
      <div className="selected">Selected contacts: {selected.length}</div>
      <div className="list">
        {data.map((personInfo) => (
          <PersonInfo key={personInfo.id} data={personInfo} />
        ))}
        <button type="button" onClick={handleClick}>
          Load more
        </button>
      </div>
    </div>
  );
}

export default App;
