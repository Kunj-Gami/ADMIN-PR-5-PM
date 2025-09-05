import  { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const SuperAdmin = () => {
  let [users,setAllUsers] = useState([])
  useEffect(() => {
    axios.get("http://localhost:8080/spdash")
      .then((res) => {
          setAllUsers(res.data.users)
      })
      .catch(() => {
        setAllUsers("Technical error !")
      })
  }, [])

  let handleRoles = ((r,id)=>{

      let role = r.target.value

      axios.post("http://localhost:8080/sprole",{role , id})
      .then((res)=>{
        alert(res.data.message)
      })
      .catch((err)=>{
        console.log(err)
      })
  })

  return (
    <div>
      <h1>SuperAdmin</h1>
      {
        users.map((e,i)=>{
          return(
            <ul key={i}>
              <li>{e.username}</li>
              <li>{e.email}</li>
              <li>{e.role}</li>
              <select defaultValue={e.role} onChange={(r)=>handleRoles(r,e._id)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </ul>
          )
        })
      }
    </div>
  )
}

export default SuperAdmin
