import React from 'react'
import jsPDF from 'jspdf'

import { FaSave } from 'react-icons/fa'
import { FaPrint } from 'react-icons/fa6'

import logo from '../../../images/logo.jpeg'

const ReportHeader = () => {
    const generatePdf = () => {
        // var doc = new jsPDF('p', 'px', 'a4', true)
        const doc = new jsPDF({
            orientation: 'portrait',
            format: 'letter',
            compress: true,
            unit: 'px', 
            hotfixes: ['px_scaling']
        })

        const element: any = document.body.cloneNode(true)
        element.classList.add('print')

        doc.html(element, {
            // callback: function (doc) {
            //     doc.save();
            // }
            callback: function () {
                window.open(doc.output('bloburl')); // to debug
               },
        });
    }

    return (
        <div className='report-header'>
            <img src={logo} alt="Relatório de abate" />
            RELATÓRIO DE ABATE

            <div className='buttons'>
                <button onClick={window.print}>
                    <FaPrint size={24} color='#ff19d5' />
                </button>
                {/* <button onClick={generatePdf}>
                    <FaSave size={24} color='#ff19d5' />
                </button> */}
            </div>
        </div>
    )
}

export default ReportHeader