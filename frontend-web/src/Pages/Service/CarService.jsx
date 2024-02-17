import axios from "axios";

export const CarService = async () => {
  await axios.get("sanctum/csrf-cookie");
  const response = await axios.get("sanctum/http://localhost:8000/api/show-car");
  return response;
};
