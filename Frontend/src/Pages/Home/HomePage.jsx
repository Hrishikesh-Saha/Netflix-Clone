import React, { useEffect } from 'react'
import HomeScreen from './HomeScreen'
import AuthScreen from './AuthScreen'
import { authUser } from '../../store/authUser'

const HomePage = () => {

  const {user}  = authUser()
  return (
    <div>{user ? <HomeScreen/> : <AuthScreen/>}</div>
  )
}

export default HomePage
