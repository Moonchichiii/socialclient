import React, { useState, useContext } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import { SetCurrentUserContext } from "../contexts/CurrentUserContext";

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(SetCurrentUserContext);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosReq.post("/dj-rest-auth/login/", credentials);
            setCurrentUser(data.user);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.detail || "Something went wrong.");
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-heading">Sign In</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="Username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        required
                        value={credentials.username}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        required
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </Form.Group>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button variant="primary" type="submit" className="mt-3">
                    Sign In
                </Button>
                <div className="mt-3">
                    Don't have an account? <Link to="/register"><b>Sign up</b></Link>
                </div>
            </Form>
        </div>
    );
};

export default LoginForm;