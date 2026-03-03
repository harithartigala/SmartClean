// SmartClean - Demo Data for Offline Mode
// This file contains demo data that can be used when the API is not available

const demoData = {
    users: [
        {
            id: 'user001',
            username: 'student1',
            password: 'student123',
            name: '田中太郎',
            role: 'student',
            email: 'tanaka@school.jp',
            phone: '090-1234-5678',
            classroom: '3-A',
            active: true,
            created_at: Date.now() - 30 * 24 * 60 * 60 * 1000,
            updated_at: Date.now()
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
            active: true,
            created_at: Date.now() - 30 * 24 * 60 * 60 * 1000,
            updated_at: Date.now()
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
            active: true,
            created_at: Date.now() - 30 * 24 * 60 * 60 * 1000,
            updated_at: Date.now()
        }
    ],
    
    classrooms: [
        {
            id: 'room001',
            number: '3-A',
            building: 'Main Building',
            floor: 3,
            teacher_name: '佐藤花子',
            capacity: 40,
            active: true,
            created_at: Date.now() - 30 * 24 * 60 * 60 * 1000,
            updated_at: Date.now()
        },
        {
            id: 'room002',
            number: '3-B',
            building: 'Main Building',
            floor: 3,
            teacher_name: '山田太郎',
            capacity: 40,
            active: true,
            created_at: Date.now() - 30 * 24 * 60 * 60 * 1000,
            updated_at: Date.now()
        },
        {
            id: 'room003',
            number: '2-A',
            building: 'Main Building',
            floor: 2,
            teacher_name: '伊藤美咲',
            capacity: 38,
            active: true,
            created_at: Date.now() - 30 * 24 * 60 * 60 * 1000,
            updated_at: Date.now()
        }
    ],
    
    cleaning_submissions: [
        {
            id: 'sub001',
            classroom_id: 'room001',
            classroom_number: '3-A',
            student_id: 'user001',
            student_name: '田中太郎',
            submission_date: Date.now() - 2 * 24 * 60 * 60 * 1000,
            checklist_floor: true,
            checklist_desks: true,
            checklist_blackboard: true,
            checklist_windows: true,
            checklist_trash: true,
            checklist_organize: true,
            checklist_air: true,
            photos: [
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%234CAF50" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="white"%3EDemo Photo 1%3C/text%3E%3C/svg%3E',
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%232196F3" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="white"%3EDemo Photo 2%3C/text%3E%3C/svg%3E'
            ],
            notes: 'All cleaning tasks completed thoroughly.',
            status: 'approved',
            score: 95,
            teacher_feedback: 'Excellent work! The classroom is very clean.',
            reviewed_by: '佐藤花子',
            reviewed_at: Date.now() - 1 * 24 * 60 * 60 * 1000,
            created_at: Date.now() - 2 * 24 * 60 * 60 * 1000,
            updated_at: Date.now() - 1 * 24 * 60 * 60 * 1000
        },
        {
            id: 'sub002',
            classroom_id: 'room001',
            classroom_number: '3-A',
            student_id: 'user001',
            student_name: '田中太郎',
            submission_date: Date.now() - 1 * 60 * 60 * 1000,
            checklist_floor: true,
            checklist_desks: true,
            checklist_blackboard: true,
            checklist_windows: false,
            checklist_trash: true,
            checklist_organize: true,
            checklist_air: true,
            photos: [
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23FF9800" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="white"%3EDemo Photo 3%3C/text%3E%3C/svg%3E',
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%239C27B0" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="white"%3EDemo Photo 4%3C/text%3E%3C/svg%3E'
            ],
            notes: 'Today\'s cleaning session.',
            status: 'pending',
            score: null,
            teacher_feedback: '',
            reviewed_by: '',
            reviewed_at: null,
            created_at: Date.now() - 1 * 60 * 60 * 1000,
            updated_at: Date.now() - 1 * 60 * 60 * 1000
        }
    ],
    
    qr_codes: [
        {
            id: 'qr001',
            classroom_id: 'room001',
            classroom_number: '3-A',
            qr_data: 'SMARTCLEAN:3-A',
            qr_image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="white" width="200" height="200"/%3E%3Crect fill="black" x="10" y="10" width="20" height="20"/%3E%3Crect fill="black" x="40" y="10" width="20" height="20"/%3E%3Crect fill="black" x="70" y="10" width="20" height="20"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" font-size="12"%3EQR: 3-A%3C/text%3E%3C/svg%3E',
            generated_at: Date.now() - 15 * 24 * 60 * 60 * 1000,
            scan_count: 12,
            last_scanned: Date.now() - 2 * 60 * 60 * 1000,
            active: true,
            created_at: Date.now() - 15 * 24 * 60 * 60 * 1000,
            updated_at: Date.now()
        },
        {
            id: 'qr002',
            classroom_id: 'room002',
            classroom_number: '3-B',
            qr_data: 'SMARTCLEAN:3-B',
            qr_image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="white" width="200" height="200"/%3E%3Crect fill="black" x="10" y="10" width="20" height="20"/%3E%3Crect fill="black" x="40" y="10" width="20" height="20"/%3E%3Crect fill="black" x="70" y="10" width="20" height="20"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" font-size="12"%3EQR: 3-B%3C/text%3E%3C/svg%3E',
            generated_at: Date.now() - 15 * 24 * 60 * 60 * 1000,
            scan_count: 8,
            last_scanned: Date.now() - 5 * 60 * 60 * 1000,
            active: true,
            created_at: Date.now() - 15 * 24 * 60 * 60 * 1000,
            updated_at: Date.now()
        },
        {
            id: 'qr003',
            classroom_id: 'room003',
            classroom_number: '2-A',
            qr_data: 'SMARTCLEAN:2-A',
            qr_image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="white" width="200" height="200"/%3E%3Crect fill="black" x="10" y="10" width="20" height="20"/%3E%3Crect fill="black" x="40" y="10" width="20" height="20"/%3E%3Crect fill="black" x="70" y="10" width="20" height="20"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" font-size="12"%3EQR: 2-A%3C/text%3E%3C/svg%3E',
            generated_at: Date.now() - 15 * 24 * 60 * 60 * 1000,
            scan_count: 5,
            last_scanned: Date.now() - 10 * 60 * 60 * 1000,
            active: true,
            created_at: Date.now() - 15 * 24 * 60 * 60 * 1000,
            updated_at: Date.now()
        }
    ]
};

// Helper function to fetch data with fallback to demo data
async function fetchWithFallback(endpoint, options = {}) {
    try {
        const response = await fetch(endpoint, options);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.log('API not available, using demo data');
    }
    
    // Parse endpoint to get table name
    const tableName = endpoint.split('/')[1]?.split('?')[0];
    
    if (tableName && demoData[tableName]) {
        // Simulate API response format
        return {
            data: demoData[tableName],
            total: demoData[tableName].length,
            page: 1,
            limit: 100
        };
    }
    
    return { data: [], total: 0 };
}

// Helper to save data (for offline mode, saves to localStorage)
async function saveWithFallback(endpoint, method, data) {
    try {
        const response = await fetch(endpoint, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.log('API not available, saving to localStorage');
    }
    
    // Parse endpoint to get table name and id
    const parts = endpoint.split('/');
    const tableName = parts[1];
    const recordId = parts[2];
    
    // Get existing data from localStorage
    const storageKey = `smartclean_${tableName}`;
    let storedData = JSON.parse(localStorage.getItem(storageKey) || 'null') || [...(demoData[tableName] || [])];
    
    if (method === 'POST') {
        // Add new record
        const newRecord = {
            ...data,
            created_at: Date.now(),
            updated_at: Date.now()
        };
        storedData.push(newRecord);
        localStorage.setItem(storageKey, JSON.stringify(storedData));
        return newRecord;
    } else if (method === 'PATCH' || method === 'PUT') {
        // Update existing record
        const index = storedData.findIndex(item => item.id === recordId);
        if (index !== -1) {
            storedData[index] = {
                ...storedData[index],
                ...data,
                updated_at: Date.now()
            };
            localStorage.setItem(storageKey, JSON.stringify(storedData));
            return storedData[index];
        }
    } else if (method === 'DELETE') {
        // Delete record
        storedData = storedData.filter(item => item.id !== recordId);
        localStorage.setItem(storageKey, JSON.stringify(storedData));
        return { success: true };
    }
    
    return data;
}

// Initialize demo data in localStorage if needed
function initializeDemoData() {
    Object.keys(demoData).forEach(tableName => {
        const storageKey = `smartclean_${tableName}`;
        if (!localStorage.getItem(storageKey)) {
            localStorage.setItem(storageKey, JSON.stringify(demoData[tableName]));
        }
    });
}

// Initialize on load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializeDemoData);
}
