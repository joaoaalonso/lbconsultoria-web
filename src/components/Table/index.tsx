import './index.css'

import React from 'react'

interface TableProps {
    title?: string;
    children: JSX.Element;
    center?: boolean;
    righComponent?: JSX.Element;
}


function Table({ title, righComponent, children, center = false }: TableProps) {
    return (
        <div className='custom-table-wrapper'>
            <div className='custom-table-title'>
                {!!title && <p>{title}</p>}
                {righComponent}
            </div>
            <div className='custom-table-content'>
                <table className={`custom-table ${center ? 'center' : ''}`}>
                    {children}
                </table>
            </div>
        </div>
    )
}

export default Table