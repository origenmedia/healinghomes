// A quiet margin note in the architect's hand.
// Desktop: floats in the outer margin beside the reading column.
// Mobile: inset aside within the column with a left rule.
export function Marginalia({ children }: { children: React.ReactNode }) {
  return (
    <aside
      className={[
        // Mobile: inset aside
        'my-8 ml-4 pl-4 border-l border-border',
        'font-serif italic text-[0.8125rem] leading-relaxed text-text-secondary',
        // Desktop: pull into the outer margin
        'lg:absolute lg:left-[calc(100%+2rem)] lg:top-0 lg:ml-0 lg:my-0',
        'lg:w-48 lg:text-[0.75rem]',
      ].join(' ')}
    >
      {children}
    </aside>
  );
}
