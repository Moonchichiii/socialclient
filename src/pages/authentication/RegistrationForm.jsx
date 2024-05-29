import React, { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./AuthForms.module.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const { register, isLoading, error } = useAuth();
  const [localError, setLocalError] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLocalError({ ...localError, [e.target.name]: "" });
    if (error) {
      error[e.target.name] = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password1 !== formData.password2) {
      setLocalError({ ...localError, password2: "Opps! Passwords do not match!" });
      return;
    }

    try {
      await register(formData);
      setLocalError({});
    } catch (err) {}
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className={`text-center mb-4 ${styles['form-title']}`}>Social Food Posting</h1>
          <h2 className={`text-center mb-4 ${styles['form-title']}`}>Sign up</h2>        
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="registrationUsername" className={styles["form-group"]}>
              <Form.Label className={styles["form-label"]}>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                className={styles["form-control"]}
              />
              {localError.username && (
                <Alert variant="warning" className={styles["error-alert"]}>
                  {localError.username}
                </Alert>
              )}
              {error.username && (
                <Alert variant="warning" className={styles["error-alert"]}>
                  {error.username}
                </Alert>
              )}
            </Form.Group>

            <Form.Group controlId="registrationEmail" className={styles["form-group"]}>
              <Form.Label className={styles["form-label"]}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={styles["form-control"]}
              />
            </Form.Group>

            <Form.Group controlId="registrationPassword" className={styles["form-group"]}>
              <Form.Label className={styles["form-label"]}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password1"
                required
                value={formData.password1}
                onChange={handleChange}
                className={styles["form-control"]}
              />
            </Form.Group>

            <Form.Group controlId="registrationConfirmPassword" className={styles["form-group"]}>
              <Form.Label className={styles["form-label"]}>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="password2"
                required
                value={formData.password2}
                onChange={handleChange}
                className={styles["form-control"]}
              />
              {localError.password2 && (
                <Alert variant="warning" className={styles["error-alert"]}>
                  {localError.password2}
                </Alert>
              )}
            </Form.Group>
            <div className="d-flex justify-content-center">
              {error.general && <Alert variant="danger">{error.general}</Alert>}
              <Button type="submit" disabled={isLoading} className={`mt-3 ${styles['form-button']} btn btn-primary`}>
                {isLoading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    Loading...
                  </>
                ) : "Create Account"}
              </Button>
            </div>
            <div className="d-flex justify-content-center">
              <div className={`mt-3 mb-4 ${styles["auth-switch"]}`}>
                Already have an account? <Link to="/login">Sign In</Link>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
