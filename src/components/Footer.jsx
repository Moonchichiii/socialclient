import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          © {new Date().getFullYear()} Social Food Posting. All rights reserved.
        </div>
        <div className={styles.footerSection}>       
        
        </div>
        <div className={styles.footerSection}>
          <a href="https://www.linkedin.com" className={styles.socialIcon}>
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://github.com" className={styles.socialIcon}>
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
