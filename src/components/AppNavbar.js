
import { Container, Navbar, Nav } from 'react-bootstrap' 
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { FaRunning } from "react-icons/fa";
import logo2 from '../images/logo2.png';
import logo1 from '../images/logo1.png';

export default function AppNavBar() {

	const { user } = useContext(UserContext);

	return(
        <Navbar expand="lg" className="bg-black navbar-dark">
            <Container className="ms-auto">
                <Navbar.Brand as={Link} to="/">
                    {/*<FaRunning /> FitTrack*/}
                    {/*<img src={logo2} alt="FitTrack" className="m-2" style={{ maxWidth: '5%' }} />
                    FitTrack*/}
                    <img src={logo1} alt="FitTrack" style={{ maxWidth: '27%' }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="justify-content-end mt-2"> 
                    <Nav.Link as={NavLink} to="/" exact="true"><h5>Home</h5></Nav.Link>

                        {(user.id !== null) ?
                            <>
                                <Nav.Link as={NavLink} to="/logout" exact="true"><h5>Logout</h5></Nav.Link>
                            </>
                        :
                            <>
                                <Nav.Link as={NavLink} to="/login" exact="true"><h5>Login</h5></Nav.Link>
                                <Nav.Link as={NavLink} to="/register" exact="true"><h5>Register</h5></Nav.Link>
                            </>
                    }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
	)

}