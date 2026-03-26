import  apiRequest  from "../services/apiClient.js";
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

export const addDepartment = async (formData) => {

  try {
    const data = await apiRequest(
      {
        method: "POST",
        url: "/department/add",
        data:
          formData

      }
    );
    
    return data;
  } catch (error) {
    throw error;
  }
}