import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Signup = () => {
  let [email,setemail] = useState("")
  let [password,setPassword] = useState("")

  let handleSignup = (()=>{
    axios.post("http://localhost:8080/signup",{email,password})
    .then((res)=> alert(res.data.message))
    .catch((err)=> alert(err))
  })
  return (
    <div>
        <h1>Sign up</h1>
        <input type="email" onChange={(e)=>setemail(e.target.value)} value={email}/>
        <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
        <Link to="/"><button onClick={handleSignup}>Sign up</button></Link>

        
    </div>
  )
}

export default Signup
