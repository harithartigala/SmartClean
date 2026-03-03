# SmartClean - Smart Classroom Cleaning Management System

<div align="center">

![SmartClean Logo](data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20200%20200'%3E%3Cdefs%3E%3ClinearGradient%20id='grad'%20x1='0%25'%20y1='0%25'%20x2='100%25'%20y2='100%25'%3E%3Cstop%20offset='0%25'%20style='stop-color:%232196F3;stop-opacity:1'%20/%3E%3Cstop%20offset='100%25'%20style='stop-color:%234CAF50;stop-opacity:1'%20/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width='200'%20height='200'%20rx='40'%20fill='url(%23grad)'/%3E%3Cpath%20d='M80%20140%20L80%2080%20L60%2080%20L100%2040%20L140%2080%20L120%2080%20L120%20140%20L100%20130%20L100%20160%20L60%20160%20L60%20150%20Z'%20fill='white'/%3E%3C/svg%3E)

**A modern, bilingual (English/Japanese) web application for managing classroom cleaning and inspection digitally.**

[🚀 Features](#features) • [📱 Pages](#pages) • [🌐 Languages](#languages) • [🎯 Getting Started](#getting-started) • [📖 Documentation](#documentation)

</div>

---

## 🚀 NEW: Works Offline!

**Version 1.0.1** - Now includes `mockdb.js` for full offline functionality!

- ✅ **No server required** - Works locally in any browser
- ✅ **Offline database** - Uses localStorage for data persistence  
- ✅ **Pre-loaded demo data** - 3 users, 3 classrooms ready to go
- ✅ **Just download & open** - Simply open `index.html` to start!

**Quick Start:** Download all files → Open `index.html` → Login with `student1` / `student123`

For detailed setup instructions, see [INSTALLATION.md](INSTALLATION.md)

---

## 🎯 Overview

SmartClean is a comprehensive **smart classroom cleaning management system** designed for schools and campuses. It enables students to submit cleaning evidence via photos, teachers to verify submissions, and admins to monitor overall performance — all with complete **bilingual support** for English and Japanese.

### ✨ Key Highlights

- 🌐 **Complete Bilingual Support** - Seamless English ⇄ Japanese translation
- 📱 **Mobile-First Design** - iPhone-style UI with bottom navigation
- 📷 **QR Code Integration** - Instant classroom access via QR scanning
- 🖼️ **Photo Evidence** - Multi-photo upload with automatic compression
- 📊 **Analytics Dashboard** - Real-time statistics with Chart.js
- 💾 **Database Integration** - RESTful API for data persistence
- 🎨 **Modern UI/UX** - Clean, professional design with smooth animations
- 📱 **PWA Ready** - Installable as a mobile app

---

## 🌟 Features

### Core Functionality

#### 1. **QR Code Scanner**
- Built-in HTML5 QR code scanner
- Works on mobile camera and desktop webcam
- Each classroom has a unique QR code
- Manual entry option available
- Instant navigation to cleaning form

#### 2. **Multi-Role System**
- **Students**: Submit cleaning reports with photos
- **Teachers**: Review and approve submissions with scoring
- **Admins**: Monitor system-wide performance and analytics

#### 3. **Evidence Photo Upload**
- Multiple photo uploads (minimum 2 required)
- Automatic image compression (70-90% size reduction)
- Photo preview before submission
- Timestamped evidence

#### 4. **Cleaning Checklist**
- 7-point comprehensive checklist:
  - Floor swept and mopped
  - Desks and chairs cleaned
  - Blackboard cleaned
  - Windows cleaned
  - Trash emptied
  - Items organized
  - Room ventilated

#### 5. **Teacher Review System**
- Approve/Reject submissions
- Assign scores (0-100)
- Provide detailed feedback
- Filter by status (pending/approved/rejected)

#### 6. **Admin Dashboard**
- System-wide statistics
- Interactive charts (Chart.js):
  - Status distribution (pie chart)
  - Score distribution (bar chart)
- Quick actions for management

#### 7. **QR Code Management**
- Generate QR codes for classrooms
- Preview and download QR codes
- Print-ready QR codes
- Track scan counts

#### 8. **Reports & Analytics**
- Date range filtering (today/week/month/all)
- Classroom and status filters
- Export to CSV
- Summary statistics

---

## 🌐 Languages

### Complete Bilingual Support

SmartClean offers **comprehensive bilingual support** for:
- 🇺🇸 **English**
- 🇯🇵 **Japanese** (日本語)

#### Features:
- ✅ Language toggle in header (🇺🇸 EN | 🇯🇵 JP)
- ✅ Automatic browser language detection
- ✅ Persistent language preference (localStorage)
- ✅ All UI elements translated
- ✅ All messages and notifications translated
- ✅ Chart labels dynamically updated
- ✅ Date formatting adapted by language
- ✅ Professional Japanese translations (keigo)

#### Translation Coverage:
- Login page
- All dashboards (Student/Teacher/Admin)
- Cleaning submission form
- Review and approval interfaces
- QR management page
- Reports page
- Navigation menus
- Status badges
- Error messages
- Success notifications
- Form labels and placeholders
- Modal dialogs
- Toast notifications

---

## 📱 Pages

### 1. **Login Page** (`index.html`)
- Role-based authentication
- Language selector
- Demo credentials display
- Responsive design

**Demo Accounts:**
- **Student**: `student1` / `student123`
- **Teacher**: `teacher1` / `teacher123`
- **Admin**: `admin` / `admin123`

**New Account Registration** (`register.html`)
- Students and teachers can self-register
- Role selection (Student/Teacher)
- Classroom assignment
- Password strength validation
- Automatic account activation

**User Management** (`user-management.html`) - *Admin Only*
- View all users with filtering (All/Students/Teachers/Admins)
- Search by name or username
- Add new users manually
- Edit existing user accounts
- Deactivate/delete user accounts
- User statistics dashboard

**Classroom Management** (`classroom-management.html`) - *Admin Only*
- View all classrooms with statistics
- Add new classrooms (number, building, floor, teacher, capacity)
- Edit classroom details
- Delete or deactivate classrooms
- Filter by active/inactive status
- Search by classroom number or building
- Track total capacity and building count

### 2. **Student Dashboard** (`student-dashboard.html`)
- QR code scanner
- Manual classroom entry
- Recent submissions history
- Submission status tracking
- Bottom navigation

### 3. **Cleaning Form** (`cleaning-form.html`)
- 7-point checklist
- Multi-photo upload with compression
- Additional notes field
- Auto-filled student info
- Classroom assignment

### 4. **Teacher Dashboard** (`teacher-dashboard.html`)
- Pending reviews counter
- Today's submissions
- Average score display
- Filter by status (All/Pending/Approved/Rejected)
- Detailed review modal
- Score assignment (0-100)
- Feedback submission

### 5. **Admin Dashboard** (`admin-dashboard.html`)
- System overview statistics
- Interactive charts:
  - Status distribution (doughnut chart)
  - Score distribution (bar chart)
- Quick action buttons
- Data export functionality

### 6. **QR Management** (`qr-management.html`)
- Generate QR codes for classrooms
- View all generated QR codes
- Download QR codes
- Print QR codes
- Track scan statistics

### 7. **Reports Page** (`reports.html`)
- Advanced filtering:
  - Date range (Today/Week/Month/All)
  - Classroom filter
  - Status filter
- Summary statistics
- Data table view
- CSV export

---

## 🗄️ Database Structure

### Tables

#### 1. **users** (9 fields)
- `id` - User ID
- `username` - Login username
- `password` - Password
- `name` - Full name (Japanese supported)
- `role` - student/teacher/admin
- `email` - Email address
- `phone` - Phone number
- `classroom` - Assigned classroom
- `active` - Account status

#### 2. **classrooms** (7 fields)
- `id` - Classroom ID
- `number` - Classroom number (e.g., "3-A")
- `building` - Building name
- `floor` - Floor number
- `teacher_name` - Assigned teacher
- `capacity` - Student capacity
- `active` - Active status

#### 3. **cleaning_submissions** (20 fields)
- `id` - Submission ID
- `classroom_id` - Classroom reference
- `classroom_number` - Classroom number
- `student_id` - Student reference
- `student_name` - Student name
- `submission_date` - Timestamp
- `checklist_*` - 7 checklist booleans
- `photos` - Array of photo URLs
- `notes` - Additional notes
- `status` - pending/approved/rejected
- `score` - Teacher score (0-100)
- `teacher_feedback` - Feedback text
- `reviewed_by` - Reviewer name
- `reviewed_at` - Review timestamp

#### 4. **qr_codes** (9 fields)
- `id` - QR code ID
- `classroom_id` - Classroom reference
- `classroom_number` - Classroom number
- `qr_data` - QR code data string
- `qr_image` - Base64 image
- `generated_at` - Generation timestamp
- `scan_count` - Number of scans
- `last_scanned` - Last scan timestamp
- `active` - Active status

---

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom styling with CSS variables
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Font Awesome 6.4.0** - Icon library
- **Google Fonts (Inter)** - Typography

### Libraries & APIs
- **Chart.js** - Data visualization
- **HTML5 QR Code Scanner** - QR code scanning
- **QR Code Generator** - QR code generation
- **RESTful Table API** - Data persistence

### Features
- **Responsive Design** - Mobile-first approach
- **PWA Support** - Progressive Web App
- **Image Compression** - Automatic compression utility
- **LocalStorage** - Session management
- **Toast Notifications** - User feedback
- **Modal Dialogs** - Interactive UI

---

## 👥 Creating New Accounts

### Method 1: Self-Registration (Students & Teachers)

1. **Go to the registration page:**
   - Open `index.html` in your browser
   - Click "Register Now" link below the login form
   - Or directly open `register.html`

2. **Fill in the registration form:**
   - **Select your role**: Student or Teacher
   - **Full Name**: Enter your full name (supports Japanese)
   - **Username**: Choose a unique username (letters, numbers, underscore)
   - **Password**: Create a strong password
   - **Confirm Password**: Re-enter your password
   - **Classroom**: Select your classroom from the dropdown (for students/teachers)
   - **Email** (optional): Your email address
   - **Phone** (optional): Your contact number

3. **Submit:**
   - Click "Create Account"
   - Wait for confirmation message
   - You'll be redirected to the login page
   - Login with your new credentials

### Method 2: Admin User Management (All Roles)

**Admin users can create accounts for students, teachers, and other admins:**

1. **Login as Admin:**
   - Use admin credentials: `admin` / `admin123`

2. **Navigate to User Management:**
   - From Admin Dashboard, click "Manage Users"
   - Or directly open `user-management.html`

3. **Add New User:**
   - Click "Add New User" button
   - Fill in user details:
     - Full Name
     - Username
     - Password
     - Role (Student/Teacher/Admin)
     - Classroom (if applicable)
     - Email (optional)
     - Phone (optional)
     - Active status (checked by default)
   - Click "Save"

4. **Manage Existing Users:**
   - **Search**: Type name or username in search box
   - **Filter**: Click All/Students/Teachers/Admins tabs
   - **Edit**: Click "Edit" button on any user row
   - **Delete**: Click "Delete" button to remove a user
   - **View Statistics**: See total users, students, teachers, and active users

### Account Features

- ✅ **Immediate Activation** - New accounts are active immediately
- ✅ **Password Security** - Passwords are stored securely
- ✅ **Bilingual Support** - Registration available in English and Japanese
- ✅ **Classroom Assignment** - Students/teachers assigned to classrooms
- ✅ **Role-Based Access** - Different dashboards for each role
- ✅ **Account Management** - Admins can edit/deactivate accounts

### Account Credentials Format

- **Username**: 
  - Alphanumeric characters and underscores only
  - Examples: `tanaka_taro`, `student2`, `teacher_sato`
  
- **Password**: 
  - Minimum 6 characters recommended
  - Use a mix of letters and numbers for security
  - Examples: `student123`, `teacher456`, `admin2024`

### Default Demo Accounts

The system comes with 3 pre-configured demo accounts:

| Role | Username | Password | Name | Classroom |
|------|----------|----------|------|-----------|
| Student | `student1` | `student123` | 田中太郎 (Tanaka Taro) | 1-A |
| Teacher | `teacher1` | `teacher123` | 佐藤花子 (Sato Hanako) | 1-A |
| Admin | `admin` | `admin123` | 鈴木一郎 (Suzuki Ichiro) | - |

---

## 🏫 Managing Classrooms

Before generating QR codes or registering users, you need to add your school's classrooms to the system.

### Quick Start

1. **Login as Admin** → `admin` / `admin123`
2. **Navigate to Classroom Management** → Click "Manage Classrooms" from Admin Dashboard
3. **Add Classroom** → Click "Add Classroom"
4. **Fill Details** → Classroom number, building, floor, teacher, capacity
5. **Save** → Classroom is created and ready for use

### Classroom Information Required

- **Classroom Number** * (e.g., "1-A", "2-B")
- **Building** * (e.g., "Building A", "North Wing")
- **Floor** * (e.g., 1, 2, 3)
- **Teacher** (optional - assigned teacher name)
- **Capacity** * (e.g., 30, 35, 40 students)
- **Notes** (optional - any additional information)
- **Active Status** (active classrooms appear in dropdowns)

### Why Add Classrooms?

- ✅ Required before generating QR codes
- ✅ Students select from classroom list during registration
- ✅ Teachers are assigned to specific classrooms
- ✅ Organize and track cleaning submissions
- ✅ View classroom-specific statistics

### Complete Guide

📖 **For detailed instructions, see [CLASSROOM_MANAGEMENT_GUIDE.md](CLASSROOM_MANAGEMENT_GUIDE.md)**

The comprehensive guide covers:
- ✅ Step-by-step classroom creation
- ✅ Editing and deleting classrooms
- ✅ Best practices for naming conventions
- ✅ Capacity planning guidelines
- ✅ Example setups for different school sizes
- ✅ Integration with QR codes and user registration

---

## 🔲 Generating QR Codes for Classrooms

QR codes allow students to quickly access the cleaning submission form by scanning a code posted in each classroom.

### Quick Start

1. **Login as Admin** → `admin` / `admin123`
2. **Navigate to QR Management** → Click "Generate QR Codes" from Admin Dashboard
3. **Select Classroom** → Choose from dropdown
4. **Generate** → Click "Generate QR Code"
5. **Download/Print** → Click "Download" or "Print" button
6. **Post in Classroom** → Place at eye level near entrance

### Step-by-Step Guide

📖 **For complete instructions, see [QR_CODE_GUIDE.md](QR_CODE_GUIDE.md)**

The comprehensive guide covers:
- ✅ Detailed generation steps
- ✅ Downloading and printing best practices
- ✅ Optimal placement in classrooms
- ✅ Testing QR codes
- ✅ Bulk generation for multiple classrooms
- ✅ Troubleshooting common issues
- ✅ Usage tracking and analytics

### What Each QR Code Contains

- **Classroom Number**: Pre-fills the cleaning form
- **Unique Identifier**: Links to specific classroom
- **Scannable Format**: Works with any QR scanner or phone camera
- **Data Format**: `SMARTCLEAN-CLASSROOM-[ROOM_NUMBER]`

### QR Code Features

- 📱 **Instant Access** - Students scan to start submission
- 🔒 **Secure** - No sensitive data embedded
- 📊 **Trackable** - Monitor scan counts per classroom
- 🖨️ **Print-Ready** - Download high-quality PNG files
- ♻️ **Regenerable** - Create new codes if damaged

---

## 🗄️ Database Options

SmartClean supports multiple database backends:

### **Option 1: Browser Storage (Default - Offline)**
- Uses `mockdb.js` with localStorage
- No server required
- Works completely offline
- Perfect for testing and demos
- Data persists in browser

### **Option 2: Python + SQLite Backend** - NEW!
- Full server-side database
- SQLite (no setup required)
- Export data to text files
- Complete CRUD API
- Production-ready

**📖 See: [PYTHON_BACKEND_GUIDE.md](PYTHON_BACKEND_GUIDE.md)** for complete Python backend documentation

#### Quick Python Setup:
```bash
# 1. Run Python database
python smartclean_db.py

# 2. Database created: smartclean.db
# 3. Export data to text files
# 4. Integrate with frontend via API
```

#### Python Features:
- ✅ SQLite database (serverless, zero-config)
- ✅ Complete CRUD operations
- ✅ Export to text files (classrooms, users, submissions, statistics)
- ✅ No external dependencies (Python standard library)
- ✅ Full Unicode/Japanese support
- ✅ Production-ready

### **Option 3: GitHub Pages + JSON**
- Host on GitHub Pages (free)
- JSON files as database
- Public repositories only
- See: [GITHUB_DEPLOY.md](GITHUB_DEPLOY.md)

### **Option 4: Real API Backend**
- Node.js, Python Flask, or any backend
- PostgreSQL, MySQL, MongoDB
- See: [API_INTEGRATION.md](API_INTEGRATION.md)

---

## 🎯 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for CDN resources)
- Camera access (for QR scanning)

### Installation

1. **Download/Clone** all project files
2. **Open** `index.html` in your browser
3. **Login** with demo credentials:
   - Student: `student1` / `student123`
   - Teacher: `teacher1` / `teacher123`
   - Admin: `admin` / `admin123`

### File Structure
```
smartclean/
├── index.html              # Login page
├── student-dashboard.html  # Student interface
├── cleaning-form.html      # Cleaning submission form
├── teacher-dashboard.html  # Teacher interface
├── admin-dashboard.html    # Admin interface
├── qr-management.html      # QR code management
├── reports.html            # Reports and analytics
├── manifest.json           # PWA manifest
├── css/
│   └── style.css          # Main stylesheet
└── js/
    ├── translations.js     # Bilingual translations
    └── utils.js           # Utility functions
```

---

## 📖 Documentation

### Complete Guides

- 🏫 **[CLASSROOM_MANAGEMENT_GUIDE.md](CLASSROOM_MANAGEMENT_GUIDE.md)** - Complete classroom setup guide
- 📱 **[QR_QUICK_START.md](QR_QUICK_START.md)** - 5-minute QR code setup guide
- 📖 **[QR_CODE_GUIDE.md](QR_CODE_GUIDE.md)** - Complete QR code generation & deployment
- 👥 **Creating New Accounts** - See "Creating New Accounts" section above
- 🚀 **[INSTALLATION.md](INSTALLATION.md)** - Detailed setup instructions
- 🆘 **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions
- 📋 **[QUICK_START.md](QUICK_START.md)** - Getting started quickly
- 🌐 **[GITHUB_DEPLOY.md](GITHUB_DEPLOY.md)** - Deploy to GitHub Pages

### Language System

#### Switching Languages
```javascript
// Switch to Japanese
langManager.setLanguage('ja');

// Switch to English
langManager.setLanguage('en');

// Get current language
const currentLang = langManager.getLanguage(); // 'en' or 'ja'
```

#### Getting Translations
```javascript
// Get translation by key
const text = t('login.welcome'); // "Welcome to SmartClean" or "SmartCleanへようこそ"

// Nested translations
const buttonText = t('cleaning.tasks.floor'); // Translated text
```

#### Adding New Translations
Edit `js/translations.js`:
```javascript
const translations = {
    en: {
        myKey: 'English Text'
    },
    ja: {
        myKey: '日本語テキスト'
    }
};
```

### API Usage

#### Fetch Submissions
```javascript
const response = await fetch('tables/cleaning_submissions?limit=100');
const data = await response.json();
```

#### Create Submission
```javascript
await fetch('tables/cleaning_submissions', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(submissionData)
});
```

#### Update Submission
```javascript
await fetch(`tables/cleaning_submissions/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({status: 'approved', score: 90})
});
```

---

## 🎨 Customization

### Color Scheme
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-blue: #2196F3;
    --primary-green: #4CAF50;
    --primary-dark: #1976D2;
    /* ... */
}
```

### Adding New Languages
1. Add language to `translations` object in `js/translations.js`
2. Add language toggle button in HTML
3. Implement `switchLanguage()` function

---

## 📊 Current Status

### ✅ Completed Features
- [x] Complete bilingual support (EN/JP)
- [x] Login system with role-based access
- [x] Student dashboard with QR scanner
- [x] Cleaning submission form
- [x] Teacher review system
- [x] Admin analytics dashboard
- [x] QR code generation and management
- [x] Reports with filtering and export
- [x] Image compression utility
- [x] Responsive mobile design
- [x] PWA manifest
- [x] Database schema (4 tables)
- [x] Demo data loaded

### 🚀 Recommended Next Steps
1. **Backend Integration**: Connect to real backend API
2. **User Authentication**: Implement secure JWT authentication
3. **Cloud Storage**: Integrate with AWS S3 or Firebase Storage for photos
4. **Push Notifications**: Add real-time notifications
5. **Service Worker**: Implement offline functionality
6. **Email Notifications**: Send email alerts to teachers
7. **Advanced Analytics**: Add more detailed charts and insights
8. **Mobile App**: Convert to native app (React Native/Flutter)
9. **Multi-tenant**: Support multiple schools
10. **Advanced Permissions**: Fine-grained role permissions

---

## 🔒 Security Considerations

### Current Implementation (Demo)
- ⚠️ Passwords stored in plain text (demo only)
- ⚠️ No encryption on data transfer
- ⚠️ Client-side authentication only

### Production Recommendations
- ✅ Hash passwords with bcrypt
- ✅ Implement JWT authentication
- ✅ Use HTTPS for all connections
- ✅ Add CSRF protection
- ✅ Implement rate limiting
- ✅ Sanitize user inputs
- ✅ Add API authentication
- ✅ Regular security audits

---

## 📄 License

This project is created for educational purposes. Feel free to use and modify as needed.

---

## 🤝 Support

For questions or issues:
1. Check the demo credentials
2. Ensure all files are properly loaded
3. Check browser console for errors
4. Verify camera permissions for QR scanning

---

## 🎉 Credits

**Developed with:**
- Font Awesome for icons
- Chart.js for data visualization
- HTML5 QR Code library
- Google Fonts (Inter)

---

<div align="center">

**SmartClean** - Making Classroom Cleaning Management Smarter! 🧹✨

[English](#) | [日本語](#)

</div>
