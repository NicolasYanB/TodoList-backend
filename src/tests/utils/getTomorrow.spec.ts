import { getDayOfYear, parse } from "date-fns";
import { expect, it } from "vitest";
import { getTomorrow } from "./getTomorrow";

it('Should return the date of tomorrow', () => {
  const tomorrow = getTomorrow();
  expect(parse(tomorrow, 'dd-MM-yyyy', new Date()).getDate()).toBe(new Date().getDate() + 1);
});