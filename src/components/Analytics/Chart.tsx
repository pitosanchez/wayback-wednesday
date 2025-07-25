import React from "react";

interface ChartProps {
  title: string;
  type: "line" | "bar" | "pie" | "area";
  data: ChartDataPoint[];
  height?: number;
  showLegend?: boolean;
  color?: string;
}

interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

const Chart: React.FC<ChartProps> = ({
  title,
  type,
  data,
  height = 300,
  showLegend = true,
  color = "#3D5AFE",
}) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue;

  const renderLineChart = () => {
    const points = data
      .map((point, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - ((point.value - minValue) / range) * 80 - 10;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <svg width="100%" height={height} className="overflow-visible">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line
            key={y}
            x1="0"
            y1={`${y}%`}
            x2="100%"
            y2={`${y}%`}
            stroke="#f1f5f9"
            strokeWidth="1"
          />
        ))}

        {/* Data line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {data.map((point, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - ((point.value - minValue) / range) * 80 - 10;
          return (
            <circle
              key={index}
              cx={`${x}%`}
              cy={`${y}%`}
              r="4"
              fill={color}
              className="hover:r-6 transition-all duration-200"
            >
              <title>{`${point.label}: ${point.value}`}</title>
            </circle>
          );
        })}
      </svg>
    );
  };

  const renderBarChart = () => {
    const barWidth = 80 / data.length;

    return (
      <svg width="100%" height={height} className="overflow-visible">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line
            key={y}
            x1="0"
            y1={`${y}%`}
            x2="100%"
            y2={`${y}%`}
            stroke="#f1f5f9"
            strokeWidth="1"
          />
        ))}

        {/* Bars */}
        {data.map((point, index) => {
          const x = 10 + index * (80 / data.length);
          const barHeight = ((point.value - minValue) / range) * 80;
          const y = 90 - barHeight;

          return (
            <rect
              key={index}
              x={`${x}%`}
              y={`${y}%`}
              width={`${barWidth * 0.8}%`}
              height={`${barHeight}%`}
              fill={point.color || color}
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <title>{`${point.label}: ${point.value}`}</title>
            </rect>
          );
        })}

        {/* Labels */}
        {data.map((point, index) => {
          const x = 10 + index * (80 / data.length) + barWidth * 0.4;
          return (
            <text
              key={index}
              x={`${x}%`}
              y="95%"
              textAnchor="middle"
              className="text-xs fill-gray-600"
            >
              {point.label}
            </text>
          );
        })}
      </svg>
    );
  };

  const renderPieChart = () => {
    const total = data.reduce((sum, point) => sum + point.value, 0);
    let currentAngle = 0;
    const radius = 45;
    const centerX = 50;
    const centerY = 50;

    return (
      <svg
        width="100%"
        height={height}
        viewBox="0 0 100 100"
        className="overflow-visible"
      >
        {data.map((point, index) => {
          const angle = (point.value / total) * 360;
          const startAngle = currentAngle;
          const endAngle = currentAngle + angle;

          const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
          const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
          const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
          const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

          const largeArcFlag = angle > 180 ? 1 : 0;

          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            "Z",
          ].join(" ");

          currentAngle += angle;

          const colors = [
            "#3D5AFE",
            "#E64027",
            "#FFD292",
            "#10B981",
            "#8B5CF6",
            "#F59E0B",
          ];

          return (
            <path
              key={index}
              d={pathData}
              fill={point.color || colors[index % colors.length]}
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <title>{`${point.label}: ${point.value} (${(
                (point.value / total) *
                100
              ).toFixed(1)}%)`}</title>
            </path>
          );
        })}
      </svg>
    );
  };

  const renderChart = () => {
    switch (type) {
      case "line":
        return renderLineChart();
      case "bar":
        return renderBarChart();
      case "pie":
        return renderPieChart();
      case "area":
        return renderLineChart(); // Simplified area chart
      default:
        return renderLineChart();
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>

      <div className="relative">{renderChart()}</div>

      {showLegend && type === "pie" && (
        <div className="mt-4 flex flex-wrap gap-4">
          {data.map((point, index) => {
            const colors = [
              "#3D5AFE",
              "#E64027",
              "#FFD292",
              "#10B981",
              "#8B5CF6",
              "#F59E0B",
            ];
            return (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{
                    backgroundColor:
                      point.color || colors[index % colors.length],
                  }}
                />
                <span className="text-sm text-gray-600">
                  {point.label}: {point.value}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Chart;
