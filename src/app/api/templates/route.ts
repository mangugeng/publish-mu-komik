import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const dir = path.join(process.cwd(), 'public/template');
  let templates = [];
  try {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    templates = files.map(filename => {
      const content = fs.readFileSync(path.join(dir, filename), 'utf-8');
      const data = JSON.parse(content);
      return { ...data, filename };
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: 'Failed to read templates', details: message }, { status: 500 });
  }
  return NextResponse.json(templates);
} 