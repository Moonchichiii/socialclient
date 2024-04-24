import React from "react";
import Navigationbar from "../../components/Navigationbar";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {  
  return (
    <>
      <Navigationbar />
      <main>
        <Outlet />
        {children}
        </main> 
      <Footer />
    </>
  );
};

export default Layout;
