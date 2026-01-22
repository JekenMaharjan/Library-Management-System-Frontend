import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // change if needed

// Students
export const getStudents = async () => {
    const response = await axios.get(`${API_BASE_URL}/students`);
    return response.data;
};

export const createStudent = async (studentData: { name: string, rollNo: string}) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/students`, studentData);
        return response.data; // return the created student
    }
    catch (error: any) {
        console.error("Error creating student:", error.response?.data || error.message);
        throw error; // re-throw so caller can handle it
    }
}

export const updateStudentApi = async (studentId: number, updatedData: { name?: string; rollNo?: string }) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/students/${studentId}`, updatedData);
        return response.data; // return the updated student
    } catch (error: any) {
        console.error("Error updating student:", error.response?.data || error.message);
        throw error; // re-throw so caller can handle it
    }
}

export const deleteStudent = async (studentId: number) => {
    return axios.delete(`${API_BASE_URL}/students/${studentId}`);
};

export const updateStudent = async (studentId: number, data: any) => {
    return axios.put(`${API_BASE_URL}/students/${studentId}`, data);
};

// Books
export const getBooks = async () => {
    const response = await axios.get(`${API_BASE_URL}/books`);
    return response.data;
};

export const deleteBook = async (id: number) => {
    return axios.delete(`${API_BASE_URL}/books/${id}`);
};