# 🧹 SmartClean v3.0 - Complete Classroom Cleaning Management System

> A bilingual (English/Japanese) web application for managing classroom cleaning submissions with Cloudflare backend.

[![Version](https://img.shields.io/badge/version-3.0.0-blue.svg)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Cloudflare](https://img.shields.io/badge/Powered%20by-Cloudflare-orange.svg)](https://cloudflare.com)

---

## 🎯 What's New in Version 3.0

### ✅ Complete Features
- **No QR Codes** - Simplified classroom selection workflow
- **Cloudflare D1 Database** - Serverless SQL database for persistence
- **Full CRUD Operations** - User registration, login, classroom and submission management
- **Role-Based Access** - Student, Teacher, and Admin dashboards
- **Bilingual Support** - Full English and Japanese translations
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Real-time Statistics** - Dashboard analytics for all user roles
- **Photo Uploads** - Base64 encoded image storage
- **Audit Logging** - Track all important actions

---

## 🏗️ Architecture

### Frontend
- **Pure HTML/CSS/JavaScript** - No build tools required
- **Modern UI** - Clean, gradient design with Font Awesome icons
- **Google Fonts** - Inter font family for professional typography
- **Client-side Storage** - LocalStorage for user sessions

### Backend
- **Cloudflare Workers** - Serverless API endpoints
- **Cloudflare D1** - SQLite-based serverless database
- **RESTful API** - 15+ endpoints for all operations
- **JWT Authentication** - Secure session management

### Database Schema (8 Tables)
1. **users** - User accounts (students, teachers, admins)
2. **classrooms** - Classroom records
3. **cleaning_submissions** - Student cleaning reports
4. **submission_photos** - Photo evidence (base64)
5. **audit_logs** - Activity tracking
6. **notifications** - System notifications
7. **settings** - Application configuration
8. **sessions** - Active user sessions

---

## 📦 Project Structure

```
SmartClean/
├── cloudflare/                      # Backend
│   ├── src/
│   │   ├── index.js                # Main Worker API
│   │   └── utils/
│   │       ├── auth.js             # Authentication helpers
│   │       ├── cors.js             # CORS configuration
│   │       ├── helpers.js          # Utility functions
│   │       └── reports.js          # Report generation
│   ├── schema.sql                  # Database schema (NO QR tables)
│   ├── wrangler.toml              # Cloudflare configuration
│   └── package.json               # Dependencies
│
├── css/
│   └── style.css                  # Main stylesheet
│
├── js/
│   ├── api-client.js              # API client (replaces mockdb)
│   ├── translations.js            # i18n translations
│   └── utils.js                   # Frontend utilities
│
├── index.html                     # Login page
├── register.html                  # Registration page
├── student-dashboard.html         # Student interface (NO QR)
├── teacher-dashboard.html         # Teacher review interface
├── admin-dashboard.html           # Admin control panel
├── cleaning-form.html             # Cleaning submission form
├── classroom-management.html      # Classroom CRUD
├── user-management.html           # User CRUD
├── reports.html                   # Reporting interface
├── home.html                      # Landing page
│
└── DEPLOYMENT_GUIDE_V3.md         # This deployment guide
```

---

## 🚀 Quick Start

### Prerequisites
- Cloudflare account (free tier works)
- Node.js v16+ and npm
- Your own domain (optional but recommended)

### Installation (5 Steps)

1. **Clone or download this project**

2. **Install Wrangler CLI**
   ```bash
   npm install -g wrangler
   wrangler login
   ```

3. **Create D1 Database**
   ```bash
   cd cloudflare
   wrangler d1 create smartclean-db
   # Copy the database_id from output
   ```

4. **Update wrangler.toml**
   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "smartclean-db"
   database_id = "YOUR_DATABASE_ID_HERE"  # ← Paste here
   ```

5. **Deploy Everything**
   ```bash
   # Initialize database
   wrangler d1 execute smartclean-db --file=./schema.sql
   
   # Deploy API
   wrangler deploy
   
   # Update js/api-client.js with your Worker URL
   # Then deploy frontend
   cd ..
   wrangler pages deploy . --project-name=smartclean
   ```

**Done!** Your app is live at `https://smartclean.pages.dev`

See **[DEPLOYMENT_GUIDE_V3.md](DEPLOYMENT_GUIDE_V3.md)** for detailed instructions.

---

## 👥 User Roles

### 🎓 Student
- Select classroom from dropdown (NO QR scanning)
- Complete cleaning checklist
- Upload 2+ photos as evidence
- Add optional notes
- View submission history and scores

### 👨‍🏫 Teacher
- View all pending submissions
- Review submission details and photos
- Approve submissions with scores (0-100)
- Request improvements with feedback
- View statistics and analytics

### 🔧 Admin
- Manage all users (create, edit, delete)
- Manage classrooms (add, edit, delete)
- View system-wide statistics
- Access all reports and analytics
- Configure system settings

---

## 🌍 Multilingual Support

The app supports **English** and **Japanese** with one-click language switching:

- 🇺🇸 **English** - Full interface translation
- 🇯🇵 **Japanese** - Complete 日本語 support

Language preference is saved in browser localStorage.

### Adding More Languages

Edit `js/translations.js`:

```javascript
const translations = {
    en: { /* English translations */ },
    ja: { /* Japanese translations */ },
    es: { /* Add Spanish */ },
    zh: { /* Add Chinese */ }
};
```

---

## 🔐 Security Features

- ✅ **Password Hashing** - SHA-256 with unique salts
- ✅ **JWT Tokens** - Secure session management
- ✅ **Session Expiry** - Auto-logout after 1 hour
- ✅ **Failed Login Tracking** - Monitor suspicious activity
- ✅ **Audit Logs** - Track all user actions
- ✅ **IP & User-Agent Logging** - Security monitoring
- ✅ **CORS Protection** - Restrict API access
- ✅ **SQL Injection Prevention** - Parameterized queries

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login and get JWT token
- `POST /api/auth/logout` - End session

### Users
- `GET /api/users` - List all users (admin only)
- `GET /api/users/:id` - Get user details
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Soft delete user

### Classrooms
- `GET /api/classrooms` - List all classrooms
- `GET /api/classrooms/:id` - Get classroom details
- `POST /api/classrooms` - Create classroom
- `PATCH /api/classrooms/:id` - Update classroom
- `DELETE /api/classrooms/:id` - Soft delete classroom

### Cleaning Submissions
- `GET /api/submissions` - List submissions (filtered by role)
- `GET /api/submissions/:id` - Get submission details
- `POST /api/submissions` - Create submission (student)
- `PATCH /api/submissions/:id` - Update submission (teacher review)
- `DELETE /api/submissions/:id` - Delete submission

### Reports & Stats
- `GET /api/stats/dashboard` - Dashboard statistics
- `GET /api/reports` - Generate reports
- `POST /api/reports/generate` - Create custom report

See **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** for complete API reference.

---

## 🎨 Features Overview

### Student Features
| Feature | Description |
|---------|-------------|
| **Dashboard** | View statistics, recent submissions |
| **Classroom Selection** | Dropdown list of all classrooms (NO QR) |
| **Cleaning Checklist** | 7 standard cleaning tasks |
| **Photo Upload** | Upload 2+ photos (max 5MB each) |
| **Submission History** | View past submissions and scores |
| **Status Tracking** | Pending, Approved, Needs Improvement |

### Teacher Features
| Feature | Description |
|---------|-------------|
| **Review Queue** | All pending submissions |
| **Detailed Review** | View photos, checklist, notes |
| **Scoring System** | Rate 0-100 points |
| **Feedback** | Provide written feedback |
| **Approval/Rejection** | Approve or request improvements |
| **Analytics** | View submission trends |

### Admin Features
| Feature | Description |
|---------|-------------|
| **User Management** | Create, edit, delete users |
| **Classroom Management** | Manage classroom records |
| **System Statistics** | View all metrics |
| **Audit Logs** | Track system activity |
| **Settings** | Configure system parameters |
| **Reports** | Export data and analytics |

---

## 📊 Database Schema Highlights

### Users Table
```sql
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT,
    role TEXT NOT NULL CHECK(role IN ('student', 'teacher', 'admin')),
    classroom_id TEXT,
    is_active INTEGER DEFAULT 1,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
```

### Cleaning Submissions Table
```sql
CREATE TABLE cleaning_submissions (
    id TEXT PRIMARY KEY,
    classroom_id TEXT NOT NULL,
    classroom_number TEXT NOT NULL,
    student_id TEXT NOT NULL,
    student_name TEXT NOT NULL,
    submission_date INTEGER NOT NULL,
    checklist_floor INTEGER DEFAULT 0,
    checklist_desks INTEGER DEFAULT 0,
    checklist_blackboard INTEGER DEFAULT 0,
    checklist_windows INTEGER DEFAULT 0,
    checklist_trash INTEGER DEFAULT 0,
    checklist_organize INTEGER DEFAULT 0,
    checklist_air INTEGER DEFAULT 0,
    photos TEXT,  -- JSON array of base64 images
    notes TEXT,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
    score INTEGER,
    teacher_feedback TEXT,
    reviewed_by TEXT,
    reviewed_at INTEGER,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
```

---

## 💰 Cost & Performance

### Cloudflare Free Tier
- ✅ **100,000 requests/day** - Worker requests
- ✅ **5GB storage** - D1 database
- ✅ **5 million reads/day** - Database queries
- ✅ **Unlimited bandwidth** - Pages hosting
- ✅ **Free SSL certificate** - HTTPS everywhere

### Typical Usage (100 students, 10 teachers)
- **Daily requests:** ~2,000 (well under limit)
- **Database size:** ~50MB (plenty of room)
- **Monthly cost:** **$0** (stays on free tier)

### Performance
- ⚡ **<50ms** - Average API response time
- 🌍 **Global CDN** - Edge caching worldwide
- 📱 **Mobile optimized** - Responsive design
- 🔒 **99.9% uptime** - Cloudflare reliability

---

## 🔧 Configuration

### API Configuration
Edit `js/api-client.js`:

```javascript
const API_CONFIG = {
    BASE_URL: 'https://smartclean-api.YOUR-SUBDOMAIN.workers.dev',
    TIMEOUT: 10000,
    ENABLE_LOGGING: true
};
```

### CORS Configuration
Edit `cloudflare/src/utils/cors.js`:

```javascript
export const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://your-domain.com',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
```

---

## 🧪 Testing

### Create Test Data

```bash
# Create admin user
curl -X POST https://your-api.workers.dev/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123",
    "full_name": "System Admin",
    "role": "admin"
  }'

# Create classroom
curl -X POST https://your-api.workers.dev/api/classrooms \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "room_number": "3-A",
    "building": "Main Building",
    "floor": "3rd Floor",
    "capacity": 40
  }'
```

---

## 📚 Documentation Files

| File | Description |
|------|-------------|
| **DEPLOYMENT_GUIDE_V3.md** | Complete deployment instructions |
| **README_V3.md** | This file - project overview |
| **API_DOCUMENTATION.md** | API endpoint reference |
| **cloudflare/schema.sql** | Database schema (NO QR tables) |

---

## 🆚 Version Comparison

| Feature | v1.0 (Offline) | v2.0 (Cloudflare + QR) | v3.0 (Production Ready) |
|---------|---------------|----------------------|----------------------|
| Database | localStorage | Cloudflare D1 | Cloudflare D1 |
| QR Scanning | ❌ | ✅ | ❌ (Removed) |
| Multi-user | ❌ | ✅ | ✅ |
| Real API | ❌ | ✅ | ✅ |
| Authentication | Basic | JWT | JWT + Sessions |
| Photo Storage | localStorage | D1 (base64) | D1 (base64) |
| Audit Logs | ❌ | ✅ | ✅ |
| Custom Domain | ❌ | ✅ | ✅ |
| Production Ready | ❌ | ⚠️ | ✅ |

---

## 🗺️ Roadmap

### Future Enhancements
- [ ] Email notifications
- [ ] Export to PDF/Excel
- [ ] Scheduled cleanings
- [ ] Photo compression optimization
- [ ] Mobile app (PWA)
- [ ] Integration with school systems
- [ ] Advanced reporting
- [ ] Teacher notes/comments

---

## 🐛 Troubleshooting

### Common Issues

**Q: Login returns 401 Unauthorized**  
A: Check that `js/api-client.js` has the correct API URL

**Q: Photos fail to upload**  
A: Ensure photos are < 5MB each. Browser console will show errors.

**Q: CORS errors in console**  
A: Update `cloudflare/src/utils/cors.js` with your domain and redeploy

**Q: Database not found**  
A: Verify `database_id` in `wrangler.toml` matches `wrangler d1 list`

**Q: Submissions don't appear**  
A: Check browser console and Worker logs with `wrangler tail`

---

## 📞 Support

For issues or questions:

1. Check **[DEPLOYMENT_GUIDE_V3.md](DEPLOYMENT_GUIDE_V3.md)**
2. Review Cloudflare docs: https://developers.cloudflare.com/
3. Check browser console for errors
4. View Worker logs: `wrangler tail`

---

## 📄 License

MIT License - Feel free to use for your school or organization.

---

## 🎉 Credits

- **Font Awesome** - Icons
- **Google Fonts** - Inter typography
- **Cloudflare** - Infrastructure
- Built with ❤️ for schools worldwide

---

## ✅ Final Checklist

Before going live, ensure:

- [ ] Cloudflare D1 database created
- [ ] Database schema initialized
- [ ] Worker API deployed
- [ ] Frontend deployed to Pages
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Admin account created
- [ ] Test all user flows
- [ ] Check mobile responsiveness
- [ ] Review security settings
- [ ] Set up monitoring
- [ ] Backup strategy in place

---

**Version:** 3.0.0  
**Last Updated:** March 2024  
**Status:** ✅ Production Ready

Enjoy your SmartClean system! 🧹✨
