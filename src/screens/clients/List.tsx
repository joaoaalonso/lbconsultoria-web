import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'
import { BiPlus } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

import Card from '../../components/Card'
import TextField from '../../components/TextField'
import ScreenTemplate from '../../components/ScreenTemplate'

import { getClients, User } from '../../services/users'
import SkeletonCard from '../../components/Card/skeleton'

const ClientListScreen = () => {
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [clients, setClients] = useState<User[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        getClients()
            .then(setClients)
            .catch(e => swal('', e.message, 'error'))
            .finally(() => setLoading(false))
    }, [])

    const getFilteredClients = () => {
        return clients.filter(client => {
            return client.name.toLowerCase().includes(searchTerm.toLowerCase())
        })
    }

    return (
        <ScreenTemplate
            title='Clientes'
            noBackground
            rightComponent={<BiPlus onClick={() => navigate('/clientes/adicionar')} size={25} className='svg-button' />}
        >
            <>
                {<TextField placeholder='Pesquisar' onChange={setSearchTerm} />}
                
                {loading && [...Array(15)].map((item, i) => <SkeletonCard />)}
                {getFilteredClients().map(client => (
                    <Link key={client.id} to={`/clientes/${client.id}`}>
                        <Card text={client.name} />
                    </Link>
                ))}
                
                {!loading && !clients.length && <p>Nenhum cliente cadastrado</p>}
                {!!clients.length && !getFilteredClients().length && <p>Nenhum cliente encontrado</p>}
            </>
        </ScreenTemplate>
    )
}

export default ClientListScreen