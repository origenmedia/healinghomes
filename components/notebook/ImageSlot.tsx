type Kind = 'ai' | 'real' | 'none';
type Aspect = 'wide' | 'tall' | 'square' | 'panorama';

const aspectMap: Record<Aspect, string> = {
  wide: 'aspect-[16/9]',
  tall: 'aspect-[3/4]',
  square: 'aspect-square',
  panorama: 'aspect-[21/9]',
};

const kindLabel: Record<Kind, string> = {
  ai: 'AI image',
  real: 'Real photo',
  none: 'Image',
};

// A labelled placeholder for an image the founder supplies or generates later.
// Pass `fill` to make it cover a positioned parent (used for the hero).
export function ImageSlot({
  label,
  kind = 'real',
  aspect = 'wide',
  fill = false,
}: {
  label: string;
  kind?: Kind;
  aspect?: Aspect;
  fill?: boolean;
}) {
  const base =
    'bg-surface-inset border border-border flex items-center justify-center';
  const shape = fill
    ? 'absolute inset-0 w-full h-full'
    : `w-full ${aspectMap[aspect]}`;

  return (
    <div className={`${base} ${shape}`}>
      <div className="text-center px-6 max-w-sm">
        <p className="font-sans text-[0.625rem] font-medium tracking-[0.3em] uppercase text-text-muted">
          {kindLabel[kind]}
        </p>
        <p className="font-sans text-sm text-text-dim mt-2 leading-relaxed">
          {label}
        </p>
      </div>
    </div>
  );
}
