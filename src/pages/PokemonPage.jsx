import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import usePokemonStore from '../store/pokemonStore'

const PokemonPage = () => {
  const { pokemonByID, fetchPokemonByID } = usePokemonStore()
  const { id } = useParams()

  useEffect(() => {
    return () => fetchPokemonByID(id)
  }, [fetchPokemonByID, id])
  

  return (
    <div className='bg-pokemon-purple h-screen w-full text-white'>
      {pokemonByID ? (
        <div>
          <h2>{pokemonByID.name}</h2>
          <span>{pokemonByID.id}</span>
          <img className='w-40 h-auto' src={pokemonByID.sprite} alt={pokemonByID.name} />
          <div className=''>
            {pokemonByID.types ? pokemonByID.types.map((type) => (
              <span key={type.name} className={`${type.name} p-2 m-4 rounded-lg`}>{type.name}</span>
            )): null}
          </div>
          {console.log(pokemonByID)}
        </div>
      ) : null}
      <Link to="/">Back to home page</Link>
    </div>
  )
}

export default PokemonPage