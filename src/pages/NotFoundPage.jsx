import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <h1>Oops! Page Not Found</h1>
      <p>Looks like you've stumbled upon a mysterious page that doesn't exist.</p>
      <p>Don't worry!</p>
      <img src="src/assets/images/404.png" alt="Funny Animal" />
      <p>In the meantime, feel free to go back to the <Link to="/">Dashboard</Link> and explore amazing content.</p>
    </div>
  );
};

export default NotFoundPage;
