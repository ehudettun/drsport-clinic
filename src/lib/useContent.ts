"use client";

import { useState, useEffect } from 'react';
import defaultContent from '../../public/content.json';

export type ContentData = typeof defaultContent;

let _cache: ContentData = defaultContent;

export function useContent(): ContentData {
  const [content, setContent] = useState<ContentData>(_cache);

  useEffect(() => {
    const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
    fetch(`${BASE}/content.json`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data && typeof data === 'object') {
          _cache = data as ContentData;
          setContent(_cache);
        }
      })
      .catch(() => { /* keep defaults */ });
  }, []);

  return content;
}
