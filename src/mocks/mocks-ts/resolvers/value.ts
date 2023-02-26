import { ResponseComposition, RestContext, RestRequest } from 'msw';

interface ValueReq {
  from: number;
  to: number;
}

type ValueRes = {
  name: string;
  value: number;
  unit: string;
};

function* generateValueData() {
  let i = 0;
  while (true) {
    const value = Math.floor(Math.random() * 30) + 1;
    const data: ValueRes = { name: 'service', unit: 'bytes', value };

    yield data;
    i++;
    if (i >= 360) {
      return;
    }
  }
}

const generator = generateValueData();

const values: ValueRes[] = [];

Array.from(generator).forEach((val) => values.push(val));

interface ErrorMessage {
  errorMessage: string;
}

const checkNull = (value: any) => {
  if (value === null || +value <= 0) {
    return null;
  }
  return +value;
};

// 기준시간 2023-02-23 00:00:00
const standardStartTime = 1677078000;

export const valueResolver = (
  req: RestRequest<ValueReq>,
  res: ResponseComposition<ValueRes | ErrorMessage>,
  ctx: RestContext
) => {
  const from = checkNull(req.url.searchParams.get('from'));
  const to = checkNull(req.url.searchParams.get('to'));

  if (from === null || to === null || from >= to) {
    return res(ctx.status(422), ctx.json({ errorMessage: 'Bad request body.' }));
  }

  const interval = 10 * 1000;
  const standardToFrom = from - standardStartTime;
  const indexFrom = Math.ceil(standardToFrom % 360);

  const resultValue: ValueRes = { name: 'service', unit: 'bytes', value: 0 };

  let startTime = from - Math.floor(from % interval);
  const finishTime = to - Math.floor(to % interval);
  for (let dataInd = indexFrom; startTime < finishTime; dataInd++) {
    if(dataInd === 360) break
    resultValue.value += values[dataInd].value;
    startTime += interval;
  }

  return res(ctx.json(resultValue));
};
