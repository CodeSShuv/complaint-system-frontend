import OverviewCard from "../components/OverviewCard";
import { useContext } from "react";
import userContext from "../context/UserContext";
const Dashboard = () => {
  const { user, setUser } = useContext(userContext);

  return (
    <div className="h-screen flex flex-col items-center p-6 gap-5">
      <div className="flex justify-start items-center gap-5 self-start w-screen border-b-2 border-b-gray-200 p-4">
        <div className="flex justify-center items-center w-50 h-50 rounded-full">
          <img className="object-cover" src="/public/user.png" alt="" />
        </div>
        <div>
          {/* full name */}
          <div className="fullname font-semibold text-2xl">
            <span className="fname">{user ? user.firstName : ""}</span>{" "}
            <span className="lname">{user ? user.lastName : ""}</span>
          </div>
          {/* institution name */}
          <div className="instition text-gray-500">ABC Company</div>
          <div className="role text-gray-500 text-md">Admin</div>
        </div>
      </div>
      <div className="">
        <div>
          <h3 className="font-semibold text-xl text-left w-screen pl-4">
            Overview
          </h3>
          {/* <hr /> */}
          <div className="card-containers p-3 flex gap-3">
            <OverviewCard
              number={0}
              heading={"Total Complaint"}
              color={"white"}
            />
            <OverviewCard
              number={0}
              heading={"Action Active"}
              color={"yellow"}
            />
            <OverviewCard number={0} heading={"Action Pending"} color={"red"} />
            <OverviewCard number={0} heading={"Fulfilled"} color={"green"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
