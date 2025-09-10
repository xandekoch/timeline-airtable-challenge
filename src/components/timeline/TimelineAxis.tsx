interface TimelineAxisProps {
    minDate: Date;
    maxDate: Date;
    pxPerDay: number;
}

export function TimelineAxis({ minDate, maxDate, pxPerDay }: TimelineAxisProps) {
    const totalDays = Math.ceil((+maxDate - +minDate) / (1000 * 60 * 60 * 24)) + 1;

    const interval = pxPerDay < 10 ? 7 : pxPerDay < 20 ? 3 : 1;

    const getDateLabel = (dayIndex: number) => {
        const d = new Date(minDate);
        d.setDate(d.getDate() + dayIndex);

        if (interval >= 7) {
            return d.toLocaleDateString("en-US", { day: "2-digit", month: "short" });
        }

        return d.toLocaleDateString("en-US", { day: "2-digit" });
    };

    return (
        <div style={{ position: "relative", borderTop: "1px solid #ccc", height: 20 }}>
            {Array.from({ length: totalDays }).map((_, i) => {
                if (i % interval !== 0) return null;

                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            left: i * pxPerDay,
                            width: pxPerDay * interval,
                            textAlign: "center",
                            fontSize: 10,
                            color: "#555",
                        }}
                    >
                        {getDateLabel(i)}
                    </div>
                );
            })}
        </div>
    );
}
