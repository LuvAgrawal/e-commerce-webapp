import axios from "axios";

export const fetchAllProductsAPI = async () => {
  try {
    const response = await axios.get("http://localhost:8800/prod/get");
    const data = response.data.data
    console.log("Data from server",data)
    return data
  } catch (error) {
    console.error(error.message);
  }
};
