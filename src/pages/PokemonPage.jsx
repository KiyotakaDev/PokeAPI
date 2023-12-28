import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PokemonPage = () => {
  const { id } = useParams()

  return (
    <div>
      <h2>Welcome to the pokemon #{id} page</h2>
      <Link to="/">Back to home page</Link>
    </div>
  )
}

export default PokemonPage