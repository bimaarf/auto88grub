import axios from "axios";

export async function fetchNewCars(pageNewCar) {
  try {
    await axios.get("sanctum/csrf-cookie");
    const response = await axios.get(
      `api/car/new/show?page=${pageNewCar.page}&&perPage=${pageNewCar.perPage}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw error;
  }
}
