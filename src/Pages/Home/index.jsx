import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import Homesection1 from './Homesection1'
import FacultySection from './HomeFaculty'
import FutureInnovatorsSection from './FutureInnovador'
import Homesection2 from './HomeSection2'
import ConnectWithUs from './Lastsection'
import banner1 from '../../assets/images/banner1.jpg';
import banner2 from '../../assets/images/banner2.jpg';
import aboutimage from '../../assets/images/Aboutimage.jpg'
import aboutimage2 from '../../assets/images/alumni3.jpg';
import WebServices from '../../apis/Website'
function Home() {
  const [data,setData]=useState([])
  const banners = [
    {
      id: 1,
      image: banner1,
      altText: "Empowering DUET Alumni & Students",
      subtitle: 'Reconnect with your alumni network, share your journey and insights, and help guide the future of the community by mentoring and sharing experiences.'
    },
    {
      id: 2,
      image: banner2,
      altText: "Your Journey from Campus to Career Starts Here",
      subtitle: "Explore valuable mentorship, gain access to diverse job opportunities, and uncover real-world insights that will shape the path to your successful future."
    }
  ];
  useEffect(()=>{
    fetchdata()
  },[])
  const fetchdata=async()=>{
      try {
        const response = await WebServices?.getHome()
        console.log(response);
        
      } catch (error) {
        
      }
  }
  const title = "Connecting Our Community"
  const description = "DUET Hub is a unique platform designed to connect the students, alumni, and faculty of Dawood University. Our mission is to foster a sense of community, offering resources for career development, mentorship, and professional growth. Through AI-driven resume screening, job matching, and real-time communication, DUET Hub creates an environment that encourages networking and collaboration. It’s a space where students can find job opportunities, alumni can share knowledge and experiences, and faculty can stay connected with the evolving achievements of their peers and students. Whether you are looking for guidance, sharing your accomplishments, or building your professional network, DUET Hub serves as a comprehensive platform for all."
  const title2 = "Empowering DUET Alumni"
  const description2 = "DUET Hub is more than just a platform—it's a growing community of proud alumni from Dawood University. Whether you're an experienced professional or a recent graduate, this is your space to reconnect, mentor, and thrive. Share your journey, offer guidance to current students, or discover new opportunities through alumni networks. With tools for communication, career development, and showcasing achievements, DUET Hub keeps alumni actively involved in shaping the future of DUET."
  return (
    <div>
      <Banner banners={banners} />
      <Homesection1 title={title} description={description} aboutimg={aboutimage} />
      <FacultySection />
      <Homesection2 title2={title2} description2={description2} aboutimg={aboutimage2} />
      <FutureInnovatorsSection />
      <ConnectWithUs />
    </div>
  )
}

export default Home
