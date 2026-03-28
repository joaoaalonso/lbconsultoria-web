import React from 'react'
import { BiPlus } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

import PrematureCard from '../../components/PrematureCard'
import ScreenTemplate from '../../components/ScreenTemplate'

import { getPrematures, Premature } from '../../services/prematures'
import SkeletonPrematureCard from '../../components/PrematureCard/skeleton'
import { useEntityList } from '../../hooks/useEntityList'

const PrematureListScreen = () => {
  const { loading, data: prematures } = useEntityList<Premature>(getPrematures)

  const navigate = useNavigate()

  return (
    <ScreenTemplate
      title="Precoce"
      noBackground
      rightComponent={
        <BiPlus size={25} className="svg-button" onClick={() => navigate('/precoce/adicionar')} />
      }
    >
      <>
        {!loading && !prematures.length && <p>Nenhum cadastro</p>}
        {loading &&
          [...Array(15)].map((item, i) => <SkeletonPrematureCard key={`skeleton-${i}`} />)}
        {prematures.map((premature) => (
          <Link key={`premature-${premature.id}`} to={`/precoce/${premature.id}`}>
            <PrematureCard premature={premature} />
          </Link>
        ))}
      </>
    </ScreenTemplate>
  )
}

export default PrematureListScreen
