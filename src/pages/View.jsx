import complainContext from "../context/ComplainContext";
import Card from "../components/Card";
// import apiRequest from "../services/apiClient";
import { useContext, useEffect } from "react";
import { fetchComplains } from "../api/complain";
import alertContext from "../context/AlertContext";
const View = () => {
  const { complainsData, setComplainsData } = useContext(complainContext);
  const alertContextOptions = useContext(alertContext);
  const fetchComplain = async () => {
    let data = await fetchComplains();
    if (!data) {
      alertContextOptions.setAlertOptions({
        msg: "Failed to fetch complains.",
        type: "error",
      });
      return;
    }

    setComplainsData(data);
  };

  useEffect(() => {
    fetchComplain();
    // console.log(complainsData);
  }, []);
  return (
    <div>

      {complainsData.length === 0 ? <div className="text-center text-gray-500 mt-20">No complaints found.</div> : <ul className="flex justify-around gap-1 p-10 flex-wrap">
        {complainsData.map((items) => {
          return (
            <li key={items.id}>
              <Card
                key={items.id}
                status={items.status.toLowerCase()}
                title={items.subject}
                body={items.message}
                category={items.category}
              />
            </li>
          );
        })}
      </ul>}
    </div>
  );
};

export default View;
