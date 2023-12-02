import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';

export function ViewInformations({ user }) {
    const [userData, setUserData] = useState(null);
    const [, setOriginalUserData] = useState(null);

    useEffect(() => {
        if (user) {
            setUserData(user);
            setOriginalUserData({ ...user });
        }
    }, [user]);

    return (
        <Box sx={{ mt: '2%', display: 'flex' }}>
            <Box style={{ backgroundColor: '#edebeb', width: '650px', height: 'auto',  }} alignItems={'center'}  >
                <Typography sx={{ minWidth: "20%", fontSize: '30px', marginTop: '15px', color: 'black', fontFamily: 'fantasy' }} style={{ textAlign:'center' }}>
                    Profile Informations
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
                        value={userData?.gender || ''}
                        onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                        sx={{ marginLeft: '30px', marginTop: '30px' }}
                    />
                </div>
            </Box>
        </Box>
    )
}
export default ViewInformations;