import React, { useState, useEffect } from 'react';
import { firestoreDB } from 'C:/Users/Kagan/Documents/ReactApps/fitness/src/firebase/firebase.js';
import { DataGrid } from '@mui/x-data-grid';
import { collection, getDocs } from 'firebase/firestore';
import { Box, Button } from '@mui/material';
import ViewInformations from './viewinformations';


export function Informationa() {
    const [users, setUsers] = useState([]);
    const [isViewInformationsOpen, setViewInformationsOpen] = useState(false);
    const [userForEdit, setUserForEdit] = useState(null);

    const handleViewInformationsOpen = (user) => {
        setUserForEdit(user);
        setViewInformationsOpen(true);
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
                    onClick={() => handleViewInformationsOpen(params.row)}
                >
                    View
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
            {isViewInformationsOpen && <ViewInformations user={userForEdit} />}
        </Box>
    );
}

export default Informationa;