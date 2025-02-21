import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { UserProvider } from './context/UserContext';
import AppNavbar from './components/AppNavbar';

import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import Workouts from './pages/Workouts';
import Error from './pages/Error';

import './App.css';

function App() {
    const [user, setUser] = useState({ id: null });

    function unsetUser() {
        localStorage.removeItem('token');
        setUser({ id: null });
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log("No token found, setting user to null.");
            setUser({ id: null });
            return;
        }

        fetch(`https://fitnessapi-calingasan.onrender.com/users/details`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if (data && data._id) {
                setUser({ id: data._id });
            } else {
                console.warn("Invalid token, resetting user state.");
                setUser({ id: null });
                localStorage.removeItem("token");
            }
        })
        .catch(() => {
            setUser({ id: null });
            localStorage.removeItem("token");
        });
    }, []);

    useEffect(() => {
        console.log("User state:", user);
        console.log("Stored Token:", localStorage.getItem('token'));
    }, [user]);

    return (
        <UserProvider value={{ user, setUser, unsetUser }}>
            <Router>
                <AppNavbar />
                <Container>
                    <Routes>
                        <Route path="/" element={<Workouts />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/workouts" element={<Workouts />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </Container>
            </Router>
        </UserProvider>
    );
}

export default App;
