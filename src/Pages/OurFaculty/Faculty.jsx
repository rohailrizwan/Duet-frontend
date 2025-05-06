import React from 'react'
import Banner from '../Home/Banner'
import FacultyList from './FacultyList';
import facultyimage from '../../assets/images/faculty.jpg'
function Faculty() {
    const banners = [
        {
            id: 1,
            image: facultyimage,
            altText: "Our Dedicated Faculty",
            subtitle: 'Meet the brilliant minds nurturing innovation, guiding research, and shaping the leaders of tomorrow at DUET.',
        },
    ];
    return (
        <div>
            <Banner banners={banners}/>
            <FacultyList/>
        </div>
    )
}

export default Faculty
