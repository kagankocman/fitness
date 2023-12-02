import { Box, Button, MenuItem } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { updateDoc } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import { firestoreDB, auth } from 'C:/Users/Kagan/Documents/ReactApps/fitness/src/firebase/firebase.js';

const genders = [
    {
        value: 'Kadın',
        label: 'Kadın',
    },
    {
        value: 'Erkek',
        label: 'Erkek',
    },
];

export function Informations() {

    const [userData, setUserData] = useState(null);
    const [showDetails, setShowDetails] = React.useState(false);
    const [originalUserData, setOriginalUserData] = useState(null);
    const [gender, setGender] = useState('');
    const user = auth.currentUser;

    const handleShowDetails = async () => {
        await fetchUserData();
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const userDoc = await getDoc(doc(firestoreDB, "users", user.uid));
            if (userDoc.exists()) {
                setUserData(userDoc.data());
                console.log("Kullanıcı Verisi:", userDoc.data());
            } else {
                console.log('Kullanıcı verisi bulunamadı');
            }
        } catch (error) {
            console.error('Veri çekme hatası:', error);
        }
    };

    const updateUserData = async () => {
        if (userData !== originalUserData) {
            try {
                const userDocRef = doc(firestoreDB, 'users', user.uid);
                await updateDoc(userDocRef, userData);
                setOriginalUserData(userData);
                console.log("Kullanıcı verisi güncellendi");
            } catch (error) {
                console.error('Veri güncelleme hatası:', error);
            }
        } else {
            console.log('Herhangi bir değişiklik yapılmadı.');
        }
    };

    const handleUpdatePassword = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                await sendPasswordResetEmail(auth, user.email);
                console.log("Şifre sıfırlama talebi gönderildi!");
            } else {
                console.log("Kullanıcı oturumu açmış değil!");
            }
        } catch (error) {
            console.error('Şifre sıfırlama hatası:', error);
        }
    };

    return (
        <Box sx={{ mt: '5%', display: 'flex' }}>
            <Box style={{ backgroundColor: '#effced', width: '300px', height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} sx={{ ml: '5%', mt: '3%' }}>
                { }
                <Box style={{ width: '200px', height: '250px' }} sx={{ border: 1, mt: '15%' }}>
                    { }
                </Box>
                <p> {userData?.firstName} {userData?.lastName}</p>
            </Box>
            <Box style={{ backgroundColor: '#effced', width: '650px', height: 'auto' }} sx={{ ml: '7%', mr: '5%' }} >
                <Typography textAlign='center' sx={{ minWidth: "20%", fontSize: '30px', marginTop: '15px', color: 'black', fontFamily: 'fantasy' }} >
                    Edit Profile
                </Typography>
                <div>
                    <TextField
                        label="First Name"
                        value={userData?.firstName || ''}
                        onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                        sx={{ marginLeft: '80px', marginTop: '30px' }}
                    />
                    <TextField
                        label="Last Name"
                        value={userData?.lastName || ''}
                        onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                        sx={{ marginLeft: '30px', marginTop: '30px' }}
                    />
                </div>
                <TextField
                    label="Email"
                    value={userData?.email || ''}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    sx={{ marginLeft: '80px', marginTop: '30px' }}
                />
                <TextField
                    label="Phone  Number"
                    value={userData?.phonenumber || ''}
                    onChange={(e) => setUserData({ ...userData, phonenumber: e.target.value })}
                    sx={{ marginLeft: '30px', marginTop: '30px' }}
                />
                <div>
                    <TextField
                        label="BirthDate"
                        value={userData?.birthdate || ''}
                        onChange={(e) => setUserData({ ...userData, birthdate: e.target.value })}
                        sx={{ marginLeft: '80px', marginTop: '30px' }}
                    />
                    <TextField
                        label="Gender"
                        select
                        value={userData?.gender || ''}
                        onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                        sx={{ marginLeft: '30px', marginTop: '30px', width: '220px' }}
                    >
                        {genders.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <Button
                    variant="text"
                    onClick={handleUpdatePassword}
                    sx={{ marginTop: '30px', marginLeft: '140px', bgcolor: '#7aff52', color: 'black' }}
                >
                    Update Password
                </Button>
                <Button
                    variant="text"
                    onClick={updateUserData}
                    sx={{ marginTop: '30px', marginLeft: '30px', bgcolor: '#7aff52', color: 'black' }}
                >
                    Update Information
                </Button>
            </Box>
        </Box>
    )
}

export default Informations;