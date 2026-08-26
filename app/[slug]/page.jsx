import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';

export default async function RedirectPage({ params }) {
  const { slug } = params;

  try {
    const { rows } = await sql`SELECT url FROM links WHERE slug = ${slug} LIMIT 1;`;
    if (rows.length > 0) {
      redirect(rows[0].url);
    }
  } catch (e) {
    // база обрабатывает запрос
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif', color: '#fff', background: '#0a0a0a', minHeight: '100vh', padding: '20px' }}>
      <h1>Ссылка не найдена</h1>
      <p style={{ color: '#888' }}>Такой адрес отсутствует в базе данных SYDAR Links.</p>
    </div>
  );
}
