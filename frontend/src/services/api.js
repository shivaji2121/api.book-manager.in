const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const apiRequest = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        console.log(`Making API request to: ${API_BASE_URL}${endpoint}`, options); // Debug log
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            const error = new Error(data.message || 'API Error');
            error.response = { data, status: response.status };
            throw error;
        }

        return data;
    } catch (error) {
        console.error('API Request Error:', error);
        // Add more detailed error information
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new Error('Network error: Unable to connect to the server');
        }
        throw error;
    }
};

export default apiRequest;
