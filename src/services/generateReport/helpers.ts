type SectionBody = {
  margin?: number[]
  stack?: unknown[]
  [key: string]: unknown
}

export const renderSection = (title: string, body: SectionBody) => {
  body.margin = [8, 0, 8, 8]

  return {
    stack: [
      {
        table: {
          widths: ['*'],
          body: [
            [
              {
                text: title.toUpperCase(),
                bold: true,
                margin: [8, 0],
                color: '#fff',
              },
            ],
          ],
        },
        fillColor: '#ff19d5',
        layout: 'noBorders',
      },
      body,
    ],
  }
}

export const rowDividerLayout = {
  hLineWidth: (i: number, node: { table: { body: unknown[] } }) =>
    i === 0 || i === node.table.body.length ? 0 : 0.5,
  vLineWidth: () => 0,
  hLineColor: () => '#e0e0e0',
}

export const renderProperty = (name: string, value: string) => {
  return {
    columns: [
      { text: `${name.toUpperCase()}: `, width: 'auto' },
      { text: ' ', width: 2 },
      { text: value.toUpperCase(), bold: true, width: 'auto' },
    ],
  }
}
