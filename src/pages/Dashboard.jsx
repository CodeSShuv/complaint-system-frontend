import OverviewCard from "../components/OverviewCard";
import { useContext, useEffect, useState } from "react";
import userContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import apiRequest from "../services/apiClient";
import ComposeComplain from "../components/ComposeComplain";
const Dashboard = () => {
  const [complainCount, setComplainCount] = useState({
    NOfTotal: 0,
    NOfPending: 0,
    NOfActive: 0,
    NOfFulfilled: 0,
  });
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const data = await apiRequest({
        method: "GET",
        url: "http://localhost:8080/auth/user",
      });
      // console.log(data.data.user);
      setUser(data.data.user);
      console.log("User set");
      // fetching the number of complains according to their states after updating the user
    } catch (error) {
      navigate("/login");
    }
  };

  const getComplainCount = async () => {
    let counts = await apiRequest({
      method: "GET",
      url: "http://localhost:8080/complain/count",
    });
    console.log(counts);
    setComplainCount(counts);
  };
  useEffect(() => {
    if (!user) {
      fetchUser();
    }
    getComplainCount();

    return () => {};
  }, []);
  if (!user) {
    return <></>;
  }
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
              number={complainCount.NOfTotal}
              heading={"Total Complaint"}
              color={"white"}
            />
            <OverviewCard
              number={complainCount.NOfActive}
              heading={"Action Active"}
              color={"yellow"}
            />
            <OverviewCard
              number={complainCount.NOfPending}
              heading={"Action Pending"}
              color={"red"}
            />
            <OverviewCard
              number={complainCount.NOfFulfilled}
              heading={"Fulfilled"}
              color={"green"}
            />
          </div>
        </div>
      </div>
      <ComposeComplain />
    </div>
  );
};

export default Dashboard;
