import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import FloatingCTA from "@/components/FloatingCTA";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import BeforeAfter from "@/components/BeforeAfter";
import Testimonials from "@/components/Testimonials";
import Technology from "@/components/Technology";
import Location from "@/components/Location";
import Social from "@/components/Social";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import ScrollProgress from "@/components/ScrollProgress";
import Magnetic from "@/components/Magnetic";

export default function Page() {
  return (
    <>
      <Loader />
      <CustomCursor />
      <SmoothScroll />
      <RevealObserver />
      <ScrollProgress />
      <Magnetic />
      <FloatingCTA />
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <About />
        <div className="sep" />
        <Services />
        <BeforeAfter />
        <Testimonials />
        <Technology />
        <Location />
        <Social />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
