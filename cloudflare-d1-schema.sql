-- SmartClean Database Schema for Cloudflare D1
-- Enhanced Creative Database Design
-- Version: 2.0

-- ==================== USERS TABLE ====================
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    name_japanese TEXT,
    role TEXT NOT NULL CHECK(role IN ('student', 'teacher', 'admin')),
    email TEXT UNIQUE,
    phone TEXT,
    classroom TEXT,
    grade INTEGER,
    section TEXT,
    student_number TEXT,
    date_of_birth DATE,
    profile_photo TEXT,
    active INTEGER DEFAULT 1,
    last_login INTEGER,
    login_count INTEGER DEFAULT 0,
    created_at INTEGER DEFAULT (unixepoch() * 1000),
    updated_at INTEGER DEFAULT (unixepoch() * 1000)
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_classroom ON users(classroom);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ==================== CLASSROOMS TABLE ====================
CREATE TABLE IF NOT EXISTS classrooms (
    id TEXT PRIMARY KEY,
    number TEXT UNIQUE NOT NULL,
    name_english TEXT,
    name_japanese TEXT,
    building TEXT NOT NULL,
    floor INTEGER NOT NULL,
    room_number TEXT,
    teacher_id TEXT,
    teacher_name TEXT,
    capacity INTEGER NOT NULL,
    current_students INTEGER DEFAULT 0,
    grade INTEGER,
    section TEXT,
    room_type TEXT CHECK(room_type IN ('regular', 'lab', 'special', 'activity')),
    area_sqm REAL,
    has_projector INTEGER DEFAULT 0,
    has_ac INTEGER DEFAULT 0,
    notes TEXT,
    qr_code_id TEXT,
    qr_code_data TEXT,
    qr_code_image TEXT,
    active INTEGER DEFAULT 1,
    created_at INTEGER DEFAULT (unixepoch() * 1000),
    updated_at INTEGER DEFAULT (unixepoch() * 1000),
    FOREIGN KEY (teacher_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_classrooms_number ON classrooms(number);
CREATE INDEX IF NOT EXISTS idx_classrooms_building ON classrooms(building);
CREATE INDEX IF NOT EXISTS idx_classrooms_teacher ON classrooms(teacher_id);

-- ==================== CLEANING SUBMISSIONS TABLE ====================
CREATE TABLE IF NOT EXISTS cleaning_submissions (
    id TEXT PRIMARY KEY,
    classroom_id TEXT NOT NULL,
    classroom_number TEXT NOT NULL,
    student_id TEXT NOT NULL,
    student_name TEXT NOT NULL,
    submission_date INTEGER NOT NULL,
    
    -- Checklist items (7 core tasks)
    checklist_floor INTEGER DEFAULT 0,
    checklist_desks INTEGER DEFAULT 0,
    checklist_blackboard INTEGER DEFAULT 0,
    checklist_windows INTEGER DEFAULT 0,
    checklist_trash INTEGER DEFAULT 0,
    checklist_organize INTEGER DEFAULT 0,
    checklist_air INTEGER DEFAULT 0,
    
    -- Additional data
    photos TEXT, -- JSON array
    photo_count INTEGER DEFAULT 0,
    notes TEXT,
    duration_minutes INTEGER,
    temperature_celsius REAL,
    weather TEXT,
    
    -- Review data
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected', 'revision_needed')),
    score INTEGER,
    grade_level TEXT, -- A+, A, B, C, D, F
    teacher_feedback TEXT,
    reviewed_by TEXT,
    reviewed_by_id TEXT,
    reviewed_at INTEGER,
    
    -- Analytics
    completion_percentage INTEGER,
    quality_rating INTEGER, -- 1-5 stars
    
    created_at INTEGER DEFAULT (unixepoch() * 1000),
    updated_at INTEGER DEFAULT (unixepoch() * 1000),
    
    FOREIGN KEY (classroom_id) REFERENCES classrooms(id),
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (reviewed_by_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_submissions_classroom ON cleaning_submissions(classroom_id);
CREATE INDEX IF NOT EXISTS idx_submissions_student ON cleaning_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON cleaning_submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_date ON cleaning_submissions(submission_date);

-- ==================== REPORTS TABLE ====================
CREATE TABLE IF NOT EXISTS reports (
    id TEXT PRIMARY KEY,
    report_type TEXT NOT NULL CHECK(report_type IN ('daily', 'weekly', 'monthly', 'custom', 'classroom', 'student', 'teacher')),
    report_name TEXT NOT NULL,
    generated_by TEXT NOT NULL,
    generated_by_id TEXT NOT NULL,
    
    -- Report parameters
    start_date INTEGER,
    end_date INTEGER,
    classroom_filter TEXT,
    status_filter TEXT,
    
    -- Report data
    total_submissions INTEGER,
    approved_count INTEGER,
    rejected_count INTEGER,
    pending_count INTEGER,
    average_score REAL,
    
    -- File data
    file_format TEXT CHECK(file_format IN ('pdf', 'excel', 'csv', 'json')),
    file_size INTEGER,
    file_url TEXT,
    download_count INTEGER DEFAULT 0,
    
    expires_at INTEGER,
    created_at INTEGER DEFAULT (unixepoch() * 1000),
    
    FOREIGN KEY (generated_by_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_reports_type ON reports(report_type);
CREATE INDEX IF NOT EXISTS idx_reports_generated ON reports(generated_by_id);

-- ==================== NOTIFICATIONS TABLE ====================
CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('submission', 'review', 'system', 'achievement', 'reminder')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    related_id TEXT,
    related_type TEXT,
    priority TEXT CHECK(priority IN ('low', 'medium', 'high', 'urgent')),
    is_read INTEGER DEFAULT 0,
    read_at INTEGER,
    expires_at INTEGER,
    created_at INTEGER DEFAULT (unixepoch() * 1000),
    
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);

-- ==================== ACHIEVEMENTS TABLE ====================
CREATE TABLE IF NOT EXISTS achievements (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    achievement_type TEXT NOT NULL,
    achievement_name TEXT NOT NULL,
    description TEXT,
    badge_icon TEXT,
    badge_color TEXT,
    points_earned INTEGER DEFAULT 0,
    unlocked_at INTEGER DEFAULT (unixepoch() * 1000),
    
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_achievements_user ON achievements(user_id);

-- ==================== ACTIVITY LOG TABLE ====================
CREATE TABLE IF NOT EXISTS activity_log (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    action TEXT NOT NULL,
    entity_type TEXT,
    entity_id TEXT,
    details TEXT,
    ip_address TEXT,
    user_agent TEXT,
    created_at INTEGER DEFAULT (unixepoch() * 1000),
    
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_activity_user ON activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_date ON activity_log(created_at);

-- ==================== SETTINGS TABLE ====================
CREATE TABLE IF NOT EXISTS settings (
    id TEXT PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    category TEXT,
    description TEXT,
    updated_by TEXT,
    updated_at INTEGER DEFAULT (unixepoch() * 1000)
);

-- ==================== ANNOUNCEMENTS TABLE ====================
CREATE TABLE IF NOT EXISTS announcements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id TEXT NOT NULL,
    author_name TEXT NOT NULL,
    target_role TEXT, -- student, teacher, admin, or null for all
    priority TEXT CHECK(priority IN ('low', 'medium', 'high', 'urgent')),
    is_pinned INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1,
    published_at INTEGER,
    expires_at INTEGER,
    created_at INTEGER DEFAULT (unixepoch() * 1000),
    
    FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_announcements_active ON announcements(active);
CREATE INDEX IF NOT EXISTS idx_announcements_target ON announcements(target_role);

-- ==================== STATISTICS TABLE ====================
CREATE TABLE IF NOT EXISTS statistics (
    id TEXT PRIMARY KEY,
    stat_date DATE NOT NULL,
    stat_type TEXT NOT NULL,
    
    -- Daily stats
    total_submissions INTEGER DEFAULT 0,
    approved_submissions INTEGER DEFAULT 0,
    rejected_submissions INTEGER DEFAULT 0,
    average_score REAL DEFAULT 0,
    
    -- User stats
    active_students INTEGER DEFAULT 0,
    active_teachers INTEGER DEFAULT 0,
    new_users INTEGER DEFAULT 0,
    
    -- Classroom stats
    classrooms_cleaned INTEGER DEFAULT 0,
    average_duration_minutes INTEGER DEFAULT 0,
    
    created_at INTEGER DEFAULT (unixepoch() * 1000)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_statistics_date_type ON statistics(stat_date, stat_type);

-- ==================== SAMPLE DATA ====================
-- Insert default admin
INSERT OR IGNORE INTO users (
    id, username, password, name, name_japanese, role, 
    email, active, created_at
) VALUES (
    'admin-001',
    'admin',
    'admin123',
    'System Administrator',
    'システム管理者',
    'admin',
    'admin@smartclean.school',
    1,
    unixepoch() * 1000
);

-- Insert default settings
INSERT OR IGNORE INTO settings (id, key, value, category, description) VALUES
    ('set-001', 'app_name', 'SmartClean', 'general', 'Application name'),
    ('set-002', 'school_name', 'Your School Name', 'general', 'School name'),
    ('set-003', 'school_name_japanese', '学校名', 'general', 'School name in Japanese'),
    ('set-004', 'max_submissions_per_day', '3', 'limits', 'Maximum submissions per student per day'),
    ('set-005', 'min_photos_required', '2', 'validation', 'Minimum photos required for submission'),
    ('set-006', 'default_language', 'en', 'general', 'Default language (en/ja)'),
    ('set-007', 'enable_notifications', '1', 'features', 'Enable push notifications'),
    ('set-008', 'enable_achievements', '1', 'features', 'Enable achievement system'),
    ('set-009', 'qr_auto_generate', '1', 'features', 'Auto-generate QR codes for classrooms'),
    ('set-010', 'report_retention_days', '90', 'reports', 'Days to keep generated reports');

-- ==================== VIEWS ====================
-- View for user summary
CREATE VIEW IF NOT EXISTS user_summary AS
SELECT 
    u.id,
    u.username,
    u.name,
    u.role,
    u.classroom,
    u.active,
    COUNT(DISTINCT cs.id) as total_submissions,
    COUNT(DISTINCT CASE WHEN cs.status = 'approved' THEN cs.id END) as approved_submissions,
    AVG(CASE WHEN cs.status = 'approved' THEN cs.score END) as average_score,
    u.last_login,
    u.created_at
FROM users u
LEFT JOIN cleaning_submissions cs ON u.id = cs.student_id
GROUP BY u.id;

-- View for classroom statistics
CREATE VIEW IF NOT EXISTS classroom_stats AS
SELECT 
    c.id,
    c.number,
    c.name_english,
    c.building,
    c.floor,
    c.teacher_name,
    c.current_students,
    COUNT(DISTINCT cs.id) as total_submissions,
    COUNT(DISTINCT cs.student_id) as unique_submitters,
    AVG(cs.score) as average_score,
    COUNT(DISTINCT CASE WHEN cs.status = 'pending' THEN cs.id END) as pending_reviews
FROM classrooms c
LEFT JOIN cleaning_submissions cs ON c.id = cs.classroom_id
GROUP BY c.id;

-- View for daily statistics
CREATE VIEW IF NOT EXISTS daily_stats AS
SELECT 
    DATE(submission_date / 1000, 'unixepoch') as date,
    COUNT(*) as total_submissions,
    COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
    COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected,
    COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
    AVG(score) as average_score,
    COUNT(DISTINCT student_id) as active_students,
    COUNT(DISTINCT classroom_id) as classrooms_cleaned
FROM cleaning_submissions
GROUP BY DATE(submission_date / 1000, 'unixepoch')
ORDER BY date DESC;
