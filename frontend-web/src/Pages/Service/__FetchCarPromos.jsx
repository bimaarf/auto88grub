import axios from "axios";

export async function fetchCarPromos(pageCarPromo) {
  try {
    await axios.get("sanctum/csrf-cookie");
    const response = await axios.get(
      `api/car/promo/show?page=${pageCarPromo.page}&&perPage=${pageCarPromo.perPage}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw error;
  }
}
