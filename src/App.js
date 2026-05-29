import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts';
import { Users, GraduationCap, TrendingUp, Star, Moon, Sun, LogOut, Plus, Search, Edit2, Trash2, Eye, Award, BookOpen, X } from 'lucide-react';
import { initialStudents, globalAchievements } from './data';
import './App.css';

const COLORS = ['#a855f7', '#7c3aed', '#6d28d9', '#ec4899', '#8b5cf6'];

const BrandingPanel = () => (
  <div className="login-left">
    <div className="login-branding">
      <div className="brand-logo">🎓</div>
      <h2>PCCOE Admin Portal</h2>
      <p>Pimpri Chinchwad College of Engineering</p>
      <div className="brand-features">
        <div className="brand-feature">✅ Student Management</div>
        <div className="brand-feature">✅ Attendance Tracking</div>
        <div className="brand-feature">✅ Performance Analytics</div>
        <div className="brand-feature">✅ College Achievements</div>
      </div>
    </div>
  </div>
);

function Login({ onLogin }) {
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleLogin = () => {
    if (creds.email === 'admin@pccoe.edu' && creds.password === 'pccoe123') {
      onLogin();
    } else {
      setError('Invalid email or password!');
    }
  };

  const handleForgot = () => {
    if (forgotEmail.includes('@')) {
      setForgotSent(true);
    } else {
      setError('Please enter a valid email!');
    }
  };

  if (forgotMode) {
    return (
      <div className="login-bg">
        <BrandingPanel />
        <div className="login-right">
          <div className="login-card">
            <div className="login-logo">🔐</div>
            <h1>Forgot Password</h1>
            <p className="login-sub">Enter your email to reset password</p>
            {forgotSent ? (
              <div className="success-box">
                ✅ Reset link sent to <strong>{forgotEmail}</strong>
                <br />Check your inbox!
              </div>
            ) : (
              <>
                <p className="login-label">EMAIL ADDRESS</p>
                <input
                  placeholder="admin@pccoe.edu"
                  value={forgotEmail}
                  onChange={e => { setForgotEmail(e.target.value); setError(''); }}
                />
                {error && <p className="error">{error}</p>}
                <button className="login-btn" onClick={handleForgot}>
                  <span>Send Reset Link →</span>
                </button>
              </>
            )}
            <button className="back-btn" onClick={() => { setForgotMode(false); setForgotSent(false); setError(''); }}>
              ← Back to Login
            </button>
            <p className="login-footer">© 2025 PCCOE — Admin Portal</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-bg">
      <BrandingPanel />
      <div className="login-right">
        <div className="login-card">
          <div className="login-logo">👤</div>
          <h1>Admin Login</h1>
          <p className="login-sub">Sign in to your admin account</p>
          <div className="login-divider"><span>CREDENTIALS</span></div>
          <p className="login-label">EMAIL ADDRESS</p>
          <input
            placeholder="admin@pccoe.edu"
            value={creds.email}
            onChange={e => { setCreds({ ...creds, email: e.target.value }); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
          <p className="login-label">PASSWORD</p>
          <div className="pass-wrapper">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Enter your password"
              value={creds.password}
              onChange={e => { setCreds({ ...creds, password: e.target.value }); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
            <button className="show-pass" onClick={() => setShowPass(!showPass)}>
              {showPass ? '🙈' : '👁️'}
            </button>
          </div>
          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <button className="forgot-btn" onClick={() => setForgotMode(true)}>
              Forgot Password?
            </button>
          </div>
          {error && <p className="error">⚠️ {error}</p>}
          <button className="login-btn" onClick={handleLogin}>
            <span>Sign In →</span>
          </button>
          <div className="login-hint-box">
            <p>🔑 Demo: admin@pccoe.edu / pccoe123</p>
          </div>
          <p className="login-footer">© 2025 PCCOE — Powered by React JS</p>
        </div>
      </div>
    </div>
  );
}

function StudentProfile({ student, onClose }) {
  if (!student) return null;
  const avgMarks = (student.subjects.reduce((s, sub) => s + sub.marks, 0) / student.subjects.length).toFixed(1);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        <div className="profile-header">
          <div className="profile-avatar">{student.name.charAt(0)}</div>
          <div>
            <h2>{student.name}</h2>
            <p>{student.rollNo} • {student.branch} • {student.year}</p>
            <p>{student.email} • {student.phone}</p>
          </div>
        </div>
        <div className="profile-stats">
          <div className="profile-stat purple"><h3>{student.cgpa}</h3><p>CGPA</p></div>
          <div className="profile-stat pink"><h3>{student.attendance}%</h3><p>Attendance</p></div>
          <div className="profile-stat violet"><h3>{avgMarks}</h3><p>Avg Marks</p></div>
        </div>
        <div className="profile-section">
          <h3><BookOpen size={16} /> Subject Marks</h3>
          <div className="subjects-list">
            {student.subjects.map((sub, i) => (
              <div key={i} className="subject-row">
                <span>{sub.name}</span>
                <div className="marks-bar-bg">
                  <div className="marks-bar-fill" style={{ width: `${sub.marks}%` }}></div>
                </div>
                <span className="marks-num">{sub.marks}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="profile-section">
          <h3>📊 Performance Radar</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={student.subjects}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 11 }} />
              <Radar dataKey="marks" stroke="#7c3aed" fill="#a855f7" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="attendance-section">
          <h3>🗓️ Attendance</h3>
          <div className="attendance-bar-bg">
            <div className="attendance-bar-fill" style={{ width: `${student.attendance}%` }}>
              {student.attendance}%
            </div>
          </div>
          <p className={student.attendance >= 75 ? 'att-good' : 'att-bad'}>
            {student.attendance >= 75 ? '✅ Attendance is Good' : '⚠️ Attendance Below 75%!'}
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [students, setStudents] = useState(initialStudents);
  const [form, setForm] = useState({ name: '', rollNo: '', branch: '', cgpa: '', email: '', phone: '', year: '', attendance: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const branchData = ['CS', 'IT', 'AIML', 'ECE', 'MECH'].map(b => ({
    name: b, students: students.filter(s => s.branch === b).length
  })).filter(b => b.students > 0);

  const avgCGPA = students.length
    ? (students.reduce((sum, s) => sum + parseFloat(s.cgpa || 0), 0) / students.length).toFixed(2) : 0;

  const topStudent = students.length
    ? students.reduce((top, s) => parseFloat(s.cgpa) > parseFloat(top.cgpa) ? s : top, students[0]) : null;

  const handleSubmit = () => {
    if (!form.name || !form.rollNo || !form.branch || !form.cgpa) { alert('Please fill required fields!'); return; }
    const newStudent = {
      ...form,
      id: Date.now(),
      attendance: parseInt(form.attendance) || 85,
      subjects: [
        { name: 'React JS', marks: 80 },
        { name: 'ASP.NET', marks: 80 },
        { name: 'DBMS', marks: 80 },
        { name: 'OS', marks: 80 },
        { name: 'CN', marks: 80 },
      ]
    };
    if (editIndex !== null) {
      const updated = [...students];
      updated[editIndex] = { ...students[editIndex], ...form };
      setStudents(updated);
      setEditIndex(null);
    } else {
      setStudents([...students, newStudent]);
    }
    setForm({ name: '', rollNo: '', branch: '', cgpa: '', email: '', phone: '', year: '', attendance: '' });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setForm(students[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    if (window.confirm('Delete this student?')) setStudents(students.filter((_, i) => i !== index));
  };

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`app-wrapper ${darkMode ? 'dark' : ''}`}>
      {selectedStudent && <StudentProfile student={selectedStudent} onClose={() => setSelectedStudent(null)} />}
      <div className="sidebar">
        <div className="sidebar-logo">
          <span>🎓</span>
          <div>
            <p className="logo-title">PCCOE Portal</p>
            <p className="logo-sub">Student Management</p>
          </div>
        </div>
        <nav>
          {[
            { id: 'dashboard', icon: <TrendingUp size={18} />, label: 'Dashboard' },
            { id: 'students', icon: <Users size={18} />, label: 'Students' },
            { id: 'achievements', icon: <Award size={18} />, label: 'Achievements' },
          ].map(tab => (
            <button key={tab.id} className={activeTab === tab.id ? 'nav-btn active' : 'nav-btn'} onClick={() => setActiveTab(tab.id)}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="nav-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button className="nav-btn logout" onClick={() => setLoggedIn(false)}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <div>
            <h1>Welcome, Krushika 👋</h1>
            <p>PCCOE — Student Management Portal</p>
          </div>
          <div className="header-badge"><GraduationCap size={20} /> Admin</div>
        </div>

        {activeTab === 'dashboard' && (
          <div className="tab-content">
            <div className="stats-grid">
              <div className="stat-card purple"><Users size={30} /><div><h3>{students.length}</h3><p>Total Students</p></div></div>
              <div className="stat-card pink"><TrendingUp size={30} /><div><h3>{avgCGPA}</h3><p>Average CGPA</p></div></div>
              <div className="stat-card violet"><GraduationCap size={30} /><div><h3>{branchData.length}</h3><p>Branches</p></div></div>
              <div className="stat-card gold"><Star size={30} /><div><h3>{topStudent ? topStudent.cgpa : '-'}</h3><p>Top CGPA</p></div></div>
            </div>
            <div className="charts-grid">
              <div className="chart-card">
                <h3>Students by Branch</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={branchData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" /><YAxis />
                    <Tooltip />
                    <Bar dataKey="students" fill="#a855f7" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-card">
                <h3>Branch Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={branchData} dataKey="students" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                      {branchData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            {topStudent && (
              <div className="top-student-card">
                <Star size={24} color="#f59e0b" />
                <div>
                  <h3>Top Performer — {topStudent.name}</h3>
                  <p>Roll No: {topStudent.rollNo} | Branch: {topStudent.branch} | CGPA: {topStudent.cgpa}</p>
                </div>
                <button className="view-profile-btn" onClick={() => setSelectedStudent(topStudent)}>
                  <Eye size={16} /> View Profile
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'students' && (
          <div className="tab-content">
            <div className="students-header">
              <div className="search-box">
                <Search size={18} />
                <input placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <button className="add-btn" onClick={() => { setShowForm(!showForm); setEditIndex(null); setForm({ name: '', rollNo: '', branch: '', cgpa: '', email: '', phone: '', year: '', attendance: '' }); }}>
                <Plus size={18} /> Add Student
              </button>
            </div>
            {showForm && (
              <div className="form-card">
                <h3>{editIndex !== null ? '✏️ Edit Student' : '➕ New Student'}</h3>
                <div className="form-grid">
                  <input placeholder="Student Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  <input placeholder="Roll Number *" value={form.rollNo} onChange={e => setForm({ ...form, rollNo: e.target.value })} />
                  <input placeholder="Branch (CS/IT/AIML) *" value={form.branch} onChange={e => setForm({ ...form, branch: e.target.value })} />
                  <input placeholder="CGPA *" value={form.cgpa} onChange={e => setForm({ ...form, cgpa: e.target.value })} />
                  <input placeholder="Email" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} />
                  <input placeholder="Phone" value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  <input placeholder="Year (1st/2nd/3rd/4th)" value={form.year || ''} onChange={e => setForm({ ...form, year: e.target.value })} />
                  <input placeholder="Attendance %" value={form.attendance || ''} onChange={e => setForm({ ...form, attendance: e.target.value })} />
                </div>
                <div className="form-actions">
                  <button className="btn-save" onClick={handleSubmit}>{editIndex !== null ? 'Update' : 'Save Student'}</button>
                  <button className="btn-cancel" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </div>
            )}
            <div className="table-card">
              <table>
                <thead>
                  <tr><th>#</th><th>Name</th><th>Roll No</th><th>Branch</th><th>Year</th><th>CGPA</th><th>Attendance</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {filtered.map((s, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td><strong>{s.name}</strong></td>
                      <td>{s.rollNo}</td>
                      <td><span className="branch-tag">{s.branch}</span></td>
                      <td>{s.year || '3rd Year'}</td>
                      <td><span className="cgpa-badge">{s.cgpa}</span></td>
                      <td><span className={parseFloat(s.attendance) >= 75 ? 'att-good-badge' : 'att-bad-badge'}>{s.attendance}%</span></td>
                      <td>
                        <button className="btn-view" onClick={() => setSelectedStudent(s)}><Eye size={14} /></button>
                        <button className="btn-edit" onClick={() => handleEdit(i)}><Edit2 size={14} /></button>
                        <button className="btn-delete" onClick={() => handleDelete(i)}><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && <p className="empty">No students found!</p>}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="tab-content">
            <div className="ach-header">
              <h2>🏆 PCCOE College Achievements</h2>
              <p>Pimpri Chinchwad College of Engineering — Milestones & Recognition</p>
            </div>
            <div className="achievements-grid">
              {globalAchievements.map((a, i) => (
                <div className="achievement-card" key={i}>
                  <div className="ach-icon">{a.icon}</div>
                  <div className="ach-date">{a.date}</div>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                  <span className="ach-tag">{a.tag}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;