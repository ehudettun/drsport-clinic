import { useState, useEffect } from 'react';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

let _cache: Record<string, unknown> | null = null;
let _promise: Promise<Record<string, unknown>> | null = null;

function fetchContent(): Promise<Record<string, unknown>> {
  if (_cache) return Promise.resolve(_cache);
  if (!_promise) {
    _promise = fetch(`${BASE}/content.json`)
      .then(r => {
        if (!r.ok) throw new Error(`content.json: ${r.status}`);
        return r.json();
      })
      .then(data => { _cache = data; return data; })
      .catch(err => {
        console.error('useContent: failed to load content.json', err);
        _promise = null; // allow retry
        return {} as Record<string, unknown>;
      });
  }
  return _promise;
}

export function useContent() {
  const [content, setContent] = useState<Record<string, unknown> | null>(_cache);
  useEffect(() => {
    if (_cache) { setContent(_cache); return; }
    fetchContent().then(data => {
      if (Object.keys(data).length > 0) setContent(data);
    });
  }, []);
  return content;
}
