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
import CreatePost from "./components/Post/CreatePost";
import PostDetailPage from "./components/Post/PostDetailPage";
import UpdatePost from "./components/Post/UpdatePost";
import PostList from "./components/Post/PostList";
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
          <Route path="api/contact-us" element={<ContactUs />} />

          <Route
            path="api/mypage/:username"
            element={<ProtectedRoute element={<MyPage />} />}
          />
          <Route
            path="api/post/create"
            element={<ProtectedRoute element={<CreatePost />} />}
          />
          <Route path="api/post/:postId/detail" element={<PostDetailPage />} />

          <Route
            path="api/post/:postId/update"
            element={<ProtectedRoute element={<UpdatePost />} />}
          />
          <Route path="api/post/:postId/delete" element={<ProtectedRoute />} />
          <Route path="api/post/list" element={<PostList />} />
          <Route path="*" element={<h1> 404 Not Found </h1>} />
        </Routes>
      </AppLayout>
    </>
  );
}

export default App;
