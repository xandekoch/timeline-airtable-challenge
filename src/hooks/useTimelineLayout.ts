import { useMemo } from "react";
import { assignLanes, ITimelineItem } from "../utils/assignLanes";

export function useTimelineLayout(items: ITimelineItem[]) {
  return useMemo(() => {
    if (!items.length) {
      return { lanes: [], minDate: null, maxDate: null };
    }

    const parse = (d: string) => new Date(d);

    const minDate = items.reduce(
      (min, i) => (parse(i.start) < min ? parse(i.start) : min),
      parse(items[0].start)
    );
    const maxDate = items.reduce(
      (max, i) => (parse(i.end) > max ? parse(i.end) : max),
      parse(items[0].end)
    );

    const lanes = assignLanes(items);

    return { lanes, minDate, maxDate };
  }, [items]);
}
