import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { CategoryReport } from '../../types/report';
import { formatCurrency } from '../../utils/formatCurrency';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryChartProps {
  data: CategoryReport[];
  title: string;
}

const COLORS = [
  '#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6',
  '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#6366f1',
];

export const CategoryChart: React.FC<CategoryChartProps> = ({ data, title }) => {
  if (data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-muted-foreground">
        Немає даних для відображення
      </div>
    );
  }

  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        data: data.map((d) => d.total),
        backgroundColor: COLORS.slice(0, data.length),
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  return (
    <div>
      <div className="mx-auto max-w-xs">
        <Doughnut data={chartData} options={{ plugins: { legend: { display: false } } }} />
      </div>
      <div className="mt-4 space-y-2">
        {data.map((d, i) => (
          <div key={d.categoryId} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span>{d.name}</span>
            </div>
            <span className="font-medium">{formatCurrency(d.total)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
