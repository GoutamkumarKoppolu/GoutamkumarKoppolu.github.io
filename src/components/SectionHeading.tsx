export function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="mb-5 border-b border-neutral-200 pb-2 font-mono text-xs font-medium uppercase tracking-widest text-neutral-500 dark:border-neutral-800 dark:text-neutral-500">
      {children}
    </h2>
  );
}
