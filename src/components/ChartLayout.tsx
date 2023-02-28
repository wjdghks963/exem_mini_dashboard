import React, {useState} from "react";
import {Loading} from "./Loading";
import {Error} from "./Error";
import styled from "styled-components";


interface ChartLayoutProps {
    children:React.ReactNode
    isLoading:boolean
    error:unknown
}

export function ChartLayout({children, isLoading, error}:ChartLayoutProps){
    const [width, setWidth] = useState<number>(100);
    const [vh, setVh] = useState<number>(40);

    const btnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        switch (e.currentTarget.textContent) {
            case "+":{
                if(width === 100) return;
                setVh((prev)=>prev+5);
                setWidth((prev)=>prev+10);
                break;
            }
            default :{
                if(vh === 20) return;
                setVh((prev)=>prev-5);
                setWidth((prev)=>prev-10);
                break;
            }
        }
    }
    console.log(width,vh)

    if(isLoading) return <Loading/>
    if(error) return <Error message={"에러가 일어났습니다."}/>
    return (
        <div>

            <Buttons>
                {`차트 크기 조절`}
                <Button onClick={e=>btnClick(e)}>+</Button>
                <Button onClick={e=>btnClick(e)}>-</Button>
            </Buttons>
        <Container vh={vh} width={width} >
            {children}
        </Container>
        </div>)
}

const Container = styled.div<{vh:number, width:number}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => `${props.width}`}%;
  height: ${props => `${props.vh}`}vh;
  margin: 50px 0;
`

const Buttons = styled.div`
  display: flex;
  align-items: center;
  background: inherit;
  margin-top: 40px;
  padding: 20px;
  
`

const Button = styled.button`
  appearance: none;
  background: inherit;
  padding: 15px;
  margin: 0 10px;
  border-radius: 10px;
`