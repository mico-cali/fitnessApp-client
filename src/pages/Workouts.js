import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button, Card, Modal, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import logo1 from '../images/logo1.png';
import logo2 from '../images/logo2.png';

export default function Workouts() {
    const { user } = useContext(UserContext);
    const [workouts, setWorkouts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchWorkouts = () => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            console.error("No token found, skipping fetch.");
            return;
        }

        fetch('https://fitnessapi-calingasan.onrender.com/workouts/getMyWorkouts', {
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("Fetch data:", data);

            if (data.auth === "Failed") {
                console.error("Authentication failed:", data.message);
                setWorkouts([]);
            } else {
                setWorkouts(Array.isArray(data) ? data : data.workouts || []);
            }
        })
        .catch(error => {
            console.error("Error fetching workouts:", error);
            setWorkouts([]);
        });
    };

    useEffect(() => { if (user) fetchWorkouts(); }, [user]);

    const createWorkout = (e) => {
        e.preventDefault();
        if (!name.trim() || !duration.trim()) return setError('All fields are required');
        
        const token = localStorage.getItem('token');
        if (!token) {
            setError('User not authenticated');
            return;
        }

        fetch('https://fitnessapi-calingasan.onrender.com/workouts/addWorkout', {
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ name, duration }),
        }).then(() => { 
            setShowModal(false); 
            fetchWorkouts(); 
            setSuccess('Workout added!'); 
            setError('');
            setName('');
            setDuration('');
        });
    };

    const openUpdateModal = (workout) => {
        setSelectedWorkout(workout);
        setName(workout.name);
        setDuration(workout.duration);
        setShowUpdateModal(true);
    };

    const updateWorkout = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            setError('User not authenticated');
            return;
        }

        fetch(`https://fitnessapi-calingasan.onrender.com/workouts/updateWorkout/${selectedWorkout._id}`, {
            method: 'PUT', 
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ name, duration }),
        }).then(() => { 
            setShowUpdateModal(false); 
            fetchWorkouts(); 
            setSuccess('Workout updated!'); 
            setError('');
            setName('');
            setDuration('');
        });
    };

    const deleteWorkout = (id) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        fetch(`https://fitnessapi-calingasan.onrender.com/workouts/deleteWorkout/${id}`, {
            method: 'DELETE', 
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => fetchWorkouts());
    };

    const isLoggedIn = user && user.id !== null;

    return (
        <Container className="mt-5">
            {!isLoggedIn ? (
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card className="text-center shadow p-4 border-0">
                            <Card.Body>
                                <img src={logo1} alt="FitTrack" className="img-fluid rounded mb-3" style={{ maxWidth: '250px' }} />
                                <h2 className="fw-bold">Track Your Fitness Journey</h2>
                                <p className="text-muted">Achieve your goals with FitTrack.</p>
                                <div className="d-grid gap-2">
                                    <Link to="/register"><Button variant="primary">Get Started</Button></Link>
                                    <Link to="/login"><Button variant="outline-secondary">Login</Button></Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <>
                <Row>
                    <Col md={12}>
                        <div className="d-flex align-items-center justify-content-between">
                            <h2>
                                <img src={logo2} alt="FitTrack" className="img-fluid rounded mb-3 m-2" style={{ maxWidth: '48px' }} />
                                My Workouts
                            </h2>
                            <Button onClick={() => setShowModal(true)}>Add Workout</Button>
                        </div>
                        <div className="d-flex flex-wrap justify-content-center mt-3">
                            {workouts.length > 0 ? workouts.map(workout => (
                                <Card key={workout._id} className="m-2 shadow border-0" style={{ width: "18rem" }}>
                                    <Card.Body className="text-center">
                                        <h5>{workout.name}</h5>
                                        <p>{workout.duration} mins</p>
                                        <Button variant="warning" onClick={() => openUpdateModal(workout)}>Edit</Button>
                                        <Button variant="danger" className="ms-2" onClick={() => deleteWorkout(workout._id)}>Delete</Button>
                                    </Card.Body>
                                </Card>
                            )) : <p className="text-center text-muted">No workouts available.</p>}
                        </div>
                    </Col>
                </Row>

                {/* Add Workout Modal */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Workout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={createWorkout}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control value={name} onChange={e => setName(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Label>Duration (mins)</Form.Label>
                                <Form.Control type="number" value={duration} onChange={e => setDuration(e.target.value)} required />
                            </Form.Group>
                            <Button type="submit" className="mt-3" variant="primary">Save</Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                {/* Edit Workout Modal */}
                <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Workout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={updateWorkout}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control value={name} onChange={e => setName(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Label>Duration (mins)</Form.Label>
                                <Form.Control type="number" value={duration} onChange={e => setDuration(e.target.value)} required />
                            </Form.Group>
                            <Button type="submit" className="mt-3" variant="primary">Update</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                </>
            )}
        </Container>
    );
}
