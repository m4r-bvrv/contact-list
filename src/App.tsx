import React, { CSSProperties } from "react";
import { SyncLoader } from "react-spinners";
import PersonInfo from "./components/PersonInfo/PersonInfo";
import usePersonsList from "./hooks/usePersonsList";
import { Status } from "./shared/types";

const spinnerOverride: CSSProperties = {
  display: "block",
  margin: "30px auto",
};

function App() {
  const { status, error, data, selected, loadMore, select } = usePersonsList();

  const handleClick = () => {
    loadMore();
  };

  const isSelected = (id: string) =>
    selected.some((personId) => personId === id);

  return (
    <div className="App">
      <div className="selected">Selected contacts: {selected.length}</div>
      <div className="list">
        {data.map((personInfo) => (
          <PersonInfo
            key={personInfo.id}
            data={personInfo}
            onClick={() => select(personInfo.id)}
            className={isSelected(personInfo.id) ? "person-info--selected" : ""}
          />
        ))}
        <SyncLoader
          loading={status === Status.Pending}
          cssOverride={spinnerOverride}
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
