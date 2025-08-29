import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const Forgot = () => {
  let [forgotEmail,setForgotEmail] = useState("")
  let handleForgotOtp = (()=>{
    axios.post("http://localhost:8080/forgot",{forgotEmail})
    .then((res)=>alert(res.data.message))
    .catch((err)=> alert(err))
  })
  return (
    <div>
      <h1>Forgot</h1>
      <input type="email" onChange={(e)=>setForgotEmail(e.target.value)} value={forgotEmail} />
      <button onClick={handleForgotOtp}>Get OTP</button>
    </div>
  )
}

export default Forgot
