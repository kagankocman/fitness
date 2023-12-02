import React, { useState, useEffect } from 'react';
import { firestoreDB } from 'C:/Users/Kagan/Documents/ReactApps/fitness/src/firebase/firebase.js';
import { DataGrid } from '@mui/x-data-grid';
import { collection, getDocs } from 'firebase/firestore';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import EditInformations2 from './editinformations2';

export function EditInformations() {
    const [users, setUsers] = useState([]);
    const [isEditInformationsOpen2, setIsEditInformations2Open] = useState(false);
    const [userForEdit, setUserForEdit] = useState(null);

    const handleEditInformations2Open = (user) => {
        setUserForEdit(user);
        setIsEditInformations2Open(true);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const usersCollection = collection(firestoreDB, 'users');
            const usersSnapshot = await getDocs(usersCollection);

            const usersArray = [];
            usersSnapshot.forEach((doc) => {
                const userData = doc.data();
                const user = {
                    id: doc.id,
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    birthdate: userData.birthdate,
                    gender: userData.gender,
                    phonenumber: userData.phonenumber
                };
                usersArray.push(user);
            });
            setUsers(usersArray);
            console.log('Tüm kullanıcılar:', usersArray);
        } catch (error) {
            console.error('Kullanıcı listeleme hatası:', error);
        }
    };

    const columns = [
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'firstName', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerName: 'Last Name', width: 150 },
        {
            field: 'editButton',
            headerName: 'Edit',
            width: 100,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleEditInformations2Open(params.row)}
                >
                    Edit
                </Button>
            ),
        },
    ];

    return (
        <Box display={'flex'}>
            <Box sx={{ ml: '3%', mt: '2%', mr: '2%' }} style={{ height: 'auto', width: '50%' }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={5}
                />
            </Box>
            {isEditInformationsOpen2 && <EditInformations2 user={userForEdit} />}
        </Box>
    );
}
export default EditInformations;