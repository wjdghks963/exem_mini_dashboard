function* generatePieData() {
  const services = [
    'market_service',
    'shop_service',
    'cart_service',
    'pay_service',
    'office_service',
  ];
  let i = 0;
  while (true) {
    const data = [];
    services.forEach((service) => {
      const value = Math.floor(Math.random() * 30) + 1;
      data.push({ name: service, value });
    });
    yield { data, unit: 'byte' };
    i++;
    if (i >= 360) {
      return;
    }
  }
}
const generator = generatePieData();
const pies = [];
Array.from(generator).forEach((val) => pies.push(val));
const checkNull = (value) => {
  if (value === null || +value <= 0) {
    return null;
  }
  return +value;
};
// 기준시간 2023-02-23 00:00:00
const standardStartTime = 1677078000;
export const pieResolver = async (req, res, ctx) => {
  const from = checkNull(req.url.searchParams.get('from'));
  const to = checkNull(req.url.searchParams.get('to'));
  if (from === null || to === null || from >= to) {
    return res(ctx.status(422), ctx.json({ errorMessage: 'Bad request body.' }));
  }
  const interval = 10 * 1000;
  const standardToFrom = from - standardStartTime;
  const indexFrom = Math.ceil(standardToFrom % 360);
  const resultPies = { data: [], unit: 'bytes' };
  const pieDatas = [];
  let startTime = from - Math.floor(from % interval);
  const finishTime = to - Math.floor(to % interval);
  for (let dataInd = indexFrom; startTime < finishTime; dataInd++) {
    pies[dataInd].data.forEach((item, index) => {
      if (pieDatas[index]) {
        return;
      }
      pieDatas[index] = { name: '', value: 0 };
    });
    pies[dataInd].data.forEach((item, index) => {
      pieDatas[index].name = item.name;
      pieDatas[index].value += item.value;
    });
    startTime += interval;
  }
  resultPies.data = pieDatas;
  return res(ctx.json(resultPies));
};
