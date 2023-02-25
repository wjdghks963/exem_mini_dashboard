import { ResponseComposition, RestContext, RestRequest } from 'msw';
import { timeseriesData } from './timeseries.data';

interface TimeseriesRequestBody {
  from: number;
  to: number;
}

interface TimeseriesData {
  name: string;
  data: number[];
  times: number[];
  unit: string;
}

interface ErrorMessage {
  errorMessage: string;
}

const checkNull = (value: any) => {
  if (value === null || +value <= 0) {
    return null;
  }
  return +value;
};

const timeseriesDataGet = async (
  req: RestRequest<TimeseriesRequestBody>,
  res: ResponseComposition<TimeseriesData | ErrorMessage>,
  ctx: RestContext
) => {
  const responseData: TimeseriesData = {
    name: 'memory usage',
    data: [],
    times: [],
    unit: 'byte',
  };
  const from = checkNull(req.url.searchParams.get('from'));
  const to = checkNull(req.url.searchParams.get('to'));

  if (from === null || to === null || from >= to) {
    return res(ctx.status(422), ctx.json({ errorMessage: 'Bad request body.' }));
  }

  // 기준시간 2023-02-23 00:00:00
  const standardUnixTime = new Date('2023-02-23 00:00:00').getTime();
  const interval = 10 * 1000;
  const range = 720;
  const rangeTime = range * interval;
  const standardToFrom = from - standardUnixTime;
  const indexFrom =
    from > standardUnixTime
      ? Math.ceil((standardToFrom % rangeTime) / interval)
      : 719 - Math.ceil((standardToFrom % rangeTime) / interval);

  let startTime = from - Math.floor(from % interval);
  for (let dataInd = indexFrom; startTime < to; dataInd++) {
    responseData.times.push(startTime);
    responseData.data.push(timeseriesData[dataInd % range]);
    startTime += interval;
  }

  return res(ctx.json(responseData));
};

export default timeseriesDataGet;
