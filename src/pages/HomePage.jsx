import React from 'react'
import PokeList from '../components/PokeList'

const HomePage = () => {
  return (
    <>
      <div className='relative h-screen w-full bg-pokemon-purple-300'>
        <PokeList />
      </div>
    </>
  )
}

export default HomePage