import { NextResponse } from 'next/server';
import { readDB } from '@/utils/db';

export async function GET() {
  try {
    const db = readDB();
    return NextResponse.json(db.audit_logs || []);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
