import axios from "axios";

export async function fetchBlogPreview(slug) {
  try {
    await axios.get("sanctum/csrf-cookie");
    const response = await axios.get(`api/blog/preview/${slug}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw error;
  }
}
