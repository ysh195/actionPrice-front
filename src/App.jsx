import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import MyPage from "./pages/MyPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CategoryDetails from "./components/Category/CategoryDetails";
import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { autoLogin } from "./redux/slices/loginSlice";

import AppLayout from "./layouts/AppLayout";
import CreatePostView from "./components/Post/CreatePostView";
import PostDetailPage from "./components/Post/PostDetailPage";
import UpdatePostView from "./components/Post/UpdatePostView";
import ProtectedRoute from "./components/ProtectedRoute";

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
          <Route
            path="/category-details/:categoryTitle"
            element={<CategoryDetails />}
          />

          <Route
            path="api/contact-us/:pageNum/:keyword?"
            element={<ContactUs />}
          />
          <Route
            path="api/mypage/:username"
            element={<ProtectedRoute element={<MyPage />} />}
          />
          <Route
            path="api/post/create"
            element={<ProtectedRoute element={<CreatePostView />} />}
          />
          <Route
            path="api/post/:postId/detail/:commentPageNum?"
            element={<ProtectedRoute element={<PostDetailPage />} />}
          />
          <Route
            path="api/post/:postId/update/:username"
            element={<ProtectedRoute element={<UpdatePostView />} />}
          />

          <Route path="api/post/:postId/delete" element={<ProtectedRoute />} />

          <Route path="*" element={<h1> 404 Not Found </h1>} />
        </Routes>
      </AppLayout>
    </>
  );
}

export default App;
