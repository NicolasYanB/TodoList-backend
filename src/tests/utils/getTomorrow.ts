import { format } from "date-fns";

export function getTomorrow() : string{
  const today = new Date();
  const tomorrow = today.setDate(today.getDate() + 1);
  return format(tomorrow, 'dd-MM-yyyy');
}