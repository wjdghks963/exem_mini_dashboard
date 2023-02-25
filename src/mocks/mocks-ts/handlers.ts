import { rest, RestHandler } from "msw";

import timeseriesDataGet from "./resolvers/timeseries";
import { pieResolver } from "./resolvers/pie";
import { valueResolver } from "./resolvers/value";

const chartHandlers: RestHandler[] = [
  rest.get(`/timeseries`, timeseriesDataGet),
  rest.get("/pie", pieResolver),
  rest.get("/value", valueResolver),
];

export const handlers = chartHandlers;
