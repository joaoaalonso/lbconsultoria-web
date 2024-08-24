import 'react-responsive-modal/styles.css'

import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'
import { BiPlus } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

import Card from '../../components/Card'
import TextField from '../../components/TextField'
import ScreenTemplate from '../../components/ScreenTemplate'

import { getEmployees, User } from '../../services/users'

const EmployeeListScreen = () => {
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [employees, setEmployees] = useState<User[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        getEmployees()
            .then(setEmployees)
            .catch(e => swal('', e.message, 'error'))
            .finally(() => setLoading(false))
    }, [])

    const getFilteredEmployees = () => {
        return employees.filter(employee => {
            return employee.name.toLowerCase().includes(searchTerm.toLowerCase())
        })
    }

    return (
        <ScreenTemplate
            title='Funcionários'
            noBackground
            rightComponent={
                <BiPlus
                    size={25}
                    className='svg-button'
                    onClick={() => navigate('/funcionarios/adicionar')}
                />
            }
        >
            <>
                {!loading && <TextField placeholder='Pesquisar' onChange={setSearchTerm} />}
                
                {getFilteredEmployees().map(employee => (
                    <Link key={employee.id} to={`/funcionarios/${employee.id}`}>
                        <Card text={employee.name} />
                    </Link>
                ))}
                
                {!!loading && <p>Carregando lista de funcionários...</p>}
                {!loading && !employees.length && <p>Nenhum funcionário cadastrado</p>}
                {!!employees.length && !getFilteredEmployees().length && <p>Nenhum funcionário encontrado</p>}
            </>
        </ScreenTemplate>
    )
}

export default EmployeeListScreen