import React from 'react'
import Studentfaculty from '../Student/Studentfaculty'
import UpdateFaculty from '../Faculty/UpdateFaculty'
import Alumnifaculty from '../Alumni/Alumnifaculty'

function Profile() {
  const type="Student"
  return (
    <div>
      {
        type == "Student" ? (
          <Studentfaculty/>
        )
        :
        type == 'Faculty' ? (
          <UpdateFaculty/>
        )
        : 
        type == "Alumni"?
        (
          <Alumnifaculty/>
        )
        : null

      }
    </div>
  )
}

export default Profile
