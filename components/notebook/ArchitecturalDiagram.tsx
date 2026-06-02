// An ink line drawing rendered as inline SVG.
// Inherits the primary text color via stroke="currentColor".
// On mobile: centered inset at modest size. On desktop: same or slightly toward the margin.
export function ArchitecturalDiagram({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <figure
      role="img"
      aria-label={label}
      className="my-10 flex justify-center lg:justify-start text-text-primary"
    >
      <div className="w-full max-w-[240px]">{children}</div>
    </figure>
  );
}
