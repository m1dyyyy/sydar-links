"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [subdomain, setSubdomain] = useState("s1");
  const [shortLink, setShortLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShorten = (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);

    try {
      const id = Math.random().toString(36).substring(2, 8);
      const currentHost = window.location.host;
      const domainParts = currentHost.split(".");
      const baseDomain = domainParts.length > 2 ? domainParts.slice(1).join(".") : currentHost;
      const finalSub = subdomain.trim() || "s1";
      const generatedUrl = `https://${finalSub}.${baseDomain}/${id}`;

      localStorage.setItem(id, url);
      setShortLink(generatedUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h1 style={styles.title}>SYDAR Links</h1>
        <p style={styles.subtitle}>Быстрый сокращатель ссылок с поддержкой поддоменов</p>

        <form onSubmit={handleShorten} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Целевая ссылка</label>
            <input
              type="url"
              placeholder="https://example.com/very-long-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Поддомен</label>
            <input
              type="text"
              placeholder="например: s1, go, click"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Создание..." : "Сократить ссылку"}
          </button>
        </form>

        {shortLink && (
          <div style={styles.resultBox}>
            <span style={styles.resultText}>{shortLink}</span>
            <button onClick={copyToClipboard} style={styles.copyButton}>
              {copied ? "Скопировано!" : "Копировать"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    backgroundColor: "#0a0a0a",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "system-ui, -apple-system, sans-serif",
    padding: "20px",
  },
  container: {
    width: "100%",
    maxWidth: "480px",
    backgroundColor: "#121212",
    border: "1px solid #222",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
  },
  title: {
    fontSize: "32px",
    fontWeight: "800",
    textAlign: "center",
    marginBottom: "8px",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: "14px",
    color: "#888",
    textAlign: "center",
    marginBottom: "32px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#aaa",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
  },
  button: {
    marginTop: "8px",
    width: "100%",
    padding: "14px",
    backgroundColor: "#ffffff",
    color: "#000000",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
  resultBox: {
    marginTop: "24px",
    padding: "12px 16px",
    backgroundColor: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
  },
  resultText: {
    fontSize: "14px",
    color: "#4ade80",
    wordBreak: "break-all",
  },
  copyButton: {
    padding: "6px 12px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
  },
};
