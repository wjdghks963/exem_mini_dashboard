function* generateValueData() {
  let i = 0;
  while (true) {
    const value = Math.floor(Math.random() * 30) + 1;
    const data = { name: 'service', unit: 'bytes', value };
    yield data;
    i++;
    if (i >= 360) {
      return;
    }
  }
}
const generator = generateValueData();
const values = [];
Array.from(generator).forEach((val) => values.push(val));
const checkNull = (value) => {
  if (value === null || +value <= 0) {
    return null;
  }
  return +value;
};
// 기준시간 2023-02-23 00:00:00
const standardStartTime = 1677078000;
export const valueResolver = (req, res, ctx) => {
  const from = checkNull(req.url.searchParams.get('from'));
  const to = checkNull(req.url.searchParams.get('to'));
  if (from === null || to === null || from >= to) {
    return res(ctx.status(422), ctx.json({ errorMessage: 'Bad request body.' }));
  }
  const interval = 10 * 1000;
  const standardToFrom = from - standardStartTime;
  const indexFrom = Math.ceil(standardToFrom % 360);
  const resultValue = { name: 'service', unit: 'bytes', value: 0 };
  let startTime = from - Math.floor(from % interval);
  const finishTime = to - Math.floor(to % interval);
  for (let dataInd = indexFrom; startTime < finishTime; dataInd++) {
    resultValue.value += values[dataInd].value;
    startTime += interval;
  }
  return res(ctx.json(resultValue));
};
