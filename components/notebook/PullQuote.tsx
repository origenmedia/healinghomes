export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-primary leading-tight tracking-tight max-w-4xl">
      {children}
    </blockquote>
  );
}
