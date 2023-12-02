import React, { useState, useEffect } from 'react';
import { doc } from 'firebase/firestore';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { updateDoc } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Box, Button, MenuItem } from '@mui/material';
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

export function EditInformations2({ user }) {
    const [userData, setUserData] = useState(null);
    const [originalUserData, setOriginalUserData] = useState(null);

    useEffect(() => {
        if (user) {
            setUserData(user);
            setOriginalUserData({ ...user });
        }
    }, [user]);

    const updateUserData = async () => {
        if (userData !== originalUserData) {
            try {

                const userDocRef = doc(firestoreDB, 'users', userData.id);
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

    return (
        <Box sx={{ mt: '2%', display: 'flex' }}>
            <Box style={{ backgroundColor: '#fff7f7', width: '650px', height: '500px' }}  >
                <Typography textAlign={'center'} sx={{ minWidth: "20%", fontSize: '30px', marginTop: '15px', color: 'black', fontFamily: 'fantasy' }} >
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
                    variant="contained"
                    color="error"
                    onClick={updateUserData}
                    sx={{ marginTop: '40px', marginLeft: '220px' }}
                >
                    Update Information
                </Button>
            </Box>
        </Box>
    )
}
export default EditInformations2;