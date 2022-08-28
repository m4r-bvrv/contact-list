import React, { CSSProperties } from "react";
import { SyncLoader } from "react-spinners";
import PersonInfo from "./components/PersonInfo/PersonInfo";
import usePersonsList from "./hooks/usePersonsList";
import { Status } from "./shared/types";

const override: CSSProperties = {
  display: "block",
  margin: "30px auto",
};

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
        <SyncLoader
          loading={status === Status.Pending}
          cssOverride={override}
        />
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
          {status === Status.Rejected ? "Try again" : "Load more"}
        </button>
      </div>
    </div>
  );
}

export default App;
