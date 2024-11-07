import CategoryDetails from "./components/Category/CategoryDetails";
import CreatePostView from "./components/Post/CreatePostView";
import PostDetailPage from "./components/Post/PostDetailPage";
import UpdatePostView from "./components/Post/UpdatePostView";
import ProtectedRoute from "./components/ProtectedRoute";
import { autoLogin } from "./redux/slices/loginSlice";
import AdminPage from "./components/Admin/AdminPage";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import { useDispatch } from "react-redux";
import ContactUs from "./pages/ContactUs";
import Register from "./pages/Register";
import MyPage from "./pages/MyPage";
import Login from "./pages/Login";
import { useEffect } from "react";
import Home from "./pages/Home";

import "./App.css";
import PwChange from "./components/Password/PwChange";

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
          <Route
            path="api/user/login"
            element={
              <ProtectedRoute element={<Login />} redirectIfLoggedIn={true} />
            }
          />
    
          <Route path="api/user/register" exact element={<Register />} />
          <Route path="api/user/changePassword" exact element={<PwChange />} />
          <Route
            path="api/category/:large?/:middle?/:small?/:rank?"
            element={<CategoryDetails />}
          />
          <Route
            path="api/mypage/:username/*"
            element={<ProtectedRoute element={<MyPage />} />}
          />
          <Route path="api/contact-us" element={<ContactUs />} />
          <Route path="api/post/:postId/detail" element={<PostDetailPage />} />
          <Route
            path="api/post/:postId/update/:username"
            element={<ProtectedRoute element={<UpdatePostView />} />}
          />
          <Route
            path="api/post/create"
            element={<ProtectedRoute element={<CreatePostView />} />}
          />
          <Route path="api/post/:postId/delete" element={<ProtectedRoute />} />
          <Route
            path="api/admin/userlist"
            element={<ProtectedRoute element={<AdminPage />} />}
          />
          <Route path="*" element={<h1> 404 Not Found </h1>} />
        </Routes>
      </AppLayout>
    </>
  );
}

export default App;
