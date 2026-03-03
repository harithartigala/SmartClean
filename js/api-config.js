// SmartClean - API Configuration
// Configure your backend API endpoints here

const API_CONFIG = {
    // Set to true to use real API, false for offline mock database
    USE_REAL_API: false,
    
    // Your API base URL (change this to your actual API endpoint)
    BASE_URL: 'https://smartclean-api.harithartigala.workers.dev',
    
    const API_CONFIG = {
    BASE_URL: 'https://smartclean-api.harithartigala.workers.dev', // ← Update this
    TIMEOUT: 10000,
    ENABLE_LOGGING: true
};
    
    // Alternative: If using relative URLs
    // BASE_URL: '/api',
    
    // API endpoints configuration
    ENDPOINTS: {
        // Authentication
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REGISTER: '/auth/register',
        
        // Users
        USERS: '/users',
        USER_BY_ID: '/users/:id',
        
        // Classrooms
        CLASSROOMS: '/classrooms',
        CLASSROOM_BY_ID: '/classrooms/:id',
        
        // Cleaning Submissions
        SUBMISSIONS: '/cleaning-submissions',
        SUBMISSION_BY_ID: '/cleaning-submissions/:id',
        
        // QR Codes
        QR_CODES: '/qr-codes',
        QR_CODE_BY_ID: '/qr-codes/:id',
        
        // File Upload
        UPLOAD_IMAGE: '/upload/image',
        UPLOAD_IMAGES: '/upload/images'
    },
    
    // Authentication settings
    AUTH: {
        // Token storage key in localStorage
        TOKEN_KEY: 'smartclean_auth_token',
        
        // Token type (Bearer, JWT, etc.)
        TOKEN_TYPE: 'Bearer',
        
        // Include credentials in requests
        CREDENTIALS: 'include',
        
        // Auto refresh token
        AUTO_REFRESH: true
    },
    
    // Request settings
    REQUEST: {
        // Request timeout in milliseconds
        TIMEOUT: 30000,
        
        // Retry failed requests
        RETRY_ATTEMPTS: 3,
        
        // Retry delay in milliseconds
        RETRY_DELAY: 1000,
        
        // Default headers
        HEADERS: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    },
    
    // Upload settings
    UPLOAD: {
        // Maximum file size in bytes (5MB default)
        MAX_FILE_SIZE: 5 * 1024 * 1024,
        
        // Allowed file types
        ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
        
        // Compress images before upload
        COMPRESS_IMAGES: true,
        
        // Image quality (0.8 = 80%)
        IMAGE_QUALITY: 0.8,
        
        // Max image dimensions
        MAX_WIDTH: 1920,
        MAX_HEIGHT: 1080
    }
};

// API Client Class
class APIClient {
    constructor(config) {
        this.config = config;
        this.baseURL = config.BASE_URL;
    }
    
    // Get auth token
    getToken() {
        return localStorage.getItem(this.config.AUTH.TOKEN_KEY);
    }
    
    // Set auth token
    setToken(token) {
        localStorage.setItem(this.config.AUTH.TOKEN_KEY, token);
    }
    
    // Remove auth token
    removeToken() {
        localStorage.removeItem(this.config.AUTH.TOKEN_KEY);
    }
    
    // Build headers
    buildHeaders(customHeaders = {}) {
        const headers = {
            ...this.config.REQUEST.HEADERS,
            ...customHeaders
        };
        
        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `${this.config.AUTH.TOKEN_TYPE} ${token}`;
        }
        
        return headers;
    }
    
    // Build URL with parameters
    buildURL(endpoint, params = {}) {
        let url = this.baseURL + endpoint;
        
        // Replace path parameters
        Object.keys(params).forEach(key => {
            url = url.replace(`:${key}`, params[key]);
        });
        
        return url;
    }
    
    // Make API request
    async request(endpoint, options = {}) {
        const url = this.buildURL(endpoint, options.params);
        const headers = this.buildHeaders(options.headers);
        
        const requestOptions = {
            method: options.method || 'GET',
            headers,
            credentials: this.config.AUTH.CREDENTIALS,
            ...options
        };
        
        if (options.body && typeof options.body === 'object') {
            requestOptions.body = JSON.stringify(options.body);
        }
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.config.REQUEST.TIMEOUT);
            
            const response = await fetch(url, {
                ...requestOptions,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }
    
    // GET request
    async get(endpoint, query = {}) {
        const queryString = new URLSearchParams(query).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        return this.request(url, { method: 'GET' });
    }
    
    // POST request
    async post(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: data
        });
    }
    
    // PUT request
    async put(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            body: data
        });
    }
    
    // PATCH request
    async patch(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'PATCH',
            body: data
        });
    }
    
    // DELETE request
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
    
    // Upload file
    async uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        
        const headers = this.buildHeaders({
            // Remove Content-Type to let browser set it with boundary
            'Content-Type': undefined
        });
        delete headers['Content-Type'];
        
        return this.request(this.config.ENDPOINTS.UPLOAD_IMAGE, {
            method: 'POST',
            body: formData,
            headers
        });
    }
    
    // Upload multiple files
    async uploadFiles(files) {
        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`files[${index}]`, file);
        });
        
        const headers = this.buildHeaders({});
        delete headers['Content-Type'];
        
        return this.request(this.config.ENDPOINTS.UPLOAD_IMAGES, {
            method: 'POST',
            body: formData,
            headers
        });
    }
}

// Create global API client instance
const apiClient = new APIClient(API_CONFIG);

// Don't override fetch here - let mockdb.js handle it
// The mockdb.js will check API_CONFIG.USE_REAL_API automatically

// API Service Methods
const API = {
    // Authentication
    auth: {
        async login(username, password) {
            if (API_CONFIG.USE_REAL_API) {
                const response = await apiClient.post(API_CONFIG.ENDPOINTS.LOGIN, {
                    username,
                    password
                });
                if (response.token) {
                    apiClient.setToken(response.token);
                }
                return response;
            } else {
                // Use mock database
                const users = await fetch('tables/users').then(r => r.json());
                const user = users.data.find(u => 
                    u.username === username && u.password === password
                );
                return user ? { success: true, user } : { success: false };
            }
        },
        
        async logout() {
            if (API_CONFIG.USE_REAL_API) {
                await apiClient.post(API_CONFIG.ENDPOINTS.LOGOUT);
            }
            apiClient.removeToken();
            localStorage.removeItem('smartclean_user');
        },
        
        async register(userData) {
            if (API_CONFIG.USE_REAL_API) {
                return await apiClient.post(API_CONFIG.ENDPOINTS.REGISTER, userData);
            } else {
                // Mock registration
                userData.id = generateId();
                const users = JSON.parse(localStorage.getItem('smartclean_users') || '[]');
                users.push(userData);
                localStorage.setItem('smartclean_users', JSON.stringify(users));
                return { success: true, user: userData };
            }
        }
    },
    
    // Users
    users: {
        async getAll(query = {}) {
            return await apiClient.get(API_CONFIG.ENDPOINTS.USERS, query);
        },
        
        async getById(id) {
            return await apiClient.get(API_CONFIG.ENDPOINTS.USER_BY_ID.replace(':id', id));
        },
        
        async create(userData) {
            return await apiClient.post(API_CONFIG.ENDPOINTS.USERS, userData);
        },
        
        async update(id, userData) {
            return await apiClient.patch(API_CONFIG.ENDPOINTS.USER_BY_ID.replace(':id', id), userData);
        },
        
        async delete(id) {
            return await apiClient.delete(API_CONFIG.ENDPOINTS.USER_BY_ID.replace(':id', id));
        }
    },
    
    // Classrooms
    classrooms: {
        async getAll(query = {}) {
            return await apiClient.get(API_CONFIG.ENDPOINTS.CLASSROOMS, query);
        },
        
        async getById(id) {
            return await apiClient.get(API_CONFIG.ENDPOINTS.CLASSROOM_BY_ID.replace(':id', id));
        },
        
        async create(classroomData) {
            return await apiClient.post(API_CONFIG.ENDPOINTS.CLASSROOMS, classroomData);
        },
        
        async update(id, classroomData) {
            return await apiClient.patch(API_CONFIG.ENDPOINTS.CLASSROOM_BY_ID.replace(':id', id), classroomData);
        },
        
        async delete(id) {
            return await apiClient.delete(API_CONFIG.ENDPOINTS.CLASSROOM_BY_ID.replace(':id', id));
        }
    },
    
    // Cleaning Submissions
    submissions: {
        async getAll(query = {}) {
            return await apiClient.get(API_CONFIG.ENDPOINTS.SUBMISSIONS, query);
        },
        
        async getById(id) {
            return await apiClient.get(API_CONFIG.ENDPOINTS.SUBMISSION_BY_ID.replace(':id', id));
        },
        
        async create(submissionData) {
            return await apiClient.post(API_CONFIG.ENDPOINTS.SUBMISSIONS, submissionData);
        },
        
        async update(id, submissionData) {
            return await apiClient.patch(API_CONFIG.ENDPOINTS.SUBMISSION_BY_ID.replace(':id', id), submissionData);
        },
        
        async delete(id) {
            return await apiClient.delete(API_CONFIG.ENDPOINTS.SUBMISSION_BY_ID.replace(':id', id));
        }
    },
    
    // QR Codes
    qrCodes: {
        async getAll(query = {}) {
            return await apiClient.get(API_CONFIG.ENDPOINTS.QR_CODES, query);
        },
        
        async getById(id) {
            return await apiClient.get(API_CONFIG.ENDPOINTS.QR_CODE_BY_ID.replace(':id', id));
        },
        
        async create(qrData) {
            return await apiClient.post(API_CONFIG.ENDPOINTS.QR_CODES, qrData);
        },
        
        async update(id, qrData) {
            return await apiClient.patch(API_CONFIG.ENDPOINTS.QR_CODE_BY_ID.replace(':id', id), qrData);
        },
        
        async delete(id) {
            return await apiClient.delete(API_CONFIG.ENDPOINTS.QR_CODE_BY_ID.replace(':id', id));
        }
    },
    
    // File Upload
    upload: {
        async image(file) {
            if (API_CONFIG.UPLOAD.COMPRESS_IMAGES) {
                file = await compressImage(
                    file,
                    API_CONFIG.UPLOAD.MAX_WIDTH,
                    API_CONFIG.UPLOAD.MAX_HEIGHT,
                    API_CONFIG.UPLOAD.IMAGE_QUALITY
                );
            }
            return await apiClient.uploadFile(file);
        },
        
        async images(files) {
            if (API_CONFIG.UPLOAD.COMPRESS_IMAGES) {
                files = await Promise.all(
                    files.map(file => compressImage(
                        file,
                        API_CONFIG.UPLOAD.MAX_WIDTH,
                        API_CONFIG.UPLOAD.MAX_HEIGHT,
                        API_CONFIG.UPLOAD.IMAGE_QUALITY
                    ))
                );
            }
            return await apiClient.uploadFiles(files);
        }
    }
};

// Log configuration
console.log(`📡 API Mode: ${API_CONFIG.USE_REAL_API ? 'REAL API' : 'OFFLINE MOCK'}`);
if (API_CONFIG.USE_REAL_API) {
    console.log(`📡 API Base URL: ${API_CONFIG.BASE_URL}`);
}
