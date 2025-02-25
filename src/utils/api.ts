import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getExpenses = async () => {
  return axios.get(`${API_URL}/expenses`);
};

export const addExpense = async (data: { description: string; amount: number }) => {
  return axios.post(`${API_URL}/expenses`, data);
};
