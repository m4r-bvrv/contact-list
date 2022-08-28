import React from "react";
import apiData from "src/api";
import { IPerson, Status } from "src/shared/types";

const usePersonsList = () => {
  const [status, setStatus] = React.useState<Status>(Status.Idle);
  const [data, setData] = React.useState<IPerson[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);
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

  const select = (id: string) => {
    console.log(id);
    if (selected.some((personId) => personId === id)) {
      setSelected((s) => s.filter((personId) => personId !== id));
    } else {
      setSelected((s) => [...s, id]);
    }
  };

  React.useEffect(() => {
    loadMore();
  }, []);

  return {
    status,
    data,
    selected,
    loadMore,
    select,
    error,
  };
};

export default usePersonsList;
