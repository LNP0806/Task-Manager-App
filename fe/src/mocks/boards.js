export const mockBoards = [
  {
    id: 'board-product-launch',
    title: 'Product Launch',
    description: 'Coordinate release tasks, copy, QA, and launch readiness.',
    createdAt: '2026-05-29T09:00:00.000Z',
    updatedAt: '2026-05-29T09:00:00.000Z',
  },
  {
    id: 'board-design-system',
    title: 'Design System',
    description: 'Track component cleanup and documentation tasks.',
    createdAt: '2026-05-27T14:30:00.000Z',
    updatedAt: '2026-05-27T14:30:00.000Z',
  },
]

export const mockCards = [
  {
    id: 'card-positioning',
    boardId: 'board-product-launch',
    title: 'Finalize positioning notes',
    description:
      'Collect input from product, sales, and support before the announcement draft is locked.',
    status: 'todo',
    position: 0,
    createdAt: '2026-05-29T09:05:00.000Z',
    updatedAt: '2026-05-29T09:05:00.000Z',
  },
  {
    id: 'card-beta-feedback',
    boardId: 'board-product-launch',
    title: 'Review beta feedback',
    description:
      'Tag feedback by severity and identify items that must ship before public launch.',
    status: 'todo',
    position: 1,
    createdAt: '2026-05-29T09:10:00.000Z',
    updatedAt: '2026-05-29T09:10:00.000Z',
  },
  {
    id: 'card-pricing-page',
    boardId: 'board-product-launch',
    title: 'Update pricing page content',
    description:
      'Replace placeholder copy and verify the plan comparison table on mobile.',
    status: 'doing',
    position: 0,
    createdAt: '2026-05-29T09:15:00.000Z',
    updatedAt: '2026-05-29T09:15:00.000Z',
  },
  {
    id: 'card-qa-checklist',
    boardId: 'board-product-launch',
    title: 'Run launch QA checklist',
    description:
      'Confirm analytics events, broken links, responsive layouts, and empty states.',
    status: 'review',
    position: 0,
    createdAt: '2026-05-29T09:20:00.000Z',
    updatedAt: '2026-05-29T09:20:00.000Z',
  },
  {
    id: 'card-release-brief',
    boardId: 'board-product-launch',
    title: 'Share release brief',
    description:
      'Send the final brief to stakeholders and add the recording link.',
    status: 'done',
    position: 0,
    createdAt: '2026-05-29T09:25:00.000Z',
    updatedAt: '2026-05-29T09:25:00.000Z',
  },
  {
    id: 'card-button-states',
    boardId: 'board-design-system',
    title: 'Audit button states',
    description: 'Compare hover, focus, disabled, and loading states.',
    status: 'todo',
    position: 0,
    createdAt: '2026-05-27T14:35:00.000Z',
    updatedAt: '2026-05-27T14:35:00.000Z',
  },
  {
    id: 'card-form-guidelines',
    boardId: 'board-design-system',
    title: 'Draft form guidelines',
    description: 'Cover labels, help text, validation, and error copy.',
    status: 'doing',
    position: 0,
    createdAt: '2026-05-27T14:40:00.000Z',
    updatedAt: '2026-05-27T14:40:00.000Z',
  },
]
