import React, {useEffect, useState} from "react";
import {LineChart} from "./components/Charts/LineChart";
import {PieChart} from "./components/Charts/PieChart";
import {ValueChart} from "./components/Charts/ValueChart";
import {Selector} from "./components/Selector";
import {ChartType, SelectorMapObject, SelectTime} from "./type";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {

    const [selectedTime, setSelectedTime] = useState<SelectTime>(3600);
    const [chartType, setChartType] = useState<ChartType>(null);
    const [chartArray , setChartArray] = useState<ChartType[]>(["Line","Pie","Value"])


    useEffect(():any=>{
        if(chartArray.length === 3 && chartType !== null){
            setChartArray((prev)=> [...prev, chartType])
        }else{
            setChartArray((prev)=>[...prev.slice(0,3), chartType])
        }
    },[chartType])


    const TimeSelectorMap = () =>{
        const TimeSelectorMap = new Map<SelectTime, SelectorMapObject<number>>();
        TimeSelectorMap.set(600,{key:'10분',value:600} )
        TimeSelectorMap.set(1800,{key:'30분',value:1800})
        TimeSelectorMap.set(3600, {key:"60분", value:3600})

        return TimeSelectorMap;
    }

    const ChartSelectorMap = () =>{
        const ChartSelectorMap = new Map<ChartType, SelectorMapObject<React.ReactNode>>();
        ChartSelectorMap.set("Line", {key:"Line",value:<LineChart selectedTime={selectedTime}/>});
        ChartSelectorMap.set("Pie", {key:"Pie", value:<PieChart selectedTime={selectedTime}/>});
        ChartSelectorMap.set("Value", {key:"Value", value:<ValueChart selectedTime={selectedTime}/>});

        return ChartSelectorMap
    }
    const handleOnDragEnd = (result:any) => {
        if (!result.destination) return;

        const items = Array.from(chartArray);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setChartArray(items);
    };


  return (
    <div >
        <SelectorContainer>
            <Selector<SelectTime>  state={selectedTime} setState={setSelectedTime} options={TimeSelectorMap()} />
            <Selector<ChartType>  state={chartType} setState={setChartType} options={ChartSelectorMap()} haveToChoose={true} />
        </SelectorContainer>


        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="chart-list">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {chartArray.map((chart, index) => (
                            <Draggable key={index} draggableId={`${index}`} index={index}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        {ChartSelectorMap()?.get(chart)?.value}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>

    </div>
  );
}



const SelectorContainer = styled.div`
  display: flex;
  
`;


export default App;