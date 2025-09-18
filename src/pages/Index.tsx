import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import UserRoles from "@/components/UserRoles";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <UserRoles />
        <Testimonials />
        <Pricing />
        <About />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
