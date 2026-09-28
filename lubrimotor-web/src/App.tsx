import { MotionConfig } from 'motion/react';
import { Cam2Badge } from './components/Cam2Badge.tsx';
import { Faq } from './components/Faq.tsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.tsx';
import { Footer } from './components/Footer.tsx';
import { Gallery } from './components/Gallery.tsx';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { History } from './components/History.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { Location } from './components/Location.tsx';
import { MobileCtaBar } from './components/MobileCtaBar.tsx';
import { MultiBrand } from './components/MultiBrand.tsx';
import { Promos } from './components/Promos.tsx';
import { QuoteSelector } from './components/QuoteSelector.tsx';
import { Services } from './components/Services.tsx';
import { Warranty } from './components/Warranty.tsx';
import { WhyUs } from './components/WhyUs.tsx';

export function App() {
  return (
    // reducedMotion="user": red de seguridad global; además cada preset degrada a solo opacidad.
    <MotionConfig reducedMotion="user">
      <a
        href="#cotizar"
        className="sr-only z-[60] rounded-lg bg-white px-4 py-3 font-semibold text-brand-black focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar al cotizador
      </a>
      <Header />
      <main>
        <Hero />
        <QuoteSelector />
        <MultiBrand />
        <Cam2Badge />
        <Services />
        <HowItWorks />
        <WhyUs />
        <Gallery />
        <History />
        <Warranty />
        <Faq />
        <Promos />
        <Location />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileCtaBar />
    </MotionConfig>
  );
}
