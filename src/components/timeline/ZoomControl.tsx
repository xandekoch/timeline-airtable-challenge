interface ZoomControlProps {
    zoom: number;
    onZoomIn: () => void;
    onZoomOut: () => void;
}

export function ZoomControl({ zoom, onZoomIn, onZoomOut }: ZoomControlProps) {
    const basePxPerDay = 20;
    const zoomPercent = Math.round((zoom / basePxPerDay) * 100);

    return (
        <div className="flex items-center justify-center gap-3 mb-2">
            <button className="bg-indigo-600 text-white px-2 rounded cursor-pointer" onClick={onZoomOut} aria-label="Zoom out">
                -
            </button>
            <span className="text-center">{zoomPercent}%</span>
            <button className="bg-indigo-600 text-white px-2 rounded cursor-pointer" onClick={onZoomIn} aria-label="Zoom in">
                +
            </button>
        </div>
    );
}