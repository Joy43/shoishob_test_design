import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://fastdeals.ecommatrix.xyz/api/v1",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;