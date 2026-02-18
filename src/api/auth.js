import apiRequest from "../services/apiClient";
export const fetchUser = async () => {
  try {
    const data = await apiRequest({
      method: "GET",
      url: "/auth/user",
    });
    // console.log("Fetched User:", data.data);
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export const loginUser = async (formData) => {
  try {
    const data = await apiRequest({
      method: "POST",
      url: "/auth/login",
      data: formData,
      params: null
    });
    return data.data;
  } catch (error) {
    // console.log(error);
    throw error;
  }
}