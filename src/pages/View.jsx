import { useContext, useEffect, useState } from "react";
import complainContext from "../context/ComplainContext";
import alertContext from "../context/AlertContext";
import Card from "../components/Card";
import { fetchComplains, deleteComplainById } from "../api/complain";

const View = () => {
  const { complainsData, setComplainsData } = useContext(complainContext);
  const { setAlertOptions } = useContext(alertContext);

  const [filterStatus, setFilterStatus] = useState("all");

  // Fetch Complaints
  const fetchComplain = async () => {
    try {
      const data = await fetchComplains();

      if (!data) {
        setAlertOptions({
          msg: "Failed to fetch complaints.",
          type: "error",
        });
        return;
      }

      setComplainsData(data);
    } catch (error) {
      setAlertOptions({
        msg: "Something went wrong while fetching complaints.",
        type: "error",
      });
    }
  };

  // Delete Complaint
  const deleteComplaint = async (complaintId) => {
    try {
      await deleteComplainById(complaintId);

      setComplainsData((prev) =>
        prev.filter((complain) => complain._id !== complaintId)
      );

      setAlertOptions({
        msg: "Complaint deleted successfully.",
        type: "success",
      });
    } catch (error) {
      setAlertOptions({
        msg: "Failed to delete complaint.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchComplain();
  }, []);

  // Filter Logic
  const filteredComplaints =
    filterStatus === "all"
      ? complainsData
      : complainsData.filter(
        (complain) =>
          complain.status.toLowerCase() === filterStatus.toLowerCase()
      );

  return (
    <div className="space-y-6">

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center p-4">
        {["all", "pending", "in progress", "fulfilled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg capitalize transition ${filterStatus === status
                ? "bg-slate-800 text-white"
                : "bg-slate-200 hover:bg-slate-300"
              }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Complaint List */}
      {filteredComplaints.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          No complaints found.
        </div>
      ) : (
        <ul className="flex justify-around gap-4 p-6 flex-wrap">
          {filteredComplaints.map((item) => (
            <li key={item._id}>
              <Card
                status={item.status.toLowerCase()}
                title={item.subject}
                body={item.message}
                role={item.role}
                category={item.category}
                complaintId={item._id}
                deleteComplaint={deleteComplaint}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default View;