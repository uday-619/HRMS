import { NextResponse } from 'next/server';
import { readDB, writeDB, hashPassword, logAction } from '@/utils/db';

export async function POST(request) {
  try {
    const { name, email, password, role } = await request.json();
    const db = readDB();

    if (db.users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const { hash, salt } = hashPassword(password);
    const employeeId = role === 'Staff' ? `STF-${String(db.employees.length + 1).padStart(4, '0')}` : `ADM-${String(db.users.length + 1).padStart(4, '0')}`;

    const newUser = {
      id: `usr_${Date.now()}`,
      employeeId,
      name,
      email,
      passwordHash: hash,
      salt,
      role: role || 'Super Admin',
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);

    // Also add to employee details if they are staff
    const newEmp = {
      id: employeeId,
      name,
      email,
      phone: "",
      designation: role === 'Staff' ? 'Developer' : 'CEO',
      role: role || 'Super Admin',
      department: 'Admin',
      status: 'Permanent',
      joiningDate: new Date().toISOString().split('T')[0],
      shift: 'Morning Shift (10:00 AM - 06:00 PM)',
      payslipType: 'Monthly',
      jobType: 'Full Time',
      reportingManager: 'N/A',
      profileComplete: 50,
      isAbsent: false,
      trashed: false
    };
    db.employees.push(newEmp);

    writeDB(db);

    logAction(employeeId, name, "Sign Up Success", `New user registered with role: ${role}`);

    const { passwordHash, salt: _, ...safeUser } = newUser;
    return NextResponse.json({ success: true, user: safeUser });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
