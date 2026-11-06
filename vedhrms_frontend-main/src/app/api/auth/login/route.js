import { NextResponse } from 'next/server';
import { readDB, verifyPassword, logAction } from '@/utils/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    const db = readDB();

    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      logAction("N/A", "Guest", "Login Failed", `Failed login attempt for non-existent email: ${email}`);
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isMatch = verifyPassword(password, user.passwordHash, user.salt);
    if (!isMatch) {
      logAction(user.employeeId, user.name, "Login Failed", `Incorrect password for user: ${email}`);
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    logAction(user.employeeId, user.name, "Login Success", `User logged in successfully: ${email}`);
    
    const { passwordHash, salt, ...safeUser } = user;
    return NextResponse.json({ user: safeUser });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
