import React, { useState, useContext } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../../api/axiosDefaults';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import styles from "./AuthForms.module.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formData.password1 !== formData.password2) {
        setErrors({ ...errors, password2: "Oops! passwords do not match!" });
        setIsLoading(false);
        return;
    }
    try {
        const { data } = await axiosInstance.post("/dj-rest-auth/registration/", formData);        
        setCurrentUser(data.user);
        Cookies.set("jwt_access_token", data.access_token, { path: '/' });
        Cookies.set("jwt_refresh_token", data.refresh_token, { path: '/' });
        navigate("/dashboard");
    } catch (err) {
        if (err.response && err.response.data) {
            setErrors(err.response.data);
        } else {
            setErrors({ non_field_errors: ["Oops! Something went wrong. Please try again."] });
        }
    } finally {
        setIsLoading(false);  
    }
};

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Sign up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              controlId="registrationUsername"
              className={styles["form-group"]}
            >
              <Form.Label className={styles["form-label"]}>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              controlId="registrationEmail"
              className={styles["form-group"]}
            >
              <Form.Label className={styles["form-label"]}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              controlId="registrationPassword"
              className={styles["form-group"]}
            >
              <Form.Label className={styles["form-label"]}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password1"
                required
                value={formData.password1}
                onChange={handleChange}
                isInvalid={!!errors.password1}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              controlId="registrationConfirmPassword"
              className={styles["form-group"]}
            >
              <Form.Label className={styles["form-label"]}>
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="password2"
                required
                value={formData.password2}
                onChange={handleChange}
                isInvalid={!!errors.password2}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" disabled={isLoading} className={`mt-3 ${styles["form-button"]} btn btn-primary`}>
        {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Create Account"}
      </Button>
            <div className={`mt-3 ${styles["auth-switch"]}`}>
              Already have an account? <Link to="/login">Sign In</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
