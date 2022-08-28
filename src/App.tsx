import React from "react";
import PersonInfo from "./components/PersonInfo/PersonInfo";
import usePersonsList from "./hooks/usePersonsList";
import { Status } from "./shared/types";

function App() {
  const { status, error, data, selected, loadMore } = usePersonsList();

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
        {status === Status.Rejected && (
          <div className="error" role="alert">
            {error?.message}
          </div>
        )}
        <button
          type="button"
          onClick={handleClick}
          disabled={status === Status.Pending}
        >
          Load more
        </button>
      </div>
    </div>
  );
}

export default App;
