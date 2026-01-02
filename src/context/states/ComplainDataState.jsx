import { Children, useState } from "react";
import complainContext from "../ComplainContext";
const ComplainDataState = (props) => {
  const [complainsData, setComplainsData] = useState([]);
  return (
    <>
      <complainContext.Provider value={{ complainsData, setComplainsData }}>
        {props.children}
      </complainContext.Provider>
    </>
  );
};

export default ComplainDataState;
