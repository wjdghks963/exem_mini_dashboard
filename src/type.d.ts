

export type SelectTime = 600 | 1800 |3600;
export type ChartType = "Line" | "Pie" | "Value" | null;
export interface SelectorMapObject<T>{
    key:string
    value:T
}

export interface TimeSeriesResponse{
    name: string
    data: number[]
    times: unixtime[]
    unit: string
}


interface PieData {
    name: string
    value: number
}
export interface PieResponse{
    data: PieData[]
    unit: string
}

export interface ValueResponse{
    name: string
    value: number
}

