import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS links (id SERIAL PRIMARY KEY, slug TEXT UNIQUE, url TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;
    const { rows } = await sql`SELECT * FROM links ORDER BY id DESC;`;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { url, slug } = await request.json();
    const finalSlug = slug || Math.random().toString(36).substring(2, 8);
    
    await sql`CREATE TABLE IF NOT EXISTS links (id SERIAL PRIMARY KEY, slug TEXT UNIQUE, url TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;
    await sql`INSERT INTO links (slug, url) VALUES (${finalSlug}, ${url}) ON CONFLICT (slug) DO UPDATE SET url = ${url};`;
    
    return NextResponse.json({ success: true, slug: finalSlug });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
