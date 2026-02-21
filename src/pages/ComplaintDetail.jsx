import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchComplainById } from "../api/complain";
import userContext from "../context/UserContext";

export default function ComplaintDetail() {
  let { complaintId } = useParams();
  const { user } = useContext(userContext);
  const [complaint, setComplaint] = useState(null);
  useEffect(() => {
    fetchComplainById(complaintId).then((data) => {
      if (data) {
        setComplaint(data);
        return;
      }
    });
  }, [complaintId]);


  const [status, setStatus] = useState(complaint?.status ?? "Pending");
  const [remarks, setRemarks] = useState("");

  const handleSubmit = () => {
    console.log("New Status:", status);
    console.log("Admin Remarks:", remarks);

    // Later:
    // send status + remarks to backend
    // backend sends email to student
  };

  return (
    complaint != null ? (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-4 md:p-8">

        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-6 md:p-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h2 className="text-2xl font-semibold text-slate-800">
                {complaint.subject}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Complaint ID: {complaintId}
              </p>
            </div>

            {/* Category Bubble */}
            <span className="self-start md:self-auto bg-slate-200 text-slate-700 text-sm px-3 py-1 rounded-full font-medium">
              {complaint.category}
            </span>
          </div>

          {/* Student Info */}
          <div className="mt-6 border-t border-slate-200 pt-4 text-sm text-slate-600">
            <p><span className="font-medium">Student:</span> {complaint.userId.firstname + " " + complaint.userId.lastname}</p>
            <p><span className="font-medium">Email:</span> {complaint.userId.email}</p>
            <p><span className="font-medium">Date:</span> {complaint.createdAt}</p>

          </div>

          {/* Complaint Message */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Complaint Details
            </h3>

            <div className="bg-slate-100 rounded-lg p-4 text-slate-700 leading-relaxed">
              {complaint.message}
            </div>
          </div>


          {user.role === "Admin" ? <div className="mt-8 border-t border-slate-200 pt-6">

            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Admin Action
            </h3>

            {/* Status Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Change Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full md:w-1/2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Rejected</option>
              </select>
            </div>

            {/* Remarks */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Remarks for Student
              </label>

              <textarea
                rows="4"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Write remarks that will be sent to the student..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="mt-2 bg-slate-700 hover:bg-slate-800 text-white px-6 py-2 rounded-lg transition"
            >
              Update & Notify Student
            </button>
          </div> : ""}
        </div>
      </div>
    ) : (
      "Loading..."
    )
  );
}
