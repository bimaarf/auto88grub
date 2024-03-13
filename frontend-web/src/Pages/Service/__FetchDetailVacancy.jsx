import axios from "axios";

export async function fetchDetailVacancy(id) {
  try {
    await axios.get("sanctum/csrf-cookie");
    const response = await axios.get(`api/vacancy/show/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vacancy data:", error);
    throw error;
  }
}
