import OverviewCard from "../components/OverviewCard";
import { useContext, useEffect, useState } from "react";
import userContext from "../context/UserContext";

import ComposeComplain from "../components/ComposeComplain";
import { getComplainCounts } from "../api/complain";
const Dashboard = () => {
  const [complainCount, setComplainCount] = useState({
    NOfTotal: 0,
    NOfPending: 0,
    NOfActive: 0,
    NOfFulfilled: 0,
  });
  const { user, setUser } = useContext(userContext);

  const getComplainCount = async () => {
    let counts = await getComplainCounts();
    // console.log(counts);
    if (!counts) {
      console.log("Failed to fetch complain counts.");
      return;
    }
    setComplainCount(counts);
  };
  useEffect(() => {
    // if(complaintCount.NOfTotal === )
    getComplainCount();
    // console.log("User:", user);
    return () => { };
  }, []);
  if (!user) {
    return <></>;
  }
  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 gap-6 bg-gray-50">
      {/* Profile Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full border-b border-gray-200 pb-6">

        {/* Profile Image */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="/user.png"
            alt="User"
          />
        </div>

        {/* User Info */}
        <div className="text-center sm:text-left">
          <div className="font-semibold text-xl sm:text-2xl">
            {user?.firstName} {user?.lastName}
          </div>

          {/* <div className="text-gray-500 text-sm sm:text-base">
            ABC Company
          </div> */}

          <div className="text-gray-500 text-sm">
            {user?.role}
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="w-full">
        <h3 className="font-semibold text-lg sm:text-xl mb-4">
          Overview
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <OverviewCard
            number={complainCount.NOfTotal}
            heading="Total Complaint"
            color="white"
          />

          <OverviewCard
            number={complainCount.NOfActive}
            heading="Action Active"
            color="yellow"
          />

          <OverviewCard
            number={complainCount.NOfPending}
            heading="Action Pending"
            color="red"
          />

          <OverviewCard
            number={complainCount.NOfFulfilled}
            heading="Fulfilled"
            color="green"
          />
        </div>
      </div>

      {/* Compose Section */}
      <div className="w-full">
        <ComposeComplain />
      </div>
    </div>


  );
};

export default Dashboard;
