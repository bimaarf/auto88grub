import axios from "axios";

export async function fetchCars() {
  try {
    await axios.get("sanctum/csrf-cookie");
    const response = await axios.get("api/car/show");
    return response.data;
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw error;
  }
}
