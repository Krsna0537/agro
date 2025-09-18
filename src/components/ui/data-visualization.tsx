import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProgressRing } from "./progress-ring";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: ChartData[];
  title?: string;
  className?: string;
}

export const BarChart = ({ data, title, className = "" }: BarChartProps) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className={className}
    >
      {title && (
        <motion.h3 
          className="text-lg font-semibold mb-4"
          variants={fadeInUp}
        >
          {title}
        </motion.h3>
      )}
      <div className="space-y-3">
        {data.map((item, index) => (
          <motion.div
            key={item.label}
            variants={fadeInUp}
            className="space-y-1"
          >
            <div className="flex justify-between text-sm">
              <span>{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full ${item.color || 'bg-primary'}`}
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / maxValue) * 100}%` }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

interface PieChartProps {
  data: ChartData[];
  title?: string;
  className?: string;
}

export const PieChart = ({ data, title, className = "" }: PieChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className={className}
    >
      {title && (
        <motion.h3 
          className="text-lg font-semibold mb-4"
          variants={fadeInUp}
        >
          {title}
        </motion.h3>
      )}
      <div className="space-y-3">
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const startAngle = (cumulativePercentage / 100) * 360;
          cumulativePercentage += percentage;

          return (
            <motion.div
              key={item.label}
              variants={fadeInUp}
              className="flex items-center space-x-3"
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color || '#3b82f6' }}
              />
              <div className="flex-1">
                <div className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
                <Progress 
                  value={percentage} 
                  className="h-2 mt-1"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  progress?: number;
  className?: string;
}

export const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon, 
  progress,
  className = ""
}: MetricCardProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      className={className}
    >
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {icon && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            >
              {icon}
            </motion.div>
          )}
        </CardHeader>
        <CardContent>
          <motion.div 
            className="text-2xl font-bold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {value}
          </motion.div>
          
          {change && (
            <motion.p 
              className={`text-xs mt-1 ${
                change.isPositive ? 'text-green-600' : 'text-red-600'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {change.isPositive ? '+' : ''}{change.value}% from last month
            </motion.p>
          )}
          
          {progress !== undefined && (
            <motion.div
              className="mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Progress value={progress} className="h-2" />
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface TrendChartProps {
  data: { date: string; value: number }[];
  title?: string;
  className?: string;
}

export const TrendChart = ({ data, title, className = "" }: TrendChartProps) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className={className}
    >
      {title && (
        <motion.h3 
          className="text-lg font-semibold mb-4"
          variants={fadeInUp}
        >
          {title}
        </motion.h3>
      )}
      <div className="h-32 flex items-end space-x-1">
        {data.map((item, index) => {
          const height = range > 0 ? ((item.value - minValue) / range) * 100 : 50;
          
          return (
            <motion.div
              key={item.date}
              variants={fadeInUp}
              className="flex-1 bg-primary rounded-t"
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: index * 0.05, duration: 0.6, ease: "easeOut" }}
            />
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-2">
        <span>{data[0]?.date}</span>
        <span>{data[data.length - 1]?.date}</span>
      </div>
    </motion.div>
  );
};
