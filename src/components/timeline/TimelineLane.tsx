import { ITimelineItem } from "../../utils/assignLanes";
import { TimelineItem } from "./TimelineItem";

interface LaneProps {
  items: ITimelineItem[];
  minDate: Date | null;
  pxPerDay: number;
  index: number;
  onUpdate: (id: number, updates: Partial<ITimelineItem>) => void;
}

export function TimelineLane({ items, minDate, pxPerDay, index, onUpdate }: LaneProps) {
  if (!minDate) return null;

  return (
    <div
      role="list"
      aria-label={`Timeline lane ${index + 1}`}
      style={{
        display: "flex",
        position: "relative",
        height: 40,
        borderBottom: "1px solid #eee",
      }}
    >
      {items.map((item) => (
        <TimelineItem
          key={item.id}
          item={item}
          minDate={minDate}
          pxPerDay={pxPerDay}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}