import { Box, Button } from '@mui/material'
import React from 'react'

const Realtime = () => {

  const handleStart = () => {
    alert("started")
  }


  return (
    <Box display="flex" flexDirection="column" height="calc( 100vh - 100px) " alignItems="center" my={10} >

      <Box sx={{ border: "1px solid red", width: [300, 600], height: [200, 500], }} >
        video
      </Box>

      <Button variant='contained' size='small' sx={{ my: 2 }} onClick={handleStart}>Start</Button>
    </Box>
  )
}

export default Realtime