import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getDistricts = async () => {
  const response = await api.get("/districts");
  return response.data.data;
};

export const getDistrictSummary = async (id: string) => {
  const response = await api.get(`/districts/${id}/summary`);
  return response.data;
};

export const getDistrictTimeseries = async (id: string, months: number) => {
  const response = await api.get(`/districts/${id}/timeseries?months=${months}`);
  return response.data.data;
};

export const compareDistricts = async (id1: string, id2: string) => {
  const response = await api.get(`/districts/compare?d1=${id1}&d2=${id2}`);
  return response.data;
};

export const getDistrictByLocation = async (lat: number, lon: number) => {
    const response = await api.get(`/districts/by-location?lat=${lat}&lon=${lon}`);
    return response.data.district;
};
