import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export const getDistricts = async () => {
  const res = await axios.get(`${API_BASE}/districts`);
  return res.data.data;
};

export const getDistrictSummary = async (districtId: string) => {
  const res = await axios.get(`${API_BASE}/districts/${districtId}/summary`);
  return res.data;
};

export const compareDistricts = async (d1: string, d2: string) => {
  const res = await axios.get(`${API_BASE}/districts/compare`, { params: { d1, d2 } });
  return res.data;
};
