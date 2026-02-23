import apiRequest from "../services/apiClient";

const API_BASE_URL = "/admin";

export const updateComplaintStatus = async (complaintId, newStatus, remarks) => {
  try {
    const data = await apiRequest({
      method: "PUT",
      url: `/admin/update-status/${complaintId}`,
      data: { status: newStatus, remarks: remarks },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export const fetchAllUsers = async () => {
  try {
    const data = await apiRequest({
      method: "GET",
      url: `${API_BASE_URL}/get-users`,
    });
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const createAdmin = async (adminData) => {
  try {
    const data = await apiRequest({
      method: "POST",
      url: `${API_BASE_URL}/create-admin`,
      data: adminData,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error
  }
}

export const deleteUserById = async (userId) => {
  try {
    const data = await apiRequest({
      method: "DELETE",
      url: `${API_BASE_URL}/delete-user/${userId}`,
    });
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const fetchStats = async () => {
  try {
    const data = await apiRequest({
      method: "GET",
      url: `${API_BASE_URL}/get-stats`,
    });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}