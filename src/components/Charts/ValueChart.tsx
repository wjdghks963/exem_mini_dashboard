import {useQuery} from "react-query";
import {getData} from "../../libs/getData";
import { toUnixTime} from "../../libs/unixtimeConverter";
import {ValueResponse} from "../../type";
import {ChartLayout} from "../ChartLayout";
import styled from "styled-components";


export function ValueChart({selectedTime}:{selectedTime:number}) {

    const now = toUnixTime(new Date());

    const {data:chartData, isLoading, error} = useQuery(['valueChartData',selectedTime], ()=>getData<ValueResponse>(`/value?from=${(now-(selectedTime))*1000}&to=${now*1000}`),{refetchInterval: 10000 });

    return (
        <ChartLayout isLoading={isLoading} error={error}>
            <ValueContainer>
                {chartData?.value}
            </ValueContainer>
        </ChartLayout>
    );
}

const ValueContainer = styled.div`
  display: flex;
  padding: 20px 0;
  border: 1px solid silver;
  border-radius: 5px;
  justify-content: center;
  font-weight: bold;
  font-size: 34px;
  align-items: end;
  
  &::after {
    content: "Mib";
    font-weight: 500;
    font-size: 20px;
  }
`;

