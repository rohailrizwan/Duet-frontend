import React from 'react'
import about from '../../assets/images/eventsbanner.webp';
import Banner from '../Home/Banner';
import Ourevents from './Ourevents';
function UpcomingEvents() {
    const banners = [
        {
            id: 1,
            image: about,
            altText: "Together in Every Moment",
            subtitle: 'Stay updated with all the latest happenings, reunions, seminars, and memorable moments that bring the DUET community together.',
        },
    ];
    const events = [
        {
            title: "DUET Alumni Meetup 2025",
            date: "March 15, 2025",
            description: "A grand gathering of DUET alumni to network, share memories, and inspire current students.",
            image: "https://images.unsplash.com/photo-1522199710521-72d69614c702"
        },
        {
            title: "TechTalk: AI & Innovation",
            date: "April 10, 2025",
            description: "Join industry experts as they discuss the future of AI, innovation, and its impact on careers.",
            image: "https://plus.unsplash.com/premium_photo-1661694510917-ddde000f9b94?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWR1Y2F0aW9uJTIwZXZlbnR8ZW58MHx8MHx8fDA%3D"
        },
        {
            title: "Spring Fest 2025",
            date: "May 5, 2025",
            description: "A celebration filled with music, games, food, and unforgettable moments for the DUET family.",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
        }
    ];
    return (
        <div>
            <Banner banners={banners} />
            <Ourevents events={events}/>
        </div>
    )
}

export default UpcomingEvents
