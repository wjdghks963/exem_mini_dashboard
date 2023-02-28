import {useQuery} from "react-query";
import {getData} from "../../libs/getData";
import { toUnixTime} from "../../libs/unixtimeConverter";
import {ValueResponse} from "../../type";
import {ChartLayout} from "../ChartLayout";
import styled from "styled-components";

const criticalPoint = 4;

export function ValueChart({selectedTime}:{selectedTime:number}) {

    const now = toUnixTime(new Date());

    const {data:chartData, isLoading, error} = useQuery(['valueChartData',selectedTime], ()=>getData<ValueResponse>(`/value?from=${(now-(selectedTime))*1000}&to=${now*1000}`),{refetchInterval: 10000 });

    const byteToKb = (byte:number|undefined):string =>{
        const kb = ((byte) ? (byte) / (1024) : 0).toFixed(2).toString();
        const kbArr = kb.split(".");
        const integer = parseInt(kbArr[0].slice(-3)).toString();
        const decimal = kbArr[1];
        return `${integer}.${decimal}`;
    }

    const value = byteToKb(chartData?.value);

    return (
        <ChartLayout  isLoading={isLoading} error={error}>
            <ValueContainer value={value} criticalPoint={criticalPoint}>
                {value}
            </ValueContainer>
        </ChartLayout>
    );
}

const ValueContainer = styled.div<{ criticalPoint: number, value:string }>`
  display: flex;
  width: 100%;
  padding: 20px 0;
  border: 1px solid silver;
  border-radius: 5px;
  justify-content: center;
  font-weight: bold;
  font-size: 34px;
  align-items: end;
  color: ${props => +props.value > props.criticalPoint ? "red" : "black"  };
  
  &::after {
    content: "Kb";
    font-weight: 500;
    font-size: 20px;
  }
`;

