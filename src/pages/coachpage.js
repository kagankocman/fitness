import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import React, { useState, useEffect } from 'react';
import dumbellPhoto from "../img/dumbellBlack.png";
import { Button, ButtonGroup } from '@mui/material';
import Informationsc from "../methods/informationsc";
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom/dist";

export function CoachPage() {

    const [isOpen, setIsOpen] = useState(false);

    let navigate = useNavigate();
    const handleLogout = () => {
        navigate('/signin');
    };

    const informationscOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Box flexDirection="column" justifyContent="flex-end" alignItems="flex-end" sx={{ minWidth: "100%" }} >
            <AppBar position="static" sx={{ height: '90px', backgroundColor: '#468bf2' }} >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <img src={dumbellPhoto} alt="" style={{ maxWidth: '%100', height: '50px', marginTop: '15px' }}></img>
                        <Typography sx={{ minWidth: "20%", fontSize: '41px', marginTop: '15px', color: 'black', fontFamily: 'fantasy' }} style={{ marginLeft: 20 }}>
                            Fitness Center
                        </Typography>
                        <ButtonGroup sx={{ bgcolor: '#468bf2', mt: '20px', ml: '50px', color: 'black' }} aria-label="text button group" variant="text" size='large'>
                            <Button sx={{ color: 'white' }} onClick={informationscOpen}>BİLGİLERİM</Button>
                            <Button sx={{ color: 'white' }}>EGZERSİZ PLANIM</Button>
                            <Button sx={{ color: 'white' }}>BESLENME PLANIM</Button>
                            <Button sx={{ color: 'white' }}>GÖRSEL RAPORLAR</Button>
                            <Button sx={{ color: 'white' }}>İLERLEME EKLE</Button>
                            <Button sx={{ color: 'white' }}>ANTRENÖRE YAZ</Button>
                        </ButtonGroup>
                        <IconButton sx={{ color: 'black', bgcolor: 'white', marginLeft: '100px', marginTop: '10px' }}
                            onClick={handleLogout}
                            aria-label="logout"
                        >
                            <LogoutIcon /> { }
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                {isOpen && (
                    <Informationsc />
                )}
            </Box>
        </Box>
    );
}
export default CoachPage;