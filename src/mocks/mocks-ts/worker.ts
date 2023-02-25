import {SetupWorker, setupWorker} from "msw";

import { handlers } from "./handlers";

export const mswWorker:SetupWorker = setupWorker(...handlers);
