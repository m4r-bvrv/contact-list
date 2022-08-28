import React from "react";
import apiData from "src/api";

interface IPerson {
  id: string;
  jobTitle: string;
  emailAddress: string;
  firstNameLastName: string;
}

const usePersonsList = () => {
  const [data, setData] = React.useState<IPerson[]>([]);
  const [selected, setSelected] = React.useState<IPerson[]>([]);

  const loadMore = async () => {
    return apiData()
      .then((res) => setData((d) => [...d, ...res]))
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    loadMore();
  }, []);

  return {
    data,
    selected,
    loadMore,
  };
};

export default usePersonsList;
