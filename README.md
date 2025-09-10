## Instructions to run:

1. git clone <https://github.com/xandekoch/timeline-airtable-challenge.git>
2. cd <your-repo-folder>
3. Run `npm install` to install dependencies
4. Run `npm start` to initialize and connect to a node server with your default browser

## What I like about my implementation

- Compact and functional timeline: items share lanes when possible using assignLanes, resulting in a space-efficient layout.

- TimelineAxis: added an axis with day labels below the lanes, with a hover vertical line for better readability and UX.

- Drag & resize: items can be moved and resized interactively, allowing easy adjustment of start/end dates.

- TypeScript: fully typed codebase, improving maintainability and reducing potential runtime errors.

- Dynamic zoom: zoom control works smoothly, adjusting the width of items according to user preference.

## What I would change if I were to do it again

- Inline editing: temporarily disabled due to contentEditable issues. Would implement using a controlled input or modal for better stability.

- UI styling: would add TailwindCSS for faster styling and consistent visual language.

- Performance: optimize rendering for very large timelines (virtualization or canvas-based rendering).

- Responsive axis: improve label grouping dynamically based on zoom (day/week/month) for better readability.

## How I made design decisions

- Component-based architecture: Timeline, TimelineLane, TimelineItem, TimelineAxis, ZoomControl with isolated hooks (useTimelineLayout, useDrag, useResize) to separate state and behavior, keeping code clean and testable.

- Lane assignment: used assignLanes to calculate compact lanes based on item start/end dates.

- Axis design: inspired by simple Gantt charts, focusing on clarity and minimalism (day/month only, adapting to zoom).

- UX considerations: drag and resize interactions for direct manipulation of timeline items.

## How I would test this if I had more time

### Unit tests:

- Test assignLanes independently to ensure correct lane assignments.

- Test date calculations and zoom logic.

- Component tests (React Testing Library):

- Verify that Timeline, TimelineLane, and TimelineItem render correctly given a set of items.

- Test drag, resize, and update callbacks are fired correctly.

### Integration tests:

- Simulate user interactions (dragging, resizing, zooming) and ensure UI updates match expectations.

- Ensure TimelineAxis reflects correct labels and hover line position.