import axios from "axios";

export async function fetchRecCars() {
  try {
    await axios.get("sanctum/csrf-cookie");
    const response = await axios.get("api/car/recomended/show");
    return response;
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw error;
  }
}
