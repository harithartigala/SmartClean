// SmartClean Bilingual Translation System
// Complete English and Japanese translations

const translations = {
    en: {
        // Common
        appName: 'SmartClean',
        tagline: 'Smart Classroom Cleaning Management',
        language: 'Language',
        loading: 'Loading...',
        save: 'Save',
        cancel: 'Cancel',
        submit: 'Submit',
        delete: 'Delete',
        edit: 'Edit',
        view: 'View',
        close: 'Close',
        confirm: 'Confirm',
        back: 'Back',
        next: 'Next',
        search: 'Search',
        filter: 'Filter',
        export: 'Export',
        download: 'Download',
        upload: 'Upload',
        select: 'Select',
        selectAll: 'Select All',
        clear: 'Clear',
        refresh: 'Refresh',
        print: 'Print',
        yes: 'Yes',
        no: 'No',
        ok: 'OK',
        
        // Navigation
        nav: {
            home: 'Home',
            dashboard: 'Dashboard',
            submissions: 'Submissions',
            reports: 'Reports',
            qrCodes: 'QR Codes',
            profile: 'Profile',
            settings: 'Settings',
            logout: 'Logout'
        },
        
        // Login Page
        login: {
            title: 'Login',
            welcome: 'Welcome to SmartClean',
            description: 'Smart classroom cleaning management system',
            username: 'Username',
            password: 'Password',
            usernamePlaceholder: 'Enter your username',
            passwordPlaceholder: 'Enter your password',
            rememberMe: 'Remember me',
            forgotPassword: 'Forgot password?',
            loginButton: 'Login',
            demoCredentials: 'Demo Credentials',
            student: 'Student',
            teacher: 'Teacher',
            admin: 'Administrator',
            loginSuccess: 'Login successful!',
            loginError: 'Invalid username or password',
            requiredFields: 'Please fill in all fields',
            noAccount: 'Don\'t have an account?',
            registerNow: 'Register Now'
        },
        
        // Registration
        register: {
            title: 'Create New Account',
            description: 'Register a new student or teacher account',
            selectRole: 'Select Role',
            studentRole: 'I am a Student',
            teacherRole: 'I am a Teacher',
            fullName: 'Full Name',
            username: 'Username',
            password: 'Password',
            confirmPassword: 'Confirm Password',
            classroom: 'Classroom',
            selectClassroom: 'Select your classroom',
            email: 'Email (optional)',
            phone: 'Phone (optional)',
            createAccount: 'Create Account',
            backToLogin: 'Back to Login',
            passwordMismatch: 'Passwords do not match',
            registrationSuccess: 'Account created successfully! Please login.',
            registrationError: 'Failed to create account. Please try again.',
            passwordStrength: 'Password strength',
            weakPassword: 'Weak',
            mediumPassword: 'Medium',
            strongPassword: 'Strong'
        },
        
        // User Management (Admin)
        userManagement: {
            title: 'User Management',
            description: 'Manage student and teacher accounts',
            addUser: 'Add New User',
            editUser: 'Edit User',
            deleteUser: 'Delete User',
            deleteConfirm: 'Are you sure you want to delete this user? This action cannot be undone.',
            totalUsers: 'Total Users',
            totalStudents: 'Students',
            totalTeachers: 'Teachers',
            activeUsers: 'Active Users',
            all: 'All',
            students: 'Students',
            teachers: 'Teachers',
            admins: 'Administrators',
            search: 'Search by name or username...',
            user: 'User',
            username: 'Username',
            name: 'Full Name',
            password: 'Password',
            role: 'Role',
            classroom: 'Classroom',
            email: 'Email',
            phone: 'Phone',
            status: 'Status',
            actions: 'Actions',
            activeAccount: 'Active Account',
            userCreated: 'User created successfully',
            userUpdated: 'User updated successfully',
            userDeleted: 'User deleted successfully'
        },
        
        // Classroom Management (Admin)
        classroomManagement: {
            title: 'Classroom Management',
            description: 'Manage school classrooms and facilities',
            addClassroom: 'Add New Classroom',
            editClassroom: 'Edit Classroom',
            deleteClassroom: 'Delete Classroom',
            deleteConfirm: 'Are you sure you want to delete this classroom? This action cannot be undone.',
            totalClassrooms: 'Total Classrooms',
            activeClassrooms: 'Active Classrooms',
            totalCapacity: 'Total Capacity',
            totalBuildings: 'Buildings',
            all: 'All',
            active: 'Active',
            inactive: 'Inactive',
            search: 'Search by classroom number or building...',
            classroomNumber: 'Classroom Number',
            building: 'Building',
            floor: 'Floor',
            teacherName: 'Assigned Teacher',
            noTeacher: 'No teacher assigned',
            capacity: 'Capacity',
            notes: 'Notes',
            activeStatus: 'Active Classroom',
            noClassrooms: 'No classrooms found',
            addFirstClassroom: 'Click "Add Classroom" to create your first classroom',
            classroomCreated: 'Classroom created successfully',
            classroomUpdated: 'Classroom updated successfully',
            classroomDeleted: 'Classroom deleted successfully',
            generateQR: 'Generate QR',
            generateQRPrompt: 'Classroom created! Would you like to generate a QR code for this classroom now?',
            qrCodeGenerated: 'QR Code Generated Successfully!',
            qrInstructions: 'Print and post this QR code in the classroom',
            qrReadyToPrint: 'QR code is ready! Click Download to save or Print to print now.',
            qrGenerated: 'QR code generated successfully!',
            qrDownloaded: 'QR code downloaded successfully!',
            qrExists: 'A QR code already exists for this classroom. Generate a new one?',
            manageAllQR: 'View All QR Codes',
            classroom: 'Classroom'
        },
        
        // Student Dashboard
        student: {
            dashboard: 'Student Dashboard',
            welcome: 'Welcome',
            scanQR: 'Scan Classroom QR Code',
            scanInstructions: 'Point your camera at the classroom QR code to start cleaning submission',
            startScanner: 'Start Scanner',
            stopScanner: 'Stop Scanner',
            manualEntry: 'Manual Entry',
            enterClassroom: 'Enter Classroom Number',
            mySubmissions: 'My Submissions',
            recentSubmissions: 'Recent Submissions',
            submitCleaning: 'Submit Cleaning',
            viewDetails: 'View Details',
            noSubmissions: 'No submissions yet',
            pending: 'Pending Review',
            approved: 'Approved',
            rejected: 'Needs Improvement',
            score: 'Score',
            submittedOn: 'Submitted on',
            reviewedBy: 'Reviewed by',
            feedback: 'Feedback',
            startCleaning: 'Start Cleaning Submission'
        },
        
        // Cleaning Form
        cleaning: {
            title: 'Classroom Cleaning Submission',
            classroom: 'Classroom',
            classroomNumber: 'Classroom Number',
            date: 'Date',
            time: 'Time',
            studentInfo: 'Student Information',
            studentID: 'Student ID',
            studentName: 'Student Name',
            checklist: 'Cleaning Checklist',
            checklistInstructions: 'Check all completed cleaning tasks',
            tasks: {
                floor: 'Floor swept and mopped',
                desks: 'Desks and chairs cleaned',
                blackboard: 'Blackboard cleaned',
                windows: 'Windows cleaned',
                trash: 'Trash emptied',
                organize: 'Items organized',
                air: 'Room ventilated'
            },
            photos: 'Evidence Photos',
            photosInstructions: 'Upload photos of the cleaned classroom (minimum 2 photos)',
            uploadPhotos: 'Upload Photos',
            photoCount: 'photos uploaded',
            removePhoto: 'Remove photo',
            additionalNotes: 'Additional Notes',
            notesPlaceholder: 'Any additional comments or issues...',
            submitForm: 'Submit Cleaning Report',
            submitting: 'Submitting...',
            success: 'Cleaning report submitted successfully!',
            error: 'Failed to submit report',
            validationError: 'Please complete all required fields and upload at least 2 photos',
            confirmSubmit: 'Are you sure you want to submit this cleaning report?'
        },
        
        // Teacher Dashboard
        teacher: {
            dashboard: 'Teacher Dashboard',
            welcome: 'Welcome',
            pendingReviews: 'Pending Reviews',
            reviewSubmissions: 'Review Submissions',
            todaySubmissions: "Today's Submissions",
            approvedToday: 'Approved Today',
            rejectedToday: 'Needs Improvement Today',
            averageScore: 'Average Score',
            submissionsList: 'Submissions List',
            filterByStatus: 'Filter by Status',
            all: 'All',
            reviewSubmission: 'Review Submission',
            submissionDetails: 'Submission Details',
            submittedBy: 'Submitted by',
            classroom: 'Classroom',
            submittedAt: 'Submitted at',
            checklistItems: 'Checklist Items',
            completed: 'Completed',
            photos: 'Photos',
            assignScore: 'Assign Score',
            scorePlaceholder: 'Enter score (0-100)',
            teacherFeedback: 'Teacher Feedback',
            feedbackPlaceholder: 'Provide feedback to the student...',
            approve: 'Approve',
            reject: 'Request Improvement',
            approveSuccess: 'Submission approved successfully!',
            rejectSuccess: 'Feedback sent to student',
            reviewError: 'Failed to submit review',
            validationError: 'Please provide a score and feedback'
        },
        
        // Admin Dashboard
        admin: {
            dashboard: 'Admin Dashboard',
            welcome: 'Welcome',
            overview: 'System Overview',
            totalClassrooms: 'Total Classrooms',
            totalStudents: 'Total Students',
            totalTeachers: 'Total Teachers',
            totalSubmissions: 'Total Submissions',
            todaySubmissions: "Today's Submissions",
            weekSubmissions: "This Week's Submissions",
            monthSubmissions: "This Month's Submissions",
            approvalRate: 'Approval Rate',
            analytics: 'Analytics',
            submissionTrend: 'Submission Trend',
            statusDistribution: 'Status Distribution',
            scoreDistribution: 'Score Distribution',
            topClassrooms: 'Top Performing Classrooms',
            quickActions: 'Quick Actions',
            manageClassrooms: 'Manage Classrooms',
            manageUsers: 'Manage Users',
            generateQR: 'Generate QR Codes',
            viewReports: 'View Reports',
            exportData: 'Export Data'
        },
        
        // QR Management
        qr: {
            title: 'QR Code Management',
            generate: 'Generate QR Codes',
            manage: 'Manage QR Codes',
            classroomList: 'Classroom List',
            generateNew: 'Generate New QR Code',
            selectClassroom: 'Select Classroom',
            generateButton: 'Generate QR Code',
            downloadQR: 'Download QR Code',
            printQR: 'Print QR Code',
            qrPreview: 'QR Code Preview',
            instructions: 'Print and post this QR code in the classroom',
            generatedFor: 'Generated for',
            generatedAt: 'Generated at',
            scanCount: 'Scan Count',
            lastScanned: 'Last Scanned',
            active: 'Active',
            inactive: 'Inactive',
            regenerate: 'Regenerate',
            deactivate: 'Deactivate',
            activate: 'Activate',
            deleteQR: 'Delete QR Code',
            confirmDelete: 'Are you sure you want to delete this QR code?',
            generateSuccess: 'QR code generated successfully!',
            generateError: 'Failed to generate QR code'
        },
        
        // Reports
        reports: {
            title: 'Reports & Analytics',
            generate: 'Generate Report',
            reportType: 'Report Type',
            dateRange: 'Date Range',
            startDate: 'Start Date',
            endDate: 'End Date',
            classroom: 'Classroom',
            allClassrooms: 'All Classrooms',
            student: 'Student',
            allStudents: 'All Students',
            status: 'Status',
            allStatuses: 'All Statuses',
            generateReport: 'Generate Report',
            exportCSV: 'Export to CSV',
            exportPDF: 'Export to PDF',
            exportExcel: 'Export to Excel',
            reportTypes: {
                daily: 'Daily Report',
                weekly: 'Weekly Report',
                monthly: 'Monthly Report',
                custom: 'Custom Report',
                classroom: 'Classroom Report',
                student: 'Student Report',
                performance: 'Performance Report'
            },
            summary: 'Summary',
            totalRecords: 'Total Records',
            approvalRate: 'Approval Rate',
            averageScore: 'Average Score',
            bestPerforming: 'Best Performing',
            needsImprovement: 'Needs Improvement',
            noData: 'No data available for selected criteria',
            generatingReport: 'Generating report...',
            reportGenerated: 'Report generated successfully!'
        },
        
        // Submission Details
        submission: {
            title: 'Submission Details',
            status: 'Status',
            submissionInfo: 'Submission Information',
            classroom: 'Classroom',
            student: 'Student',
            submittedAt: 'Submitted At',
            reviewedAt: 'Reviewed At',
            reviewedBy: 'Reviewed By',
            score: 'Score',
            checklist: 'Cleaning Checklist',
            photos: 'Evidence Photos',
            notes: 'Additional Notes',
            feedback: 'Teacher Feedback',
            noFeedback: 'No feedback provided yet',
            noNotes: 'No additional notes',
            downloadPhotos: 'Download All Photos',
            viewPhoto: 'View Photo',
            backToList: 'Back to List'
        },
        
        // Settings
        settings: {
            title: 'Settings',
            general: 'General Settings',
            language: 'Language',
            theme: 'Theme',
            light: 'Light',
            dark: 'Dark',
            notifications: 'Notifications',
            emailNotifications: 'Email Notifications',
            pushNotifications: 'Push Notifications',
            account: 'Account Settings',
            changePassword: 'Change Password',
            currentPassword: 'Current Password',
            newPassword: 'New Password',
            confirmPassword: 'Confirm Password',
            updatePassword: 'Update Password',
            profile: 'Profile Information',
            name: 'Name',
            email: 'Email',
            phone: 'Phone',
            updateProfile: 'Update Profile',
            saveChanges: 'Save Changes',
            settingsSaved: 'Settings saved successfully!'
        },
        
        // Messages
        messages: {
            success: 'Operation completed successfully!',
            error: 'An error occurred. Please try again.',
            saveSuccess: 'Changes saved successfully!',
            deleteSuccess: 'Deleted successfully!',
            updateSuccess: 'Updated successfully!',
            uploadSuccess: 'Upload completed successfully!',
            noData: 'No data available',
            noResults: 'No results found',
            loading: 'Loading, please wait...',
            processing: 'Processing...',
            confirmAction: 'Are you sure you want to proceed?',
            unsavedChanges: 'You have unsaved changes. Are you sure you want to leave?',
            sessionExpired: 'Your session has expired. Please login again.',
            networkError: 'Network error. Please check your connection.',
            permissionDenied: 'Permission denied.',
            invalidInput: 'Invalid input. Please check and try again.'
        },
        
        // Date & Time
        date: {
            today: 'Today',
            yesterday: 'Yesterday',
            tomorrow: 'Tomorrow',
            thisWeek: 'This Week',
            lastWeek: 'Last Week',
            thisMonth: 'This Month',
            lastMonth: 'Last Month',
            custom: 'Custom',
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        
        // Status
        status: {
            pending: 'Pending',
            approved: 'Approved',
            rejected: 'Needs Improvement',
            active: 'Active',
            inactive: 'Inactive',
            completed: 'Completed',
            inProgress: 'In Progress'
        }
    },
    
    ja: {
        // 共通
        appName: 'SmartClean',
        tagline: 'スマート教室清掃管理システム',
        language: '言語',
        loading: '読み込み中...',
        save: '保存',
        cancel: 'キャンセル',
        submit: '送信',
        delete: '削除',
        edit: '編集',
        view: '表示',
        close: '閉じる',
        confirm: '確認',
        back: '戻る',
        next: '次へ',
        search: '検索',
        filter: '絞り込み',
        export: 'エクスポート',
        download: 'ダウンロード',
        upload: 'アップロード',
        select: '選択',
        selectAll: '全て選択',
        clear: 'クリア',
        refresh: '更新',
        print: '印刷',
        yes: 'はい',
        no: 'いいえ',
        ok: 'OK',
        
        // ナビゲーション
        nav: {
            home: 'ホーム',
            dashboard: 'ダッシュボード',
            submissions: '提出物',
            reports: 'レポート',
            qrCodes: 'QRコード',
            profile: 'プロフィール',
            settings: '設定',
            logout: 'ログアウト'
        },
        
        // ログインページ
        login: {
            title: 'ログイン',
            welcome: 'SmartCleanへようこそ',
            description: 'スマート教室清掃管理システム',
            username: 'ユーザー名',
            password: 'パスワード',
            usernamePlaceholder: 'ユーザー名を入力',
            passwordPlaceholder: 'パスワードを入力',
            rememberMe: 'ログイン状態を保持',
            forgotPassword: 'パスワードをお忘れですか？',
            loginButton: 'ログイン',
            demoCredentials: 'デモアカウント',
            student: '生徒',
            teacher: '先生',
            admin: '管理者',
            loginSuccess: 'ログインに成功しました！',
            loginError: 'ユーザー名またはパスワードが無効です',
            requiredFields: '全てのフィールドを入力してください',
            noAccount: 'アカウントをお持ちでないですか？',
            registerNow: '今すぐ登録'
        },
        
        // アカウント登録
        register: {
            title: '新規アカウント作成',
            description: '生徒または先生のアカウントを登録',
            selectRole: '役割を選択',
            studentRole: '私は生徒です',
            teacherRole: '私は先生です',
            fullName: '氏名',
            username: 'ユーザー名',
            password: 'パスワード',
            confirmPassword: 'パスワード確認',
            classroom: '教室',
            selectClassroom: '教室を選択してください',
            email: 'メールアドレス（任意）',
            phone: '電話番号（任意）',
            createAccount: 'アカウントを作成',
            backToLogin: 'ログインに戻る',
            passwordMismatch: 'パスワードが一致しません',
            registrationSuccess: 'アカウントが作成されました！ログインしてください。',
            registrationError: 'アカウントの作成に失敗しました。もう一度お試しください。',
            passwordStrength: 'パスワード強度',
            weakPassword: '弱い',
            mediumPassword: '普通',
            strongPassword: '強い'
        },
        
        // ユーザー管理（管理者）
        userManagement: {
            title: 'ユーザー管理',
            description: '生徒と先生のアカウントを管理',
            addUser: 'ユーザーを追加',
            editUser: 'ユーザーを編集',
            deleteUser: 'ユーザーを削除',
            deleteConfirm: 'このユーザーを削除してもよろしいですか？この操作は元に戻せません。',
            totalUsers: '総ユーザー数',
            totalStudents: '生徒数',
            totalTeachers: '先生数',
            activeUsers: 'アクティブユーザー',
            all: '全て',
            students: '生徒',
            teachers: '先生',
            admins: '管理者',
            search: '名前またはユーザー名で検索...',
            user: 'ユーザー',
            username: 'ユーザー名',
            name: '氏名',
            password: 'パスワード',
            role: '役割',
            classroom: '教室',
            email: 'メールアドレス',
            phone: '電話番号',
            status: 'ステータス',
            actions: '操作',
            activeAccount: 'アクティブアカウント',
            userCreated: 'ユーザーが作成されました',
            userUpdated: 'ユーザーが更新されました',
            userDeleted: 'ユーザーが削除されました'
        },
        
        // 教室管理（管理者）
        classroomManagement: {
            title: '教室管理',
            description: '学校の教室と施設を管理',
            addClassroom: '教室を追加',
            editClassroom: '教室を編集',
            deleteClassroom: '教室を削除',
            deleteConfirm: 'この教室を削除してもよろしいですか？この操作は元に戻せません。',
            totalClassrooms: '総教室数',
            activeClassrooms: 'アクティブ教室',
            totalCapacity: '総収容人数',
            totalBuildings: '校舎数',
            all: '全て',
            active: 'アクティブ',
            inactive: '非アクティブ',
            search: '教室番号または校舎名で検索...',
            classroomNumber: '教室番号',
            building: '校舎',
            floor: '階',
            teacherName: '担当教員',
            noTeacher: '担当教員未割当',
            capacity: '定員',
            notes: '備考',
            activeStatus: 'アクティブ教室',
            noClassrooms: '教室が見つかりません',
            addFirstClassroom: '「教室を追加」をクリックして最初の教室を作成してください',
            classroomCreated: '教室が作成されました',
            classroomUpdated: '教室が更新されました',
            classroomDeleted: '教室が削除されました',
            generateQR: 'QRコード生成',
            generateQRPrompt: '教室が作成されました！この教室のQRコードを今すぐ生成しますか？',
            qrCodeGenerated: 'QRコードが生成されました！',
            qrInstructions: '教室にこのQRコードを印刷して掲示してください',
            qrReadyToPrint: 'QRコードの準備ができました！ダウンロードして保存するか、今すぐ印刷してください。',
            qrGenerated: 'QRコードが生成されました！',
            qrDownloaded: 'QRコードがダウンロードされました！',
            qrExists: 'この教室のQRコードはすでに存在します。新しいQRコードを生成しますか？',
            manageAllQR: 'すべてのQRコードを表示',
            classroom: '教室'
        },
        
        // 生徒ダッシュボード
        student: {
            dashboard: '生徒ダッシュボード',
            welcome: 'ようこそ',
            scanQR: '教室QRコードをスキャン',
            scanInstructions: 'カメラを教室のQRコードに向けて清掃提出を開始してください',
            startScanner: 'スキャナーを起動',
            stopScanner: 'スキャナーを停止',
            manualEntry: '手動入力',
            enterClassroom: '教室番号を入力',
            mySubmissions: '私の提出物',
            recentSubmissions: '最近の提出物',
            submitCleaning: '清掃を提出',
            viewDetails: '詳細を表示',
            noSubmissions: 'まだ提出物がありません',
            pending: '審査待ち',
            approved: '承認済み',
            rejected: '改善が必要',
            score: 'スコア',
            submittedOn: '提出日',
            reviewedBy: '審査者',
            feedback: 'フィードバック',
            startCleaning: '清掃提出を開始'
        },
        
        // 清掃フォーム
        cleaning: {
            title: '教室清掃提出',
            classroom: '教室',
            classroomNumber: '教室番号',
            date: '日付',
            time: '時刻',
            studentInfo: '生徒情報',
            studentID: '生徒ID',
            studentName: '生徒名',
            checklist: '清掃チェックリスト',
            checklistInstructions: '完了した清掃タスクを全てチェックしてください',
            tasks: {
                floor: '床の掃き掃除とモップがけ',
                desks: '机と椅子の清掃',
                blackboard: '黒板の清掃',
                windows: '窓の清掃',
                trash: 'ゴミ箱を空にした',
                organize: '物品の整理整頓',
                air: '教室の換気'
            },
            photos: '証拠写真',
            photosInstructions: '清掃後の教室の写真をアップロード（最低2枚）',
            uploadPhotos: '写真をアップロード',
            photoCount: '枚の写真がアップロードされました',
            removePhoto: '写真を削除',
            additionalNotes: '追加メモ',
            notesPlaceholder: '追加のコメントや問題点...',
            submitForm: '清掃報告を提出',
            submitting: '送信中...',
            success: '清掃報告が正常に提出されました！',
            error: '報告の提出に失敗しました',
            validationError: '必須項目を全て入力し、最低2枚の写真をアップロードしてください',
            confirmSubmit: 'この清掃報告を提出してもよろしいですか？'
        },
        
        // 教師ダッシュボード
        teacher: {
            dashboard: '教師ダッシュボード',
            welcome: 'ようこそ',
            pendingReviews: '審査待ち',
            reviewSubmissions: '提出物を審査',
            todaySubmissions: '今日の提出物',
            approvedToday: '本日承認',
            rejectedToday: '本日改善要請',
            averageScore: '平均スコア',
            submissionsList: '提出物リスト',
            filterByStatus: 'ステータスで絞り込み',
            all: '全て',
            reviewSubmission: '提出物を審査',
            submissionDetails: '提出物の詳細',
            submittedBy: '提出者',
            classroom: '教室',
            submittedAt: '提出日時',
            checklistItems: 'チェックリスト項目',
            completed: '完了',
            photos: '写真',
            assignScore: 'スコアを付ける',
            scorePlaceholder: 'スコアを入力（0-100）',
            teacherFeedback: '教師のフィードバック',
            feedbackPlaceholder: '生徒へのフィードバックを入力...',
            approve: '承認',
            reject: '改善を要請',
            approveSuccess: '提出物を承認しました！',
            rejectSuccess: 'フィードバックを送信しました',
            reviewError: '審査の提出に失敗しました',
            validationError: 'スコアとフィードバックを入力してください'
        },
        
        // 管理者ダッシュボード
        admin: {
            dashboard: '管理者ダッシュボード',
            welcome: 'ようこそ',
            overview: 'システム概要',
            totalClassrooms: '総教室数',
            totalStudents: '総生徒数',
            totalTeachers: '総教師数',
            totalSubmissions: '総提出物数',
            todaySubmissions: '今日の提出物',
            weekSubmissions: '今週の提出物',
            monthSubmissions: '今月の提出物',
            approvalRate: '承認率',
            analytics: '分析',
            submissionTrend: '提出傾向',
            statusDistribution: 'ステータス分布',
            scoreDistribution: 'スコア分布',
            topClassrooms: '優秀教室',
            quickActions: 'クイックアクション',
            manageClassrooms: '教室管理',
            manageUsers: 'ユーザー管理',
            generateQR: 'QRコード生成',
            viewReports: 'レポート表示',
            exportData: 'データエクスポート'
        },
        
        // QR管理
        qr: {
            title: 'QRコード管理',
            generate: 'QRコード生成',
            manage: 'QRコード管理',
            classroomList: '教室リスト',
            generateNew: '新規QRコード生成',
            selectClassroom: '教室を選択',
            generateButton: 'QRコード生成',
            downloadQR: 'QRコードをダウンロード',
            printQR: 'QRコードを印刷',
            qrPreview: 'QRコードプレビュー',
            instructions: 'このQRコードを印刷して教室に掲示してください',
            generatedFor: '生成対象',
            generatedAt: '生成日時',
            scanCount: 'スキャン回数',
            lastScanned: '最終スキャン',
            active: '有効',
            inactive: '無効',
            regenerate: '再生成',
            deactivate: '無効化',
            activate: '有効化',
            deleteQR: 'QRコードを削除',
            confirmDelete: 'このQRコードを削除してもよろしいですか？',
            generateSuccess: 'QRコードが正常に生成されました！',
            generateError: 'QRコードの生成に失敗しました'
        },
        
        // レポート
        reports: {
            title: 'レポートと分析',
            generate: 'レポート生成',
            reportType: 'レポートタイプ',
            dateRange: '期間',
            startDate: '開始日',
            endDate: '終了日',
            classroom: '教室',
            allClassrooms: '全ての教室',
            student: '生徒',
            allStudents: '全ての生徒',
            status: 'ステータス',
            allStatuses: '全てのステータス',
            generateReport: 'レポート生成',
            exportCSV: 'CSVエクスポート',
            exportPDF: 'PDFエクスポート',
            exportExcel: 'Excelエクスポート',
            reportTypes: {
                daily: '日次レポート',
                weekly: '週次レポート',
                monthly: '月次レポート',
                custom: 'カスタムレポート',
                classroom: '教室レポート',
                student: '生徒レポート',
                performance: 'パフォーマンスレポート'
            },
            summary: '概要',
            totalRecords: '総記録数',
            approvalRate: '承認率',
            averageScore: '平均スコア',
            bestPerforming: '優秀',
            needsImprovement: '改善が必要',
            noData: '選択した条件のデータがありません',
            generatingReport: 'レポート生成中...',
            reportGenerated: 'レポートが正常に生成されました！'
        },
        
        // 提出物詳細
        submission: {
            title: '提出物詳細',
            status: 'ステータス',
            submissionInfo: '提出情報',
            classroom: '教室',
            student: '生徒',
            submittedAt: '提出日時',
            reviewedAt: '審査日時',
            reviewedBy: '審査者',
            score: 'スコア',
            checklist: '清掃チェックリスト',
            photos: '証拠写真',
            notes: '追加メモ',
            feedback: '教師のフィードバック',
            noFeedback: 'まだフィードバックがありません',
            noNotes: '追加メモはありません',
            downloadPhotos: '全ての写真をダウンロード',
            viewPhoto: '写真を表示',
            backToList: 'リストに戻る'
        },
        
        // 設定
        settings: {
            title: '設定',
            general: '一般設定',
            language: '言語',
            theme: 'テーマ',
            light: 'ライト',
            dark: 'ダーク',
            notifications: '通知',
            emailNotifications: 'メール通知',
            pushNotifications: 'プッシュ通知',
            account: 'アカウント設定',
            changePassword: 'パスワード変更',
            currentPassword: '現在のパスワード',
            newPassword: '新しいパスワード',
            confirmPassword: 'パスワード確認',
            updatePassword: 'パスワード更新',
            profile: 'プロフィール情報',
            name: '名前',
            email: 'メール',
            phone: '電話番号',
            updateProfile: 'プロフィール更新',
            saveChanges: '変更を保存',
            settingsSaved: '設定が正常に保存されました！'
        },
        
        // メッセージ
        messages: {
            success: '操作が正常に完了しました！',
            error: 'エラーが発生しました。もう一度お試しください。',
            saveSuccess: '変更が正常に保存されました！',
            deleteSuccess: '正常に削除されました！',
            updateSuccess: '正常に更新されました！',
            uploadSuccess: 'アップロードが完了しました！',
            noData: '利用可能なデータがありません',
            noResults: '結果が見つかりませんでした',
            loading: '読み込み中、お待ちください...',
            processing: '処理中...',
            confirmAction: '続行してもよろしいですか？',
            unsavedChanges: '保存されていない変更があります。本当に離れますか？',
            sessionExpired: 'セッションの有効期限が切れました。再度ログインしてください。',
            networkError: 'ネットワークエラー。接続を確認してください。',
            permissionDenied: '権限がありません。',
            invalidInput: '無効な入力です。確認して再試行してください。'
        },
        
        // 日付と時刻
        date: {
            today: '今日',
            yesterday: '昨日',
            tomorrow: '明日',
            thisWeek: '今週',
            lastWeek: '先週',
            thisMonth: '今月',
            lastMonth: '先月',
            custom: 'カスタム',
            days: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
            daysShort: ['日', '月', '火', '水', '木', '金', '土'],
            months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        
        // ステータス
        status: {
            pending: '審査待ち',
            approved: '承認済み',
            rejected: '改善が必要',
            active: '有効',
            inactive: '無効',
            completed: '完了',
            inProgress: '進行中'
        }
    }
};

// Language Management System
class LanguageManager {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || this.detectBrowserLanguage();
        this.listeners = [];
    }
    
    // Detect browser language
    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        return browserLang.startsWith('ja') ? 'ja' : 'en';
    }
    
    // Get stored language from localStorage
    getStoredLanguage() {
        return localStorage.getItem('smartclean_language');
    }
    
    // Set and store language
    setLanguage(lang) {
        if (lang !== 'en' && lang !== 'ja') {
            console.error('Invalid language. Supported: en, ja');
            return;
        }
        this.currentLanguage = lang;
        localStorage.setItem('smartclean_language', lang);
        document.documentElement.lang = lang;
        this.notifyListeners();
    }
    
    // Get current language
    getLanguage() {
        return this.currentLanguage;
    }
    
    // Get translation
    t(key) {
        const keys = key.split('.');
        let value = translations[this.currentLanguage];
        
        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key; // Return key if translation not found
            }
        }
        
        return value || key;
    }
    
    // Add listener for language changes
    addListener(callback) {
        this.listeners.push(callback);
    }
    
    // Notify all listeners
    notifyListeners() {
        this.listeners.forEach(callback => callback(this.currentLanguage));
    }
    
    // Format date according to language
    formatDate(date, format = 'full') {
        const d = new Date(date);
        const lang = this.currentLanguage;
        
        if (lang === 'ja') {
            const year = d.getFullYear();
            const month = d.getMonth() + 1;
            const day = d.getDate();
            const hours = d.getHours().toString().padStart(2, '0');
            const minutes = d.getMinutes().toString().padStart(2, '0');
            
            if (format === 'full') {
                return `${year}年${month}月${day}日 ${hours}:${minutes}`;
            } else if (format === 'date') {
                return `${year}年${month}月${day}日`;
            } else if (format === 'time') {
                return `${hours}:${minutes}`;
            }
        } else {
            if (format === 'full') {
                return d.toLocaleString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
            } else if (format === 'date') {
                return d.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                });
            } else if (format === 'time') {
                return d.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
            }
        }
        
        return d.toString();
    }
}

// Global instance
const langManager = new LanguageManager();

// Helper function for easy access
function t(key) {
    return langManager.t(key);
}

// Update all translatable elements
function updatePageTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key);
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (element.placeholder !== undefined) {
                element.placeholder = translation;
            }
        } else {
            element.textContent = translation;
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });
    
    // Update values
    document.querySelectorAll('[data-i18n-value]').forEach(element => {
        const key = element.getAttribute('data-i18n-value');
        element.value = t(key);
    });
    
    // Update titles
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        element.title = t(key);
    });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set language attribute
    document.documentElement.lang = langManager.getLanguage();
    
    // Update all translations
    updatePageTranslations();
    
    // Listen for language changes
    langManager.addListener(() => {
        updatePageTranslations();
    });
});
