import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Box, CssBaseline, GlobalStyles } from "@mui/material";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Register from "./pages/Register";

import Login from "./pages/Login";
import CategoryDetails from "./components/CategoryDetails";
import Navbar from "./layouts/Navbar";
import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { autoLogin } from "./redux/slices/loginSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        pt: 8,
        margin: "0 auto",
      }}
    >
      <CssBaseline />
      <GlobalStyles
        styles={{
          "*": { boxSizing: "border-box" },
          body: {
            fontFamily: "'Outfit', sans-serif",
            scrollBehavior: "smooth",
          },
        }}
      />
      <Box sx={{ maxWidth: "80%", margin: "0 auto" }}>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="api/user/login" exact element={<Login />} />

          <Route path="api/user/register" exact element={<Register />} />

          <Route
            path="/category-details/:categoryTitle"
            element={<CategoryDetails />}
          />
          <Route path="api/contact-us" element={<ContactUs />} />
          <Route path="*" element={<h1> 404 Not Found </h1>} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
