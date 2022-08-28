import React, { CSSProperties } from "react";
import { SyncLoader } from "react-spinners";
import PersonInfo from "../PersonInfo/PersonInfo";
import usePersonsList from "../../hooks/usePersonsList";
import { Status } from "../../shared/types";

function PersonsList() {
  const { status, error, data, selected, loadMore, select } = usePersonsList();

  const handleClick = () => {
    loadMore();
  };

  const isSelected = (id: string) =>
    selected.some((personId) => personId === id);

  const btnContent = () =>
    status === Status.Pending ? (
      <SyncLoader size={8} />
    ) : status === Status.Rejected ? (
      "Try again"
    ) : (
      "Load more"
    );

  return (
    <>
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
        {/* <SyncLoader
          cssOverride={spinnerOverride}
        /> */}
        {status === Status.Rejected && (
          <div className="error" role="alert">
            {error?.message}
          </div>
        )}
        <button
          className="button"
          type="button"
          onClick={handleClick}
          disabled={status === Status.Pending}
        >
          {btnContent()}
        </button>
      </div>
    </>
  );
}

export default PersonsList;
