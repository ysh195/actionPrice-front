import CreatePostView from "./components/Post/CreatePostView";
import PostDetailPage from "./pages/PostDetailPage";
import UpdatePostView from "./components/Post/UpdatePostView";
import ProtectedRoute from "./components/ProtectedRoute";
import { autoLogin } from "./redux/slices/loginSlice";
import AdminPage from "./pages/AdminPage";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import { useDispatch } from "react-redux";
import ContactUsPage from "./pages/ContactUsPage";
import RegisterPage from "./pages/RegisterPage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";
import Home from "./pages/Home";

import "./App.css";
import PwChange from "./components/Password/PwChange";
import CategoryPage from "./pages/CategoryPage";
import TermsAndConditionsOfUsePage from "./pages/Legal/TermsAndConditionsOfUsePage";
import OperationalPolicyPage from "./pages/Legal/OperationalPolicyPage";
import PersonalInformationProcessingPolicyPage from "./pages/Legal/PersonalInformationProcessingPolicyPage";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);
  return (

      <AppLayout>
        <Routes>
          <Route path="/" exact element={<Home />} />

          <Route
            path="api/user/login"
            element={
              <ProtectedRoute
                element={<LoginPage />}
                redirectIfLoggedIn={true}
              />
            }
          />

          <Route path="api/user/register" exact element={<RegisterPage />} />
          <Route path="api/user/changePassword" exact element={<PwChange />} />
          <Route
            path="api/category/:large?/:middle?/:small?/:rank?"
            element={<CategoryPage />}
          />

          <Route
            path="api/mypage/:username/*"
            element={<ProtectedRoute element={<MyPage />} />}
          />
          <Route path="api/contact-us" element={<ContactUsPage />} />
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
          <Route
            path="api/policies/termsAndCondition"
            element={<TermsAndConditionsOfUsePage />}
          />
          <Route
            path="api/policies/personalInfoPolicy"
            element={<PersonalInformationProcessingPolicyPage />}
          />
          <Route
            path="api/policies/operationalPolicy"
            element={<OperationalPolicyPage />}
          />
          <Route path="*" element={<h1> 404 Not Found </h1>} />
        </Routes>
      </AppLayout>

  );
}

export default App;
