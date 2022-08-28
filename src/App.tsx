import React from "react";
import apiData from "./api";
import PersonInfo from "./components/PersonInfo/PersonInfo";

interface IPerson {
  id: string;
  jobTitle: string;
  emailAddress: string;
  firstNameLastName: string;
}

function App() {
  const [data, setData] = React.useState<IPerson[]>([]);
  const [selected, setSelected] = React.useState<IPerson[]>([]);

  const fetchData = async () => {
    return apiData()
      .then((res) => setData((d) => [...d, ...res]))
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleClick = async () => {
    fetchData();
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
