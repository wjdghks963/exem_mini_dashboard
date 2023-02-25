

export interface ChartRequestParams{
    from: number // unixtime
    to: number // unixtime
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

