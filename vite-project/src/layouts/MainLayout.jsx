import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />

      {/* This will show the page content */}
      <Outlet />

      <Footer />
    </div>
  );
};

export default MainLayout;
