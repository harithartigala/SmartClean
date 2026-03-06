/**
 * SmartClean API Configuration
 * Connect frontend to Cloudflare Worker backend
 * Version: 2.0.0
 */

const API_CONFIG = {
    // Cloudflare Worker URL (update after deployment)
    BASE_URL: 'https://smartclean-api.harithartigala.workers.dev',
    
    // Local development URL
    DEV_URL: 'http://localhost:8787',
    
    // Use development or production
    USE_DEV: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    
    // Get current API URL
    get API_URL() {
        return this.USE_DEV ? this.DEV_URL : this.BASE_URL;
    },
    
    // API Endpoints
    ENDPOINTS: {
        // Auth
        REGISTER: '/api/auth/register',
        LOGIN: '/api/auth/login',
        LOGOUT: '/api/auth/logout',
        
        // Users
        USERS: '/api/users',
        USER_BY_ID: (id) => `/api/users/${id}`,
        
        // Classrooms
        CLASSROOMS: '/api/classrooms',
        CLASSROOM_BY_ID: (id) => `/api/classrooms/${id}`,
        
        // QR Codes
        QR_BY_CLASSROOM: (classroomId) => `/api/qrcodes/classroom/${classroomId}`,
        
        // Reports
        REPORTS: '/api/reports',
        GENERATE_REPORT: '/api/reports/generate',
        
        // Statistics
        DASHBOARD_STATS: '/api/stats/dashboard'
    },
    
    // Request timeout
    TIMEOUT: 30000 // 30 seconds
};

/**
 * API Client Class
 */
class ApiClient {
    constructor() {
        this.baseUrl = API_CONFIG.API_URL;
        this.token = localStorage.getItem('auth_token');
    }
    
    /**
     * Set authentication token
     */
    setToken(token) {
        this.token = token;
        if (token) {
            localStorage.setItem('auth_token', token);
        } else {
            localStorage.removeItem('auth_token');
        }
    }
    
    /**
     * Get authentication token
     */
    getToken() {
        return this.token || localStorage.getItem('auth_token');
    }
    
    /**
     * Get auth headers
     */
    getHeaders(customHeaders = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...customHeaders
        };
        
        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        return headers;
    }
    
    /**
     * Make API request
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        
        const config = {
            ...options,
            headers: this.getHeaders(options.headers || {})
        };
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
            
            const response = await fetch(url, {
                ...config,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                const error = await response.json().catch(() => ({ error: 'Request failed' }));
                throw new Error(error.error || `HTTP ${response.status}`);
            }
            
            return await response.json();
            
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }
            throw error;
        }
    }
    
    /**
     * GET request
     */
    async get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        
        return this.request(url, {
            method: 'GET'
        });
    }
    
    /**
     * POST request
     */
    async post(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    
    /**
     * PATCH request
     */
    async patch(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
    }
    
    /**
     * DELETE request
     */
    async delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE'
        });
    }
    
    // ============================================
    // Authentication Methods
    // ============================================
    
    async register(userData) {
        const response = await this.post(API_CONFIG.ENDPOINTS.REGISTER, userData);
        return response;
    }
    
    async login(credentials) {
        const response = await this.post(API_CONFIG.ENDPOINTS.LOGIN, credentials);
        
        if (response.success && response.token) {
            this.setToken(response.token);
            // Store user data
            localStorage.setItem('user', JSON.stringify(response.user));
        }
        
        return response;
    }
    
    async logout() {
        try {
            await this.post(API_CONFIG.ENDPOINTS.LOGOUT);
        } finally {
            this.setToken(null);
            localStorage.removeItem('user');
        }
    }
    
    // ============================================
    // User Methods
    // ============================================
    
    async getUsers(params = {}) {
        return this.get(API_CONFIG.ENDPOINTS.USERS, params);
    }
    
    async getUserById(id) {
        return this.get(API_CONFIG.ENDPOINTS.USER_BY_ID(id));
    }
    
    async updateUser(id, data) {
        return this.patch(API_CONFIG.ENDPOINTS.USER_BY_ID(id), data);
    }
    
    async deleteUser(id) {
        return this.delete(API_CONFIG.ENDPOINTS.USER_BY_ID(id));
    }
    
    // ============================================
    // Classroom Methods
    // ============================================
    
    async getClassrooms(params = {}) {
        return this.get(API_CONFIG.ENDPOINTS.CLASSROOMS, params);
    }
    
    async getClassroomById(id) {
        return this.get(API_CONFIG.ENDPOINTS.CLASSROOM_BY_ID(id));
    }
    
    async createClassroom(data) {
        return this.post(API_CONFIG.ENDPOINTS.CLASSROOMS, data);
    }
    
    async updateClassroom(id, data) {
        return this.patch(API_CONFIG.ENDPOINTS.CLASSROOM_BY_ID(id), data);
    }
    
    async deleteClassroom(id) {
        return this.delete(API_CONFIG.ENDPOINTS.CLASSROOM_BY_ID(id));
    }
    
    // ============================================
    // QR Code Methods
    // ============================================
    
    async getQRCodeForClassroom(classroomId) {
        return this.get(API_CONFIG.ENDPOINTS.QR_BY_CLASSROOM(classroomId));
    }
    
    // ============================================
    // Report Methods
    // ============================================
    
    async getReports() {
        return this.get(API_CONFIG.ENDPOINTS.REPORTS);
    }
    
    async generateReport(reportData) {
        return this.post(API_CONFIG.ENDPOINTS.GENERATE_REPORT, reportData);
    }
    
    // ============================================
    // Statistics Methods
    // ============================================
    
    async getDashboardStats() {
        return this.get(API_CONFIG.ENDPOINTS.DASHBOARD_STATS);
    }
}

// Create global API client instance
const apiClient = new ApiClient();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, ApiClient, apiClient };
}
