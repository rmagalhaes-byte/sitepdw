import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all() as Array<{ name: string }>;
    const data: Record<string, any> = {};
    
    for (const table of tables) {
      data[table.name] = db.prepare(`SELECT * FROM ${table.name}`).all();
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export const dynamic = 'force-dynamic';
