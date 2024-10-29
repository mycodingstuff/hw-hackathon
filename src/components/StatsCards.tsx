import { FC, ElementType } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  trend: string;
  icon: ElementType;
}

export const StatsCard: FC<StatsCardProps> = ({
  title,
  value,
  trend,
  icon: IconComponent,
}) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white flex flex-col">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold">{title}</h4>
        <IconComponent className="w-6 h-6 text-primary" />
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-sm text-gray-400 mt-1">{trend}</p>
    </div>
  );
};
