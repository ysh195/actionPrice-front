import { Route, Routes } from "react-router-dom";

import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import MyPage from "./pages/MyPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CategoryDetails from "./components/CategoryDetails";
import NavigationBar from "./layouts/NavigationBar";

import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { autoLogin } from "./redux/slices/loginSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import AppLayout from "./layouts/AppLayout";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);
  return (
    <>
      <AppLayout>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="api/user/login" exact element={<Login />} />
          <Route path="api/user/register" exact element={<Register />} />
          <Route path="api/user/mypage" exact element={<MyPage />} />
          <Route
            path="/category-details/:categoryTitle"
            element={<CategoryDetails />}
          />
          <Route path="api/contact-us" element={<ContactUs />} />
          <Route path="*" element={<h1> 404 Not Found </h1>} />
        </Routes>
      </AppLayout>
    </>
  );
}

export default App;
