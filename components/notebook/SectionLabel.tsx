export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-xs font-medium tracking-[0.3em] uppercase text-voice mb-8 md:mb-10">
      {children}
    </p>
  );
}
