import { motion, AnimatePresence } from "framer-motion"
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
      className="flex relative h-10 w-full"
    >
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            transition={{ type: "spring", stiffness: 1000, damping: 40, mass: 0.5 }}
            key={item.id}
            layoutId={`item-${item.id}`}
            initial={false}
          >
            <TimelineItem
              item={item}
              minDate={minDate}
              pxPerDay={pxPerDay}
              onUpdate={onUpdate}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}