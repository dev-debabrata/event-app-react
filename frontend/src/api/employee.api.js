import { axiosInstance } from "../lib/axios";

export const getEmployees = async () => {
    const res = await axiosInstance.get("/api/employees");
    return res.data;
};

export const addEmployee = async (data) => {
    const res = await axiosInstance.post("/api/employees", data);
    return res.data;
};

export const updateEmployee = async ({ id, data }) => {
    const res = await axiosInstance.put(`/api/employees/${id}`, data);
    return res.data;
};

export const deleteEmployee = async (id) => {
    const res = await axiosInstance.delete(`/api/employees/${id}`);
    return res.data;
};
