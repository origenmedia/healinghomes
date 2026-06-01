// A single section of a letter-style page: generous vertical rhythm,
// a comfortable reading column, optional top divider.
export function Beat({
  children,
  divider = true,
  className = '',
}: {
  children: React.ReactNode;
  divider?: boolean;
  className?: string;
}) {
  return (
    <section
      className={`px-6 md:px-12 lg:px-20 py-16 md:py-24 ${
        divider ? 'border-t border-border' : ''
      } ${className}`}
    >
      <div className="max-w-2xl">{children}</div>
    </section>
  );
}
