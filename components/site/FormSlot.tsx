'use client';

import { useSyncExternalStore, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

const subscribe = () => () => {};

// Mounts its children into the #form-slot marker inside the page HTML.
export function FormSlot({ children }: { children: ReactNode }) {
  const slot = useSyncExternalStore(
    subscribe,
    () => document.getElementById('form-slot'),
    () => null,
  );
  return slot ? createPortal(children, slot) : null;
}
