'use client';

import { useState } from 'react';
import Tesseract from 'tesseract.js';

export default function Home() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleImage(file) {
    setLoading(true);
    const result = await Tesseract.recognize(file, 'ita+eng');
    setText(result.data.text);
    setLoading(false);
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>NutriScan 🍎</h1>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => e.target.files && handleImage(e.target.files[0])}
      />
      {loading && <p>Scansione in corso...</p>}
      {text && (
        <pre style={{ whiteSpace: 'pre-wrap', marginTop: 20 }}>
          {text}
        </pre>
      )}
    </main>
  );
}
