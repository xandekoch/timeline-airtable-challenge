import { ITimelineItem } from "../utils/assignLanes";

interface UseResizeParams {
    item: ITimelineItem;
    side: "left" | "right";
    pxPerDay: number;
    onUpdate: (id: number, updates: Partial<ITimelineItem>) => void;
}

export function useResize({ item, side, pxPerDay, onUpdate }: UseResizeParams) {
    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        const startX = e.clientX;
        const origDate = new Date(side === "left" ? item.start : item.end);

        const onMouseMove = (moveEvent: MouseEvent) => {
            const deltaDays = Math.round((moveEvent.clientX - startX) / pxPerDay);
            const newDate = new Date(origDate);
            newDate.setDate(newDate.getDate() + deltaDays);

            if (side === "left" && newDate < new Date(item.end)) {
                onUpdate(item.id, { start: newDate.toISOString().slice(0, 10) });
            }

            if (side === "right" && newDate > new Date(item.start)) {
                onUpdate(item.id, { end: newDate.toISOString().slice(0, 10) });
            }
        };

        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    return handleMouseDown;
}
