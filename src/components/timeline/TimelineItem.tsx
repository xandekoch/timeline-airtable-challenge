import { useRef, useState } from "react";
import { ITimelineItem } from "../../utils/assignLanes";
import { useDrag } from "../../hooks/useDrag";
import { useResize } from "../../hooks/useResize";

interface ItemProps {
    item: ITimelineItem;
    minDate: Date;
    pxPerDay: number;
    onUpdate: (id: number, updates: Partial<ITimelineItem>) => void;
}

export function TimelineItem({ item, minDate, pxPerDay, onUpdate }: ItemProps) {
    const start = new Date(item.start);
    const end = new Date(item.end);

    const offsetDays = Math.floor((+start - +minDate) / (1000 * 60 * 60 * 24));
    const durationDays = Math.max(1, Math.ceil((+end - +start) / (1000 * 60 * 60 * 24)));

    const left = offsetDays * pxPerDay;
    const width = durationDays * pxPerDay;

    const ref = useRef<HTMLDivElement>(null);

    const handleDrag = useDrag({ item, pxPerDay, onUpdate });
    const handleResizeLeft = useResize({ item, side: "left", pxPerDay, onUpdate });
    const handleResizeRight = useResize({ item, side: "right", pxPerDay, onUpdate });

    /* Todo: fix contenteditable bug to allow updating the item name */

    // const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    //     onUpdate(item.id, { name: e.currentTarget.textContent || "" });
    // };

    // const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    //     if (e.key === "Enter") {
    //         e.preventDefault();
    //         ref.current?.blur();
    //     }
    // };

    return (
        <div
            ref={ref}
            role="listitem"
            tabIndex={0}
            aria-label={`${item.name} from ${item.start} to ${item.end}`}
            className="absolute flex items-center cursor-grab px-1.5 h-7 rounded bg-indigo-700
                     text-white whitespace-nowrap overflow-hidden text-ellipsis select-none"
            style={{ left, width }}
            onMouseDown={handleDrag}
        // contentEditable
        // suppressContentEditableWarning
        // spellCheck={false}
        // onBlur={handleBlur}
        // onKeyDown={handleKeyDown}
        >
            <div
                onMouseDown={handleResizeLeft}
                className="absolute top-0 left-0 w-1.5 h-full cursor-w-resize"
            />

            {item.name}

            <div
                onMouseDown={handleResizeRight}
                className="absolute top-0 right-0 w-1.5 h-full cursor-e-resize"
            />
        </div>
    );
}