import { Box, Button, MenuItem } from "@mui/material";
import React, { useState, useEffect, useRef } from 'react';
import { firestoreDB, storage, auth } from 'C:/Users/Kagan/Documents/ReactApps/fitness/src/firebase/firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { updateDoc } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

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

export function PersonalInformation() {
    const [userData, setUserData] = useState(null);
    const [originalUserData, setOriginalUserData] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
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
            } else {
                console.log("Kullanıcı oturum açmamış.");
                setUserData(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // const [file, setFile] = useState(null);
    // const handleFileChange = (e) => {
    //     const selectedFile = e.target.files[0];
    //     setFile(selectedFile);
    // };

    // const handleUpload = () => {
    //     if (file) {
    //         const storageRef = ref(`uploads/${file.name}`);
    //         const uploadTask = storageRef.put(file);

    //         uploadTask.on(
    //             'state_changed',
    //             (snapshot) => {
    //                 // Yükleme sırasında güncellemeler
    //             },
    //             (error) => {
    //                 console.error('Yükleme hatası:', error);
    //             },
    //             async () => {
    //                 // Yükleme tamamlandığında
    //                 console.log('Dosya başarıyla yüklendi');

    //                 // Dosya yüklendikten sonra Firestore dokümanını güncelleme
    //                 try {
    //                     const user = auth.currentUser;
    //                     if (user) {
    //                         const userDocRef = doc(firestoreDB, 'users', user.uid);
    //                         const userDoc = await getDoc(userDocRef);

    //                         if (userDoc.exists()) {
    //                             // Firestore dokümanını güncelleme işlemi
    //                             await updateDoc(userDocRef, { profilePicture: storageRef.fullPath });
    //                             console.log('Profil resmi Firestore dokümanına eklendi');
    //                         } else {
    //                             console.log('Kullanıcı dokümanı bulunamadı');
    //                         }
    //                     } else {
    //                         console.log('Kullanıcı oturumu açmamış.');
    //                     }
    //                 } catch (error) {
    //                     console.error('Firestore dokümanını güncelleme hatası:', error);
    //                 }
    //             }
    //         );
    //     }
    // };


    const updateUserData = async () => {
        if (userData !== originalUserData) {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDocRef = doc(firestoreDB, 'users', user.uid);
                    await updateDoc(userDocRef, userData);
                    setOriginalUserData(userData);
                    console.log("Kullanıcı verisi güncellendi");
                } else {
                    console.log("Kullanıcı oturumu açmış değil!");
                }
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
            <Box style={{ backgroundColor: '#fff7f7', width: '300px', height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} sx={{ ml: '5%', mt: '3%' }}>
                { }
                <Box style={{ width: '200px', height: '250px' }} sx={{ border: 1, mt: '15%' }}>
                    { }
                </Box>
                <p> {userData?.firstName} {userData?.lastName}</p>
                {/* <div>
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={handleUpload}>Dosyayı Yükle</button>
                </div> */}
                {/* <Button onClick={handleUpload} component="label" color="error" variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload file
                    <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                </Button> */}
            </Box>
            <Box style={{ backgroundColor: '#fff7f7', width: '650px', height: '500px' }} sx={{ ml: '7%', mr: '5%' }} >
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
                        label="Birth Date"
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
                    onClick={handleUpdatePassword}
                    sx={{ marginTop: '30px', marginLeft: '125px', color: 'black' }}
                >
                    Update Password
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={updateUserData}
                    sx={{ marginTop: '30px', marginLeft: '30px', color: 'black' }}
                >
                    Update Information
                </Button>
            </Box>
        </Box>
    )
}

export default PersonalInformation;