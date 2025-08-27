import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

const Login = () => {
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
 

  let handleLogIn = (() => {
    axios.post("http://localhost:8080/login", { email, password })
      .then((res) => {
        return (
          localStorage.setItem("token", res.data.token)
        )
      }
      )
      .catch((err) => alert(err))
  })
  return (
    <div>
      <h1>Log in</h1>
      <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
      <button onClick={handleLogIn}>Log in</button>
      <Link to="/signup">Sign up</Link>
    </div>
  )
}

export default Login
