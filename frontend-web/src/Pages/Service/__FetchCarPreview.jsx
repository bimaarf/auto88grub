import axios from "axios";

export async function fetchCarPreview({ slug, id }) {
  try {
    await axios.get("sanctum/csrf-cookie");
    const response = await axios.get(`api/car/preview/${slug}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw error;
  }
}
