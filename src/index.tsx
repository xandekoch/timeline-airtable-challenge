import ReactDOM from "react-dom/client";
import { Timeline } from "./components/timeline/Timeline.js";
import timelineItems from "./constants/timelineItems.js";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        marginTop: 40,
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        Good luck with your assignment! {"\u2728"}
      </h2>
      <h3 style={{ textAlign: "center" }}>
        {timelineItems.length} timeline items to render
      </h3>
      <Timeline initialItems={timelineItems} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);