import { useState, useEffect, useContext }  from 'react';
import { Form, Button, Container, Row, Col, Card, Image} from 'react-bootstrap';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';

import UserContext from '../context/UserContext';

export default function Register() {

	const { user } = useContext(UserContext);
	const navigate = useNavigate();
	const notyf = new Notyf();

	// State hooks to store the values of the input fields
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [mobileNo,setMobileNo] = useState(0);
    const [password,setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(false);

    //Check if values are successfully binded
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(mobileNo);
    console.log(password);
    console.log(confirmPassword);

    useEffect(() => {
    	if((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword) && (mobileNo.length === 11)) {
			
			setIsActive(true);
		} else {

			setIsActive(false);
		} 
    }, [firstName, lastName, email, mobileNo, password, confirmPassword])


    function registerUser(e) {
    	e.preventDefault();

    	fetch('https://fitnessapp-api-ln8u.onrender.com/users/register', {
    		method: 'POST',
    		headers: {
    			"Content-Type": "application/json"
    		},
    		body: JSON.stringify({
    			firstName: firstName,
	            lastName: lastName,
	            email: email,
	            mobileNo: mobileNo,
	            password: password
    		})
    	})
    	.then(res => res.json())
    	.then(data => {
    		console.log(data)

    		if(data.message === "Registered Successfully") {
    			setFirstName('');
                setLastName('');
                setEmail('');
                setMobileNo('');
                setPassword('')
                setConfirmPassword('')

                notyf.success("Registration successful")

                // navigate to login
                navigate("/login");
    		} else if (data.message === "Email invalid"){

                notyf.error("Email is invalid");

            } else if (data.message === "Mobile number is invalid"){

                notyf.error("Mobile number is invalid");

            } else if (data.message === "Password must be atleast 8 characters long") {

                notyf.error("Password must be at least 8 characters")

            } else {

                notyf.error("Something went wrong.")

            }
    	})
    }

    return (
		// (user.id !== null) ?
		// 	<Navigate to = "/" />
		// :
            <Container className="my-4">
                <Row className="justify-content-md-center">
                    <Col md={12}>
                        <Card className="shadow">
                            <Card.Body className="p-4">

                                <h1 className="mb-4 text-center">Register</h1>

                                {/*Inputs*/}
                                <Form onSubmit={(e) => registerUser(e)}>
                                    <Form.Group className="mb-3" controlId="firstName">
                                        <Form.Label>First Name:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter First Name"
                                            required
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="form-control-lg"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="lastName">
                                        <Form.Label>Last Name:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Last Name"
                                            required
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="form-control-lg"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter Email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-control-lg"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="mobileNo">
                                        <Form.Label>Mobile No:</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter 11 Digit No."
                                            required
                                            value={mobileNo}
                                            onChange={(e) => setMobileNo(e.target.value)}
                                            className="form-control-lg"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter Password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="form-control-lg"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="confirmPassword"> {/* Increased margin */}
                                        <Form.Label>Confirm Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Confirm Password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="form-control-lg"
                                        />
                                    </Form.Group>

                                    {/*Buttons*/}
                                    <div className="d-grid gap-2 mb-4" style={{ position: 'relative' }}>
                                        {isActive ? (
                                            <Button variant="primary" type="submit" id="submitBtn" size="lg">
                                                Submit
                                            </Button>
                                        ) : (
                                            <Button variant="primary" type="submit" id="submitBtn" disabled size="lg">
                                                Submit
                                            </Button>
                                        )}
                                    </div>
                                    <div className="text-center">
                                        Already have an account? <Link to="/login">Login here</Link>
                                    </div>

                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
	)


} 


