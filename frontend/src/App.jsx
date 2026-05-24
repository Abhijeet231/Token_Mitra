import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer, Zoom } from "react-toastify";
import ScrollToTop from "./routes/ScrollTop";
import DisclaimerModal from "./components/common/DisclaimerModal.jsx";
import Footer from "./components/Footer";


const App = () => {
  return (
    <>
    <ScrollToTop/>
    <DisclaimerModal/>
      <Navbar />
      <Outlet />
      <Footer/>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        transition={Zoom}
        closeOnClick
        draggable
        pauseOnHover
        newestOnTop
        hideProgressBar={false}
      />
    </>
  );
};

export default App;
