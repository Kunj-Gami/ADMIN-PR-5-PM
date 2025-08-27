import React, { useState } from 'react'
import axios from 'axios'

const Signup = () => {
  let [email,setemail] = useState("")
  let [password,setPassword] = useState("")

  let handleSignup = (()=>{
    axios.post("http://localhost:8080/signup",{email,password})
    .then((res)=> console.log(res))
    .catch((err)=> console.log(err))
  })
  return (
    <div>
        <h1>Sign up</h1>
        <input type="email" onChange={(e)=>setemail(e.target.value)} value={email}/>
        <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
        <button onClick={handleSignup}>Sign up</button>

        
    </div>
  )
}

export default Signup
