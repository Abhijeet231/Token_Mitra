import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer, Zoom } from "react-toastify";
import ScrollToTop from "./routes/ScrollTop";


const App = () => {
  return (
    <>
    <ScrollToTop/>
      <Navbar />
      <Outlet />

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
