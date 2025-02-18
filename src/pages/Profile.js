import { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import UserContext from '../context/UserContext';

export default function Profile(){

    const { user } = useContext(UserContext);

    const [details,setDetails] = useState({});
    const [formData, setFormData] = useState({ firstName: '', lastName: '', mobileNo: '' });

    useEffect(() => {
        fetch(`http://localhost:4000/users/details`, {
            headers: {
                Authorization: `Bearer ${ localStorage.getItem('token') }`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            // Set the user states values with the user details upon successful login.
            if (typeof data !== "undefined") {

                setDetails(data);
                setFormData({ firstName: data.firstName, lastName: data.lastName, mobileNo: data.mobileNo });

            } else if (data.error === "User not found") {

                alert("User not found.")

            } else {

                alert("Something went wrong, kindly contact us for assistance.")

            }
        });
    }, [])

    // const handleChange = (e) => {
    //     setFormData({ formData, [e.target.name]: e.target.value });
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
        
    //     fetch(`http://localhost:4000/users/update`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${localStorage.getItem('token')}`
    //         },
    //         body: JSON.stringify(formData)
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         if (data.success) {
    //             alert("Profile updated successfully");
    //             setDetails(formData);
    //         } else {
    //             alert("Update failed: " + data.message);
    //         }
    //     });
    // };

    return (
        // (user.id === null) ?
        //     <Navigate to="/" />
        // :
        <>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <div className="card shadow-lg rounded">
                        <div className="card-header bg-primary text-white text-center py-4">
                            <h2 className="mb-0">Profile</h2>
                        </div>
                        <div className="card-body p-5">
                            <h3 className="text-center mb-4">{`${details.firstName} ${details.lastName}`}</h3>
                            <hr />
                            <h4 className="mb-3 text-secondary">Contacts</h4>
                            <ul className="list-unstyled">
                                <li>
                                    <strong>Email:</strong> {details.email}
                                </li>
                                <li>
                                    <strong>Mobile No:</strong> {details.mobileNo}
                                </li>
                            </ul>
                        </div>
                    </div>
                </Col>
            </Row>

        </>
    )

}