import { Link, Typography } from '@mui/material'
import React from 'react'

function MainFooter() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" p={5}>
      Copyright © <Link href="">Mini Store</Link>{" "}
      {new Date().getFullYear()} .
    </Typography>
  )
}

export default MainFooter