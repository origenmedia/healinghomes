// A single section of a letter-style page: generous vertical rhythm,
// a comfortable reading column, whitespace separation.
export function Beat({
  children,
  divider = false,
  wide = false,
  className = '',
}: {
  children: React.ReactNode;
  divider?: boolean;
  wide?: boolean;
  className?: string;
}) {
  return (
    <section
      className={`px-6 md:px-12 lg:px-20 py-20 md:py-32 ${
        divider ? 'border-t border-border' : ''
      } ${className}`}
    >
      <div className={wide ? 'max-w-4xl' : 'max-w-2xl'}>{children}</div>
    </section>
  );
}
