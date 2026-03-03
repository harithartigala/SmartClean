// SmartClean Cloudflare Worker API
// Complete REST API for D1 Database Integration
// Version: 2.0

import { Router } from 'itty-router';

const router = Router();

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle CORS preflight
router.options('*', () => new Response(null, { headers: corsHeaders }));

// ==================== UTILITY FUNCTIONS ====================

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

function errorResponse(message, status = 400) {
  return jsonResponse({ error: message }, status);
}

function generateId(prefix = '') {
  return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ==================== AUTHENTICATION ====================

// POST /api/auth/register
router.post('/api/auth/register', async (request, env) => {
  try {
    const data = await request.json();
    const {
      username,
      password,
      name,
      name_japanese,
      role,
      email,
      phone,
      classroom,
      grade,
      section,
      student_number,
      date_of_birth,
    } = data;

    // Validate required fields
    if (!username || !password || !name || !role) {
      return errorResponse('Missing required fields');
    }

    // Check if username exists
    const existing = await env.DB.prepare(
      'SELECT id FROM users WHERE username = ?'
    )
      .bind(username)
      .first();

    if (existing) {
      return errorResponse('Username already exists', 409);
    }

    // Check if email exists (if provided)
    if (email) {
      const emailExists = await env.DB.prepare(
        'SELECT id FROM users WHERE email = ?'
      )
        .bind(email)
        .first();

      if (emailExists) {
        return errorResponse('Email already exists', 409);
      }
    }

    // Create user
    const userId = generateId('user-');
    const now = Date.now();

    await env.DB.prepare(`
      INSERT INTO users (
        id, username, password, name, name_japanese, role, 
        email, phone, classroom, grade, section, student_number, 
        date_of_birth, active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
    `)
      .bind(
        userId,
        username,
        password,
        name,
        name_japanese || null,
        role,
        email || null,
        phone || null,
        classroom || null,
        grade || null,
        section || null,
        student_number || null,
        date_of_birth || null,
        now,
        now
      )
      .run();

    // Log activity
    await env.DB.prepare(`
      INSERT INTO activity_log (id, user_id, action, entity_type, entity_id, created_at)
      VALUES (?, ?, 'register', 'user', ?, ?)
    `)
      .bind(generateId('log-'), userId, userId, now)
      .run();

    return jsonResponse(
      {
        message: 'User registered successfully',
        userId,
        username,
        name,
        role,
      },
      201
    );
  } catch (error) {
    return errorResponse(error.message, 500);
  }
});

// POST /api/auth/login
router.post('/api/auth/login', async (request, env) => {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return errorResponse('Username and password required');
    }

    // Authenticate user
    const user = await env.DB.prepare(`
      SELECT * FROM users 
      WHERE username = ? AND password = ? AND active = 1
    `)
      .bind(username, password)
      .first();

    if (!user) {
      return errorResponse('Invalid credentials', 401);
    }

    // Update last login
    const now = Date.now();
    await env.DB.prepare(`
      UPDATE users 
      SET last_login = ?, login_count = login_count + 1, updated_at = ?
      WHERE id = ?
    `)
      .bind(now, now, user.id)
      .run();

    // Log activity
    await env.DB.prepare(`
      INSERT INTO activity_log (id, user_id, action, created_at)
      VALUES (?, ?, 'login', ?)
    `)
      .bind(generateId('log-'), user.id, now)
      .run();

    // Remove password from response
    delete user.password;

    return jsonResponse({
      message: 'Login successful',
      user,
      token: `${user.id}:${Date.now()}`, // Simple token (use JWT in production)
    });
  } catch (error) {
    return errorResponse(error.message, 500);
  }
});

// ==================== USERS ====================

// GET /api/users
router.get('/api/users', async (request, env) => {
  try {
    const url = new URL(request.url);
    const role = url.searchParams.get('role');
    const classroom = url.searchParams.get('classroom');
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    let query = 'SELECT id, username, name, name_japanese, role, email, phone, classroom, grade, section, active, last_login, created_at FROM users WHERE 1=1';
    const params = [];

    if (role) {
      query += ' AND role = ?';
      params.push(role);
    }

    if (classroom) {
      query += ' AND classroom = ?';
      params.push(classroom);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const { results } = await env.DB.prepare(query).bind(...params).all();

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM users WHERE 1=1';
    const countParams = [];
    if (role) {
      countQuery += ' AND role = ?';
      countParams.push(role);
    }
    if (classroom) {
      countQuery += ' AND classroom = ?';
      countParams.push(classroom);
    }

    const { total } = await env.DB.prepare(countQuery).bind(...countParams).first();

    return jsonResponse({
      data: results,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return errorResponse(error.message, 500);
  }
});

// GET /api/users/:id
router.get('/api/users/:id', async (request, env) => {
  try {
    const userId = request.params.id;

    const user = await env.DB.prepare(`
      SELECT id, username, name, name_japanese, role, email, phone, 
             classroom, grade, section, student_number, date_of_birth,
             profile_photo, active, last_login, login_count, created_at, updated_at
      FROM users WHERE id = ?
    `)
      .bind(userId)
      .first();

    if (!user) {
      return errorResponse('User not found', 404);
    }

    // Get user statistics
    const stats = await env.DB.prepare(`
      SELECT 
        COUNT(*) as total_submissions,
        COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved,
        COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected,
        AVG(score) as average_score
      FROM cleaning_submissions
      WHERE student_id = ?
    `)
      .bind(userId)
      .first();

    return jsonResponse({
      ...user,
      statistics: stats,
    });
  } catch (error) {
    return errorResponse(error.message, 500);
  }
});

// PATCH /api/users/:id
router.patch('/api/users/:id', async (request, env) => {
  try {
    const userId = request.params.id;
    const updates = await request.json();

    const allowedFields = [
      'name',
      'name_japanese',
      'email',
      'phone',
      'classroom',
      'grade',
      'section',
      'student_number',
      'date_of_birth',
      'profile_photo',
      'password',
      'active',
    ];

    const setClause = [];
    const params = [];

    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key)) {
        setClause.push(`${key} = ?`);
        params.push(value);
      }
    }

    if (setClause.length === 0) {
      return errorResponse('No valid fields to update');
    }

    params.push(Date.now(), userId);

    await env.DB.prepare(`
      UPDATE users 
      SET ${setClause.join(', ')}, updated_at = ?
      WHERE id = ?
    `)
      .bind(...params)
      .run();

    return jsonResponse({ message: 'User updated successfully' });
  } catch (error) {
    return errorResponse(error.message, 500);
  }
});

// ==================== CLASSROOMS ====================

// GET /api/classrooms
router.get('/api/classrooms', async (request, env) => {
  try {
    const url = new URL(request.url);
    const active = url.searchParams.get('active');
    const building = url.searchParams.get('building');

    let query = 'SELECT * FROM classrooms WHERE 1=1';
    const params = [];

    if (active !== null) {
      query += ' AND active = ?';
      params.push(active === 'true' ? 1 : 0);
    }

    if (building) {
      query += ' AND building = ?';
      params.push(building);
    }

    query += ' ORDER BY number';

    const { results } = await env.DB.prepare(query).bind(...params).all();

    return jsonResponse({ data: results, total: results.length });
  } catch (error) {
    return errorResponse(error.message, 500);
  }
});

// POST /api/classrooms
router.post('/api/classrooms', async (request, env) => {
  try {
    const data = await request.json();
    const {
      number,
      name_english,
      name_japanese,
      building,
      floor,
      room_number,
      teacher_id,
      teacher_name,
      capacity,
      grade,
      section,
      room_type,
      area_sqm,
      has_projector,
      has_ac,
      notes,
    } = data;

    if (!number || !building || !floor || !capacity) {
      return errorResponse('Missing required fields');
    }

    // Check if classroom number exists
    const existing = await env.DB.prepare('SELECT id FROM classrooms WHERE number = ?')
      .bind(number)
      .first();

    if (existing) {
      return errorResponse('Classroom number already exists', 409);
    }

    const classroomId = generateId('classroom-');
    const now = Date.now();

    // Insert classroom
    await env.DB.prepare(`
      INSERT INTO classrooms (
        id, number, name_english, name_japanese, building, floor, 
        room_number, teacher_id, teacher_name, capacity, current_students,
        grade, section, room_type, area_sqm, has_projector, has_ac, 
        notes, active, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
    `)
      .bind(
        classroomId,
        number,
        name_english || null,
        name_japanese || null,
        building,
        floor,
        room_number || null,
        teacher_id || null,
        teacher_name || null,
        capacity,
        grade || null,
        section || null,
        room_type || 'regular',
        area_sqm || null,
        has_projector || 0,
        has_ac || 0,
        notes || null,
        now,
        now
      )
      .run();

    // Auto-generate QR code
    const qrData = `SMARTCLEAN-CLASSROOM-${number}`;
    const qrId = generateId('qr-');

    await env.DB.prepare(`
      UPDATE classrooms 
      SET qr_code_id = ?, qr_code_data = ?
      WHERE id = ?
    `)
      .bind(qrId, qrData, classroomId)
      .run();

    return jsonResponse(
      {
        message: 'Classroom created successfully',
        classroomId,
        number,
        qrData,
      },
      201
    );
  } catch (error) {
    return errorResponse(error.message, 500);
  }
});

// PATCH /api/classrooms/:id
router.patch('/api/classrooms/:id', async (request, env) => {
  try {
    const classroomId = request.params.id;
    const updates = await request.json();

    const allowedFields = [
      'number',
      'name_english',
      'name_japanese',
      'building',
      'floor',
      'room_number',
      'teacher_id',
      'teacher_name',
      'capacity',
      'current_students',
      'grade',
      'section',
      'room_type',
      'area_sqm',
      'has_projector',
      'has_ac',
      'notes',
      'active',
    ];

    const setClause = [];
    const params = [];

    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key)) {
        setClause.push(`${key} = ?`);
        params.push(value);
      }
    }

    if (setClause.length === 0) {
      return errorResponse('No valid fields to update');
    }

    params.push(Date.now(), classroomId);

    await env.DB.prepare(`
      UPDATE classrooms 
      SET ${setClause.join(', ')}, updated_at = ?
      WHERE id = ?
    `)
      .bind(...params)
      .run();

    return jsonResponse({ message: 'Classroom updated successfully' });
  } catch (error) {
    return errorResponse(error.message, 500);
  }
});

// DELETE /api/classrooms/:id
router.delete('/api/classrooms/:id', async (request, env) => {
  try {
    const classroomId = request.params.id;

    await env.DB.prepare('DELETE FROM classrooms WHERE id = ?').bind(classroomId).run();

    return jsonResponse({ message: 'Classroom deleted successfully' });
  } catch (error) {
    return errorResponse(error.message, 500);
  }
});

// ==================== CLEANING SUBMISSIONS ====================

// GET /api/submissions
router.get('/api/submissions', async (request, env) => {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const classroomId = url.searchParams.get('classroom_id');
    const studentId = url.searchParams.get('student_id');
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM cleaning_submissions WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (classroomId) {
      query += ' AND classroom_id = ?';
      params.push(classroomId);
    }

    if (studentId) {
      query += ' AND student_id = ?';
      params.push(studentId);
    }

    query += ' ORDER BY submission_date DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const { results } = await env.DB.prepare(query).bind(...params).all();

    // Parse JSON fields
    results.forEach((row) => {
      if (row.photos) {
        try {
          row.photos = JSON.parse(row.photos);
        } catch (e) {
          row.photos = [];
        }
      }
    });

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM cleaning_submissions WHERE 1=1';
    const countParams = [];
    if (status) {
      countQuery += ' AND status = ?';
      countParams.push(status);
    }
    if (classroomId) {
      countQuery += ' AND classroom_id = ?';
      countParams.push(classroomId);
    }
    if (studentId) {
      countQuery += ' AND student_id = ?';
      countParams.push(studentId);
    }

    const { total } = await env.DB.prepare(countQuery).bind(...countParams).first();

    return jsonResponse({
      data: results,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return errorResponse(error.message, 500);
  }
});

// POST /api/submissions
router.post('/api/submissions', async (request, env) => {
  try {
    const data = await request.json();
    const {
      classroom_id,
      classroom_number,
      student_id,
      student_name,
      checklist,
      photos,
      notes,
      duration_minutes,
      temperature_celsius,
      weather,
    } = data;

    if (!classroom_id || !student_id || !checklist) {
      return errorResponse('Missing required fields');
    }

    const submissionId = generateId('submission-');
    const now = Date.now();

    // Calculate completion percentage
    const checklistItems = [
      checklist.floor,
      checklist.desks,
      checklist.blackboard,
      checklist.windows,
      checklist.trash,
      checklist.organize,
      checklist.air,
    ];
    const completedItems = checklistItems.filter((item) => item).length;
    const completionPercentage = Math.round((completedItems / 7) * 100);

    await env.DB.prepare(`
      INSERT INTO cleaning_submissions (
        id, classroom_id, classroom_number, student_id, student_name,
        submission_date, checklist_floor, checklist_desks, checklist_blackboard,
        checklist_windows, checklist_trash, checklist_organize, checklist_air,
        photos, photo_count, notes, duration_minutes, temperature_celsius, weather,
        completion_percentage, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)
    `)
      .bind(
        submissionId,
        classroom_id,
        classroom_number,
        student_id,
        student_name,
        now,
        checklist.floor || 0,
        checklist.desks || 0,
        checklist.blackboard || 0,
        checklist.windows || 0,
        checklist.trash || 0,
        checklist.organize || 0,
        checklist.air || 0,
        JSON.stringify(photos || []),
        photos ? photos.length : 0,
        notes || null,
        duration_minutes || null,
        temperature_celsius || null,
        weather || null,
        completionPercentage,
        now,
        now
      )
      .run();

    // Create notification for teachers
    await env.DB.prepare(`
      INSERT INTO notifications (id, user_id, type, title, message, related_id, related_type, created_at)
      SELECT ?, id, 'submission', 'New Cleaning Submission', ?, ?, 'submission', ?
      FROM users WHERE role = 'teacher' AND classroom = ?
    `)
      .bind(
        generateId('notif-'),
        `New submission from ${student_name} for classroom ${classroom_number}`,
        submissionId,
        now,
        classroom_number
      )
      .run();

    return jsonResponse(
      {
        message: 'Submission created successfully',
        submissionId,
        completionPercentage,
      },
      201
    );
  } catch (error) {
    return errorResponse(error.message, 500);
  }
});

// PATCH /api/submissions/:id/review
router.patch('/api/submissions/:id/review', async (request, env) => {
  try {
    const submissionId = request.params.id;
    const { status, score, feedback, reviewerId, reviewerName, qualityRating } = await request.json();

    if (!status || !reviewerId) {
      return errorResponse('Status and reviewer required');
    }

    // Calculate grade level
    let gradeLevel = 'F';
    if (score >= 95) gradeLevel = 'A+';
    else if (score >= 90) gradeLevel = 'A';
    else if (score >= 80) gradeLevel = 'B';
    else if (score >= 70) gradeLevel = 'C';
    else if (score >= 60) gradeLevel = 'D';

    const now = Date.now();

    await env.DB.prepare(`
      UPDATE cleaning_submissions
      SET status = ?, score = ?, grade_level = ?, teacher_feedback = ?,
          reviewed_by_id = ?, reviewed_by = ?, reviewed_at = ?,
          quality_rating = ?, updated_at = ?
      WHERE id = ?
    `)
      .bind(
        status,
        score,
        gradeLevel,
        feedback,
        reviewerId,
        reviewerName,
        now,
        qualityRating || null,
        now,
        submissionId
      )
      .run();

    // Get submission details for notification
    const submission = await env.DB.prepare('SELECT student_id, student_name, classroom_number FROM cleaning_submissions WHERE id = ?')
      .bind(submissionId)
      .first();

    if (submission) {
      // Notify student
      await env.DB.prepare(`
        INSERT INTO notifications (id, user_id, type, title, message, related_id, related_type, priority, created_at)
        VALUES (?, ?, 'review', ?, ?, ?, 'submission', 'high', ?)
      `)
        .bind(
          generateId('notif-'),
          submission.student_id,
          'Submission Reviewed',
          `Your submission for ${submission.classroom_number} has been ${status}. Score: ${score}/100`,
          submissionId,
          now
        )
        .run();

      // Check for achievements
      if (status === 'approved' && score >= 95) {
        await env.DB.prepare(`
          INSERT INTO achievements (id, user_id, achievement_type, achievement_name, description, points_earned, unlocked_at)
          VALUES (?, ?, 'excellence', 'Perfect Score', 'Achieved a score of 95 or higher', 50, ?)
        `)
          .bind(generateId('achieve-'), submission.student_id, now)
          .run();
      }
    }

    return jsonResponse({
      message: 'Review submitted successfully',
      gradeLevel,
    });
  } catch (error) {
    return errorResponse(error.message, 500);
  }
});

// ==================== REPORTS ====================

// POST /api/reports/generate
router.post('/api/reports/generate', async (request, env) => {
  try {
    const data = await request.json();
    const {
      report_type,
      report_name,
      generated_by,
      generated_by_id,
      start_date,
      end_date,
      classroom_filter,
      status_filter,
      file_format,
    } = data;

    if (!report_type || !generated_by_id) {
      return errorResponse('Report type and generator required');
    }

    // Query submissions for report
    let query = 'SELECT * FROM cleaning_submissions WHERE 1=1';
    const params = [];

    if (start_date) {
      query += ' AND submission_date >= ?';
      params.push(start_date);
    }

    if (end_date) {
      query += ' AND submission_date <= ?';
      params.push(end_date);
    }

    if (classroom_filter) {
      query += ' AND classroom_number = ?';
      params.push(classroom_filter);
    }

    if (status_filter) {
      query += ' AND status = ?';
      params.push(status_filter);
    }

    const { results } = await env.DB.prepare(query).bind(...params).all();

    // Calculate statistics
    const totalSubmissions = results.length;
    const approvedCount = results.filter((r) => r.status === 'approved').length;
    const rejectedCount = results.filter((r) => r.status === 'rejected').length;
    const pendingCount = results.filter((r) => r.status === 'pending').length;
    const scores = results.filter((r) => r.score).map((r) => r.score);
    const averageScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

    // Generate CSV data
    let csvData = 'ID,Classroom,Student,Date,Status,Score,Completion %\n';
    results.forEach((row) => {
      const date = new Date(row.submission_date).toISOString().split('T')[0];
      csvData += `${row.id},${row.classroom_number},${row.student_name},${date},${row.status},${row.score || 'N/A'},${row.completion_percentage}%\n`;
    });

    const reportId = generateId('report-');
    const now = Date.now();
    const expiresAt = now + 90 * 24 * 60 * 60 * 1000; // 90 days

    await env.DB.prepare(`
      INSERT INTO reports (
        id, report_type, report_name, generated_by, generated_by_id,
        start_date, end_date, classroom_filter, status_filter,
        total_submissions, approved_count, rejected_count, pending_count, average_score,
        file_format, file_size, expires_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
      .bind(
        reportId,
        report_type,
        report_name || `Report ${now}`,
        generated_by,
        generated_by_id,
        start_date || null,
        end_date || null,
        classroom_filter || null,
        status_filter || null,
        totalSubmissions,
        approvedCount,
        rejectedCount,
        pendingCount,
        averageScore,
        file_format || 'csv',
        csvData.length,
        expiresAt,
        now
      )
      .run();

    return jsonResponse(
      {
        message: 'Report generated successfully',
        reportId,
        statistics: {
          totalSubmissions,
          approvedCount,
          rejectedCount,
          pendingCount,
          averageScore: Math.round(averageScore * 10) / 10,
        },
        csvData,
      },
      201
    );
  } catch (error) {
    return errorResponse(error.message, 500);
  }
});

// GET /api/reports
router.get('/api/reports', async (request, env) => {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('user_id');

    let query = 'SELECT * FROM reports WHERE 1=1';
    const params = [];

    if (userId) {
      query += ' AND generated_by_id = ?';
      params.push(userId);
    }

    query += ' ORDER BY created_at DESC LIMIT 50';

    const { results } = await env.DB.prepare(query).bind(...params).all();

    return jsonResponse({ data: results });
  } catch (error) {
    return errorResponse(error.message, 500);
  }
});

// ==================== STATISTICS ====================

// GET /api/statistics/dashboard
router.get('/api/statistics/dashboard', async (request, env) => {
  try {
    // Overall stats
    const overallStats = await env.DB.prepare(`
      SELECT 
        COUNT(DISTINCT u.id) as total_users,
        COUNT(DISTINCT CASE WHEN u.role = 'student' THEN u.id END) as total_students,
        COUNT(DISTINCT CASE WHEN u.role = 'teacher' THEN u.id END) as total_teachers,
        COUNT(DISTINCT c.id) as total_classrooms,
        COUNT(DISTINCT s.id) as total_submissions,
        COUNT(DISTINCT CASE WHEN s.status = 'approved' THEN s.id END) as approved_submissions,
        AVG(s.score) as average_score
      FROM users u
      CROSS JOIN classrooms c
      CROSS JOIN cleaning_submissions s
    `).first();

    // Recent activity
    const recentActivity = await env.DB.prepare(`
      SELECT * FROM activity_log
      ORDER BY created_at DESC
      LIMIT 10
    `).all();

    // Daily stats for last 7 days
    const dailyStats = await env.DB.prepare(`
      SELECT * FROM daily_stats
      LIMIT 7
    `).all();

    return jsonResponse({
      overall: overallStats,
      recentActivity: recentActivity.results,
      dailyStats: dailyStats.results,
    });
  } catch (error) {
    return errorResponse(error.message, 500);
  }
});

// ==================== HANDLE REQUEST ====================

export default {
  async fetch(request, env, ctx) {
    return router.handle(request, env, ctx).catch((err) => {
      console.error(err);
      return errorResponse('Internal server error', 500);
    });
  },
};
