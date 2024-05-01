import React from "react";
import Navigationbar from "../../components/Navigationbar";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";

import "../../styles/Layout.css";

const Layout = ({ children }) => {  
  return (
    <>
    <div className="navigation-container">
      <Navigationbar />
      </div>
      <main>
        <Outlet />
        {children}
        </main> 
      <Footer />
    </>
  );
};

export default Layout;
