import { useState } from "react";
import { useTimelineLayout } from "../../hooks/useTimelineLayout";
import { ITimelineItem } from "../../utils/assignLanes";
import { TimelineLane } from "./TimelineLane";
import { TimelineAxis } from "./TimelineAxis";
import { ZoomControl } from "./ZoomControl";

interface TimelineProps {
  initialItems: ITimelineItem[];
  width?: number;
  height?: number;
}

export function Timeline({ initialItems, width = 1000, height = 400 }: TimelineProps) {
  const [items, setItems] = useState(initialItems);
  const [zoom, setZoom] = useState(20);

  const { lanes, minDate, maxDate } = useTimelineLayout(items);
  const isEmpty = items.length === 0;

  const handleZoomIn = () => setZoom((z) => Math.min(z + 5, 100));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 5, 5));

  const handleUpdateItem = (id: number, updates: Partial<ITimelineItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  return (
    <>
      <ZoomControl zoom={zoom} onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      <div
        style={{ width, height: "fit-content", maxHeight: height, border: "1px solid #ddd", overflow: "auto", position: "relative" }}
      >
        {isEmpty ? (
          <div style={{ padding: 20, textAlign: "center", color: "#666" }}>
            No timeline items to display
          </div>
        ) : (
          <>
            {lanes.map((laneItems, i) => (
              <TimelineLane
                key={i}
                index={i}
                items={laneItems}
                minDate={minDate!}
                pxPerDay={zoom}
                onUpdate={handleUpdateItem}
              />
            ))}
            <TimelineAxis minDate={minDate!} maxDate={maxDate!} pxPerDay={zoom} />
            <TimelineAxis minDate={minDate!} maxDate={maxDate!} pxPerDay={zoom} />
          </>
        )}
      </div>
    </>
  );
}
