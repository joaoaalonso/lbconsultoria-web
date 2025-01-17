import React, { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

import PrematureCard from '../../components/PrematureCard'
import ScreenTemplate from '../../components/ScreenTemplate'

import { getPrematures, Premature } from '../../services/prematures'
import SkeletonPrematureCard from '../../components/PrematureCard/skeleton'

const PrematureListScreen = () => {
    const [loading, setLoading] = useState(true)
    const [prematures, setPrematures] = useState<Premature[]>([])
    
    const navigate = useNavigate()

    useEffect(() => {
        getPrematures()
            .then(setPrematures)
            .finally(() => setLoading(false))
    }, [])
    
    return (
        <ScreenTemplate
            title='Precoce'
            noBackground
            rightComponent={
                <BiPlus
                    size={25}
                    className='svg-button'
                    onClick={() => navigate('/precoce/adicionar')}
                />
            }
        >
            <>
                {!loading && !prematures.length && <p>Nenhum cadastro</p>}
                {loading && [...Array(15)].map((item, i) => <SkeletonPrematureCard />)}
                {prematures.map(premature => (
                    <Link key={`premature-${premature.id}`} to={`/precoce/${premature.id}`}>
                        <PrematureCard premature={premature} />
                    </Link>
                ))}
            </>
        </ScreenTemplate>
    )
}

export default PrematureListScreen