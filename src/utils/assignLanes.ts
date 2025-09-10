export interface ITimelineItem {
    id: number;
    start: string;
    end: string;
    name: string;
}

export function assignLanes(items: ITimelineItem[]): ITimelineItem[][] {
    const sortedItems = items.sort((a, b) =>
        new Date(a.start).getTime() - new Date(b.start).getTime()
    );
    const lanes: ITimelineItem[][] = [];

    function assignItemToLane(item: ITimelineItem) {
        for (const lane of lanes) {
            if (new Date(lane[lane.length - 1].end) < new Date(item.start)) {
                lane.push(item);
                return;
            }
        }
        lanes.push([item]);
    }

    for (const item of sortedItems) {
        assignItemToLane(item);
    }
    return lanes;
}
