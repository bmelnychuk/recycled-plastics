import { format } from "date-fns";

export const formatDate = (date: string) => format(date, "MMM d, yyyy");
