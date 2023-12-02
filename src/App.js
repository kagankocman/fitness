import './App.css';
import * as React from 'react';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom/dist';
import UserPage from './pages/userpage';
import AdminPage from './pages/adminpage';
import CoachPage from './pages/coachpage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<SignUp/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>
        <Route path="/userpage" element={<UserPage/>}></Route>
        <Route path="/adminpage" element={<AdminPage/>}></Route>
        <Route path="/coachpage" element={<CoachPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
