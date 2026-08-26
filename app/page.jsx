'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLinks = async () => {
    try {
      const res = await fetch('/api/links');
      const data = await res.json();
      if (Array.isArray(data)) setLinks(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { fetchLinks(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, slug }),
    });
    if (res.ok) {
      setUrl('');
      setSlug('');
      fetchLinks();
    } else {
      alert('Ошибка при создании ссылки');
    }
    setLoading(false);
  };

  return (
    <main style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 20px', background: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>
      <h1>SYDAR Links Manager</h1>
      <p style={{ color: '#888' }}>Полноценный менеджер ссылок с базой данных</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        <input
          type="url"
          placeholder="Целевой URL (https://...)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          style={{ padding: '12px', background: '#1a1a1a', border: '1px solid #333', color: '#fff', borderRadius: '8px' }}
        />
        <input
          type="text"
          placeholder="Кастомный путь или поддомен (необязательно)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          style={{ padding: '12px', background: '#1a1a1a', border: '1px solid #333', color: '#fff', borderRadius: '8px' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '12px', background: '#fff', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          {loading ? 'Создание...' : 'Создать ссылку'}
        </button>
      </form>

      <h2 style={{ marginTop: '40px', fontSize: '20px' }}>Активные ссылки в базе</h2>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '15px' }}>
        {links.map((link) => (
          <li key={link.id} style={{ background: '#121212', border: '1px solid #222', padding: '12px', marginBottom: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span><strong>/{link.slug}</strong> ➔ <a href={link.url} target="_blank" rel="noreferrer" style={{ color: '#4ade80' }}>{link.url}</a></span>
          </li>
        ))}
      </ul>
    </main>
  );
}
