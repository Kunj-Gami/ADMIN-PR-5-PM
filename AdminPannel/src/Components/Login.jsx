import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

  return (
    <div>
        <h1>Log in</h1>
        <input type="text" />

        <Link to="/signup">Sign up</Link>
    </div>
  )
}

export default Login
