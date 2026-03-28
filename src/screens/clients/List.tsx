import React, { useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

import Card from '../../components/Card'
import TextField from '../../components/TextField'
import ScreenTemplate from '../../components/ScreenTemplate'

import { getClients, User } from '../../services/users'
import SkeletonCard from '../../components/Card/skeleton'
import { useEntityList } from '../../hooks/useEntityList'

const ClientListScreen = () => {
  const { loading, data: clients } = useEntityList<User>(getClients)
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()

  const getFilteredClients = () =>
    clients.filter((client) => client.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <ScreenTemplate
      title="Clientes"
      noBackground
      rightComponent={
        <BiPlus onClick={() => navigate('/clientes/adicionar')} size={25} className="svg-button" />
      }
    >
      <>
        {<TextField placeholder="Pesquisar" onChange={setSearchTerm} />}

        {loading && [...Array(15)].map((item, i) => <SkeletonCard key={`skeleton-${i}`} />)}
        {getFilteredClients().map((client) => (
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
