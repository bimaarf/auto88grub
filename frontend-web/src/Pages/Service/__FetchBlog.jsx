import axios from "axios";

export async function fetchBlog() {
  try {
    await axios.get("sanctum/csrf-cookie");
    const response = await axios.get("api/blog/sample/show");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching car data:", error);
    throw error;
  }
}
