import ReactDOM from "react-dom/client";
import { Timeline } from "./components/timeline/Timeline.js";
import timelineItems from "./constants/timelineItems.js";

function App() {
  return (
    <div className="flex flex-col items-center gap-4 mt-10 mx-5">
      <h2 className="text-center text-2xl font-semibold">
        Good luck with your assignment! {"\u2728"}
      </h2>
      <h3 className="text-center text-lg font-medium">
        {timelineItems.length} timeline items to render
      </h3>
      <Timeline initialItems={timelineItems} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);