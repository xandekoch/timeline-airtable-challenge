import { useRef, useState, useEffect } from "react";
import { useTimelineLayout } from "../../hooks/useTimelineLayout";
import { ITimelineItem } from "../../utils/assignLanes";
import { TimelineLane } from "./TimelineLane";
import { TimelineAxis } from "./TimelineAxis";

interface ZoomControlProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function ZoomControl({ zoom, onZoomIn, onZoomOut }: ZoomControlProps) {
  const basePxPerDay = 20;
  const zoomPercent = Math.round((zoom / basePxPerDay) * 100);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        marginBottom: 8,
      }}
    >
      <button onClick={onZoomOut} aria-label="Zoom out">
        -
      </button>
      <span style={{ minWidth: 50, textAlign: "center" }}>{zoomPercent}%</span>
      <button onClick={onZoomIn} aria-label="Zoom in">
        +
      </button>
    </div>
  );
}

interface TimelineProps {
  initialItems: ITimelineItem[];
  width?: number;
  height?: number;
}

export function Timeline({ initialItems, width = 1000, height = 400 }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState(initialItems);
  const [containerWidth, setContainerWidth] = useState(width);
  const [zoom, setZoom] = useState(20);

  useEffect(() => {
    if (ref.current) {
      setContainerWidth(ref.current.clientWidth);
    }
  }, []);

  const { lanes, minDate, maxDate } = useTimelineLayout(items);

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
        ref={ref}
        style={{ width, height: "fit-content", maxHeight: height, border: "1px solid #ddd", overflow: "auto", position: "relative" }}
      >
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
      </div>
    </>
  );
}
