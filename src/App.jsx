import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./layouts/Footer/Footer";
import Home from "./pages/Home/Home";
import ContactUs from "./pages/ContactUs/ContactUs";
import Category from "./components/Category";
import Header from "./layouts/Header/Header";
import "./App.css";
import { Authentication } from "./pages/Authentication/Authentication";
import CategoryDetails from "./components/CategoryDetails/CategoryDetails";
import Userview from "./pages/userview";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      <div className="app">
        <Header />

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/user" exact element={<Userview />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/category-details" element={<CategoryDetails />} />
  
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
        {pathname !== "/authentication" && <Footer />}
      </div>
    </>
  );
}

export default App;
