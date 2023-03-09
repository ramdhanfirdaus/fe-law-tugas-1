import {useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import AuthService from "../../service/auth/AuthService";

export function Logout() {
  useEffect(() => {
    AuthService.logout()
    document.location.reload()
  }, [])

  return (
    <Navigate to='/auth/login' />
  )
}
