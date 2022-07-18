import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Logo from "../components/logo";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { Button, Link } from "@mui/material";
import useAuth from "../hooks/useAuth";


function MainHeader() {
  const auth = useAuth();
  const hanldeLogout = ()=>{
    auth.logout(()=>{
      Navigate('/login')
    })
  }
  return (
    <Box>
      <AppBar position="static" sx={{background:"#FF8C94"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Logo />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shop MiniStore
          </Typography>
          {auth.isAuthenticated ? (
            <>
            <Typography>{auth.user?.username}</Typography>
            <Button 
            onClick={hanldeLogout}
            sx={{color:"white", background:"#ABE6CE", marginLeft: "8px"}}
            >Logout</Button>
            </>
          ) : (
            <Link to="/login" component={RouterLink} sx={{ color: "white" }}>
              Login
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
