import {Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CarbonFootprintChartProps {
    score : number;
}

const CarbonFootprintChart: React.FC<CarbonFootprintChartProps> = ({ score }) => {
    const data = {
        labels: ['Carbon Footprint Score'],
        datasets: [
            {
                label: 'Score',
                data: [score, 100 - score],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            }
        ],
    };
return <Doughnut data={data} />;
};

export default CarbonFootprintChart;