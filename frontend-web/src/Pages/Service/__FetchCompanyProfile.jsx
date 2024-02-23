import axios from "axios";

export async function fetchCompanyProfile(pageTestimony) {
  try {
    await axios.get("sanctum/csrf-cookie");
    const response = await axios.get("api/company/profile/show");

    return response.data;
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw error;
  }
}
