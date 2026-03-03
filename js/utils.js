// SmartClean - Utility Functions

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <i class="fas ${icons[type]} toast-icon"></i>
        <div class="toast-content">
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// ============================================
// LOADING OVERLAY
// ============================================
function showLoading() {
    const overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
        <div>
            <div class="spinner"></div>
            <p data-i18n="loading">${t('loading')}</p>
        </div>
    `;
    document.body.appendChild(overlay);
}

function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// ============================================
// MODAL FUNCTIONS
// ============================================
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

function createConfirmModal(title, message, onConfirm) {
    const modalId = 'confirm-modal-' + Date.now();
    const modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">${title}</h3>
                <button class="modal-close" onclick="hideModal('${modalId}')">&times;</button>
            </div>
            <div class="modal-body">
                <p>${message}</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="hideModal('${modalId}'); document.getElementById('${modalId}').remove();">
                    ${t('cancel')}
                </button>
                <button class="btn btn-primary" id="${modalId}-confirm">
                    ${t('confirm')}
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById(`${modalId}-confirm`).onclick = () => {
        hideModal(modalId);
        modal.remove();
        if (onConfirm) onConfirm();
    };
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            hideModal(modalId);
            modal.remove();
        }
    };
}

// ============================================
// IMAGE COMPRESSION
// ============================================
async function compressImage(file, maxWidth = 1920, maxHeight = 1080, quality = 0.8) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
                
                if (height > maxHeight) {
                    width = (width * maxHeight) / height;
                    height = maxHeight;
                }
                
                canvas.width = width;
                canvas.height = height;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                canvas.toBlob((blob) => {
                    resolve(new File([blob], file.name, {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    }));
                }, 'image/jpeg', quality);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

// ============================================
// FILE UPLOAD
// ============================================
async function handleFileUpload(files, onProgress) {
    const uploadedFiles = [];
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (!file.type.startsWith('image/')) {
            showToast(t('messages.invalidInput'), 'error');
            continue;
        }
        
        if (onProgress) onProgress(i + 1, files.length);
        
        const compressed = await compressImage(file);
        const dataUrl = await fileToDataURL(compressed);
        
        uploadedFiles.push({
            name: file.name,
            size: compressed.size,
            type: compressed.type,
            dataUrl: dataUrl,
            timestamp: Date.now()
        });
    }
    
    return uploadedFiles;
}

function fileToDataURL(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
    });
}

// ============================================
// LOCAL STORAGE HELPERS
// ============================================
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.error('Storage error:', e);
        return false;
    }
}

function loadFromStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.error('Storage error:', e);
        return defaultValue;
    }
}

function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (e) {
        console.error('Storage error:', e);
        return false;
    }
}

// ============================================
// SESSION MANAGEMENT
// ============================================
function getCurrentUser() {
    return loadFromStorage('smartclean_user');
}

function setCurrentUser(user) {
    return saveToStorage('smartclean_user', user);
}

function logout() {
    removeFromStorage('smartclean_user');
    window.location.href = 'index.html';
}

function checkAuth() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'index.html';
        return null;
    }
    return user;
}

// ============================================
// DATE FORMATTING
// ============================================
function formatDate(date, format = 'full') {
    return langManager.formatDate(date, format);
}

function formatDateTime(timestamp) {
    return formatDate(timestamp, 'full');
}

function formatDateOnly(timestamp) {
    return formatDate(timestamp, 'date');
}

function formatTimeOnly(timestamp) {
    return formatDate(timestamp, 'time');
}

// ============================================
// QR CODE GENERATION
// ============================================
async function generateQRCode(data, options = {}) {
    const defaults = {
        width: 300,
        height: 300,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    };
    
    const config = { ...defaults, ...options };
    
    return new Promise((resolve, reject) => {
        const qr = new QRCode(document.createElement('div'), config);
        qr.makeCode(data);
        
        setTimeout(() => {
            const canvas = qr._el.querySelector('canvas');
            if (canvas) {
                resolve(canvas.toDataURL());
            } else {
                reject(new Error('Failed to generate QR code'));
            }
        }, 100);
    });
}

// ============================================
// DATA EXPORT
// ============================================
function exportToCSV(data, filename) {
    if (!data || data.length === 0) {
        showToast(t('messages.noData'), 'warning');
        return;
    }
    
    const headers = Object.keys(data[0]);
    const csv = [
        headers.join(','),
        ...data.map(row => headers.map(h => JSON.stringify(row[h] || '')).join(','))
    ].join('\n');
    
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, filename);
}

function exportToPDF(title, content, filename) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text(title, 20, 20);
    
    doc.setFontSize(12);
    let y = 40;
    
    content.forEach(item => {
        if (y > 280) {
            doc.addPage();
            y = 20;
        }
        doc.text(item, 20, y);
        y += 10;
    });
    
    doc.save(filename);
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ============================================
// VALIDATION
// ============================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function validateRequired(value) {
    return value !== null && value !== undefined && value.toString().trim() !== '';
}

// ============================================
// DEBOUNCE
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// ARRAY HELPERS
// ============================================
function groupBy(array, key) {
    return array.reduce((result, item) => {
        const group = item[key];
        if (!result[group]) {
            result[group] = [];
        }
        result[group].push(item);
        return result;
    }, {});
}

function sortBy(array, key, descending = false) {
    return [...array].sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];
        const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        return descending ? -comparison : comparison;
    });
}

// ============================================
// RANDOM ID GENERATION
// ============================================
function generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// ============================================
// INITIALIZE COMMON FEATURES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Auto-hide alerts after 5 seconds
    document.querySelectorAll('.alert').forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => alert.remove(), 300);
        }, 5000);
    });
});
