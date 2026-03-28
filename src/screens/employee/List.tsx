import React, { useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

import Card from '../../components/Card'
import TextField from '../../components/TextField'
import ScreenTemplate from '../../components/ScreenTemplate'

import { getEmployees, User } from '../../services/users'
import SkeletonCard from '../../components/Card/skeleton'
import { useEntityList } from '../../hooks/useEntityList'

const EmployeeListScreen = () => {
  const { loading, data: employees } = useEntityList<User>(getEmployees)
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()

  const getFilteredEmployees = () =>
    employees.filter((employee) => employee.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <ScreenTemplate
      title="Funcionários"
      noBackground
      rightComponent={
        <BiPlus
          size={25}
          className="svg-button"
          onClick={() => navigate('/funcionarios/adicionar')}
        />
      }
    >
      <>
        {<TextField placeholder="Pesquisar" onChange={setSearchTerm} />}

        {loading && [...Array(5)].map((item, i) => <SkeletonCard key={`skeleton-${i}`} />)}
        {getFilteredEmployees().map((employee) => (
          <Link key={employee.id} to={`/funcionarios/${employee.id}`}>
            <Card text={employee.name} />
          </Link>
        ))}

        {!loading && !employees.length && <p>Nenhum funcionário cadastrado</p>}
        {!!employees.length && !getFilteredEmployees().length && (
          <p>Nenhum funcionário encontrado</p>
        )}
      </>
    </ScreenTemplate>
  )
}

export default EmployeeListScreen
