import { useState, useEffect } from 'react';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

let _cache: Record<string, unknown> | null = null;
let _promise: Promise<Record<string, unknown>> | null = null;

function fetchContent(): Promise<Record<string, unknown>> {
  if (_cache) return Promise.resolve(_cache);
  if (!_promise) {
    _promise = fetch(`${BASE}/content.json`)
      .then(r => r.json())
      .then(data => { _cache = data; return data; });
  }
  return _promise;
}

export function useContent() {
  const [content, setContent] = useState<Record<string, unknown> | null>(_cache);
  useEffect(() => {
    if (_cache) return;
    fetchContent().then(setContent);
  }, []);
  return content;
}
