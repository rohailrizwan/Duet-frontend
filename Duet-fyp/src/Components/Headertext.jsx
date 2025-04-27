import { Divider, Typography } from '@mui/material'
import React from 'react'

function Headertext({ title=null }) {
    return (
        <div>
            <Typography variant="h4" className='font_poppins colorgradient' sx={{ fontWeight: 600, mb: 1 }}>
                    {title}
            </Typography>
            <Divider sx={{ mb: 3 }} />
        </div>
    )
}

export default Headertext
