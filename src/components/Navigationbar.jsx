import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faHome,
  faList,
  faHeart,
  faPlus,
  faUser,
  faSignOutAlt,
  faStar
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/useAuth";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import LoadingSpiner from "./LoadingSpinner";
import "../styles/Navigationbar.css";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, isLoading } = useCurrentUser();
  const { logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    toggleMenu();
    logout();
  };

  const closeOffCanvas = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  if (isLoading) {
    return <LoadingSpiner />;
  }

  return (
    <nav className="navigationbar">      
      <NavLink to="/dashboard" className="navigationbar-brand" onClick={closeOffCanvas}>
        Social Food Posting
      </NavLink>
      <div className="profile-section">
        {isLoading ? (
          <p>Loading profile...</p>
        ) : currentUser ? (
          <div>
            <p>Welcome, {currentUser.display_name || currentUser.username}</p>
            {currentUser.image && (
              <img
                src={currentUser.image}
                alt="Profile Picture"
                style={{ width: 100, height: 100, borderRadius: "50%" }}
              />
            )}
          </div>
        ) : (
          <p>No profile data available</p>
        )}
      </div>
      <div className="navigationbar-toggler" onClick={toggleMenu}>
        <FontAwesomeIcon
          icon={isOpen ? faTimes : faBars}
          className={isOpen ? "icon-open" : "icon-close"}
        />
      </div>
      <div className={`navigationbar-links ${isOpen ? "open" : ""}`}>
        <div className="offcanvas-profile">
          <img
            src={currentUser.image}
            alt="profile"
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
          <span className="offcanvas-profile-name">
            {currentUser.display_name}
          </span>
        </div>
        <NavLink to="/dashboard" onClick={closeOffCanvas}>
  Home <FontAwesomeIcon icon={faHome} />
</NavLink>
<NavLink to="/dashboard/feed" onClick={closeOffCanvas}>
  Feed <FontAwesomeIcon icon={faList} />
</NavLink>
<NavLink to="/dashboard/liked" onClick={closeOffCanvas}>
  Liked <FontAwesomeIcon icon={faHeart} />
</NavLink>
<NavLink to="/dashboard/popular" onClick={closeOffCanvas}>
  Popular Profiles <FontAwesomeIcon icon={faStar} />
</NavLink>
<NavLink to="/dashboard/post" onClick={closeOffCanvas}>
  Post <FontAwesomeIcon icon={faPlus} />
</NavLink>
<NavLink to="/dashboard/profile" onClick={closeOffCanvas}>
  Profile <FontAwesomeIcon icon={faUser} />
</NavLink>
<a href="#" onClick={handleLogout}>
  Logout <FontAwesomeIcon icon={faSignOutAlt} />
</a>
      </div>
    </nav>
  );
}

export default Navigation;
