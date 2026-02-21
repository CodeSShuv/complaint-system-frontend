import complainContext from "../context/ComplainContext";
import Card from "../components/Card";
import { useContext, useEffect } from "react";
import { fetchComplains } from "../api/complain";
import alertContext from "../context/AlertContext";
import { deleteComplainById } from "../api/complain";
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
  const deleteComplaint = async (complaintId) => {
    try {
      let res = await deleteComplainById(complaintId);
      alertContextOptions.setAlertOptions({
        msg: "Complaint deleted successfully.",
        type: "success",
      });
      setComplainsData(complainsData.filter((complain) => complain._id !== complaintId));

    } catch (error) {
      alertContextOptions.setAlertOptions({
        msg: "Failed to delete complaint.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchComplain();

  }, []);
  return (
    <div>

      {complainsData.length === 0 ? <div className="text-center text-gray-500 mt-20">No complaints found.</div> : <ul className="flex justify-around gap-1 p-10 flex-wrap">
        {complainsData.map((items) => {
          return (
            // console.log("Rendering Card for Complaint ID:", items._id),
            <li key={items.id}>
              <Card
                key={items.id}
                status={items.status.toLowerCase()}
                title={items.subject}
                body={items.message}
                role={items.role}
                category={items.category}
                complaintId={items._id}
                deleteComplaint={deleteComplaint}
              />
            </li>
          );
        })}
      </ul>}
    </div>
  );
};

export default View;
