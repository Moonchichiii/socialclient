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
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/AuthHook";
import { useProfileData } from "../contexts/ProfileDataContext";
import "../styles/Navigationbar.css";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { profileData, isLoading } = useProfileData();
  const { logout } = useAuth();

  

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = (event) => {
    event.preventDefault();
    toggleMenu();
    logout();
  };

  return (
    <nav className="navigationbar">
      <NavLink to="/dashboard" className="navigationbar-brand">
        Social Food Posting
      </NavLink>
      <div className="profile-section">
        {isLoading ? (
          <p>Loading profile...</p>
        ) : profileData ? (
          <div>
            <p>Welcome, <span>{profileData.username}</span></p>
            <img
              src={profileData.owner_image} 
              alt="profile"
              style={{ width: 50, height: 50, borderRadius: "50%" }}
            />
          </div>
        ) : (
          <p>No profile data</p>
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
            src={profileData.profile_image}
            alt="profile"
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
          <span className="offcanvas-profile-name">{profileData.username}</span>
        </div>
        <NavLink to="/dashboard">
          <span>
            Home <FontAwesomeIcon icon={faHome} />
          </span>
        </NavLink>
        <NavLink to="/dashboard/feed">
          <span>
            Feed <FontAwesomeIcon icon={faList} />
          </span>
        </NavLink>
        <NavLink to="/dashboard/liked">
          <span>
            Liked <FontAwesomeIcon icon={faHeart} />
          </span>
        </NavLink>
        <NavLink to="/dashboard/post">
          <span>
            Post <FontAwesomeIcon icon={faPlus} />
          </span>
        </NavLink>
        <NavLink to="/dashboard/profile">
          <span>
            Profile <FontAwesomeIcon icon={faUser} />
          </span>
        </NavLink>

        <a href="#" onClick={handleLogout}>
          <span>
            Logout <FontAwesomeIcon icon={faSignOutAlt} />
          </span>
        </a>
      </div>
    </nav>
  );
}

export default Navigation;
