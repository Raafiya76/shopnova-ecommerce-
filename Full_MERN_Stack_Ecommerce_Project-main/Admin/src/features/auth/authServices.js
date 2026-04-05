import axios from "axios";
import { base_url } from "../../utils/baseUrl";

// const getTokenFromLocalStorage = localStorage.get("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;

const login = async (user) => {
  const response = await axios.post(`${base_url}admin/login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const register = async (user) => {
  const response = await axios.post(`${base_url}admin/register`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getAuthConfig = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  return {
    headers: {
      Authorization: `Bearer ${user?.token || ""}`,
      Accept: "application/json",
    },
  };
};

const getAdminProfile = async () => {
  const response = await axios.get(`${base_url}admin/profile`, getAuthConfig());
  return response.data;
};

const getOrders = async (data) => {
  const response = await axios.get(`${base_url}user/getallorders`, data);

  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.get(
    `${base_url}user/getaOrder/${id}`,
    getAuthConfig(),
  );

  return response.data;
};

const updateOrder = async (data) => {
  const response = await axios.put(
    `${base_url}user/updateOrder/${data.id}`,
    { status: data.status },
    getAuthConfig(),
  );

  return response.data;
};

const getMonthlyOrders = async (data) => {
  const response = await axios.get(
    `${base_url}user/getMonthWiseOrderIncome`,

    data,
  );

  return response.data;
};

const getYearlyStats = async (data) => {
  const response = await axios.get(
    `${base_url}user/getyearlyorders`,

    data,
  );

  return response.data;
};

const authService = {
  login,
  register,
  getAdminProfile,
  getOrders,
  getOrder,
  getMonthlyOrders,
  getYearlyStats,
  updateOrder,
};

export default authService;
