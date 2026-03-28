import React, { useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

import Card from '../../components/Card'
import TextField from '../../components/TextField'
import ScreenTemplate from '../../components/ScreenTemplate'

import { getSlaughterhouses, Slaughterhouse } from '../../services/slaughterhouse'
import SkeletonCard from '../../components/Card/skeleton'
import { useEntityList } from '../../hooks/useEntityList'

const SlaugtherhouseListScreen = () => {
  const { loading, data: slaughterhouses } = useEntityList<Slaughterhouse>(getSlaughterhouses)
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()

  const getFilteredSlaughterhouses = () =>
    slaughterhouses.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <ScreenTemplate
      title="Abatedouros"
      noBackground
      rightComponent={
        <BiPlus
          size={25}
          onClick={() => navigate('/abatedouros/adicionar')}
          className="svg-button"
        />
      }
    >
      <>
        {<TextField placeholder="Pesquisar" onChange={setSearchTerm} />}

        {loading && [...Array(15)].map((item, i) => <SkeletonCard key={`skeleton-${i}`} />)}
        {getFilteredSlaughterhouses().map((slaughterhouse) => (
          <Link key={slaughterhouse.id} to={`/abatedouros/${slaughterhouse.id}`}>
            <Card text={slaughterhouse.name} />
          </Link>
        ))}

        {!loading && !slaughterhouses.length && <p>Nenhum abatedouro cadastrado</p>}
        {!!slaughterhouses.length && !getFilteredSlaughterhouses().length && (
          <p>Nenhum abatedouro encontrado</p>
        )}
      </>
    </ScreenTemplate>
  )
}

export default SlaugtherhouseListScreen
