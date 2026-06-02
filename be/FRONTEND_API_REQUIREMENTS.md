# Frontend API Requirements

Tai lieu nay mo ta cac API frontend Kanban board can de ket noi voi backend sau nay.
Frontend hien dang dung mock data, nhung service layer da chuan bi de thay bang HTTP calls.

Base URL se lay tu bien moi truong frontend:

```env
VITE_API_BASE_URL=http://localhost:YOUR_BACKEND_PORT
```

Tat ca response nen tra ve JSON.

## Data Models

### Board

Frontend can cac thuoc tinh sau:

```json
{
  "id": "board-product-launch",
  "title": "Product Launch",
  "description": "Coordinate release tasks",
  "updatedAt": "2026-05-29T09:00:00.000Z",
  "columns": []
}
```

Fields:

- `id`: string, bat buoc, unique board id.
- `title`: string, bat buoc.
- `description`: string, co the rong.
- `updatedAt`: string ISO date, dung de hien thi/sap xep sau nay.
- `columns`: array `Column`, can co trong API chi tiet board.

### Column

```json
{
  "id": "col-backlog",
  "title": "Backlog",
  "cards": []
}
```

Fields:

- `id`: string, bat buoc, unique column id.
- `title`: string, bat buoc.
- `cards`: array `Card`, can co trong API chi tiet board.

### Card

```json
{
  "id": "card-positioning",
  "title": "Finalize positioning notes",
  "description": "Collect input from product, sales, and support."
}
```

Fields:

- `id`: string, bat buoc, unique card id.
- `title`: string, bat buoc.
- `description`: string, co the rong.

Khuyen nghi backend luu them:

- `boardId`: string.
- `columnId`: string.
- `position`: number, de sap xep card trong column.
- `createdAt`: string ISO date.
- `updatedAt`: string ISO date.

Frontend hien tai chua bat buoc cac field khuyen nghi tren, tru `columnId` co the huu ich neu backend tra card rieng le.

## Required APIs

### 1. Get Boards

Lay danh sach board cho trang `/boards`.

```http
GET /api/boards
```

Response:

```json
[
  {
    "id": "board-product-launch",
    "title": "Product Launch",
    "description": "Coordinate release tasks",
    "updatedAt": "2026-05-29T09:00:00.000Z",
    "columns": [
      {
        "id": "col-backlog",
        "title": "Backlog",
        "cards": []
      }
    ]
  }
]
```

Ghi chu:

- Frontend co the hien thi board list neu moi board co `id`, `title`, `description`, `updatedAt`, `columns`.
- `columns.cards` co the la array rong neu backend muon response nhe hon, nhung frontend hien dang tinh so card tu `columns[].cards.length`.

### 2. Create Board

Tao board moi tu trang `/boards`.

```http
POST /api/boards
```

Request body:

```json
{
  "title": "Roadmap",
  "description": "Planning work for next release"
}
```

Response:

```json
{
  "id": "board-roadmap",
  "title": "Roadmap",
  "description": "Planning work for next release",
  "updatedAt": "2026-05-31T00:00:00.000Z",
  "columns": [
    {
      "id": "col-todo",
      "title": "To Do",
      "cards": []
    },
    {
      "id": "col-progress",
      "title": "In Progress",
      "cards": []
    },
    {
      "id": "col-done",
      "title": "Done",
      "cards": []
    }
  ]
}
```

### 3. Get Board Detail

Lay chi tiet mot board cho trang `/boards/:boardId`.

```http
GET /api/boards/:boardId
```

Response:

```json
{
  "id": "board-product-launch",
  "title": "Product Launch",
  "description": "Coordinate release tasks",
  "updatedAt": "2026-05-29T09:00:00.000Z",
  "columns": [
    {
      "id": "col-backlog",
      "title": "Backlog",
      "cards": [
        {
          "id": "card-positioning",
          "title": "Finalize positioning notes",
          "description": "Collect input from product, sales, and support."
        }
      ]
    }
  ]
}
```

Neu khong tim thay board:

```http
404 Not Found
```

### 4. Create Card

Tao card trong mot column.

```http
POST /api/columns/:columnId/cards
```

Request body:

```json
{
  "title": "Write API contract",
  "description": ""
}
```

Response:

```json
{
  "id": "card-api-contract",
  "title": "Write API contract",
  "description": ""
}
```

### 5. Update Card

Cap nhat title/description cua card tu card detail modal.

```http
PATCH /api/cards/:cardId
```

Request body:

```json
{
  "title": "Write API contract",
  "description": "Document endpoints needed by frontend"
}
```

Response:

```json
{
  "id": "card-api-contract",
  "title": "Write API contract",
  "description": "Document endpoints needed by frontend"
}
```

### 6. Delete Card

Xoa card.

```http
DELETE /api/cards/:cardId
```

Response option 1:

```http
204 No Content
```

Response option 2:

```json
{
  "id": "card-api-contract"
}
```

### 7. Move Card

Di chuyen card sang column khac.

```http
PATCH /api/cards/:cardId/move
```

Request body:

```json
{
  "targetColumnId": "col-progress"
}
```

Response:

```json
{
  "id": "card-api-contract",
  "title": "Write API contract",
  "description": "Document endpoints needed by frontend"
}
```

Khuyen nghi them `position` sau nay neu can drag-and-drop/sap xep trong cung column:

```json
{
  "targetColumnId": "col-progress",
  "position": 2
}
```

## Error Format

Khuyen nghi backend tra loi loi theo format thong nhat:

```json
{
  "message": "Board not found",
  "code": "BOARD_NOT_FOUND"
}
```

Status code goi y:

- `400 Bad Request`: payload sai hoac thieu field bat buoc.
- `404 Not Found`: khong tim thay board/column/card.
- `500 Internal Server Error`: loi server.

## Frontend Service Files To Connect Later

Khi backend san sang, thay mock logic trong cac file frontend sau:

- `fe/src/services/boardService.js`
- `fe/src/services/cardService.js`

Dung helper HTTP da co:

- `fe/src/services/apiClient.js`

Mapping hien tai:

- `getBoards()` -> `GET /api/boards`
- `createBoard(payload)` -> `POST /api/boards`
- `getBoardById(boardId)` -> `GET /api/boards/:boardId`
- `createCard(columnId, payload)` -> `POST /api/columns/:columnId/cards`
- `updateCard(cardId, payload)` -> `PATCH /api/cards/:cardId`
- `deleteCard(cardId)` -> `DELETE /api/cards/:cardId`
- `moveCard(cardId, targetColumnId)` -> `PATCH /api/cards/:cardId/move`
