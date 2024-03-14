import axios from "axios";

export async function fetchCars(pageAllCar) {
  try {
    await axios.get("sanctum/csrf-cookie");
    const response = await axios.get(
      `api/car/show?page=${pageAllCar.page}&&perPage=${pageAllCar.perPage}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw error;
  }
}
