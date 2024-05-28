import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <h1>Oops! Page Not Found</h1>
      <p>Looks like you've stumbled upon a mysterious page that doesn't exist.</p>
      <p>Don't worry!</p>
      <p>If your session ended!, please go back to the <Link to="/login">Login</Link> page.</p>
    </div>
  );
};

export default NotFoundPage;