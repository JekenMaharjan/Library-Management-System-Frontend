import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // change if needed

export const getStudents = async () => {
    const response = await axios.get(`${API_BASE_URL}/students`);
    return response.data;
};

export const deleteStudent = async (id: number) => {
    return axios.delete(`${API_BASE_URL}/students/${id}`);
};

export const updateStudent = async (id: number, data: any) => {
    return axios.put(`${API_BASE_URL}/students/${id}`, data);
};
