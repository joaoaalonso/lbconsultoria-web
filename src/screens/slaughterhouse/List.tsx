// import 'react-responsive-modal/styles.css'

import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'
import { BiPlus } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

import Card from '../../components/Card'
import TextField from '../../components/TextField'
import ScreenTemplate from '../../components/ScreenTemplate'

import { getSlaughterhouses, Slaughterhouse } from '../../services/slaughterhouse'

const SlaugtherhouseListScreen = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [slaughterhouses, setSlaughterhouses] = useState<Slaughterhouse[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        getSlaughterhouses()
            .then(setSlaughterhouses)
            .catch(swal)
    }, [])

    function fetch() {
    }

    function getFilteredSlaughterhouses() {
        return slaughterhouses.filter(slaughterhouse => {
            return slaughterhouse.name.toLowerCase().includes(searchTerm.toLowerCase())
        })
    }


    return (
        <ScreenTemplate
            title='Abatedouros'
            noBackground
            rightComponent={<BiPlus size={25} onClick={() => navigate('/abatedouros/adicionar')} className='svg-button' />}
        >
            <>
                <TextField placeholder='Pesquisar' onChange={setSearchTerm} />

                {getFilteredSlaughterhouses().map(slaughterhouse => (
                    <Link key={slaughterhouse.id} to={`/abatedouros/${slaughterhouse.id}`}>
                        <Card text={slaughterhouse.name} />
                    </Link>
                ))}

                {!slaughterhouses.length && <p>Nenhum abatedouro cadastrado</p>}
                {!!slaughterhouses.length && !getFilteredSlaughterhouses().length && <p>Nenhum abatedouro encontrado</p>}

                {/* <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                    <div style={{ width: 400, padding: 24, paddingTop: 36 }}>
                        <SlaughterhouseForm onSave={handleOnSave} />
                    </div>
                </Modal> */}
            </>
        </ScreenTemplate>
    )
}

export default SlaugtherhouseListScreen