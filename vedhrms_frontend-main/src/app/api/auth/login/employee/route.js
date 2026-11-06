import { NextResponse } from 'next/server';
import { readDB, verifyPassword, logAction } from '@/utils/db';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const db = readDB();

    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      logAction("N/A", "Guest", "Employee Login Failed", `Failed employee login attempt for non-existent email: ${email}`);
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (user.role === 'Super Admin' || user.role === 'HR') {
      logAction(user.employeeId, user.name, "Employee Login Blocked", `Admin user tried to log in via employee route: ${email}`);
      return NextResponse.json({ error: 'Administrators must log in through the Admin Portal' }, { status: 403 });
    }

    const isMatch = verifyPassword(password, user.passwordHash, user.salt);
    if (!isMatch) {
      logAction(user.employeeId, user.name, "Employee Login Failed", `Incorrect password for employee: ${email}`);
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    logAction(user.employeeId, user.name, "Employee Login Success", `Employee logged in successfully: ${email}`);
    
    const { passwordHash, salt, ...safeUser } = user;
    return NextResponse.json({ user: safeUser });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
