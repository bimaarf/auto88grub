import axios from "axios";

export async function fetchBlogPreview({ slug, id }) {
  try {
    await axios.get("sanctum/csrf-cookie");
    const response = await axios.get(`api/blog/preview/${slug}/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw error;
  }
}
