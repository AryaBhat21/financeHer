import Link from 'next/link';

// ─── 404 Not Found Page ───────────────────────────────────
export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-surface-bright dark:bg-dark-surface p-8 text-center">
      <span aria-hidden="true" className="material-symbols-outlined text-7xl text-primary mb-4">
        search_off
      </span>
      <h1 className="font-poppins text-display-md text-on-surface dark:text-dark-on-surface mb-3">
        404 — Page Not Found
      </h1>
      <p className="font-inter text-body-lg text-on-surface-variant dark:text-dark-on-surface-variant mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-primary text-white font-poppins font-semibold text-headline-md py-3 px-8 rounded-xl hover:bg-primary-container transition-all shadow-md"
      >
        <span aria-hidden="true" className="material-symbols-outlined">home</span>
        Back to Home
      </Link>
    </main>
  );
}
