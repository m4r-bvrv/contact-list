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

  React.useEffect(() => {
    apiData()
      .then((res) => setData((d) => [...d, ...res]))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <div className="selected">Selected contacts: {selected.length}</div>
      <div className="list">
        {data.map((personInfo) => (
          <PersonInfo key={personInfo.id} data={personInfo} />
        ))}
      </div>
    </div>
  );
}

export default App;
