"""
SmartClean Database Management System - Python Backend
Supports SQLite database with text file export functionality
"""

import sqlite3
import json
import os
from datetime import datetime
from typing import List, Dict, Optional

class SmartCleanDB:
    """
    SmartClean Database Manager
    Handles all database operations and text file exports
    """
    
    def __init__(self, db_path: str = "smartclean.db"):
        """Initialize database connection"""
        self.db_path = db_path
        self.conn = None
        self.cursor = None
        self.connect()
        self.create_tables()
    
    def connect(self):
        """Connect to SQLite database"""
        try:
            self.conn = sqlite3.connect(self.db_path)
            self.conn.row_factory = sqlite3.Row  # Return rows as dictionaries
            self.cursor = self.conn.cursor()
            print(f"✅ Connected to database: {self.db_path}")
        except sqlite3.Error as e:
            print(f"❌ Database connection error: {e}")
            raise
    
    def create_tables(self):
        """Create all necessary tables"""
        
        # Users table
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                name TEXT NOT NULL,
                role TEXT NOT NULL CHECK(role IN ('student', 'teacher', 'admin')),
                email TEXT,
                phone TEXT,
                classroom TEXT,
                active INTEGER DEFAULT 1,
                created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
                updated_at INTEGER DEFAULT (strftime('%s', 'now') * 1000)
            )
        """)
        
        # Classrooms table
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS classrooms (
                id TEXT PRIMARY KEY,
                number TEXT UNIQUE NOT NULL,
                building TEXT NOT NULL,
                floor INTEGER NOT NULL,
                teacher_name TEXT,
                capacity INTEGER NOT NULL,
                notes TEXT,
                active INTEGER DEFAULT 1,
                created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
                updated_at INTEGER DEFAULT (strftime('%s', 'now') * 1000)
            )
        """)
        
        # Cleaning submissions table
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS cleaning_submissions (
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
                photos TEXT,
                notes TEXT,
                status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
                score INTEGER,
                teacher_feedback TEXT,
                reviewed_by TEXT,
                reviewed_at INTEGER,
                created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
                FOREIGN KEY (classroom_id) REFERENCES classrooms(id),
                FOREIGN KEY (student_id) REFERENCES users(id)
            )
        """)
        
        # QR codes table
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS qr_codes (
                id TEXT PRIMARY KEY,
                classroom_id TEXT NOT NULL,
                classroom_number TEXT NOT NULL,
                qr_data TEXT NOT NULL,
                qr_image TEXT NOT NULL,
                generated_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
                scan_count INTEGER DEFAULT 0,
                last_scanned INTEGER,
                active INTEGER DEFAULT 1,
                FOREIGN KEY (classroom_id) REFERENCES classrooms(id)
            )
        """)
        
        self.conn.commit()
        print("✅ All tables created successfully")
    
    # ==================== CLASSROOM OPERATIONS ====================
    
    def add_classroom(self, number: str, building: str, floor: int, 
                     capacity: int, teacher_name: str = None, 
                     notes: str = None) -> str:
        """Add a new classroom"""
        import uuid
        classroom_id = str(uuid.uuid4())
        
        try:
            self.cursor.execute("""
                INSERT INTO classrooms (id, number, building, floor, teacher_name, capacity, notes)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (classroom_id, number, building, floor, teacher_name, capacity, notes))
            
            self.conn.commit()
            print(f"✅ Classroom {number} added successfully (ID: {classroom_id})")
            return classroom_id
        except sqlite3.IntegrityError:
            print(f"❌ Classroom {number} already exists")
            raise
        except sqlite3.Error as e:
            print(f"❌ Error adding classroom: {e}")
            raise
    
    def get_all_classrooms(self) -> List[Dict]:
        """Get all classrooms"""
        self.cursor.execute("SELECT * FROM classrooms ORDER BY number")
        rows = self.cursor.fetchall()
        return [dict(row) for row in rows]
    
    def get_classroom(self, classroom_id: str) -> Optional[Dict]:
        """Get classroom by ID"""
        self.cursor.execute("SELECT * FROM classrooms WHERE id = ?", (classroom_id,))
        row = self.cursor.fetchone()
        return dict(row) if row else None
    
    def update_classroom(self, classroom_id: str, **kwargs) -> bool:
        """Update classroom details"""
        allowed_fields = ['number', 'building', 'floor', 'teacher_name', 'capacity', 'notes', 'active']
        updates = {k: v for k, v in kwargs.items() if k in allowed_fields}
        
        if not updates:
            return False
        
        set_clause = ', '.join([f"{k} = ?" for k in updates.keys()])
        values = list(updates.values()) + [classroom_id]
        
        self.cursor.execute(f"""
            UPDATE classrooms 
            SET {set_clause}, updated_at = strftime('%s', 'now') * 1000
            WHERE id = ?
        """, values)
        
        self.conn.commit()
        print(f"✅ Classroom {classroom_id} updated")
        return True
    
    def delete_classroom(self, classroom_id: str) -> bool:
        """Delete classroom"""
        self.cursor.execute("DELETE FROM classrooms WHERE id = ?", (classroom_id,))
        self.conn.commit()
        print(f"✅ Classroom {classroom_id} deleted")
        return True
    
    # ==================== USER OPERATIONS ====================
    
    def add_user(self, username: str, password: str, name: str, role: str,
                 email: str = None, phone: str = None, classroom: str = None) -> str:
        """Add a new user"""
        import uuid
        user_id = str(uuid.uuid4())
        
        try:
            self.cursor.execute("""
                INSERT INTO users (id, username, password, name, role, email, phone, classroom)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (user_id, username, password, name, role, email, phone, classroom))
            
            self.conn.commit()
            print(f"✅ User {username} ({role}) added successfully (ID: {user_id})")
            return user_id
        except sqlite3.IntegrityError:
            print(f"❌ Username {username} already exists")
            raise
        except sqlite3.Error as e:
            print(f"❌ Error adding user: {e}")
            raise
    
    def get_all_users(self, role: str = None) -> List[Dict]:
        """Get all users, optionally filtered by role"""
        if role:
            self.cursor.execute("SELECT * FROM users WHERE role = ? ORDER BY name", (role,))
        else:
            self.cursor.execute("SELECT * FROM users ORDER BY role, name")
        
        rows = self.cursor.fetchall()
        return [dict(row) for row in rows]
    
    def get_user(self, user_id: str) -> Optional[Dict]:
        """Get user by ID"""
        self.cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        row = self.cursor.fetchone()
        return dict(row) if row else None
    
    def authenticate_user(self, username: str, password: str) -> Optional[Dict]:
        """Authenticate user credentials"""
        self.cursor.execute("""
            SELECT * FROM users 
            WHERE username = ? AND password = ? AND active = 1
        """, (username, password))
        
        row = self.cursor.fetchone()
        return dict(row) if row else None
    
    def update_user(self, user_id: str, **kwargs) -> bool:
        """Update user details"""
        allowed_fields = ['password', 'name', 'role', 'email', 'phone', 'classroom', 'active']
        updates = {k: v for k, v in kwargs.items() if k in allowed_fields}
        
        if not updates:
            return False
        
        set_clause = ', '.join([f"{k} = ?" for k in updates.keys()])
        values = list(updates.values()) + [user_id]
        
        self.cursor.execute(f"""
            UPDATE users 
            SET {set_clause}, updated_at = strftime('%s', 'now') * 1000
            WHERE id = ?
        """, values)
        
        self.conn.commit()
        print(f"✅ User {user_id} updated")
        return True
    
    def delete_user(self, user_id: str) -> bool:
        """Delete user"""
        self.cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))
        self.conn.commit()
        print(f"✅ User {user_id} deleted")
        return True
    
    # ==================== CLEANING SUBMISSION OPERATIONS ====================
    
    def add_submission(self, classroom_id: str, classroom_number: str,
                      student_id: str, student_name: str,
                      checklist: Dict, photos: List[str] = None, 
                      notes: str = None) -> str:
        """Add a cleaning submission"""
        import uuid
        submission_id = str(uuid.uuid4())
        submission_date = int(datetime.now().timestamp() * 1000)
        photos_json = json.dumps(photos) if photos else None
        
        try:
            self.cursor.execute("""
                INSERT INTO cleaning_submissions (
                    id, classroom_id, classroom_number, student_id, student_name,
                    submission_date, checklist_floor, checklist_desks, checklist_blackboard,
                    checklist_windows, checklist_trash, checklist_organize, checklist_air,
                    photos, notes
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                submission_id, classroom_id, classroom_number, student_id, student_name,
                submission_date,
                checklist.get('floor', 0), checklist.get('desks', 0), checklist.get('blackboard', 0),
                checklist.get('windows', 0), checklist.get('trash', 0), checklist.get('organize', 0),
                checklist.get('air', 0), photos_json, notes
            ))
            
            self.conn.commit()
            print(f"✅ Cleaning submission added for {classroom_number} by {student_name}")
            return submission_id
        except sqlite3.Error as e:
            print(f"❌ Error adding submission: {e}")
            raise
    
    def get_all_submissions(self, status: str = None, classroom_id: str = None) -> List[Dict]:
        """Get all submissions with optional filters"""
        query = "SELECT * FROM cleaning_submissions WHERE 1=1"
        params = []
        
        if status:
            query += " AND status = ?"
            params.append(status)
        
        if classroom_id:
            query += " AND classroom_id = ?"
            params.append(classroom_id)
        
        query += " ORDER BY submission_date DESC"
        
        self.cursor.execute(query, params)
        rows = self.cursor.fetchall()
        return [dict(row) for row in rows]
    
    def review_submission(self, submission_id: str, status: str, score: int,
                         feedback: str, reviewer_id: str, reviewer_name: str) -> bool:
        """Review a cleaning submission"""
        reviewed_at = int(datetime.now().timestamp() * 1000)
        
        try:
            self.cursor.execute("""
                UPDATE cleaning_submissions
                SET status = ?, score = ?, teacher_feedback = ?,
                    reviewed_by = ?, reviewed_at = ?
                WHERE id = ?
            """, (status, score, feedback, reviewer_name, reviewed_at, submission_id))
            
            self.conn.commit()
            print(f"✅ Submission {submission_id} reviewed: {status} ({score}/100)")
            return True
        except sqlite3.Error as e:
            print(f"❌ Error reviewing submission: {e}")
            return False
    
    # ==================== QR CODE OPERATIONS ====================
    
    def add_qr_code(self, classroom_id: str, classroom_number: str,
                   qr_data: str, qr_image: str) -> str:
        """Add QR code for classroom"""
        import uuid
        qr_id = str(uuid.uuid4())
        
        try:
            self.cursor.execute("""
                INSERT INTO qr_codes (id, classroom_id, classroom_number, qr_data, qr_image)
                VALUES (?, ?, ?, ?, ?)
            """, (qr_id, classroom_id, classroom_number, qr_data, qr_image))
            
            self.conn.commit()
            print(f"✅ QR code generated for classroom {classroom_number}")
            return qr_id
        except sqlite3.Error as e:
            print(f"❌ Error adding QR code: {e}")
            raise
    
    def get_qr_code(self, classroom_id: str) -> Optional[Dict]:
        """Get QR code for classroom"""
        self.cursor.execute("""
            SELECT * FROM qr_codes WHERE classroom_id = ? AND active = 1
        """, (classroom_id,))
        
        row = self.cursor.fetchone()
        return dict(row) if row else None
    
    def update_qr_scan(self, qr_id: str) -> bool:
        """Update QR code scan count"""
        last_scanned = int(datetime.now().timestamp() * 1000)
        
        self.cursor.execute("""
            UPDATE qr_codes
            SET scan_count = scan_count + 1, last_scanned = ?
            WHERE id = ?
        """, (last_scanned, qr_id))
        
        self.conn.commit()
        return True
    
    # ==================== TEXT FILE EXPORT OPERATIONS ====================
    
    def export_classrooms_to_text(self, filepath: str = "classrooms.txt"):
        """Export all classrooms to text file"""
        classrooms = self.get_all_classrooms()
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write("=" * 80 + "\n")
            f.write("SMARTCLEAN - CLASSROOM LIST\n")
            f.write("=" * 80 + "\n")
            f.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write(f"Total Classrooms: {len(classrooms)}\n")
            f.write("=" * 80 + "\n\n")
            
            for classroom in classrooms:
                f.write(f"Classroom: {classroom['number']}\n")
                f.write(f"Building: {classroom['building']}\n")
                f.write(f"Floor: {classroom['floor']}\n")
                f.write(f"Teacher: {classroom['teacher_name'] or 'Not assigned'}\n")
                f.write(f"Capacity: {classroom['capacity']} students\n")
                f.write(f"Status: {'Active' if classroom['active'] else 'Inactive'}\n")
                if classroom['notes']:
                    f.write(f"Notes: {classroom['notes']}\n")
                f.write("-" * 80 + "\n\n")
        
        print(f"✅ Classrooms exported to {filepath}")
        return filepath
    
    def export_users_to_text(self, filepath: str = "users.txt"):
        """Export all users to text file"""
        users = self.get_all_users()
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write("=" * 80 + "\n")
            f.write("SMARTCLEAN - USER LIST\n")
            f.write("=" * 80 + "\n")
            f.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write(f"Total Users: {len(users)}\n")
            f.write("=" * 80 + "\n\n")
            
            # Group by role
            for role in ['admin', 'teacher', 'student']:
                role_users = [u for u in users if u['role'] == role]
                if role_users:
                    f.write(f"\n{role.upper()}S ({len(role_users)})\n")
                    f.write("-" * 80 + "\n\n")
                    
                    for user in role_users:
                        f.write(f"Name: {user['name']}\n")
                        f.write(f"Username: {user['username']}\n")
                        f.write(f"Email: {user['email'] or 'N/A'}\n")
                        f.write(f"Phone: {user['phone'] or 'N/A'}\n")
                        if user['classroom']:
                            f.write(f"Classroom: {user['classroom']}\n")
                        f.write(f"Status: {'Active' if user['active'] else 'Inactive'}\n")
                        f.write("-" * 80 + "\n\n")
        
        print(f"✅ Users exported to {filepath}")
        return filepath
    
    def export_submissions_to_text(self, filepath: str = "submissions.txt"):
        """Export all submissions to text file"""
        submissions = self.get_all_submissions()
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write("=" * 80 + "\n")
            f.write("SMARTCLEAN - CLEANING SUBMISSIONS\n")
            f.write("=" * 80 + "\n")
            f.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write(f"Total Submissions: {len(submissions)}\n")
            f.write("=" * 80 + "\n\n")
            
            for sub in submissions:
                submission_date = datetime.fromtimestamp(sub['submission_date'] / 1000)
                
                f.write(f"Submission ID: {sub['id']}\n")
                f.write(f"Classroom: {sub['classroom_number']}\n")
                f.write(f"Student: {sub['student_name']}\n")
                f.write(f"Date: {submission_date.strftime('%Y-%m-%d %H:%M:%S')}\n")
                f.write(f"Status: {sub['status'].upper()}\n")
                
                f.write("\nChecklist:\n")
                f.write(f"  [{'✓' if sub['checklist_floor'] else ' '}] Floor swept and mopped\n")
                f.write(f"  [{'✓' if sub['checklist_desks'] else ' '}] Desks and chairs cleaned\n")
                f.write(f"  [{'✓' if sub['checklist_blackboard'] else ' '}] Blackboard cleaned\n")
                f.write(f"  [{'✓' if sub['checklist_windows'] else ' '}] Windows cleaned\n")
                f.write(f"  [{'✓' if sub['checklist_trash'] else ' '}] Trash emptied\n")
                f.write(f"  [{'✓' if sub['checklist_organize'] else ' '}] Items organized\n")
                f.write(f"  [{'✓' if sub['checklist_air'] else ' '}] Room ventilated\n")
                
                if sub['notes']:
                    f.write(f"\nNotes: {sub['notes']}\n")
                
                if sub['status'] != 'pending':
                    f.write(f"\nReview:\n")
                    f.write(f"  Score: {sub['score']}/100\n")
                    f.write(f"  Reviewed by: {sub['reviewed_by']}\n")
                    if sub['teacher_feedback']:
                        f.write(f"  Feedback: {sub['teacher_feedback']}\n")
                
                f.write("=" * 80 + "\n\n")
        
        print(f"✅ Submissions exported to {filepath}")
        return filepath
    
    def export_statistics_to_text(self, filepath: str = "statistics.txt"):
        """Export statistics to text file"""
        classrooms = self.get_all_classrooms()
        users = self.get_all_users()
        submissions = self.get_all_submissions()
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write("=" * 80 + "\n")
            f.write("SMARTCLEAN - STATISTICS REPORT\n")
            f.write("=" * 80 + "\n")
            f.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write("=" * 80 + "\n\n")
            
            # Classroom Statistics
            f.write("CLASSROOM STATISTICS\n")
            f.write("-" * 80 + "\n")
            f.write(f"Total Classrooms: {len(classrooms)}\n")
            f.write(f"Active Classrooms: {len([c for c in classrooms if c['active']])}\n")
            f.write(f"Total Capacity: {sum(c['capacity'] for c in classrooms)} students\n")
            f.write(f"Buildings: {len(set(c['building'] for c in classrooms))}\n\n")
            
            # User Statistics
            f.write("USER STATISTICS\n")
            f.write("-" * 80 + "\n")
            f.write(f"Total Users: {len(users)}\n")
            f.write(f"Students: {len([u for u in users if u['role'] == 'student'])}\n")
            f.write(f"Teachers: {len([u for u in users if u['role'] == 'teacher'])}\n")
            f.write(f"Administrators: {len([u for u in users if u['role'] == 'admin'])}\n")
            f.write(f"Active Users: {len([u for u in users if u['active']])}\n\n")
            
            # Submission Statistics
            f.write("SUBMISSION STATISTICS\n")
            f.write("-" * 80 + "\n")
            f.write(f"Total Submissions: {len(submissions)}\n")
            f.write(f"Pending: {len([s for s in submissions if s['status'] == 'pending'])}\n")
            f.write(f"Approved: {len([s for s in submissions if s['status'] == 'approved'])}\n")
            f.write(f"Rejected: {len([s for s in submissions if s['status'] == 'rejected'])}\n")
            
            approved = [s for s in submissions if s['status'] == 'approved' and s['score']]
            if approved:
                avg_score = sum(s['score'] for s in approved) / len(approved)
                f.write(f"Average Score: {avg_score:.1f}/100\n")
        
        print(f"✅ Statistics exported to {filepath}")
        return filepath
    
    def export_all_to_text(self, output_dir: str = "exports"):
        """Export all data to text files"""
        os.makedirs(output_dir, exist_ok=True)
        
        self.export_classrooms_to_text(os.path.join(output_dir, "classrooms.txt"))
        self.export_users_to_text(os.path.join(output_dir, "users.txt"))
        self.export_submissions_to_text(os.path.join(output_dir, "submissions.txt"))
        self.export_statistics_to_text(os.path.join(output_dir, "statistics.txt"))
        
        print(f"✅ All data exported to {output_dir}/")
    
    def close(self):
        """Close database connection"""
        if self.conn:
            self.conn.close()
            print("✅ Database connection closed")


# Example usage and demo
if __name__ == "__main__":
    print("=" * 80)
    print("SMARTCLEAN DATABASE MANAGEMENT SYSTEM")
    print("=" * 80)
    print()
    
    # Initialize database
    db = SmartCleanDB("smartclean.db")
    
    print("\n" + "=" * 80)
    print("DEMO: Adding Sample Data")
    print("=" * 80)
    
    # Add classrooms
    print("\n📚 Adding Classrooms...")
    classroom1_id = db.add_classroom("1-A", "Building A", 1, 30, "田中太郎 (Tanaka Taro)")
    classroom2_id = db.add_classroom("2-B", "Building B", 2, 32, "佐藤花子 (Sato Hanako)")
    classroom3_id = db.add_classroom("3-C", "Building C", 3, 35, "鈴木一郎 (Suzuki Ichiro)")
    
    # Add users
    print("\n👥 Adding Users...")
    admin_id = db.add_user("admin", "admin123", "Administrator", "admin", "admin@school.jp")
    teacher_id = db.add_user("teacher1", "teacher123", "佐藤花子", "teacher", "sato@school.jp", "090-1234-5678", "1-A")
    student_id = db.add_user("student1", "student123", "田中太郎", "student", "tanaka@school.jp", "090-9876-5432", "1-A")
    
    # Add submission
    print("\n📝 Adding Cleaning Submission...")
    checklist = {
        'floor': 1,
        'desks': 1,
        'blackboard': 1,
        'windows': 1,
        'trash': 1,
        'organize': 1,
        'air': 1
    }
    submission_id = db.add_submission(
        classroom1_id, "1-A", student_id, "田中太郎",
        checklist, ["photo1.jpg", "photo2.jpg"], "All tasks completed"
    )
    
    # Review submission
    print("\n✅ Reviewing Submission...")
    db.review_submission(submission_id, "approved", 95, "Excellent work!", teacher_id, "佐藤花子")
    
    # Export all data to text files
    print("\n" + "=" * 80)
    print("EXPORTING DATA TO TEXT FILES")
    print("=" * 80)
    db.export_all_to_text("smartclean_exports")
    
    print("\n" + "=" * 80)
    print("✅ DEMO COMPLETED SUCCESSFULLY!")
    print("=" * 80)
    print("\nCheck the 'smartclean_exports' folder for exported text files:")
    print("  - classrooms.txt")
    print("  - users.txt")
    print("  - submissions.txt")
    print("  - statistics.txt")
    print()
    
    # Close database
    db.close()
