import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import dumbellPhoto from "../img/dumbellBlack.png";
import Informationa from "../methods/informationa";
import { Button, ButtonGroup } from '@mui/material';
import PersonalInformation from '../methods/personalinformation';
import NewAccount from '../methods/newaccount';
import EnableDisable from '../methods/enabledisable';
import EditInformations from '../methods/editinformations';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom/dist";


export function AdminPage() {
    const [isAccountAccessOpen, setIsAccountAccessOpen] = useState(false);
    const [isPersonalInformationOpen, setIsPersonalInformationOpen] = useState(false);
    const [isNewAccountOpen, setIsNewAccountOpen] = useState(false);
    const [isEnableDisableOpen, setIsEnableDisableOpen] = useState(false);
    const [isEditInformationsOpen, setIsEditInformationsOpen] = useState(false);

    let navigate = useNavigate();
    const handleLogout = () => {
        navigate('/signin');
    };

    const handlePersonalInformationOpen = () => {
        setIsPersonalInformationOpen(true);
        setIsAccountAccessOpen(false);
        setIsNewAccountOpen(false);
        setIsEnableDisableOpen(false);
        setIsEditInformationsOpen(false);
    };

    const handleAccountAccessOpen = () => {
        setIsAccountAccessOpen(true);
        setIsPersonalInformationOpen(false);
        setIsNewAccountOpen(false);
        setIsEnableDisableOpen(false);
        setIsEditInformationsOpen(false);
    };

    const handleNewAccountOpen = () => {
        setIsNewAccountOpen(true);
        setIsPersonalInformationOpen(false);
        setIsAccountAccessOpen(false);
        setIsEnableDisableOpen(false);
        setIsEditInformationsOpen(false);
    };

    const handleEnableDisableOpen = () => {
        setIsEnableDisableOpen(true);
        setIsNewAccountOpen(false);
        setIsPersonalInformationOpen(false);
        setIsAccountAccessOpen(false);
        setIsEditInformationsOpen(false);
    };

    const handleEditInformationsOpen = () => {
        setIsEditInformationsOpen(true);
        setIsEnableDisableOpen(false);
        setIsNewAccountOpen(false);
        setIsPersonalInformationOpen(false);
        setIsAccountAccessOpen(false);
    }

    return (
        <Box flexDirection="column" justifyContent="flex-end" alignItems="flex-end" sx={{ minWidth: "100%" }} >
            <AppBar position="static" sx={{ height: '90px', backgroundColor: '#f50a16' }} >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <img src={dumbellPhoto} alt="" style={{ maxWidth: '%100', height: '50px', marginTop: '15px' }}></img>
                        <Typography sx={{ minWidth: "20%", fontSize: '41px', marginTop: '15px', color: 'black', fontFamily: 'fantasy' }} style={{ marginLeft: 20 }}>
                            Fitness Center
                        </Typography>
                        <ButtonGroup sx={{ bgcolor: '#f50a16', mt: '20px', ml: '2%', color: 'black' }} aria-label="text button group" variant="text" size='large'>
                            <Button sx={{ color: 'white' }} onClick={handlePersonalInformationOpen}>BİLGİLERİM</Button>
                            <Button sx={{ color: 'white' }} onClick={handleAccountAccessOpen}>HESAPLARA ERİŞİM</Button>
                            <Button sx={{ color: 'white' }} onClick={handleNewAccountOpen}>YENİ HESAP OLUŞTUR</Button>
                            <Button sx={{ color: 'white' }} onClick={handleEnableDisableOpen}>HESAP ETKİNLEŞTİR/DEVRE DIŞI BIRAK</Button>
                            <Button sx={{ color: 'white' }} onClick={handleEditInformationsOpen}>VERİ GÖRÜNTÜLE/DÜZENLE</Button>
                            <IconButton sx={{ color: 'black', bgcolor: 'white', ml: 'px' }}
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
                {isAccountAccessOpen && <Informationa />}
                {isPersonalInformationOpen && <PersonalInformation />}
                {isNewAccountOpen && <NewAccount />}
                {isEnableDisableOpen && <EnableDisable />}
                {isEditInformationsOpen && <EditInformations />}
            </Box>
        </Box>
    );
}

export default AdminPage;