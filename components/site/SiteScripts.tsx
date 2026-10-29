'use client';

import { useEffect } from 'react';
import { initAppDemo } from '@/lib/site/appDemo';

export function SiteScripts() {
  useEffect(() => {
    initAppDemo();
  }, []);
  return null;
}
