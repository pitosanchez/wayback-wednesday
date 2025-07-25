import React from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  format?: "number" | "currency" | "percentage";
  size?: "sm" | "md" | "lg";
  color?: "blue" | "green" | "red" | "yellow" | "gray";
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  format = "number",
  size = "md",
  color = "blue",
}) => {
  const formatValue = (val: string | number): string => {
    if (typeof val === "string") return val;

    switch (format) {
      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(val);
      case "percentage":
        return `${val.toFixed(1)}%`;
      case "number":
      default:
        return new Intl.NumberFormat("en-US").format(val);
    }
  };

  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const colorClasses = {
    blue: "border-denim-blue bg-blue-50",
    green: "border-green-500 bg-green-50",
    red: "border-fire-red bg-red-50",
    yellow: "border-sunshine-yellow bg-yellow-50",
    gray: "border-gray-300 bg-gray-50",
  };

  const iconColorClasses = {
    blue: "text-denim-blue",
    green: "text-green-500",
    red: "text-fire-red",
    yellow: "text-sunshine-yellow",
    gray: "text-gray-500",
  };

  const getChangeColor = (changeValue?: number): string => {
    if (changeValue === undefined) return "text-gray-500";
    return changeValue >= 0 ? "text-green-600" : "text-red-600";
  };

  const getChangeIcon = (changeValue?: number): React.ReactNode => {
    if (changeValue === undefined) return null;

    return changeValue >= 0 ? (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  return (
    <div
      className={`bg-white rounded-lg border-2 ${colorClasses[color]} ${sizeClasses[size]} shadow-sm hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-2">
            {formatValue(value)}
          </p>

          {change !== undefined && (
            <div
              className={`flex items-center text-sm ${getChangeColor(change)}`}
            >
              {getChangeIcon(change)}
              <span className="ml-1">
                {Math.abs(change).toFixed(1)}% {changeLabel || "vs last period"}
              </span>
            </div>
          )}
        </div>

        {icon && (
          <div className={`ml-4 ${iconColorClasses[color]}`}>{icon}</div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
