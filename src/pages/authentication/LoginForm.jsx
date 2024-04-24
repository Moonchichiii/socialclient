import React, { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthHook"; 
import styles from "./AuthForms.module.css";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const { login, isLoading, error } = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials.username, credentials.password);
  };

  return (
    <div className="container auth-con">
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

            <Form.Group controlId="formBasicPassword" className={styles["form-group"]}>
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
            <Button type="submit" disabled={isLoading} className={`mt-3 ${styles["form-button"]} btn btn-primary`}>
              {isLoading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  <span className="sr-only">Loading...</span>
                </>
              ) : "Sign In"}
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
