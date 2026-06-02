# Frontend API Requirements

Tai lieu nay mo ta cac API frontend Kanban board can de ket noi voi backend theo database hien tai:

```sql
boards(id, title, description, created_at, updated_at)
cards(id, board_id, title, description, status, position, created_at, updated_at)
```

Khong con bang column rieng. Frontend hien thi 4 cot co dinh bang cach group cards theo `status`.

Base URL lay tu bien moi truong frontend:

```env
VITE_API_BASE_URL=http://localhost:YOUR_BACKEND_PORT
```

Tat ca response nen tra ve JSON.

## Response Shape

Backend hien tai co the dung wrapper:

```json
{
  "success": true,
  "message": "Get boards successfully",
  "data": {}
}
```

Neu dung wrapper, frontend se doc payload tu `data`. Neu khong dung wrapper, co the tra truc tiep object/array nhu cac vi du ben duoi. Quan trong la shape trong `data` phai dung.

## Data Models

### Board

```json
{
  "id": "1c0b7a6d-38ef-4f25-a946-f3f445b9b45b",
  "title": "Product Launch",
  "description": "Coordinate release tasks",
  "createdAt": "2026-05-29T09:00:00.000Z",
  "updatedAt": "2026-05-29T09:00:00.000Z",
  "cardCount": 5
}
```

Fields:

- `id`: string UUID, bat buoc.
- `title`: string, bat buoc.
- `description`: string hoac null.
- `createdAt`: string ISO date, map tu `created_at`.
- `updatedAt`: string ISO date, map tu `updated_at`.
- `cardCount`: number, dung cho trang danh sach board. Co the tinh bang `COUNT(cards.id)`.

### Card

```json
{
  "id": "98cc9a08-6225-4f30-b912-e6ed3b853ae2",
  "boardId": "1c0b7a6d-38ef-4f25-a946-f3f445b9b45b",
  "title": "Write API contract",
  "description": "Document endpoints needed by frontend",
  "status": "todo",
  "position": 0,
  "createdAt": "2026-05-29T09:05:00.000Z",
  "updatedAt": "2026-05-29T09:05:00.000Z"
}
```

Fields:

- `id`: string UUID, bat buoc.
- `boardId`: string UUID, map tu `board_id`.
- `title`: string, bat buoc.
- `description`: string hoac null.
- `status`: string, bat buoc. Chi nhan `todo`, `doing`, `review`, `done`.
- `position`: number, dung de sap xep card trong cung status.
- `createdAt`: string ISO date, map tu `created_at`.
- `updatedAt`: string ISO date, map tu `updated_at`.

### Board Detail View

Frontend can board detail co them `columns`. Day la view model derive tu `cards.status`, khong phai database table:

```json
{
  "id": "1c0b7a6d-38ef-4f25-a946-f3f445b9b45b",
  "title": "Product Launch",
  "description": "Coordinate release tasks",
  "createdAt": "2026-05-29T09:00:00.000Z",
  "updatedAt": "2026-05-29T09:00:00.000Z",
  "cardCount": 1,
  "columns": [
    {
      "id": "todo",
      "status": "todo",
      "title": "To Do",
      "cards": []
    },
    {
      "id": "doing",
      "status": "doing",
      "title": "Doing",
      "cards": []
    },
    {
      "id": "review",
      "status": "review",
      "title": "Review",
      "cards": []
    },
    {
      "id": "done",
      "status": "done",
      "title": "Done",
      "cards": []
    }
  ]
}
```

Backend nen sort cards trong moi column theo `position ASC`, sau do co the sort tie-breaker bang `created_at ASC`.

## Status Constants

Frontend dang dung 4 status co dinh:

```json
[
  { "value": "todo", "title": "To Do" },
  { "value": "doing", "title": "Doing" },
  { "value": "review", "title": "Review" },
  { "value": "done", "title": "Done" }
]
```

Database constraint:

```sql
status IN ('todo', 'doing', 'review', 'done')
```

## Required APIs

### 1. Get Boards

Lay danh sach board cho trang `/boards`.

```http
GET /api/boards
```

Response payload:

```json
[
  {
    "id": "1c0b7a6d-38ef-4f25-a946-f3f445b9b45b",
    "title": "Product Launch",
    "description": "Coordinate release tasks",
    "createdAt": "2026-05-29T09:00:00.000Z",
    "updatedAt": "2026-05-29T09:00:00.000Z",
    "cardCount": 5
  }
]
```

Ghi chu:

- Trang board list khong can `columns`.
- Neu backend da co san board detail shape thi co the tra them `columns`, frontend van dung duoc.

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

Response payload:

```json
{
  "id": "f5bb989c-5132-4893-b19b-4f43dcf5062d",
  "title": "Roadmap",
  "description": "Planning work for next release",
  "createdAt": "2026-05-31T00:00:00.000Z",
  "updatedAt": "2026-05-31T00:00:00.000Z",
  "cardCount": 0
}
```

Backend chi insert vao `boards`. Khong can tao columns.

### 3. Get Board Detail

Lay chi tiet mot board cho trang `/boards/:boardId`.

```http
GET /api/boards/:boardId
```

Response payload:

```json
{
  "id": "1c0b7a6d-38ef-4f25-a946-f3f445b9b45b",
  "title": "Product Launch",
  "description": "Coordinate release tasks",
  "createdAt": "2026-05-29T09:00:00.000Z",
  "updatedAt": "2026-05-29T09:00:00.000Z",
  "cardCount": 2,
  "columns": [
    {
      "id": "todo",
      "status": "todo",
      "title": "To Do",
      "cards": [
        {
          "id": "98cc9a08-6225-4f30-b912-e6ed3b853ae2",
          "boardId": "1c0b7a6d-38ef-4f25-a946-f3f445b9b45b",
          "title": "Write API contract",
          "description": "Document endpoints needed by frontend",
          "status": "todo",
          "position": 0,
          "createdAt": "2026-05-29T09:05:00.000Z",
          "updatedAt": "2026-05-29T09:05:00.000Z"
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

Tao card trong mot board va mot status.

```http
POST /api/boards/:boardId/cards
```

Request body:

```json
{
  "title": "Write API contract",
  "description": "",
  "status": "todo"
}
```

Response payload:

```json
{
  "id": "98cc9a08-6225-4f30-b912-e6ed3b853ae2",
  "boardId": "1c0b7a6d-38ef-4f25-a946-f3f445b9b45b",
  "title": "Write API contract",
  "description": "",
  "status": "todo",
  "position": 0,
  "createdAt": "2026-05-31T00:00:00.000Z",
  "updatedAt": "2026-05-31T00:00:00.000Z"
}
```

Ghi chu:

- Neu request khong gui `status`, backend co the default la `todo`.
- `position` nen la vi tri cuoi trong cung `board_id + status`.

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

Response payload:

```json
{
  "id": "98cc9a08-6225-4f30-b912-e6ed3b853ae2",
  "boardId": "1c0b7a6d-38ef-4f25-a946-f3f445b9b45b",
  "title": "Write API contract",
  "description": "Document endpoints needed by frontend",
  "status": "todo",
  "position": 0,
  "createdAt": "2026-05-31T00:00:00.000Z",
  "updatedAt": "2026-05-31T00:10:00.000Z"
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
  "id": "98cc9a08-6225-4f30-b912-e6ed3b853ae2"
}
```

### 7. Move Card

Doi status cua card.

```http
PATCH /api/cards/:cardId/move
```

Request body:

```json
{
  "targetStatus": "doing"
}
```

Response payload:

```json
{
  "id": "98cc9a08-6225-4f30-b912-e6ed3b853ae2",
  "boardId": "1c0b7a6d-38ef-4f25-a946-f3f445b9b45b",
  "title": "Write API contract",
  "description": "Document endpoints needed by frontend",
  "status": "doing",
  "position": 0,
  "createdAt": "2026-05-31T00:00:00.000Z",
  "updatedAt": "2026-05-31T00:15:00.000Z"
}
```

Khuyen nghi them `position` sau nay neu can drag-and-drop/sap xep trong cung status:

```json
{
  "targetStatus": "doing",
  "position": 2
}
```

## SQL Mapping Notes

Nen map snake_case tu database sang camelCase cho frontend:

- `created_at` -> `createdAt`
- `updated_at` -> `updatedAt`
- `board_id` -> `boardId`

Query goi y cho board list:

```sql
SELECT
  b.id,
  b.title,
  b.description,
  b.created_at,
  b.updated_at,
  COUNT(c.id)::int AS card_count
FROM boards b
LEFT JOIN cards c ON c.board_id = b.id
GROUP BY b.id
ORDER BY b.updated_at DESC;
```

Query goi y cho cards cua board:

```sql
SELECT id, board_id, title, description, status, position, created_at, updated_at
FROM cards
WHERE board_id = $1
ORDER BY status ASC, position ASC, created_at ASC;
```

## Error Format

Khuyen nghi backend tra loi loi theo format thong nhat:

```json
{
  "success": false,
  "message": "Board not found",
  "code": "BOARD_NOT_FOUND"
}
```

Status code goi y:

- `400 Bad Request`: payload sai hoac thieu field bat buoc.
- `404 Not Found`: khong tim thay board/card.
- `500 Internal Server Error`: loi server.

## Frontend Service Files To Connect Later

Khi backend san sang, thay mock logic trong cac file frontend sau:

- `fe/src/services/boardService.js`
- `fe/src/services/cardService.js`

Dung helper HTTP da co:

- `fe/src/services/apiClient.js`

Mapping moi:

- `getBoards()` -> `GET /api/boards`
- `createBoard(payload)` -> `POST /api/boards`
- `getBoardById(boardId)` -> `GET /api/boards/:boardId`
- `createCard(boardId, status, payload)` -> `POST /api/boards/:boardId/cards`
- `updateCard(cardId, payload)` -> `PATCH /api/cards/:cardId`
- `deleteCard(cardId)` -> `DELETE /api/cards/:cardId`
- `moveCard(cardId, targetStatus)` -> `PATCH /api/cards/:cardId/move`
