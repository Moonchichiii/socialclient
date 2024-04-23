import React, { useState, useContext } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../../api/axiosDefaults';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import styles from "./AuthForms.module.css";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const { setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/api/token/", credentials);
      setCurrentUser(data.user, data.access, data.refresh);
    } catch (err) {
      setError("Oopps! Failed to log in, Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Sign in</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="Username" className={styles["form-group"]}>
              <Form.Label className={styles["form-label"]}>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                required
                value={credentials.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              controlId="formBasicPassword"
              className={styles["form-group"]}
            >
              <Form.Label className={styles["form-label"]}>Password</Form.Label>
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
            <Button
              type="submit"
              className={`mt-3 ${styles["form-button"]} btn btn-primary`}
            >
              Sign In
            </Button>
            <div className={`mt-3 ${styles["auth-switch"]}`}>
              Don't have an account? <Link to="/register">Sign up</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
