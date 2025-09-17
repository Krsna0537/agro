import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import UserRoles from "@/components/UserRoles";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <UserRoles />
      </main>
    </div>
  );
};

export default Index;
