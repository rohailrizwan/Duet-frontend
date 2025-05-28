import React from 'react'
import Studentfaculty from '../Student/Studentfaculty'
import UpdateFaculty from '../Faculty/UpdateFaculty'
import Alumnifaculty from '../Alumni/Alumnifaculty'
import { useSelector } from 'react-redux'

function Profile() {
  const user=useSelector((state)=>state?.auth?.user)
  return (
    <div>
      {
        user?.role == "user" ? (
          <Studentfaculty userid={user?._id}/>
        )
        :
         user?.role == "alumni" ? (
          <UpdateFaculty userid={user?._id}/>
        )
        : 
         user?.role == "faculty"?
        (
          <Alumnifaculty userid={user?._id}/>
        )
        : null

      }
    </div>
  )
}

export default Profile
