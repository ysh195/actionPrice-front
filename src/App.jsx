import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Footer from "./layouts/Footer/Footer";
import Home from "./pages/Home/Home";
import ContactUs from "./pages/ContactUs/ContactUs";
import Category from "./components/Category";
import DynamicDropdown from "./components/CategoryDetails/DynamicDropdown";
import MyPage from "./pages/MyPage/MyPage";
import Header from "./layouts/Header/Header";
import Register from "./pages/Register/Register";
import Navbar from "./components/Navbar";
import Login from "./pages/Login/Login";
import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./redux/slices/authSlice";
import { login } from "./redux/slices/loginSlice";

function App() {
  const dispatch = useDispatch();

  return (
    <div className="app">
      <Navbar />
      {/* <Header /> */}

      <Routes>
        <Route path="/" exact element={<Home />} />

        <Route path="api/user/login" exact element={<Login />} />

        <Route path="api/user/register" exact element={<Register />} />

        <Route path="api/mypage" exact element={<MyPage />} />

        <Route path="api/categories" element={<Category />} />

        <Route path="api/category-details" element={<DynamicDropdown />} />

        <Route path="api/contact-us" element={<ContactUs />} />

        <Route path="*" element={<h1> 404 Not Found </h1>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
