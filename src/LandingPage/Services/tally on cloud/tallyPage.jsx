import { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from '../../Navbar';
import Footer from '../../Footer';
import Banner from './Banner';
import Feature from './Feature';
import TallyPlans from './TallyPlans';
import TallyFaq from './TallyFaq';
import TallyReview from './TallyReview';

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

function AnimatedSection({ id, children, className = '', delay = 0 }) {
  const sectionRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return undefined;
    }

    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id={id}
      style={{ transitionDelay: prefersReducedMotion ? '0ms' : `${delay}ms` }}
      className={`tally-page-section ${isVisible ? 'tally-page-section-visible' : ''} ${className}`}
    >
      {children}
    </section>
  );
}

export default function TallyPage() {
  const sections = useMemo(
    () => [
      {
        id: 'features',
        component: <Feature />,
        delay: 80,
      },
      {
        id: 'plans',
        component: <TallyPlans />,
        delay: 120,
      },
      {
        id: 'faq',
        component: <TallyFaq />,
        delay: 120,
      },
      {
        id: 'reviews',
        component: <TallyReview />,
        delay: 120,
      },
    ],
    []
  );

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-slate-950 antialiased">
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }

          .tally-page-shell {
            isolation: isolate;
          }

          .tally-page-section {
            position: relative;
            opacity: 0;
            transform: translate3d(0, 34px, 0);
            transition:
              opacity 700ms ease,
              transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
            will-change: opacity, transform;
          }

          .tally-page-section-visible {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }

          .tally-page-section::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
          }

          @media (prefers-reduced-motion: reduce) {
            html {
              scroll-behavior: auto;
            }

            .tally-page-section {
              opacity: 1;
              transform: none;
              transition: none;
              will-change: auto;
            }
          }
        `}
      </style>

      <div className="tally-page-shell min-h-screen w-full max-w-full overflow-x-hidden">
        <Navbar />

        <main className="w-full max-w-full overflow-x-hidden">
          <div id="home">
            <Banner />
          </div>

          {sections.map((section) => (
            <AnimatedSection key={section.id} id={section.id} delay={section.delay}>
              {section.component}
            </AnimatedSection>
          ))}
        </main>

        <Footer />
      </div>
    </div>
  );
}