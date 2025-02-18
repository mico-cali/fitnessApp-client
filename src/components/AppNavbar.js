
import { Container, Navbar, Nav } from 'react-bootstrap' 
import { Link, NavLink } from 'react-router-dom';
// import { useState, useContext } from 'react';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

export default function AppNavBar() {

	const { user } = useContext(UserContext);

	return(
        <Navbar expand="lg" className="bg-black navbar-dark">
            <Container className="ms-auto">
                <Navbar.Brand as={Link} to="/">
                    Fitness Tracker
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="justify-content-end"> 
                    {/*<Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>*/}
                        {/*<Nav.Link as={NavLink} to ="/products" exact="true">Products</Nav.Link>*/}
                        {/*<Nav.Link as={NavLink} to ="/cart" exact="true">Cart</Nav.Link>*/}

                        {(user.id !== null) ?
                            <>
                                <Nav.Link as={NavLink} to="/workouts" exact="true">Home</Nav.Link>
                                <Nav.Link as={NavLink} to="/addWorkout" exact="true">Add Workout</Nav.Link>
                                <Nav.Link as={NavLink} to="/profile" exact="true">Profile</Nav.Link>
                                <Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
                            </>
                        :
                            <>
                                <Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
                                <Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
                            </>
                    }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
	)

}