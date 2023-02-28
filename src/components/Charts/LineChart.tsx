import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {useQuery} from "react-query";
import {getData} from "../../libs/getData";
import {fromUnixTime, toUnixTime} from "../../libs/unixtimeConverter";
import { TimeSeriesResponse} from "../../type";
import {ChartLayout} from "../ChartLayout";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options:any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            ticks: {
                autoSkip: true,
                maxRotation: 0,
                minRotation: 0,
                fontSize: 12,
            },
        },
        y: {
            ticks: {
                beginAtZero: true,
            },
        },
    },
};



const criticalPoint = 8000000;

export function LineChart({selectedTime}:{selectedTime:number}) {

    const now = toUnixTime(new Date());

    const {data:chartData, isLoading, error} = useQuery(['lineChartData', selectedTime], ()=>getData<TimeSeriesResponse>(`/timeseries?from=${((now-selectedTime)*1000)}&to=${now*1000}`),{refetchInterval: 10000 });

    const data = {
        labels: chartData?.times.map((time:number) => fromUnixTime(time)),
        datasets: [
            {
                label: chartData?.name,
                data: chartData?.data.map((label:number) => String(label)),
                fill: false,
                borderColor: (context:any)=>{
                    const index = context.dataIndex;
                    const dataset = context.dataset;
                    return (dataset.data[index] >= criticalPoint) ? 'red' : 'rgb(75, 192, 192)';},
                tension: 0.1
            },

        ]
    };



    return (
       <ChartLayout  isLoading={isLoading} error={error}>

           <Line data={data} options={options}/>
       </ChartLayout>
    );
}


