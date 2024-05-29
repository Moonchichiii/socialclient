import React, { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; 
import styles from "./AuthForms.module.css";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
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
        <div className={`col-md-6 ${styles['form-container']}`}>
          <h1 className={`text-center mb-4 ${styles['form-title']}`}>Social Food Posting</h1>
          <h2 className={`text-center mb-4 ${styles['form-title']}`}>Sign in</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="Username" className={styles['form-group']}>
              <Form.Label className={styles['form-label']}>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                required
                value={credentials.username}
                onChange={handleChange}
                className={styles['form-control']}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className={styles['form-group']}>
              <Form.Label className={styles['form-label']}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                required
                value={credentials.password}
                onChange={handleChange}
                className={styles['form-control']}
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button type="submit" disabled={isLoading} className={`mt-3 ${styles['form-button']} btn btn-primary`}>
                {isLoading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    Loading...
                  </>
                ) : "Sign In"}
              </Button>
            </div>
            <div className="d-flex justify-content-center">
              <div className={`mt-3 ${styles['auth-switch']}`}>
                Don't have an account? <Link to="/register">Sign up</Link>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

