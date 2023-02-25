import React from "react";
import {Loading} from "./Loading";
import {Error} from "./Error";

interface ChartLayout {
    children:React.ReactNode
    isLoading:boolean
    error:unknown
}

export function ChartLayout({children, isLoading, error}:ChartLayout){

if(isLoading) return <Loading/>
if(error) return <Error message={"에러가 일어났습니다."}/>
return <div>{children}</div>
}