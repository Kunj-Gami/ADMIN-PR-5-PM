import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
const Admin = () => {
  let [users,setAllUsers] = useState([])
  useEffect(() => {
    axios.get("http://localhost:8080/adash")
      .then((res) => {
          setAllUsers(res.data.users)
      })
      .catch(() => {
        setAllUsers("Technical error !")
      })
  }, [])
  return (
    <div>
      <h1>Admin Page</h1>
      {
        users.map((e,i)=>{
          return(
            <ul key={i}>
              <li>{e.username}</li>
              <li>{e.email}</li>
              <li>{e.role}</li>
            </ul>
          )
        })
      }
    </div>
  )
}

export default Admin
