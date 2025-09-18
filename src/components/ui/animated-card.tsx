import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fadeInUp, hoverLift, scaleIn } from "@/lib/animations";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  onClick?: () => void;
}

export const AnimatedCard = ({ 
  children, 
  className = "", 
  delay = 0, 
  hover = true,
  onClick 
}: AnimatedCardProps) => {
  return (
    <motion.div
      initial={fadeInUp.initial}
      animate={fadeInUp.animate}
      exit={fadeInUp.exit}
      transition={{ ...fadeInUp.transition, delay }}
      whileHover={hover ? hoverLift.whileHover : undefined}
      transition={hover ? hoverLift.transition : undefined}
      onClick={onClick}
      className={onClick ? "cursor-pointer" : ""}
    >
      <Card className={`transition-all duration-300 ${className}`}>
        {children}
      </Card>
    </motion.div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  progress?: number;
  delay?: number;
  className?: string;
}

export const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  progress,
  delay = 0,
  className = ""
}: StatCardProps) => {
  return (
    <AnimatedCard delay={delay} className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.2, type: "spring", stiffness: 300 }}
        >
          {icon}
        </motion.div>
      </CardHeader>
      <CardContent>
        <motion.div 
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.3 }}
        >
          {value}
        </motion.div>
        {trend && (
          <motion.p 
            className={`text-xs mt-1 ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.4 }}
          >
            {trend.isPositive ? '+' : ''}{trend.value}% from last month
          </motion.p>
        )}
        
        {progress !== undefined && (
          <motion.div
            className="mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.5 }}
          >
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className="h-2 bg-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ delay: delay + 0.6, duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}
      </CardContent>
    </AnimatedCard>
  );
};
