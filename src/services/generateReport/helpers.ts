export const renderSection = (title: string, body: any) => {
    body.margin = [8, 0, 8, 8]

    return {
        stack: [
            {
                table: {
                    widths: ['*'],
                    body: [
                        [{ 
                            text: title.toUpperCase(), 
                            bold: true, 
                            margin: [8, 0], 
                            color: '#fff',
                        }]
                    ]
                },
                fillColor: '#ff19d5',
                layout: 'noBorders'
            },
            body
        ]
    }
}


export const renderProperty = (name: string, value: string) => {
    return {
        columns: [
            { text: `${name.toUpperCase()}: `, width: 'auto' },
            { text: ' ', width: 2 },
            { text: value.toUpperCase(), bold: true, width: 'auto'  }
        ]
    }
}