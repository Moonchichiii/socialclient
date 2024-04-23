import Navigationbar from '../../components/Navigationbar';
import Footer from '../../components/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Navigationbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
