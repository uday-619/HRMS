const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_FILE = path.join(process.cwd(), 'database.json');

// Helper to hash passwords using pbkdf2Sync
function hashPassword(password, salt = null) {
  const finalSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, finalSalt, 1000, 64, 'sha512').toString('hex');
  return { hash, salt: finalSalt };
}

// Check if password matches hash
function verifyPassword(password, hash, salt) {
  const calculatedHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return calculatedHash === hash;
}

// Initial seed data
const INITIAL_DB = {
  users: [],
  employees: [
    { id: "STF-0001", name: "Staff Member", email: "staff@example.com", phone: "+1234567892", designation: "N/A", role: "Staff", department: "Admin", status: "Permanent", joiningDate: "2020-01-01", shift: "Morning Shift (10:00 AM - 06:00 PM)", payslipType: "Monthly", jobType: "Full Time", reportingManager: "N/A", profileComplete: 61, isAbsent: true, dob: "1972-10-19", maritalStatus: "Divorced", address: "6472 Labadie Port South Coleman", salary: "50000", trashed: false },
    { id: "ADM-0001", name: "Super Admin", email: "admin@example.com", phone: "+1234567890", designation: "CEO", role: "Super Admin", department: "Admin", status: "Permanent", joiningDate: "2020-01-01", shift: "Morning Shift (10:00 AM - 06:00 PM)", payslipType: "Monthly", jobType: "Full Time", reportingManager: "N/A", profileComplete: 61, isAbsent: false, dob: "1984-04-15", maritalStatus: "Single", address: "90961 Adrienne Knoll Apt. 843 Wi", salary: "120000", trashed: false },
    { id: "HR-0001", name: "HR Manager", email: "hr@example.com", phone: "+1234567891", designation: "Operations Manager", role: "HR", department: "Admin", status: "Permanent", joiningDate: "2020-01-01", shift: "Morning Shift (10:00 AM - 06:00 PM)", payslipType: "Monthly", jobType: "Full Time", reportingManager: "N/A", profileComplete: 61, isAbsent: false, dob: "1991-10-29", maritalStatus: "Married", address: "789 Littel Ferry Zacheryborough", salary: "75000", trashed: false }
  ],
  attendance: [
    {
      id: "PCH001",
      employeeId: "ADM-0001",
      date: "2024-01-28",
      punchIn: "09:00:00",
      punchOut: "18:00:00",
      totalHours: "9h 0m",
      status: "Present",
      locationIn: "Office, Mumbai, Maharashtra",
      locationOut: "Office, Mumbai, Maharashtra",
      coordsIn: { latitude: 19.0760, longitude: 72.8777 },
      coordsOut: { latitude: 19.0760, longitude: 72.8777 },
      isPremisesIn: true,
      isPremisesOut: true
    },
    {
      id: "PCH002",
      employeeId: "ADM-0001",
      date: "2024-01-27",
      punchIn: "09:15:00",
      punchOut: "17:45:00",
      totalHours: "8h 30m",
      status: "Present",
      locationIn: "Office, Mumbai, Maharashtra",
      locationOut: "Office, Mumbai, Maharashtra",
      coordsIn: { latitude: 19.0760, longitude: 72.8777 },
      coordsOut: { latitude: 19.0760, longitude: 72.8777 },
      isPremisesIn: true,
      isPremisesOut: true
    }
  ],
  reports_employee: [
    { id: "EMP001", name: "Priya Sharma", department: "Human Resources", position: "HR Manager", branch: "Head Office", attendance: "95%", salary: "₹45,000", joinDate: "2023-01-15", email: "priya@company.com", phone: "+91-9876543210", experience: "5", performance: "Excellent", lastPromotion: "2023-06-15", skills: ["Leadership", "Communication", "Recruitment"], projects: "12", leaveBalance: "15/12/8", employeeStatus: "Confirmed", lastSalaryPaidDate: "2024-01-31", payrollPeriod: "January 2024", clBalance: "15", plBalance: "12", sickBalance: "8", presentDays: "22", absentDays: "1", lwpDays: "0", performanceRating: "4.8", performanceCycle: "Q4 2023" },
    { id: "EMP002", name: "Rajesh Kumar", department: "Finance & Accounting", position: "Senior Accountant", branch: "Delhi Branch", attendance: "92%", salary: "₹42,000", joinDate: "2022-03-20", email: "rajesh@company.com", phone: "+91-9876543211", experience: "4", performance: "Good", lastPromotion: "2023-09-20", skills: ["Accounting", "Taxation", "Auditing"], projects: "8", leaveBalance: "12/10/6", employeeStatus: "Confirmed", lastSalaryPaidDate: "2024-01-31", payrollPeriod: "January 2024", clBalance: "12", plBalance: "10", sickBalance: "6", presentDays: "21", absentDays: "2", lwpDays: "0", performanceRating: "4.2", performanceCycle: "Q4 2023" },
    { id: "EMP003", name: "Amit Singh", department: "Information Technology", position: "Software Developer", branch: "Head Office", attendance: "88%", salary: "₹38,000", joinDate: "2023-07-10", email: "amit@company.com", phone: "+91-9876543212", experience: "2", performance: "Good", lastPromotion: "2023-12-10", skills: ["React", "Node.js", "JavaScript"], projects: "6", leaveBalance: "18/15/10", employeeStatus: "Probation", lastSalaryPaidDate: "2024-01-31", payrollPeriod: "January 2024", clBalance: "18", plBalance: "15", sickBalance: "10", presentDays: "20", absentDays: "3", lwpDays: "0", performanceRating: "3.8", performanceCycle: "Q4 2023" },
    { id: "EMP004", name: "Sunita Patel", department: "Marketing", position: "Marketing Manager", branch: "Bangalore Branch", attendance: "90%", salary: "₹40,000", joinDate: "2022-11-05", email: "sunita@company.com", phone: "+91-9876543213", experience: "3", performance: "Excellent", lastPromotion: "2023-11-05", skills: ["Digital Marketing", "Brand Management", "Analytics"], projects: "10", leaveBalance: "16/12/8", employeeStatus: "Confirmed", lastSalaryPaidDate: "2024-01-31", payrollPeriod: "January 2024", clBalance: "16", plBalance: "12", sickBalance: "8", presentDays: "19", absentDays: "2", lwpDays: "1", performanceRating: "4.5", performanceCycle: "Q4 2023" },
    { id: "EMP005", name: "Vikram Yadav", department: "Operations", position: "Operations Manager", branch: "Chennai Branch", attendance: "85%", salary: "₹35,000", joinDate: "2023-02-28", email: "vikram@company.com", phone: "+91-9876543214", experience: "1", performance: "Average", lastPromotion: "2023-08-28", skills: ["Process Management", "Team Leadership"], projects: "4", leaveBalance: "20/18/12", employeeStatus: "Probation", lastSalaryPaidDate: "2024-01-31", payrollPeriod: "January 2024", clBalance: "20", plBalance: "18", sickBalance: "12", presentDays: "18", absentDays: "4", lwpDays: "1", performanceRating: "3.5", performanceCycle: "Q4 2023" }
  ],
  reports_expense: [
    { id: "EXP001", name: "Office Rent", type: "Recurring", amount: 50000, category: "Rent", branch: "Head Office", date: "2024-01-01", vendor: "Property Management", description: "Monthly Office Rent", paymentMethod: "Bank Transfer", dueDate: "2024-01-05", paidDate: "2024-01-03", status: "Paid" },
    { id: "EXP002", name: "Employee Salaries", type: "Recurring", amount: 250000, category: "Payroll", branch: "All Branches", date: "2024-01-31", vendor: "Payroll Department", description: "Monthly Employee Salaries", paymentMethod: "Bank Transfer", dueDate: "2024-02-01", paidDate: "2024-01-31", status: "Paid" },
    { id: "EXP003", name: "Electricity Bill", type: "Recurring", amount: 15000, category: "Utilities", branch: "Head Office", date: "2024-01-15", vendor: "Power Company", description: "Monthly Electricity", paymentMethod: "Bank Transfer", dueDate: "2024-01-20", paidDate: "2024-01-18", status: "Paid" }
  ],
  reports_income: [
    { id: "INC001", name: "HRMS Software License", type: "Recurring", amount: 150000, category: "Software", branch: "Head Office", date: "2024-01-15", vendor: "TechCorp Solutions", description: "HRMS Implementation", paymentMethod: "Bank Transfer", dueDate: "2024-01-30", paidDate: "2024-01-28", status: "Paid" },
    { id: "INC002", name: "Employee Training Program", type: "One-time", amount: 75000, category: "Education", branch: "Delhi Branch", date: "2024-01-20", vendor: "Global Training Inc", description: "Leadership Development", paymentMethod: "Cheque", dueDate: "2024-02-15", paidDate: "2024-02-10", status: "Paid" }
  ],
  reports_staff: [
    { id: "STF001", staffName: "Priya Sharma", branch: "Head Office", department: "Human Resources", position: "HR Manager", salary: "₹45,000", performance: "Excellent" },
    { id: "STF002", staffName: "Rajesh Kumar", branch: "Delhi Branch", department: "Finance & Accounting", position: "Accountant", salary: "₹35,000", performance: "Good" }
  ],
  audit_logs: [],
  settings: {
    // Default office coordinates set at Mumbai
    latitude: 19.0760,
    longitude: 72.8777,
    radius: 150 // in meters
  }
};

// Seed passwords for initial users
const staffCreds = hashPassword('staff123');
const adminCreds = hashPassword('admin123');
const hrCreds = hashPassword('hr123');

INITIAL_DB.users.push(
  { id: "usr_1", employeeId: "STF-0001", name: "Staff Member", email: "staff@example.com", passwordHash: staffCreds.hash, salt: staffCreds.salt, role: "Staff", createdAt: new Date().toISOString() },
  { id: "usr_2", employeeId: "ADM-0001", name: "Super Admin", email: "admin@example.com", passwordHash: adminCreds.hash, salt: adminCreds.salt, role: "Super Admin", createdAt: new Date().toISOString() },
  { id: "usr_3", employeeId: "HR-0001", name: "HR Manager", email: "hr@example.com", passwordHash: hrCreds.hash, salt: hrCreds.salt, role: "HR", createdAt: new Date().toISOString() }
);

// Initialize DB if it doesn't exist
function initDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DB, null, 2), 'utf8');
  }
}

// Read database
function readDB() {
  initDB();
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    const db = JSON.parse(data);
    let migrated = false;
    if (!db.reports_employee) { db.reports_employee = INITIAL_DB.reports_employee; migrated = true; }
    if (!db.reports_expense) { db.reports_expense = INITIAL_DB.reports_expense; migrated = true; }
    if (!db.reports_income) { db.reports_income = INITIAL_DB.reports_income; migrated = true; }
    if (!db.reports_staff) { db.reports_staff = INITIAL_DB.reports_staff; migrated = true; }
    if (migrated) {
      writeDB(db);
    }
    return db;
  } catch (err) {
    console.error("Error reading db.json, returning initial db", err);
    return INITIAL_DB;
  }
}

// Write database
function writeDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error("Error writing to db.json", err);
    return false;
  }
}

// Audit log helper
function logAction(employeeId, employeeName, action, details) {
  const db = readDB();
  const logEntry = {
    id: `LOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    employeeId: employeeId || "N/A",
    employeeName: employeeName || "System / Guest",
    action,
    details
  };
  db.audit_logs.unshift(logEntry);
  writeDB(db);
  return logEntry;
}

module.exports = {
  readDB,
  writeDB,
  hashPassword,
  verifyPassword,
  logAction
};
