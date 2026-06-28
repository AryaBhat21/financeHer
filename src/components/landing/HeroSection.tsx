import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// ─── Hero image data ──────────────────────────────────────
// Fix: original used data-alt (custom attribute) instead of real alt text.
interface HeroImage {
  src: string;
  alt: string;
  className: string;
}

const HERO_IMAGES: HeroImage[] = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9m5j1VmSG81mmEVdiCLImKXS9edsk0J39mCntLqPNT17GkJHQ1zWghHJzhO5jhAX9DO7pHGevd_y1zC60H_NaR78u_0GIxUQXTMJGvQumXUe4NNzerp1QzdQhQkze6RHLkIUH8ELj1IQgiXZ6ysBtW8c5F3LMoUrh-7-nEUpivPNZdxrBb-I73P3-h2vxoBUbS4eFCBMAhHWw4CQaaPBvn0H7lyc84eN8EcXEOqrB8pKKgY7fx8q8AAr_K3X8haQa1dvF0cShqIES',
    alt: 'Professional woman reviewing financial charts on a tablet in a modern office',
    className: 'rotate-[-2deg] hover:rotate-0',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv9FagXqpTZIdsKc9PlZIZSjzDzgMgl1RM_z94rwwAY22_OPlILUIW7lZpoSSzPXlmsNFpg_dGr0vhg1_QSjz7vLXhR_9rx8Dfh-hfirCm1L2Z0QxOrBRL_IOdiuyihZeUDP6IFSO0cS9vAAl4Poatqrmi2h4QDxiYX7Gn43NbNu-k7NQFNTmyH07QD9DM-4TMK9MtQDA8C1QjfN71DR8HSxN_SdjIMe3uCTLNF3JLN35Nv-DzWHmJvRbuw-NfEPg6GOP2Yob8dw-I',
    alt: 'Diverse hands collaborating around a financial planner and mobile app',
    className: 'translate-y-8 rotate-[1deg] hover:rotate-0',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACVTOTKyEJUobQW8AEg_TXEtukSc-EOZPPSdHGirwuwrCJpNl_J_m8KDYDudWvh7fkHkXlgsqSBn-uW8S3_RQeJflekL9bnXImYV66Ki6psuEJrlAqNYAPsEGvX8sMf0xmkG5dSM5KxM4a3JDtymIySejR5Lg1qbnGdDJmUugeAuHzoNGuK1aZdKetaSUKet1o2H4uE1580VA9uwEdU_mtzhz3XbLydD4-ULZ4SV2cwrU5xcbMDyc8SfiHng4Ocsmz6sVvA3Nf4oUY',
    alt: 'Diverse group discussing financial goals together in a bright modern café',
    className: 'rotate-[-1deg] hover:rotate-0',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPCc6lugluj1ZgfIok4Ow-kUYgLGpRUO6l680vegy06RA3bogyJGUGtrthrtTghy1Dxnmkfz73HfmTA9Jk_Ls6f4EaneT79RBJkI92UQVMQCCuzWWTbTkOTrsGAHYoP01pNhgkbFEtVmkU361eGufNfAwRyEvZ9W5grZrdlJlg3r0X1kBhNRB0yiPF08a3AlJU7MR6STowS-D2is93uPXqRf0s8RETpUUIMrzWNdv_bx3Gy3hZU7LzHDGfRWn9FF_Uuho_0BIXOah6',
    alt: 'Young entrepreneur gazing confidently toward a bright financial future',
    className: 'translate-y-4 rotate-[3deg] hover:rotate-0',
  },
];

// ─── Component ────────────────────────────────────────────
export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="max-w-container-max mx-auto px-6 sm:px-8 md:px-margin-desktop py-20 md:py-32 flex flex-col items-center text-center"
    >
      {/* Badge */}
      <div
        role="img"
        aria-label="Empowering users worldwide"
        className="inline-flex items-center gap-2 bg-secondary-container/30 px-4 py-1.5 rounded-full mb-8 border border-secondary-container/50"
      >
        <span
          aria-hidden="true"
          className="material-symbols-outlined text-primary text-sm"
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          stars
        </span>
        <span className="font-inter text-label-md text-primary tracking-widest">
          EMPOWERING USERS WORLDWIDE
        </span>
      </div>

      {/* Headline */}
      <h1
        id="hero-heading"
        className="font-poppins text-[42px] sm:text-[56px] md:text-[64px] leading-tight font-semibold text-primary max-w-4xl mb-6"
      >
        Take Control of Your{' '}
        <br className="hidden sm:block" />
        <span className="text-tertiary">Financial Future.</span>
      </h1>

      {/* Subheading */}
      <p className="font-inter text-body-lg text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
        Empowering your journey with personalised financial wellness, smart
        automated insights, and inclusive tools designed for everyone.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 mb-16 sm:mb-20">
        <Link
          href="/auth"
          className={cn(
            'bg-primary text-white px-8 py-4 rounded-xl',
            'font-inter text-body-md font-semibold',
            'hover:bg-primary-container active:scale-95 transition-all duration-150 shadow-md',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
          )}
        >
          Start for Free
        </Link>
        <button
          type="button"
          className={cn(
            'border-2 border-primary/30 text-primary px-8 py-4 rounded-xl',
            'font-inter text-body-md font-semibold',
            'inline-flex items-center justify-center gap-2',
            'hover:bg-primary/5 active:scale-95 transition-all duration-150',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
          )}
          aria-label="Watch how FinanceHer works"
        >
          <span aria-hidden="true" className="material-symbols-outlined">
            play_circle
          </span>
          How it Works
        </button>
      </div>

      {/* Hero image grid */}
      <div
        aria-hidden="true"
        className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
      >
        {HERO_IMAGES.map(({ src, alt, className }) => (
          <div
            key={src}
            className={cn(
              'relative h-52 sm:h-64 rounded-2xl overflow-hidden shadow-xl',
              'transition-transform duration-500',
              className
            )}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
