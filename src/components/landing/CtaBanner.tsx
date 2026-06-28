import Link from 'next/link';

export function CtaBanner() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="max-w-container-max mx-auto px-6 sm:px-8 md:px-margin-desktop py-16 md:py-24"
    >
      <div className="bg-primary-container text-on-primary-container rounded-[40px] p-10 sm:p-16 md:p-24 relative overflow-hidden text-center">
        {/* Decorative blobs */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-64 h-64 bg-tertiary-container/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-64 h-64 bg-primary/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"
        />

        <h2
          id="cta-heading"
          className="font-poppins text-display-md mb-6 relative z-10"
        >
          Ready to transform your{' '}
          <br className="hidden sm:block" />
          relationship with money?
        </h2>
        <p className="font-inter text-body-lg mb-10 opacity-90 relative z-10 max-w-xl mx-auto">
          Join thousands of people who've taken control of their financial
          future with FinanceHer.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <Link
            href="/auth"
            className="bg-white text-primary px-10 py-4 rounded-xl font-poppins font-bold shadow-xl hover:scale-105 active:scale-95 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Create Your Account
          </Link>
          <a
            href="mailto:sales@financeher.app"
            className="border-2 border-white/30 text-on-primary-container px-10 py-4 rounded-xl font-poppins font-bold hover:bg-white/10 active:scale-95 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Contact Sales
          </a>
        </div>
      </div>
    </section>
  );
}
