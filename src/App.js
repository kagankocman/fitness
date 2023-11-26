import './App.css';
import * as React from 'react';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom/dist';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<SignUp/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/signin" element={<SignIn/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
