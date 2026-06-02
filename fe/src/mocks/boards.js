export const mockBoards = [
  {
    id: 'board-product-launch',
    title: 'Product Launch',
    description: 'Coordinate release tasks, copy, QA, and launch readiness.',
    updatedAt: '2026-05-29T09:00:00.000Z',
    columns: [
      {
        id: 'col-backlog',
        title: 'Backlog',
        cards: [
          {
            id: 'card-positioning',
            title: 'Finalize positioning notes',
            description:
              'Collect input from product, sales, and support before the announcement draft is locked.',
          },
          {
            id: 'card-beta-feedback',
            title: 'Review beta feedback',
            description:
              'Tag feedback by severity and identify items that must ship before public launch.',
          },
        ],
      },
      {
        id: 'col-progress',
        title: 'In Progress',
        cards: [
          {
            id: 'card-pricing-page',
            title: 'Update pricing page content',
            description:
              'Replace placeholder copy and verify the plan comparison table on mobile.',
          },
        ],
      },
      {
        id: 'col-review',
        title: 'Review',
        cards: [
          {
            id: 'card-qa-checklist',
            title: 'Run launch QA checklist',
            description:
              'Confirm analytics events, broken links, responsive layouts, and empty states.',
          },
        ],
      },
      {
        id: 'col-done',
        title: 'Done',
        cards: [
          {
            id: 'card-release-brief',
            title: 'Share release brief',
            description:
              'Send the final brief to stakeholders and add the recording link.',
          },
        ],
      },
    ],
  },
  {
    id: 'board-design-system',
    title: 'Design System',
    description: 'Track component cleanup and documentation tasks.',
    updatedAt: '2026-05-27T14:30:00.000Z',
    columns: [
      {
        id: 'col-ds-next',
        title: 'Next',
        cards: [
          {
            id: 'card-button-states',
            title: 'Audit button states',
            description: 'Compare hover, focus, disabled, and loading states.',
          },
        ],
      },
      {
        id: 'col-ds-building',
        title: 'Building',
        cards: [
          {
            id: 'card-form-guidelines',
            title: 'Draft form guidelines',
            description: 'Cover labels, help text, validation, and error copy.',
          },
        ],
      },
      {
        id: 'col-ds-complete',
        title: 'Complete',
        cards: [],
      },
    ],
  },
]
