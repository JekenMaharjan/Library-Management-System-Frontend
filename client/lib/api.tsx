import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// ================================ Students ================================

// Create student
export const createStudent = async (studentData: { name: string, rollNo: string }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/students`, studentData);
        return response.data; // return the created student
    }
    catch (error: any) {
        console.error("Error creating student:", error.response?.data || error.message);
        throw error; // re-throw so caller can handle it
    }
}

// Get all students
export const getStudents = async () => {
    const response = await axios.get(`${API_BASE_URL}/students`);
    return response.data;
};

// Search student by roll number
export const searchStudents = async (rollNo: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/students`, {
            params: { rollNo } // sends ?rollNo=XYZ automatically
        });
        return response.data;
    } catch (error: any) {
        console.error(
            "Error searching student:",
            error.response?.data || error.message
        );
        throw error;
    }
};

// Update student details
export const updateStudentApi = async (studentId: number, updatedData: { name?: string; rollNo?: string }) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/students/${studentId}`, updatedData);
        return response.data; // return the updated student
    } catch (error: any) {
        console.error("Error updating student:", error.response?.data || error.message);
        throw error; // re-throw so caller can handle it
    }
}

// Delete student
export const deleteStudent = async (studentId: number) => {
    return axios.delete(`${API_BASE_URL}/students/${studentId}`);
};


// ================================ Books ================================

export const getBooks = async () => {
    const response = await axios.get(`${API_BASE_URL}/books`);
    return response.data;
};

export const createBook = async (bookData: {title: string; author: string; totalStock: number}) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/books`, bookData);
        return response.data;
    } catch (error: any) {
        console.error("Error creating book:", error.response?.data || error.message);
        throw error; // re-throw so caller can handle it
    }
}

// Update book API
export const updateBook = async (bookId: number, updatedData: { title?: string; author?: string; totalStock?: number }) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/books/${bookId}`, updatedData);
        return response.data; // return updated book
    } catch (error: any) {
        console.error("Failed to update book:", error.response?.data || error.message);
        throw error; // re-throw for caller to handle
    }
};

export const deleteBook = async (id: number) => {
    return axios.delete(`${API_BASE_URL}/books/${id}`);
};


// ================================ Issue Book ================================

export const getIssueBooks = async () => {
    const response = await axios.get(`${API_BASE_URL}/issues`);
    return response.data;
};