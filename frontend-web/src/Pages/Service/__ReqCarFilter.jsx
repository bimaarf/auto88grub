import axios from "axios";

export async function reqCarFilter(page, perPage, data) {
  try {
    await axios.get("sanctum/csrf-cookie");
    const response = await axios.post(
      `api/car/filter/show?page=${page}&&perPage=${perPage}`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw error;
  }
}
export async function reqCarPromoFilter(page, perPage, data) {
  try {
    await axios.get("sanctum/csrf-cookie");
    const response = await axios.post(
      `api/car/promo/filter/show?page=${page}&&perPage=${perPage}`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw error;
  }
}
