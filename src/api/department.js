import { apiRequest } from "../services/services/apiClient";
export const fetchDepartments = async () => {
  try {
    const data = await apiRequest(
      {
        method: "GET",
        url: "/department/fetch",
      }
    );
    return data.data;
  } catch (error) {
    console.log(error.message || "Something went wrong.")
  }
}

export const addDepartment = async (fomrData) => {
  try {
    const data = await apiRequest(
      {
        method: "POST",
        url: "/department/add",
        data:
          FormData

      }
    )
  } catch (error) {

  }
}