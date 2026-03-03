// SmartClean - GitHub Database Integration
// Uses GitHub repository as a JSON database via GitHub API

// ============================================
// CONFIGURATION - UPDATE THESE VALUES!
// ============================================
const GITHUB_CONFIG = {
    // Your GitHub username
    username: 'YOUR_GITHUB_USERNAME',
    
    // Your repository name
    repo: 'smartclean',
    
    // Branch name (usually 'main' or 'master')
    branch: 'main',
    
    // Personal Access Token (optional - for write access)
    // Leave empty for read-only mode
    token: '',
    
    // Enable/disable GitHub backend
    useGitHub: false,  // Set to true to use GitHub as database
    
    // Cache settings
    cacheEnabled: true,
    cacheDuration: 60000  // 1 minute
};

// ============================================
// GITHUB DATABASE CLIENT
// ============================================
class GitHubDatabase {
    constructor(config) {
        this.config = config;
        this.baseUrl = `https://api.github.com/repos/${config.username}/${config.repo}`;
        this.cache = new Map();
    }
    
    // Get headers for GitHub API
    getHeaders() {
        const headers = {
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        };
        
        if (this.config.token) {
            headers['Authorization'] = `token ${this.config.token}`;
        }
        
        return headers;
    }
    
    // Read file from GitHub
    async readFile(path) {
        // Check cache first
        if (this.config.cacheEnabled) {
            const cached = this.cache.get(path);
            if (cached && Date.now() - cached.timestamp < this.config.cacheDuration) {
                console.log(`📦 Using cached data for: ${path}`);
                return cached.data;
            }
        }
        
        try {
            const url = `${this.baseUrl}/contents/${path}?ref=${this.config.branch}`;
            const response = await fetch(url, {
                headers: this.getHeaders()
            });
            
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Decode base64 content
            const content = atob(data.content);
            const jsonData = JSON.parse(content);
            
            // Cache the result
            if (this.config.cacheEnabled) {
                this.cache.set(path, {
                    data: jsonData,
                    timestamp: Date.now(),
                    sha: data.sha
                });
            }
            
            console.log(`✅ Loaded from GitHub: ${path}`);
            return jsonData;
        } catch (error) {
            console.error(`❌ Error reading ${path}:`, error);
            throw error;
        }
    }
    
    // Write file to GitHub
    async writeFile(path, data, message = 'Update data') {
        if (!this.config.token) {
            throw new Error('GitHub token required for write operations');
        }
        
        try {
            // Get current file to get its SHA
            const currentUrl = `${this.baseUrl}/contents/${path}?ref=${this.config.branch}`;
            let sha = null;
            
            try {
                const currentResponse = await fetch(currentUrl, {
                    headers: this.getHeaders()
                });
                if (currentResponse.ok) {
                    const currentData = await currentResponse.json();
                    sha = currentData.sha;
                }
            } catch (e) {
                // File doesn't exist yet, that's okay
            }
            
            // Encode content as base64
            const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));
            
            // Create/update file
            const url = `${this.baseUrl}/contents/${path}`;
            const body = {
                message: message,
                content: content,
                branch: this.config.branch
            };
            
            if (sha) {
                body.sha = sha;
            }
            
            const response = await fetch(url, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify(body)
            });
            
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            
            // Clear cache for this file
            this.cache.delete(path);
            
            console.log(`✅ Saved to GitHub: ${path}`);
            return await response.json();
        } catch (error) {
            console.error(`❌ Error writing ${path}:`, error);
            throw error;
        }
    }
    
    // Get all items from a data file
    async getAll(tableName) {
        const path = `data/${tableName}.json`;
        return await this.readFile(path);
    }
    
    // Get single item by ID
    async getById(tableName, id) {
        const items = await this.getAll(tableName);
        return items.find(item => item.id === id) || null;
    }
    
    // Add new item
    async create(tableName, item) {
        const items = await this.getAll(tableName);
        
        // Add timestamps
        item.created_at = Date.now();
        item.updated_at = Date.now();
        
        // Generate ID if not provided
        if (!item.id) {
            item.id = this.generateId();
        }
        
        items.push(item);
        
        await this.writeFile(
            `data/${tableName}.json`,
            items,
            `Add new ${tableName.slice(0, -1)}: ${item.id}`
        );
        
        return item;
    }
    
    // Update existing item
    async update(tableName, id, updates) {
        const items = await this.getAll(tableName);
        const index = items.findIndex(item => item.id === id);
        
        if (index === -1) {
            throw new Error(`Item ${id} not found in ${tableName}`);
        }
        
        // Merge updates
        items[index] = {
            ...items[index],
            ...updates,
            updated_at: Date.now()
        };
        
        await this.writeFile(
            `data/${tableName}.json`,
            items,
            `Update ${tableName.slice(0, -1)}: ${id}`
        );
        
        return items[index];
    }
    
    // Delete item
    async delete(tableName, id) {
        const items = await this.getAll(tableName);
        const filtered = items.filter(item => item.id !== id);
        
        if (filtered.length === items.length) {
            throw new Error(`Item ${id} not found in ${tableName}`);
        }
        
        await this.writeFile(
            `data/${tableName}.json`,
            filtered,
            `Delete ${tableName.slice(0, -1)}: ${id}`
        );
        
        return true;
    }
    
    // Query with filters
    async query(tableName, filters = {}) {
        let items = await this.getAll(tableName);
        
        // Apply filters
        Object.keys(filters).forEach(key => {
            const value = filters[key];
            items = items.filter(item => {
                if (typeof value === 'function') {
                    return value(item[key]);
                }
                return item[key] === value;
            });
        });
        
        return items;
    }
    
    // Generate unique ID
    generateId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // Clear cache
    clearCache() {
        this.cache.clear();
        console.log('🗑️ Cache cleared');
    }
}

// Create global instance
const githubDB = new GitHubDatabase(GITHUB_CONFIG);

// ============================================
// SMART DATABASE WRAPPER
// ============================================
// Automatically chooses between localStorage (mockDB) and GitHub

class SmartDatabase {
    constructor() {
        this.useGitHub = GITHUB_CONFIG.useGitHub && GITHUB_CONFIG.username && GITHUB_CONFIG.repo;
        
        if (this.useGitHub) {
            console.log('📡 Using GitHub as database');
            console.log(`📂 Repository: ${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}`);
        } else {
            console.log('💾 Using localStorage as database');
        }
    }
    
    // Map table names to file names
    getFileName(tableName) {
        const mapping = {
            'users': 'users',
            'classrooms': 'classrooms',
            'cleaning_submissions': 'submissions',
            'qr_codes': 'qr_codes'
        };
        return mapping[tableName] || tableName;
    }
    
    // Unified get all method
    async getAll(tableName) {
        const fileName = this.getFileName(tableName);
        
        if (this.useGitHub) {
            try {
                return await githubDB.getAll(fileName);
            } catch (error) {
                console.warn('Falling back to localStorage:', error);
                return this.getFromLocalStorage(tableName);
            }
        } else {
            return this.getFromLocalStorage(tableName);
        }
    }
    
    // Get from localStorage (fallback)
    getFromLocalStorage(tableName) {
        const mapping = {
            'users': 'smartclean_users',
            'classrooms': 'smartclean_classrooms',
            'cleaning_submissions': 'smartclean_submissions',
            'qr_codes': 'smartclean_qrcodes'
        };
        
        const key = mapping[tableName] || `smartclean_${tableName}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }
    
    // Unified create method
    async create(tableName, item) {
        const fileName = this.getFileName(tableName);
        
        if (this.useGitHub && GITHUB_CONFIG.token) {
            return await githubDB.create(fileName, item);
        } else {
            // Use localStorage
            const items = this.getFromLocalStorage(tableName);
            item.id = item.id || githubDB.generateId();
            item.created_at = Date.now();
            item.updated_at = Date.now();
            items.push(item);
            this.saveToLocalStorage(tableName, items);
            return item;
        }
    }
    
    // Unified update method
    async update(tableName, id, updates) {
        const fileName = this.getFileName(tableName);
        
        if (this.useGitHub && GITHUB_CONFIG.token) {
            return await githubDB.update(fileName, id, updates);
        } else {
            // Use localStorage
            const items = this.getFromLocalStorage(tableName);
            const index = items.findIndex(item => item.id === id);
            if (index !== -1) {
                items[index] = { ...items[index], ...updates, updated_at: Date.now() };
                this.saveToLocalStorage(tableName, items);
                return items[index];
            }
            throw new Error('Item not found');
        }
    }
    
    // Save to localStorage
    saveToLocalStorage(tableName, data) {
        const mapping = {
            'users': 'smartclean_users',
            'classrooms': 'smartclean_classrooms',
            'cleaning_submissions': 'smartclean_submissions',
            'qr_codes': 'smartclean_qrcodes'
        };
        
        const key = mapping[tableName] || `smartclean_${tableName}`;
        localStorage.setItem(key, JSON.stringify(data));
    }
}

// Create global smart database instance
const smartDB = new SmartDatabase();

// Log configuration
console.log('🗄️ SmartClean Database Ready');
console.log(`Mode: ${GITHUB_CONFIG.useGitHub ? 'GitHub' : 'localStorage'}`);
if (GITHUB_CONFIG.useGitHub) {
    console.log(`Repository: ${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}`);
    console.log(`Write Access: ${GITHUB_CONFIG.token ? 'Yes' : 'No (Read-only)'}`);
}
