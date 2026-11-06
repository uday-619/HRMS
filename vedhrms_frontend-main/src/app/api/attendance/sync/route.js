import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/utils/db';

export async function POST(request) {
  try {
    const list = await request.json();
    const db = readDB();

    db.attendance = list;
    writeDB(db);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
