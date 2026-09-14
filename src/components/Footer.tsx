export function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-8 dark:border-neutral-800">
      <div className="mx-auto max-w-3xl px-6">
        <p className="font-mono text-xs text-neutral-500 dark:text-neutral-500">
          © {new Date().getFullYear()} Goutam Kumar Koppolu — built with React, Tailwind CSS & Framer Motion, hosted on GitHub Pages.
        </p>
      </div>
    </footer>
  );
}
