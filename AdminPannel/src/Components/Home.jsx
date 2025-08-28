import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Home = () => {
  let [msg, setMsg] = useState("")
  useEffect(() => {
    axios.get("http://localhost:8080/home", {
      headers: { Authorization: `${localStorage.getItem("token")}` }
    })
      .then((res) => {
        setMsg(res.data.username)
        console.log(res.data.username)
      })
      .catch(() => {
        setMsg("user not verifed !")
      })
  }, [])
  return (
    <div>
      <h1>Welcome - {msg}</h1>
    </div>
  )
}

export default Home
