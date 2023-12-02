import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import React, { useState, useEffect } from 'react';
import dumbellPhoto from "../img/dumbellBlack.png";
import { Button, ButtonGroup } from '@mui/material';
import Informations from "../methods/informations";
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom/dist";

export function UserPage() {

  const [isOpen, setIsOpen] = useState(false);

  const informationsOpen = () => {
    setIsOpen(!isOpen);
  };

  let navigate = useNavigate();
  const handleLogout = () => {
    navigate('/signin');
  };

  return (
    <Box flexDirection="column" justifyContent="flex-end" alignItems="flex-end" sx={{ minWidth: "100%" }} >
      <AppBar position="static" sx={{ height: '90px', backgroundColor: '#3cff00' }} >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img src={dumbellPhoto} alt="" style={{ maxWidth: '%100', height: '50px', marginTop: '15px' }}></img>
            <Typography sx={{ minWidth: "20%", fontSize: '41px', marginTop: '15px', color: 'black', fontFamily: 'fantasy' }} style={{ marginLeft: 20 }}>
              Fitness Center
            </Typography>
            <ButtonGroup sx={{ bgcolor: '#3cff00', mt: '20px', ml: '50px', color: 'black' }} aria-label="text button group" variant="text" size='large'>
              <Button sx={{ color: 'black' }} onClick={informationsOpen}>BİLGİLERİM</Button>
              <Button sx={{ color: 'black' }}>EGZERSİZ PLANIM</Button>
              <Button sx={{ color: 'black' }}>BESLENME PLANIM</Button>
              <Button sx={{ color: 'black' }}>GÖRSEL RAPORLAR</Button>
              <Button sx={{ color: 'black' }}>İLERLEME EKLE</Button>
              <Button sx={{ color: 'black' }}>ANTRENÖRE YAZ</Button>
              <IconButton sx={{ color: 'black', bgcolor: 'white', ml: '10px' }}
                onClick={handleLogout}
                aria-label="logout"
              >
                <LogoutIcon /> { }
              </IconButton>
            </ButtonGroup>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        {isOpen && (
          <Informations />
        )}
      </Box>
    </Box>
  );
}
export default UserPage;