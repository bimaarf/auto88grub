import axios from "axios";

export async function fetchTestimony(pageTestimony) {
  try {
    await axios.get("sanctum/csrf-cookie");
    const response = await axios.get(
      `api/testimonial/show?page=${pageTestimony.page}&&perPage=${pageTestimony.perPage}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw error;
  }
}
