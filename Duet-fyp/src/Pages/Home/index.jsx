import React from 'react'
import Banner from './Banner'
import Homesection1 from './Homesection1'
import FacultySection from './HomeFaculty'
import FutureInnovatorsSection from './FutureInnovador'
import Homesection2 from './HomeSection2'
import ConnectWithUs from './Lastsection'

function Home() {
  return (
    <div>
      <Banner/>
      <Homesection1/>
      <FacultySection/>
      <Homesection2/>
      <FutureInnovatorsSection/>
      <ConnectWithUs/>
    </div>
  )
}

export default Home
