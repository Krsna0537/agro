import { Tractor, Stethoscope, GraduationCap, Building, FlaskConical } from "lucide-react";
import UserRoleCard from "./UserRoleCard";

const UserRoles = () => {
  const roles = [
    {
      title: "Farmer",
      description: "Farm owners and operators managing pig and poultry operations",
      icon: Tractor,
      color: "primary" as const,
      features: [
        "Personalized risk assessment tools",
        "Interactive training modules and certifications", 
        "Compliance checklist and record keeping",
        "Real-time alerts and outbreak notifications",
        "Farm performance analytics and benchmarking"
      ]
    },
    {
      title: "Veterinarian", 
      description: "Animal health professionals providing farm consultation and monitoring",
      icon: Stethoscope,
      color: "accent" as const,
      features: [
        "Farm visit logs and health monitoring tools",
        "Disease reporting and outbreak management",
        "Client farm dashboard and analytics",
        "Professional development resources",
        "Regulatory compliance assistance"
      ]
    },
    {
      title: "Extension Worker",
      description: "Agricultural extension officers supporting farmer education and outreach",
      icon: GraduationCap, 
      color: "success" as const,
      features: [
        "Training content management and delivery",
        "Field audit tools and checklists",
        "Farmer engagement tracking", 
        "Regional compliance reporting",
        "Best practice resource library"
      ]
    },
    {
      title: "Regulator",
      description: "Government officials and administrators overseeing livestock biosecurity",
      icon: Building,
      color: "info" as const,
      features: [
        "Regional outbreak monitoring and heatmaps",
        "Compliance analytics and reporting dashboards",
        "Policy implementation tracking",
        "Multi-farm surveillance and alerts",
        "Evidence-based decision support tools"
      ]
    },
    {
      title: "Researcher",
      description: "Academic researchers and NGOs studying livestock biosecurity and policy",
      icon: FlaskConical,
      color: "accent" as const,
      features: [
        "Aggregated anonymized data access",
        "Research collaboration tools",
        "Data visualization and analysis",
        "Publication and study support",
        "Policy advocacy resources"
      ]
    }
  ];

  return (
    <section id="roles" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Built for Every Stakeholder
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our platform serves the entire livestock biosecurity ecosystem with specialized 
            tools and dashboards tailored for each user role and responsibility.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <UserRoleCard
              key={index}
              title={role.title}
              description={role.description}
              features={role.features}
              icon={role.icon}
              color={role.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserRoles;