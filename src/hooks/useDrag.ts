import { ITimelineItem } from "../utils/assignLanes";

interface UseDragParams {
    item: ITimelineItem;
    pxPerDay: number;
    onUpdate: (id: number, updates: Partial<ITimelineItem>) => void;
}

export function useDrag({ item, pxPerDay, onUpdate }: UseDragParams) {
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        const startX = e.clientX;
        const origStart = new Date(item.start);
        const origEnd = new Date(item.end);

        const onMouseMove = (moveEvent: MouseEvent) => {
            const deltaDays = Math.round((moveEvent.clientX - startX) / pxPerDay);

            const newStart = new Date(origStart);
            newStart.setDate(newStart.getDate() + deltaDays);
            const newEnd = new Date(origEnd);
            newEnd.setDate(newEnd.getDate() + deltaDays);

            onUpdate(item.id, {
                start: newStart.toISOString().slice(0, 10),
                end: newEnd.toISOString().slice(0, 10),
            });
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
