import axios from "axios";

export async function fetchCarPromos() {
  try {
    await axios.get("sanctum/csrf-cookie");
    const response = await axios.get("api/car/promo/show");
    return response.data;
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw error;
  }
}
