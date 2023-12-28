import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import PokemonPage from '../pages/PokemonPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<HomePage />} />
        <Route path='pokemon/:id' element={<PokemonPage />} />

        <Route path='*' element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes