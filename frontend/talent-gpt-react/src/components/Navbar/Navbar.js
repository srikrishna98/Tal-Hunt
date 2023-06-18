import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  // const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#265284", marginBottom:"10px" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            // onClick={() => window.location.href="/"}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => window.location.href="/"}>
            Talent GPT
          </Typography>
          {/* <Button color="inherit"><Link to="/candidates">Recruiter Sign In</Link></Button> */}
          {/* <Button color="inherit">Recruiter Sign In</Button> */}
          {/* <Link to="/candidates"> */}
  <Button color="inherit" onClick={() => window.location.href="/candidates"}>Recruiter Sign In</Button>
{/* </Link> */}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
