import axios from "axios";

export async function reqCarFilter(data) {
  try {
    await axios.get("sanctum/csrf-cookie");
    const response = await axios.post("api/car/filter/show", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw error;
  }
}
