import React from 'react'
import Banner from '../Home/Banner'
import ConnectWithUs from '../Home/Lastsection';
import about from '../../assets/images/about.jpg';
import about1 from '../../assets/images/about1.jpg';
import about2 from '../../assets/images/mission2.webp';
import Homesection2 from '../Home/HomeSection2';
import Homesection1 from '../Home/Homesection1';

function About() {
    const banners = [
        {
            id: 1,
            image: about1,
            altText: "Empowering the DUET Legacy",
            subtitle: 'Connecting Students, Alumni, and Faculty to Empower Futures and Build Lasting Bonds within the DUET Community.'
        },
    ];
    const title = "About Us"
    const description = `DUET Hub brings together students, alumni, and faculty under one digital roof.
    It’s a place where ideas are exchanged, careers are shaped, and lifelong bonds are formed.
    We believe in the power of collaboration to inspire the next generation.
    Whether you're just starting out or giving back, DUET Hub is your bridge.
    Join a growing community committed to excellence, guidance, and growth.`
    const title2 = "Our Mission"
    const description2 = `Our mission is to empower DUETians by creating a platform that nurtures learning and collaboration.
    We strive to connect alumni, students, and faculty through meaningful interactions and shared opportunities.
    By fostering mentorship and career support, we help bridge the gap between education and the real world.
    We aim to build a culture of unity, knowledge-sharing, and mutual growth.
    DUET Hub is committed to uplifting every voice in the DUET community.`
    return (
        <div>
            <Banner banners={banners} />
            <Homesection1 title={title} description={description} aboutimg={about}/>
            <Homesection2 title2={title2} description2={description2} aboutimg={about2}/>
            <ConnectWithUs />
        </div>
    )
}

export default About
