import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./layouts/Footer/Footer";
import Home from "./pages/Home/Home";
import ContactUs from "./pages/ContactUs/ContactUs";
import Category from "./components/Category";

import "./App.css";

import DynamicDropdown from "./components/CategoryDetails/DynamicDropdown";
import Login from "./pages/Login/Login";

import MyPage from "./pages/MyPage/MyPage";

import Header from "./layouts/Header/Header";

import Register from "./pages/Register/Register";

import RegistrationForm from "./pages/Register/RegistrationForm";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" exact element={<Home />} />

        <Route path="api/user/login" exact element={<Login />} />

        {/* <Route path="api/user/register" exact element={<Register />} /> */}

        <Route path="api/user/register" exact element={<RegistrationForm />} />

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
