interface TimelineAxisProps {
    minDate: Date;
    maxDate: Date;
    pxPerDay: number;
}

export function TimelineAxis({ minDate, maxDate, pxPerDay }: TimelineAxisProps) {
    const totalDays = Math.ceil((+maxDate - +minDate) / (1000 * 60 * 60 * 24)) + 1;

    const interval = pxPerDay < 20 ? 7 : pxPerDay < 50 ? 3 : 1;

    const getDateLabel = (dayIndex: number) => {
        const d = new Date(minDate);
        d.setDate(d.getDate() + dayIndex);

        if (interval >= 7) {
            return d.toLocaleDateString("en-US", { day: "2-digit", month: "short" });
        }

        return d.toLocaleDateString("en-US", { day: "2-digit", month: "2-digit" });
    };

    return (
        <div className="border-t border-gray-300 h-5">
            {Array.from({ length: totalDays }).map((_, i) => {
                if (i % interval !== 0) return null;

                return (
                    <div
                        key={i}
                        className="absolute text-center text-[10px] text-gray-600"
                        style={{
                            left: i * pxPerDay,
                            width: pxPerDay * interval,
                        }}
                    >
                        {getDateLabel(i)}
                    </div>
                );
            })}
        </div>
    );
}
