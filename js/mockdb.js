// SmartClean - Mock Database API for Local Development
// This file provides a fallback when the RESTful API is not available

class MockDatabase {
    constructor() {
        this.initializeDatabase();
    }

    // Initialize mock data
    initializeDatabase() {
        // Check if data already exists
        if (!localStorage.getItem('smartclean_users')) {
            // Initialize users
            const users = [
                {
                    id: 'user001',
                    username: 'student1',
                    password: 'student123',
                    name: '田中太郎',
                    role: 'student',
                    email: 'tanaka@school.jp',
                    phone: '090-1234-5678',
                    classroom: '3-A',
                    active: true
                },
                {
                    id: 'user002',
                    username: 'teacher1',
                    password: 'teacher123',
                    name: '佐藤花子',
                    role: 'teacher',
                    email: 'sato@school.jp',
                    phone: '090-2345-6789',
                    classroom: '',
                    active: true
                },
                {
                    id: 'user003',
                    username: 'admin',
                    password: 'admin123',
                    name: '鈴木一郎',
                    role: 'admin',
                    email: 'suzuki@school.jp',
                    phone: '090-3456-7890',
                    classroom: '',
                    active: true
                }
            ];
            localStorage.setItem('smartclean_users', JSON.stringify(users));

            // Initialize classrooms
            const classrooms = [
                {
                    id: 'room001',
                    number: '3-A',
                    building: 'Main Building',
                    floor: 3,
                    teacher_name: '佐藤花子',
                    capacity: 40,
                    active: true,
                    created_at: Date.now()
                },
                {
                    id: 'room002',
                    number: '3-B',
                    building: 'Main Building',
                    floor: 3,
                    teacher_name: '山田太郎',
                    capacity: 40,
                    active: true,
                    created_at: Date.now()
                },
                {
                    id: 'room003',
                    number: '2-A',
                    building: 'Main Building',
                    floor: 2,
                    teacher_name: '伊藤美咲',
                    capacity: 38,
                    active: true,
                    created_at: Date.now()
                }
            ];
            localStorage.setItem('smartclean_classrooms', JSON.stringify(classrooms));

            // Initialize empty submissions array
            localStorage.setItem('smartclean_submissions', JSON.stringify([]));

            // Initialize empty QR codes array
            localStorage.setItem('smartclean_qrcodes', JSON.stringify([]));
        }
    }

    // Mock fetch function
    async mockFetch(url, options = {}) {
        // Parse the URL
        const urlParts = url.split('/');
        const tableName = urlParts[1]; // e.g., 'users', 'classrooms', etc.
        const recordId = urlParts[2]; // optional record ID

        const method = options.method || 'GET';
        
        // Get table data
        let data = this.getTableData(tableName);

        if (method === 'GET') {
            if (recordId) {
                // Get single record
                const record = data.find(r => r.id === recordId);
                return { data: record || null };
            } else {
                // Parse query parameters
                const queryString = url.split('?')[1];
                const params = new URLSearchParams(queryString);
                const search = params.get('search');
                const limit = parseInt(params.get('limit')) || 100;
                const sort = params.get('sort');

                // Filter data
                let filtered = data;
                if (search) {
                    filtered = data.filter(item => 
                        JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
                    );
                }

                // Sort data
                if (sort) {
                    const desc = sort.startsWith('-');
                    const field = desc ? sort.substring(1) : sort;
                    filtered.sort((a, b) => {
                        if (desc) {
                            return b[field] > a[field] ? 1 : -1;
                        }
                        return a[field] > b[field] ? 1 : -1;
                    });
                }

                // Limit data
                filtered = filtered.slice(0, limit);

                return {
                    data: filtered,
                    total: data.length,
                    page: 1,
                    limit: limit,
                    table: tableName
                };
            }
        } else if (method === 'POST') {
            // Create new record
            const newRecord = JSON.parse(options.body);
            newRecord.created_at = Date.now();
            newRecord.updated_at = Date.now();
            data.push(newRecord);
            this.saveTableData(tableName, data);
            return { data: newRecord };
        } else if (method === 'PUT' || method === 'PATCH') {
            // Update record
            const updates = JSON.parse(options.body);
            const index = data.findIndex(r => r.id === recordId);
            if (index !== -1) {
                if (method === 'PUT') {
                    data[index] = { ...updates, id: recordId, updated_at: Date.now() };
                } else {
                    data[index] = { ...data[index], ...updates, updated_at: Date.now() };
                }
                this.saveTableData(tableName, data);
                return { data: data[index] };
            }
            return { error: 'Record not found' };
        } else if (method === 'DELETE') {
            // Delete record (soft delete)
            const index = data.findIndex(r => r.id === recordId);
            if (index !== -1) {
                data[index].deleted = true;
                this.saveTableData(tableName, data);
                return { success: true };
            }
            return { error: 'Record not found' };
        }

        return { error: 'Invalid request' };
    }

    getTableData(tableName) {
        const mapping = {
            'users': 'smartclean_users',
            'classrooms': 'smartclean_classrooms',
            'cleaning_submissions': 'smartclean_submissions',
            'qr_codes': 'smartclean_qrcodes'
        };

        const storageKey = mapping[tableName] || `smartclean_${tableName}`;
        const data = localStorage.getItem(storageKey);
        return data ? JSON.parse(data) : [];
    }

    saveTableData(tableName, data) {
        const mapping = {
            'users': 'smartclean_users',
            'classrooms': 'smartclean_classrooms',
            'cleaning_submissions': 'smartclean_submissions',
            'qr_codes': 'smartclean_qrcodes'
        };

        const storageKey = mapping[tableName] || `smartclean_${tableName}`;
        localStorage.setItem(storageKey, JSON.stringify(data));
    }
}

// Create global mock database instance
const mockDB = new MockDatabase();

// Store original fetch before overriding
if (!window.originalFetch) {
    window.originalFetch = window.fetch;
}

// Override fetch for tables API
window.fetch = function(url, options) {
    // Check if API_CONFIG exists and wants to use real API
    if (typeof API_CONFIG !== 'undefined' && API_CONFIG.USE_REAL_API) {
        console.log('Using real API for:', url);
        return window.originalFetch.apply(this, arguments);
    }
    
    // Check if it's a tables API call
    if (typeof url === 'string' && url.startsWith('tables/')) {
        console.log('Using mock database for:', url);
        return Promise.resolve({
            ok: true,
            status: 200,
            json: () => mockDB.mockFetch(url, options)
        });
    }
    // Use original fetch for other requests
    return window.originalFetch.apply(this, arguments);
};

console.log('✅ Mock Database initialized - SmartClean is ready for offline use!');
