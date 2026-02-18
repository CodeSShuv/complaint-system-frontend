import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiRequest from "../services/apiClient";
import alertContext from "../context/AlertContext.jsx";
const VerifyEmail = () => {
  const { alertOptions, setAlertOptions } = useContext(alertContext);
  const { token } = useParams();
  const [status, setStatus] = useState("verifying");
  // verifying | success | error
  const resendToken = async () => {
    let data = await apiRequest({
      method: "POST",
      url: "/auth/resend-verification",
    })
  }


  useEffect(() => {
    const verifyUser = async () => {
      try {
        let data = await apiRequest({
          method: "GET",
          url: `/auth/verify/${token}`,
        });

        setStatus("success");
        setAlertOptions({ type: "success", msg: data.msg });
      } catch (error) {
        setStatus("error");
        setAlertOptions({ type: "error", msg: error.response?.data?.message || "Verification Failed" });
      }
    };

    verifyUser();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 text-center">

        {status === "verifying" && (
          <>
            <div className="animate-spin mx-auto mb-6 h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Verifying your email...
            </h2>
            <p className="text-gray-500 mt-2">
              Please wait while we confirm your account.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-green-500 text-5xl mb-4">✔</div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Email Verified Successfully
            </h2>
            <p className="text-gray-500 mt-2">
              Your account has been verified. You can now login.
            </p>

            <a
              href="/login"
              className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200 font-medium"
            >
              Go to Login
            </a>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-red-500 text-5xl mb-4">✖</div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Verification Failed
            </h2>
            <p className="text-gray-500 mt-2">
              The link may be invalid or expired.
            </p>

            <a
              href="/register"
              className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200 font-medium"
            >
              Resend Verification Email
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
