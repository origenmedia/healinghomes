import type { ReactNode } from 'react';
import { SiteScripts } from './SiteScripts';
import { FormSlot } from './FormSlot';

// Renders a page body from mock-up set 3. The HTML is our own static copy, so
// it is safe to inject. `children` mounts into the #form-slot marker if present.
export function SitePage({
  html,
  theme,
  children,
}: {
  html: string;
  theme: 'home' | 'refugio' | 'std';
  children?: ReactNode;
}) {
  return (
    <div className={`hh-site hh-${theme}`}>
      <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: html }} />
      {children && <FormSlot>{children}</FormSlot>}
      <SiteScripts />
    </div>
  );
}
