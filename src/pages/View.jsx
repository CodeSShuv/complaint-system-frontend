import complainContext from "../context/ComplainContext";
import Card from "../components/Card";
import apiRequest from "../services/apiClient";
import { useContext, useEffect } from "react";
const View = () => {
  const { complainsData, setComplainsData } = useContext(complainContext);

  const fetchComplains = async () => {
    let res = await apiRequest({ method: "GET", url: "/complain/all" });
    setComplainsData(res.data);
  };

  useEffect(() => {
    fetchComplains();
  }, []);
  return (
    <div>
      <ul className="flex justify-around gap-1 p-10 flex-wrap">
        {complainsData.map((items) => {
          return (
            <li>
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
      </ul>
    </div>
  );
};

export default View;
