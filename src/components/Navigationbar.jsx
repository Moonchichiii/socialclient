import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faHome,
  faList,
  faHeart,
  faPlus,
  faUser,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import "../styles/Navigationbar.css";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { logout } = useCurrentUser(); 
  
  const handleLogout = (event) => {
    event.preventDefault(); 
    toggleMenu(); 
    logout(); 
  };

  return (
    <nav className="navigationbar">
      <a href="/" className="navigationbar-brand">
        Social Food Posting
      </a>
      <div className="navigationbar-toggler" onClick={toggleMenu}>
        <FontAwesomeIcon
          icon={isOpen ? faTimes : faBars}
          className={isOpen ? "icon-open" : "icon-close"}
        />
      </div>
      <div className={`navigationbar-links ${isOpen ? "open" : ""}`}>
        <a href="/home" onClick={toggleMenu}>
          Home <FontAwesomeIcon icon={faHome} />
        </a>
        <a href="/feed" onClick={toggleMenu}>
          Feed <FontAwesomeIcon icon={faList} />
        </a>
        <a href="/liked" onClick={toggleMenu}>
          Liked <FontAwesomeIcon icon={faHeart} />
        </a>
        <a href="/post" onClick={toggleMenu}>
          Post <FontAwesomeIcon icon={faPlus} />
        </a>
        <a href="/profile" onClick={toggleMenu}>
          Profile <FontAwesomeIcon icon={faUser} />
        </a>
        <a href="/logout" onClick={handleLogout}>
          Logout <FontAwesomeIcon icon={faSignOutAlt} />
        </a>
      </div>
    </nav>
  );
}

export default Navigation;
