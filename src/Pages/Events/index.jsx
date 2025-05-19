import React, { useEffect, useState } from 'react'
import about from '../../assets/images/eventsbanner.webp';
import Banner from '../Home/Banner';
import Ourevents from './Ourevents';
import WebServices from '../../apis/Website';
import CustomPagination from '../../Components/Pagination';
function UpcomingEvents() {
    const [data, setData] = useState([])
    const [page, setpage] = useState(1)
    const [limit, setlimit] = useState(10)
    const [totalPages, settotalPages] = useState()
    const [loading, setloading] = useState(true)
    const banners = [
        {
            id: 1,
            image: about,
            altText: "Together in Every Moment",
            subtitle: 'Stay updated with all the latest happenings, reunions, seminars, and memorable moments that bring the DUET community together.',
        },
    ];
    

    useEffect(() => {
        fetchdata(page,limit)
    }, [])
    const fetchdata = async (page,limit) => {
        setloading(true)
        try {
            const response = await WebServices?.getEvent(page,limit)
            console.log(response);
            setData(response?.data?.data)
            settotalPages(response?.data?.totalPages)
            setloading(false)
        } catch (error) {
            setloading(false)
        }
    }

    const handleChange = (event, value) => {
        setpage(value);
        fetchdata(value,limit)
    };
    return (
        <div>
            <Banner banners={banners} />
            <Ourevents events={data} isLoading={loading}/>
            <CustomPagination page={page} count={totalPages} onChange={handleChange} />
        </div>
    )
}

export default UpcomingEvents
