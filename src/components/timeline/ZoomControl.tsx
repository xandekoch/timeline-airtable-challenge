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