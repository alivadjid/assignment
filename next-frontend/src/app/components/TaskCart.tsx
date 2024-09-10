import {Chart, ArcElement, Tooltip } from 'chart.js'
import type { TooltipItem } from 'chart.js'
Chart.register(ArcElement, Tooltip);
import { Doughnut } from 'react-chartjs-2';
import { TaskSummaryApi } from '../../../pages/api/tasks/summary';

const TaskChart = ({ data }: {data: TaskSummaryApi}) => {
  const chartData = {
    labels: ['Completed', 'Pending', 'In Progress'],
    datasets: [{
      label: 'Tasks',
      data: [data.completedTasks, data.pendingTasks, data.inProgressTasks],
      backgroundColor: [
        'rgba(0, 255, 0, 0.2)',
        'rgba(255, 165, 0, 0.2)',
        'rgba(255, 0, 0, 0.2)',
      ],
      borderColor: [
        'rgba(0, 255, 0, 1)',
        'rgba(255, 165, 0, 1)',
        'rgba(255, 0, 0, 1)',
      ],
      borderWidth: 1,
    }],
  };

  
  const options = {
    plugins: {
      tooltip: {
        enabled: true,
        displayColors: false,
        callbacks: {
          label: (context: TooltipItem<'doughnut'>) => {
            const label = context.dataset.label || '';
            const value = context.formattedValue;
            const percentage = context.chart.data.datasets[0].data[context.dataIndex] as number / (context.chart.data.datasets[0].data as number[]).reduce((a, b) => a + b, 0) * 100;
            return `${label}: ${value} (${percentage.toFixed(2)}%)`;
          },
        },
      },
    },
  };

  return (
    <Doughnut data={chartData} options={options} />
  );
};

export default TaskChart;