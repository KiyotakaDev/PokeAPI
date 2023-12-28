import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<HomePage />} />

        <Route path='*' element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes