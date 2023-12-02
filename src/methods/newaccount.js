import React, { useState } from 'react';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { collection } from 'firebase/firestore';
import { firestoreDB, auth } from 'C:/Users/Kagan/Documents/ReactApps/fitness/src/firebase/firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

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

const roles = [
    {
        value: 'admin',
        label: 'Admin',
    },
    {
        value: 'antrenor',
        label: 'Antrenör',
    },
    {
        value: 'danisan',
        label: 'Danışan',
    },
];
export function NewAccount() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [role, setRole] = useState('');

    const handleCreateUser = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const { user } = userCredential;

            await saveUserDataToFirestore(user);
            console.log('Yeni kullanıcı oluşturuldu ve veritabanına kaydedildi.');
        } catch (error) {
            console.error('Kullanıcı oluşturma hatası:', error);
        }
    };

    const saveUserDataToFirestore = async (user) => {
        try {
            const usersCollection = collection(firestoreDB, 'users');
            await setDoc(doc(usersCollection, user.uid), {
                id: user.uid,
                email,
                firstName,
                lastName,
                password,
                birthdate,
                gender,
                phonenumber,
                role,
            })
            alert('Kullanıcı veritabanına eklendi.')
                ;
        } catch (error) {
            console.error('Kullanıcı bilgilerini Firestore\'a kaydetme hatası:', error);
        }
    };

    return (
        <Box style={{ backgroundColor: '#edebeb', width: '600px', height: 'auto' }} sx={{ ml: '30%', mt: '3%' }}>
            <Box sx={{ mt: '5%' }}>
                <Typography sx={{ fontFamily:'Verdana'}} textAlign={'center'} variant="h3">Yeni Kullanıcı Oluştur</Typography>
            </Box>
            <Box display={'flex'} sx={{ mt: '5%' }} >
                <TextField
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    sx={{ ml: '10%' }}
                />
                <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    sx={{ ml: '5%' }}
                />
            </Box>
            <Box display={'flex'} sx={{ mt: '5%' }} >
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ ml: '10%' }}
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ ml: '5%' }}
                />
            </Box>
            <Box display={'flex'} sx={{ mt: '5%' }} >
                <TextField
                    label="Birth Date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    sx={{ ml: '10%' }}
                />
                <TextField
                    label="Gender"
                    select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    sx={{ ml: '5%', width: '220px' }}
                >
                    {genders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
            <Box display={'flex'} sx={{ mt: '5%' }} >
                <TextField
                    label="Phone Number"
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                    sx={{ ml: '10%' }}
                />
                <TextField
                    label="Role"
                    select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    sx={{ ml: '5%', width: '220px' }}
                >
                    {roles.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
            <Box sx={{ ml:'35%', mt: '5%' }} >
                <Button
                    variant="contained"
                    color='error'
                    onClick={handleCreateUser}
                >
                    Hesap Oluştur
                </Button>
            </Box>
        </Box>
    );
}

export default NewAccount;