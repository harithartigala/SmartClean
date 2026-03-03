# 🧹 SmartClean v2.0 - Complete System Overview

**Modern Classroom Cleaning Management System with Cloudflare D1 Database**

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/smartclean/smartclean)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-D1-orange.svg)](https://developers.cloudflare.com/d1/)

---

## 🌟 What's New in v2.0

### Major Upgrades
- ✅ **Cloudflare D1 Database** - Serverless SQL database with global edge distribution
- ✅ **Cloudflare Workers API** - Fast, secure backend API at the edge
- ✅ **Enhanced Security** - Password hashing, JWT tokens, session management, audit logging
- ✅ **Advanced Reports** - PDF, Excel, CSV exports with charts and visualizations
- ✅ **Auto QR Generation** - Automatic QR code creation with backend storage
- ✅ **Real-time API** - RESTful API with authentication and CRUD operations
- ✅ **Removed Features** - QR scanning feature removed as per requirements

---

## 📋 System Architecture

### Frontend (Static Files)
```
SmartClean Frontend
├── HTML5 + CSS3 + Vanilla JavaScript
├── Chart.js for data visualization
├── jsPDF + SheetJS for exports
├── Font Awesome icons
└── Mobile-responsive design
```

### Backend (Cloudflare)
```
Cloudflare Infrastructure
├── D1 Database (Serverless SQL)
├── Workers API (Edge Computing)
├── R2 Storage (Optional - for files)
└── KV Namespace (Optional - for sessions)
```

### Database Schema
```
SmartClean D1 Database
├── users (authentication, profiles)
├── classrooms (classroom data)
├── cleaning_submissions (cleaning records)
├── submission_photos (photo storage)
├── qr_codes (QR code data)
├── audit_logs (security logging)
├── notifications (user notifications)
├── reports (generated reports)
├── settings (system configuration)
└── sessions (user sessions)
```

---

## 🚀 Quick Start

### Prerequisites
```bash
# Node.js v16+
node --version

# Wrangler CLI
npm install -g wrangler
```

### 1. Clone Repository
```bash
git clone https://github.com/YOUR-USERNAME/smartclean.git
cd smartclean
```

### 2. Setup Cloudflare D1
```bash
cd cloudflare

# Login to Cloudflare
wrangler login

# Create database
wrangler d1 create smartclean-db

# Update wrangler.toml with database_id

# Initialize schema
wrangler d1 execute smartclean-db --file=./schema.sql
```

### 3. Deploy Worker
```bash
# Install dependencies
npm install

# Deploy to Cloudflare
wrangler deploy
```

### 4. Configure Frontend
Update `js/api-client.js`:
```javascript
const API_CONFIG = {
    BASE_URL: 'https://your-worker.workers.dev',
    // ... rest of config
};
```

### 5. Deploy Frontend
```bash
# Option A: Cloudflare Pages
# Connect GitHub repo to Cloudflare Pages

# Option B: Local testing
python -m http.server 8000
```

**📚 Detailed Setup:** See `CLOUDFLARE_DEPLOYMENT.md`

---

## 🎯 Key Features

### 1. User Management
- **Registration** - Self-service account creation for students and teachers
- **Authentication** - Secure login with password hashing and JWT tokens
- **Roles** - Student, Teacher, Admin with role-based access control
- **Profiles** - User profiles with avatar, email, phone
- **Sessions** - Session management with automatic expiration

### 2. Classroom Management
- **CRUD Operations** - Create, read, update, delete classrooms
- **Details** - Building, floor, capacity, area, teacher assignment
- **Statistics** - Total cleanings, average score, last cleaned
- **Auto QR** - Automatic QR code generation for new classrooms

### 3. QR Code System
- **Auto Generation** - QR codes created automatically with classrooms
- **Download** - PNG download with high quality
- **Print Ready** - Optimized for printing (A4/Letter size)
- **Tracking** - Scan count and last scanned tracking
- **Backend Storage** - QR codes stored in Cloudflare D1

### 4. Cleaning Submissions
- **7-Point Checklist** - Comprehensive cleaning task list
- **Photo Evidence** - Multiple photo upload with compression
- **Notes** - Student notes and observations
- **Status Tracking** - Pending, approved, rejected, in-review
- **Teacher Review** - Score assignment (0-100) with feedback

### 5. Advanced Reporting
- **Multiple Formats** - PDF, Excel, CSV exports
- **Date Ranges** - Daily, weekly, monthly, custom
- **Filters** - By classroom, status, date range
- **Visualizations** - Charts and graphs with Chart.js
- **Statistics** - Summary statistics and key metrics
- **Print Ready** - Optimized print layouts

### 6. Admin Dashboard
- **System Overview** - Total users, classrooms, submissions
- **Analytics** - Status distribution, score distribution, trends
- **Quick Actions** - Manage users, classrooms, generate reports
- **Statistics** - Real-time dashboard with key metrics

### 7. Security & Audit
- **Password Hashing** - SHA-256 with unique salts
- **JWT Tokens** - Secure token-based authentication
- **Session Management** - Automatic session expiration
- **Audit Logs** - Complete audit trail of all actions
- **IP Tracking** - User IP and device tracking
- **Failed Attempts** - Failed login attempt tracking

---

## 📊 Database Schema Details

### Users Table
```sql
- id (UUID)
- username (unique)
- password_hash (SHA-256)
- salt (unique per user)
- full_name
- email (unique)
- phone
- role (student, teacher, admin)
- classroom_id (foreign key)
- avatar_url
- language_preference
- timezone
- is_active
- email_verified
- last_login_at
- login_count
- failed_login_attempts
- created_at / updated_at
```

### Classrooms Table
```sql
- id (UUID)
- classroom_number (unique)
- building
- floor
- room_name
- capacity
- area_sqm
- teacher_id (foreign key)
- notes
- cleaning_frequency
- qr_code_url
- qr_code_data
- last_cleaned_at
- total_cleanings
- average_score
- is_active
- created_at / updated_at
```

### Cleaning Submissions Table
```sql
- id (UUID)
- classroom_id (foreign key)
- student_id (foreign key)
- submission_date
- status (pending, approved, rejected, in_review)
- score (0-100)
- 7x checklist items (boolean)
- checklist_completion_rate
- time_spent_minutes
- notes
- student_notes
- teacher_feedback
- reviewed_by (foreign key)
- reviewed_at
- photo_count
- photos_json (array)
- ip_address
- user_agent
- device_type
- created_at / updated_at
```

**Full schema:** See `cloudflare/schema.sql`

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users` - List all users (paginated)
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (soft delete)

### Classrooms
- `GET /api/classrooms` - List all classrooms
- `GET /api/classrooms/:id` - Get classroom by ID
- `POST /api/classrooms` - Create classroom (with auto QR)
- `PATCH /api/classrooms/:id` - Update classroom
- `DELETE /api/classrooms/:id` - Delete classroom

### QR Codes
- `GET /api/qrcodes/classroom/:id` - Get QR code for classroom

### Reports
- `GET /api/reports` - List generated reports
- `POST /api/reports/generate` - Generate new report

### Statistics
- `GET /api/stats/dashboard` - Dashboard statistics

**API Documentation:** See `API_DOCUMENTATION.md`

---

## 📁 Project Structure

```
smartclean/
├── cloudflare/              # Cloudflare backend
│   ├── src/
│   │   ├── index.js        # Main Worker code
│   │   └── utils/          # Utility functions
│   │       ├── auth.js     # Authentication
│   │       ├── cors.js     # CORS handling
│   │       ├── helpers.js  # Helper functions
│   │       ├── qr.js       # QR generation
│   │       └── reports.js  # Report generation
│   ├── schema.sql          # D1 database schema
│   ├── wrangler.toml       # Wrangler configuration
│   └── package.json        # Dependencies
│
├── js/                      # Frontend JavaScript
│   ├── api-client.js       # API client library
│   ├── translations.js     # i18n translations
│   └── utils.js            # Utility functions
│
├── css/                     # Stylesheets
│   └── style.css           # Main styles
│
├── *.html                   # HTML pages
│   ├── index.html          # Login page
│   ├── register.html       # Registration page
│   ├── student-dashboard.html
│   ├── teacher-dashboard.html
│   ├── admin-dashboard.html
│   ├── classroom-management.html
│   ├── user-management.html
│   ├── qr-management.html
│   ├── reports.html
│   └── reports-advanced.html  # Advanced reports
│
└── Documentation/           # Documentation
    ├── README.md           # This file
    ├── CLOUDFLARE_DEPLOYMENT.md
    ├── API_DOCUMENTATION.md
    ├── QUICK_START.md
    └── TROUBLESHOOTING.md
```

---

## 🌍 Deployment Options

### 1. Cloudflare Pages (Recommended)
- ✅ Free tier available
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ GitHub integration
- ✅ Preview deployments

### 2. GitHub Pages
- ✅ Free for public repos
- ✅ Easy setup
- ✅ Custom domain support

### 3. Netlify
- ✅ Drag & drop deployment
- ✅ Instant preview
- ✅ Form handling

### 4. Vercel
- ✅ Fast deployment
- ✅ Automatic SSL
- ✅ Analytics

---

## 🔧 Configuration

### API Configuration (`js/api-client.js`)
```javascript
const API_CONFIG = {
    BASE_URL: 'https://your-worker.workers.dev',
    DEV_URL: 'http://localhost:8787',
    USE_DEV: window.location.hostname === 'localhost',
    TIMEOUT: 30000
};
```

### Worker Configuration (`cloudflare/wrangler.toml`)
```toml
name = "smartclean-api"
main = "src/index.js"
compatibility_date = "2024-02-01"

[[d1_databases]]
binding = "DB"
database_name = "smartclean-db"
database_id = "your-database-id"
```

---

## 🧪 Testing

### Backend API Tests
```bash
# Test registration
curl -X POST https://your-worker.workers.dev/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123","full_name":"Test","email":"test@test.com","role":"student"}'

# Test login
curl -X POST https://your-worker.workers.dev/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'
```

### Frontend Tests
1. Open browser DevTools (F12)
2. Go to Console tab
3. Run tests:
```javascript
// Test API connectivity
apiClient.getDashboardStats().then(console.log);

// Test authentication
apiClient.login({username: 'test', password: 'test123'}).then(console.log);
```

---

## 📈 Performance

### Cloudflare Edge Network
- **Global Distribution** - Deployed to 200+ data centers worldwide
- **Low Latency** - < 50ms response time globally
- **Auto Scaling** - Handles millions of requests
- **Zero Cold Starts** - Workers always ready

### Database Performance
- **Query Speed** - < 10ms average query time
- **Concurrent Connections** - Unlimited (serverless)
- **Data Size** - Up to 10GB per database (free tier)
- **Backup** - Automatic point-in-time recovery

---

## 🔒 Security Features

### Authentication
- ✅ Password hashing with SHA-256
- ✅ Unique salt per user
- ✅ JWT token-based sessions
- ✅ Automatic token expiration
- ✅ Failed login attempt tracking

### Authorization
- ✅ Role-based access control (RBAC)
- ✅ Permission checks per endpoint
- ✅ Session validation middleware

### Data Protection
- ✅ HTTPS only (automatic with Cloudflare)
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Input validation and sanitization

### Audit & Monitoring
- ✅ Complete audit trail
- ✅ User action logging
- ✅ IP address tracking
- ✅ Error logging
- ✅ Real-time monitoring

---

## 📊 Analytics & Monitoring

### Worker Analytics
- Request count
- Success/error rates
- CPU time usage
- Data transfer
- Geographic distribution

### Database Analytics
- Query performance
- Row counts
- Storage usage
- Backup status

### Application Metrics
- User registrations
- Login activity
- Submission trends
- Average scores
- Approval rates

---

## 🌐 Internationalization (i18n)

### Supported Languages
- 🇺🇸 English (en)
- 🇯🇵 Japanese (ja)

### Add New Language
1. Open `js/translations.js`
2. Add new language object:
```javascript
const translations = {
    en: { /* English */ },
    ja: { /* Japanese */ },
    es: { /* Spanish */ }  // New
};
```
3. Translate all keys
4. Update language selector in HTML

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

### Documentation
- `README.md` - This file
- `CLOUDFLARE_DEPLOYMENT.md` - Deployment guide
- `API_DOCUMENTATION.md` - API reference
- `TROUBLESHOOTING.md` - Common issues

### Contact
- Email: support@smartclean.com
- GitHub Issues: [github.com/smartclean/smartclean/issues](https://github.com/smartclean/smartclean/issues)
- Documentation: [docs.smartclean.com](https://docs.smartclean.com)

---

## 🎉 Credits

### Built With
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Chart.js](https://www.chartjs.org/)
- [jsPDF](https://github.com/parallax/jsPDF)
- [SheetJS](https://sheetjs.com/)
- [Font Awesome](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)

### Team
- Development Team
- Design Team
- Quality Assurance Team
- Documentation Team

---

## 🗺️ Roadmap

### Version 2.1 (Planned)
- [ ] Push notifications
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] SMS reminders
- [ ] Calendar integration

### Version 2.2 (Future)
- [ ] AI-powered scoring
- [ ] Photo analysis with ML
- [ ] Chatbot support
- [ ] Multi-language support (10+ languages)
- [ ] Dark mode
- [ ] Offline mode improvements

---

## 📅 Changelog

### Version 2.0.0 (2024-02-10)
- ✨ Cloudflare D1 database integration
- ✨ Cloudflare Workers API
- ✨ Enhanced security with password hashing
- ✨ Advanced report exports (PDF, Excel, CSV)
- ✨ Auto QR code generation
- ✨ Audit logging system
- ✨ Session management
- 🗑️ Removed QR scanning feature

### Version 1.0.0 (2024-01-15)
- 🎉 Initial release
- ✅ User registration and login
- ✅ Classroom management
- ✅ Cleaning submissions
- ✅ Teacher reviews
- ✅ Admin dashboard
- ✅ QR code management
- ✅ Basic reports

---

**Made with ❤️ for Japanese Schools**

**Happy Cleaning! 🧹✨**
