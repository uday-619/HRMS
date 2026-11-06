import { NextResponse } from 'next/server';
import { readDB, verifyPassword, logAction } from '@/utils/db';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const db = readDB();

    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      logAction("N/A", "Guest", "Admin Login Failed", `Failed admin login attempt for non-existent email: ${email}`);
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (user.role !== 'Super Admin' && user.role !== 'HR') {
      logAction(user.employeeId, user.name, "Admin Login Blocked", `Non-admin user tried to log in via admin route: ${email}`);
      return NextResponse.json({ error: 'Employees must log in through the Employee Portal' }, { status: 403 });
    }

    const isMatch = verifyPassword(password, user.passwordHash, user.salt);
    if (!isMatch) {
      logAction(user.employeeId, user.name, "Admin Login Failed", `Incorrect password for admin: ${email}`);
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    logAction(user.employeeId, user.name, "Admin Login Success", `Admin logged in successfully: ${email}`);
    
    const { passwordHash, salt, ...safeUser } = user;
    return NextResponse.json({ user: safeUser });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
