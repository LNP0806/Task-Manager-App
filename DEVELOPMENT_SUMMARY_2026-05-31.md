# Development Summary - 2026-05-31

## Tong quan

Hom nay da xay dung phan frontend cho ung dung Kanban board kieu Trello, dung stack co san cua project:

- React
- Vite
- Tailwind CSS
- React Router

Khong them backend logic, authentication, payment, notification, chat, calendar, hoac cac tinh nang nang cao.

## Frontend da hoan thanh

Thu muc frontend: `fe/`

### Routing

Da them React Router voi cac route:

- `/` redirect sang `/boards`
- `/boards`: trang danh sach boards
- `/boards/:boardId`: trang chi tiet board
- route khong hop le redirect ve `/boards`

File chinh:

- `fe/src/router/AppRouter.jsx`
- `fe/src/App.jsx`

### Boards Page

Da tao trang danh sach board:

- Hien thi board theo dang grid.
- Tao board moi bang frontend state/mock data.
- Mo board detail khi click vao mot board.

File chinh:

- `fe/src/pages/BoardsPage.jsx`
- `fe/src/components/boards/BoardCard.jsx`
- `fe/src/components/boards/CreateBoardForm.jsx`

### Board Detail Page

Da tao trang chi tiet board:

- Hien thi title va description cua board.
- Hien thi nhieu column/list.
- Hien thi cards/tasks ben trong column.
- Tao column moi.
- Tao card moi trong tung column.
- Xoa card.
- Mo modal chi tiet card.
- Chinh sua title va description cua card.
- Di chuyen card sang column khac thong qua dropdown status trong modal.

File chinh:

- `fe/src/pages/BoardDetailPage.jsx`
- `fe/src/components/columns/KanbanColumn.jsx`
- `fe/src/components/columns/CreateColumnForm.jsx`
- `fe/src/components/cards/CardItem.jsx`
- `fe/src/components/cards/CardDetailModal.jsx`

### UI va Layout

Da thay starter Vite UI bang giao dien Kanban responsive:

- Layout sach, hien dai.
- Ho tro desktop tot.
- Co responsive co ban cho mobile.
- Dung Tailwind CSS.
- Khong dung external UI component library.

File chinh:

- `fe/src/index.css`
- `fe/src/components/layout/AppLayout.jsx`
- `fe/src/components/ui/Button.jsx`
- `fe/src/components/ui/Field.jsx`

## Mock data va service layer

Da tao mock data va service layer de frontend chay doc lap khi chua co backend.

Mock data:

- `fe/src/mocks/boards.js`

Service files:

- `fe/src/services/apiClient.js`
- `fe/src/services/boardService.js`
- `fe/src/services/cardService.js`
- `fe/src/services/mockStore.js`

Utility:

- `fe/src/utils/ids.js`

Hien tai data duoc clone tu mock data va mutate trong memory store. Khi reload browser, data se quay ve mock ban dau.

## API preparation

Da tao file mo ta API frontend can backend cung cap:

- `be/FRONTEND_API_REQUIREMENTS.md`

File nay gom:

- Data model `Board`, `Column`, `Card`
- Endpoint can co
- Request body mau
- Response mau
- Error format de xuat
- Mapping tu frontend service sang backend API

Backend sau nay co the thay mock calls trong:

- `fe/src/services/boardService.js`
- `fe/src/services/cardService.js`

bang HTTP calls qua:

- `fe/src/services/apiClient.js`

Bien moi truong frontend dung cho backend:

```env
VITE_API_BASE_URL=http://localhost:YOUR_BACKEND_PORT
```

## Dependency da them

Da cai them:

```bash
npm install react-router-dom
```

Vi user yeu cau routing bang React Router.

## Cach chay frontend

Tu thu muc frontend:

```bash
cd fe
npm run dev
```

Mo tren browser:

```text
http://localhost:5173/boards
```

Neu Vite dung port khac, xem URL hien trong terminal sau khi chay `npm run dev`.

## Lenh da verify

Da chay thanh cong:

```bash
npm run lint
npm run build
```

Ket qua:

- ESLint pass.
- Vite production build pass.

## Cac file frontend quan trong da tao/sua

- `fe/src/App.jsx`
- `fe/src/index.css`
- `fe/src/router/AppRouter.jsx`
- `fe/src/pages/BoardsPage.jsx`
- `fe/src/pages/BoardDetailPage.jsx`
- `fe/src/components/layout/AppLayout.jsx`
- `fe/src/components/boards/BoardCard.jsx`
- `fe/src/components/boards/CreateBoardForm.jsx`
- `fe/src/components/columns/KanbanColumn.jsx`
- `fe/src/components/columns/CreateColumnForm.jsx`
- `fe/src/components/cards/CardItem.jsx`
- `fe/src/components/cards/CardDetailModal.jsx`
- `fe/src/components/ui/Button.jsx`
- `fe/src/components/ui/Field.jsx`
- `fe/src/mocks/boards.js`
- `fe/src/services/apiClient.js`
- `fe/src/services/boardService.js`
- `fe/src/services/cardService.js`
- `fe/src/services/mockStore.js`
- `fe/src/utils/ids.js`
- `fe/package.json`
- `fe/package-lock.json`

Da xoa starter style khong can nua:

- `fe/src/App.css`

## Trang thai hien tai

Frontend da co the chay doc lap bang mock data.

Nhung han che hien tai:

- Data chua persist sau khi reload browser.
- Chua goi backend that.
- Move card hien tai lam bang dropdown status trong modal, chua co drag-and-drop.
- Chua co quan ly position card trong cung mot column.

## Buoc phat trien tiep theo

Backend nen implement cac API trong:

- `be/FRONTEND_API_REQUIREMENTS.md`

Sau khi backend san sang:

1. Tao file `.env` trong `fe/` neu can:

```env
VITE_API_BASE_URL=http://localhost:YOUR_BACKEND_PORT
```

2. Thay logic mock trong:

- `fe/src/services/boardService.js`
- `fe/src/services/cardService.js`

3. Dung `apiRequest` tu:

- `fe/src/services/apiClient.js`

4. Chay lai:

```bash
npm run lint
npm run build
```
