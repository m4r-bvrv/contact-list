import React from "react";
import apiData from "src/api";
import { IPerson, Status } from "src/shared/types";

const usePersonsList = () => {
  const [status, setStatus] = React.useState<Status>(Status.Idle);
  const [data, setData] = React.useState<IPerson[]>([]);
  const [selected, setSelected] = React.useState<IPerson[]>([]);
  const [error, setError] = React.useState<Error | null>(null);

  const loadMore = async () => {
    setStatus(Status.Pending);
    return apiData()
      .then((res) => {
        setData((d) => [...d, ...res]);
        setStatus(Status.Resolved);
      })
      .catch((err) => {
        setError(err);
        setStatus(Status.Rejected);
      });
  };

  React.useEffect(() => {
    loadMore();
  }, []);

  return {
    status,
    data,
    selected,
    loadMore,
    error,
  };
};

export default usePersonsList;
