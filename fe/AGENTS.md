# AGENTS.md

## Project Role

This repository is a React + Vite + Tailwind CSS frontend project for a Trello-style Kanban board application.

The human developer is responsible for the backend. Codex must work only on the frontend unless explicitly instructed otherwise.

## Core Rule

Do not be creative beyond the requested scope. Implement exactly what is needed for a clean frontend Trello-style clone and avoid adding unrelated features.

## Tech Stack

Use only the existing stack:

* React
* Vite
* Tailwind CSS
* JavaScript
* React Router if routing is needed

Do not add TypeScript unless explicitly requested.

Do not add external UI libraries unless explicitly requested.

Do not add backend frameworks, database clients, ORM tools, authentication libraries, payment libraries, or server code.

## Frontend Scope

Codex may implement:

* Pages
* React components
* Tailwind styling
* Routing
* Mock data
* Frontend state management
* API service wrapper files
* Utility functions
* Basic form handling
* Basic modal handling
* Basic drag-and-drop only if it can be done simply and safely

Codex must not implement:

* Real backend logic
* Express/NestJS/Fastify server
* Database code
* Authentication system
* Authorization logic
* Payment features
* Realtime WebSocket features
* Email features
* Notification system
* Admin dashboard unless requested
* Team collaboration features unless requested
* Any feature not directly related to the Trello-style board UI

## Product Requirements

The app should be a Trello-inspired Kanban board interface.

Do not copy Trello branding, logos, trademarked assets, or exact proprietary visual identity.

Required user-facing areas:

1. Boards list page
2. Board detail page
3. Columns/lists
4. Cards/tasks
5. Card detail modal or detail panel
6. Basic create/edit/delete actions on the frontend mock layer

## Suggested Routes

Use React Router.

Suggested routes:

* `/`

  * redirect to `/boards`
* `/boards`

  * boards list page
* `/boards/:boardId`

  * board detail page

Do not create many routes unless requested.

## Suggested Folder Structure

Prefer this structure:

```txt
src/
  assets/
  components/
    layout/
    boards/
    columns/
    cards/
    ui/
  pages/
    BoardsPage.jsx
    BoardDetailPage.jsx
  services/
    apiClient.js
    boardService.js
    cardService.js
  mocks/
    boards.js
  hooks/
  utils/
  router/
  App.jsx
  main.jsx
  index.css
```

Do not put all components directly inside `App.jsx`.

Do not create an overly complex architecture.

## Component Rules

Use functional components only.

Each component should have one clear responsibility.

Prefer small reusable components.

Recommended components:

* `AppLayout`
* `Navbar`
* `Sidebar`
* `BoardCard`
* `BoardList`
* `BoardHeader`
* `BoardColumn`
* `TaskCard`
* `TaskModal`
* `CreateBoardForm`
* `CreateColumnForm`
* `CreateCardForm`
* `Button`
* `Input`
* `Textarea`

Do not create unnecessary abstractions.

## Styling Rules

Use Tailwind CSS classes.

Do not write large custom CSS files unless necessary.

Use a clean and consistent visual style.

Prioritize:

* readable layout
* clear spacing
* responsive design
* good hover/focus states
* simple colors
* good contrast
* clean card/column hierarchy

Avoid:

* excessive animation
* overly complex gradients
* decorative UI that hurts readability
* copying Trello exactly

## State Management Rules

Start with React state and props.

Use Context only if prop drilling becomes messy.

Use Redux Toolkit only if explicitly requested or clearly necessary.

Do not install state management libraries without permission.

Keep state shape simple.

Suggested mock state shape:

```js
const boards = [
  {
    id: "board-1",
    title: "Project Board",
    description: "Demo board",
    columns: [
      {
        id: "column-1",
        title: "Todo",
        cards: [
          {
            id: "card-1",
            title: "Create UI",
            description: "Build Kanban board interface"
          }
        ]
      }
    ]
  }
];
```

## API Integration Rules

Prepare for backend integration but do not require a real backend.

Use service files to isolate API calls.

Suggested files:

* `src/services/apiClient.js`
* `src/services/boardService.js`
* `src/services/cardService.js`

Use `VITE_API_BASE_URL` for future backend connection.

For now, services may return mock data using `Promise.resolve()`.

Do not hardcode backend URLs throughout components.

Only service files should know about future API endpoints.

Suggested future endpoints:

```txt
GET    /api/boards
POST   /api/boards
GET    /api/boards/:boardId
POST   /api/boards/:boardId/columns
POST   /api/columns/:columnId/cards
PATCH  /api/cards/:cardId
DELETE /api/cards/:cardId
PATCH  /api/cards/:cardId/move
```

Do not invent more endpoints unless necessary.

## Code Quality Rules

Before finishing, ensure:

* No unused imports
* No unused variables
* No unnecessary console.log
* No broken routes
* No missing exports/imports
* No duplicated component logic when a simple reusable component is better
* App can run with `npm run dev`

Use clear naming.

Avoid vague names like:

* `Component1`
* `data2`
* `handleThing`
* `temp`
* `abc`

Prefer names like:

* `BoardDetailPage`
* `handleCreateCard`
* `selectedCard`
* `columns`
* `boardService`

## Behavior Rules

When implementing a task:

1. Inspect the existing project first.
2. Identify the smallest safe set of files to change.
3. Keep the implementation focused.
4. Do not rewrite unrelated files.
5. Do not change package.json unless necessary.
6. Do not install packages unless explicitly approved.
7. Do not remove existing working code without reason.
8. After implementation, explain what changed.

## Output Rule

After completing a coding task, always provide a concise summary:

* Files created
* Files modified
* Main features implemented
* How to run the app
* Any assumptions made
* Where backend integration should be connected later

## Strict Limitations

Do not add these unless explicitly requested:

* Login/register
* JWT/authentication
* User profile
* Team management
* Comments
* Attachments
* Due dates
* Labels
* Search
* Notifications
* Realtime collaboration
* Admin dashboard
* Backend server
* Database connection
* Deployment config
* Unit tests

The current goal is only a clean frontend foundation for a Trello-style Kanban board.
