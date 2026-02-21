import { useContext } from "react";
import userContext from "../context/UserContext";

const Card = ({ title, body, status, category, complaintId, deleteComplaint }) => {
  const { user } = useContext(userContext);
  const statusStyles = {
    fulfilled: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    pending: "bg-red-100 text-red-800 border border-red-200",
    active: "bg-amber-100 text-amber-800 border border-amber-200",
  };
  //transition hover:shadow-xl hover:-translate-y-1
  return (
    <div className="w-full sm:w-[320px] md:w-[360px] lg:w-[400px] rounded-2xl bg-white border border-gray-200 shadow-md p-5">
      <div className="flex flex-col h-full space-y-3">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span
            className={`${statusStyles[status]} px-3 py-1 text-xs font-semibold rounded-full`}
          >
            {status}
          </span>
          <span className="px-3 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full">
            {category}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-lg md:text-xl font-bold text-gray-800">{title}</h2>

        {/* Body (truncated) */}
        <p className="text-sm text-gray-600">
          {body.length > 50 ? body.slice(0, 50) + "..." : body}
        </p>

        {/* {console.log("Complaint ID in Card:", complaintId)} */}
        <div className="flex items-center gap-4 mt-2">
          <a
            target="_blank"
            href={`/complaint/${complaintId}`} // navigate to full complaint page
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition"
          >
            View
          </a>
          {console.log("User Role in Card:", user?.role)}
          {!(user?.role === "Admin" || user?.role === "Staff") ? <button
            // navigate to edit complaint page
            onClick={() => {
              let id = complaintId;
              deleteComplaint(complaintId);
            }}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition"
          >
            Delete
          </button> : <></>}
        </div>
      </div>
    </div>

  );
};

export default Card;
