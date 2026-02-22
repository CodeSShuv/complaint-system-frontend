import apiRequest from "../services/apiClient";
export const fetchComplains = async () => {
  try {
    console.log("Fetching all complains...");
    const data = await apiRequest({
      method: "GET",
      url: `/complaint/all`,
    });
    console.log("Fetched Complains:", data.data);
    return data.data;
  } catch (error) {
    return null;
  }
}
export const fetchComplainById = async (complaintId) => {
  try {
    console.log("Fetching complain with ID:", complaintId);
    const data = await apiRequest({
      method: "GET",
      url: `/complaint/${complaintId}`,
    });

    return data.data;

  } catch (error) {
    console.log(error);
    return null;
  }
}

export const postComplain = async (complainData) => {
  try {
    const data = await apiRequest({
      method: "POST",
      url: "/complaint",
      data: complainData,
    });
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getComplainCounts = async () => {
  try {
    const data = await apiRequest({
      method: "GET",
      url: "/complaint/counts",
    });
    // console.log("Fetched Complain Counts:", data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const deleteComplainById = async (complaintId) => {
  try {
    console.log("Deleting complain with ID:", complaintId);
    const data = await apiRequest({
      method: "DELETE",
      url: `/complaint/${complaintId}`,
    });
    console.log("Deleted Complain By ID:", data.data);
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}


