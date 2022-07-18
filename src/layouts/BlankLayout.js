import React from 'react';
import {Stack}from '@mui/material';
import Logo from '../components/logo';
import {Outlet} from 'react-router-dom';

function BlankLayout() {
  return (
    <Stack  minHeight="100vh" justifyContent="center" alignItems="center" >
      <Logo sx={{ width: 70, height: 70 }} />
      <Outlet/>
    </Stack>
  )
}

export default BlankLayout