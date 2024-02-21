import axios from "axios";

export async function fetchCarComp(pageCarPromo) {
  try {
    await axios.get("sanctum/csrf-cookie");
    const response = await axios.get("api/car/component/show");
    return response.data;
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw error;
  }
}
