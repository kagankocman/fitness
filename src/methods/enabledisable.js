import React, { useState, useEffect } from 'react';
import { firestoreDB } from 'C:/Users/Kagan/Documents/ReactApps/fitness/src/firebase/firebase.js';
import { Table, TableRow, TableCell, TableContainer, TableHead, TableBody, Button, Paper, Box } from '@mui/material';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export function EnableDisable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = collection(firestoreDB, 'users');
                const usersSnapshot = await getDocs(usersCollection);

                const usersData = usersSnapshot.docs.map((doc) => {
                    const userData = doc.data();
                    return {
                        id: doc.id,
                        name: userData.firstName + ' ' + userData.lastName,
                        email: userData.email,
                        isApproved: userData.isApproved,
                    };
                });
                setUsers(usersData);
            } catch (error) {
                console.error('Kullanıcıları getirme hatası:', error);
            }
        };

        fetchUsers();
    }, []);

    const toggleStatus = async (userId, isApproved) => {
        try {
            const userDocRef = doc(collection(firestoreDB, 'users'), userId);
            await updateDoc(userDocRef, { isApproved: !isApproved });

            const updatedUsersSnapshot = await getDocs(collection(firestoreDB, 'users'));
            const updatedUsersData = updatedUsersSnapshot.docs.map((doc) => {
                const userData = doc.data();
                return {
                    id: doc.id,
                    name: userData.firstName + ' ' + userData.lastName,
                    email: userData.email,
                    isApproved: userData.isApproved,
                };
            });

            setUsers(updatedUsersData);
        } catch (error) {
            console.error('Durumu değiştirme hatası:', error);
        }
    };

    return (
        <Box sx={{ ml: '3%', mt: '3%', mr: '3%' }} >
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight:'bold' }} >Name</TableCell>
                            <TableCell sx={{ fontWeight:'bold' }} >Email</TableCell>
                            <TableCell sx={{ fontWeight:'bold' }} >Status</TableCell>
                            <TableCell sx={{ fontWeight:'bold' }} >Process</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.isApproved ? 'Etkin' : 'Devre Dışı'}</TableCell>
                                <TableCell>
                                    <Button color="error" onClick={() => toggleStatus(user.id, user.isApproved)}>
                                        {user.isApproved ? 'Devre Dışı Bırak' : 'Etkinleştir'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default EnableDisable;