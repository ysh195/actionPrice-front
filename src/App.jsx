import "./App.css";
import React, { Suspense, useEffect } from 'react';
import { autoLogin } from "./redux/slices/loginSlice";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

// 모두 한 번에 import하려고 하니까 시작할 때 너무 느려서 lazy 방식으로 가져옴
const CreatePostView = React.lazy(() => import("./components/Post/CreatePostView"));
const PostDetailPage = React.lazy(() => import("./pages/PostDetailPage"));
const UpdatePostView = React.lazy(() => import("./components/Post/UpdatePostView"));
const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute"));
const AdminPage = React.lazy(() => import("./pages/AdminPage"));
const AppLayout = React.lazy(() => import("./layouts/AppLayout"));
const ContactUsPage = React.lazy(() => import( "./pages/ContactUsPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const MyPage = React.lazy(() => import("./pages/MyPage"));
const LoginPage = React.lazy(() => import( "./pages/LoginPage"));
const Home = React.lazy(() => import("./pages/Home"));
const PwChange = React.lazy(() => import("./components/Password/PwChange"));
const CategoryPage = React.lazy(() => import("./pages/CategoryPage"));
const TermsAndConditionsOfUsePage = React.lazy(() => import("./pages/Legal/TermsAndConditionsOfUsePage"));
const OperationalPolicyPage = React.lazy(() => import("./pages/Legal/OperationalPolicyPage"));
const PersonalInformationProcessingPolicyPage = React.lazy(() => import("./pages/Legal/PersonalInformationProcessingPolicyPage"));


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);
  return (

      <AppLayout>
        <Routes>
          <Route 
            path="/" 
            exact element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            } 
          />

          <Route
            path="api/user/login"
            element={
              <ProtectedRoute
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <LoginPage />
                  </Suspense>
                }
                redirectIfLoggedIn={true}
              />
            }
          />

          <Route 
            path="api/user/register" 
            exact element={
              <Suspense fallback={<div>Loading...</div>}>
                <RegisterPage />
              </Suspense>
              }
          />

          <Route 
            path="api/user/changePassword" 
            exact element={
            <Suspense fallback={<div>Loading...</div>}>
              <PwChange />
            </Suspense>
            }
          />

          <Route
            path="api/category/:large?/:middle?/:small?/:rank?"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <CategoryPage />
              </Suspense>
            }
          />

          <Route
            path="api/mypage/:username/*"
            element={
              <ProtectedRoute element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MyPage />
                </Suspense>
              }
              />
            }
          />

          <Route path="api/contact-us" element={<Suspense fallback={<div>Loading...</div>}><ContactUsPage /></Suspense>} />

          <Route path="api/post/:postId/detail" element={<Suspense fallback={<div>Loading...</div>}><PostDetailPage /></Suspense>} />

          <Route
            path="api/post/:postId/update/:username"
            element={
              <ProtectedRoute 
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <UpdatePostView />
                  </Suspense>
                } 
              />
            }
          />
          
          <Route
            path="api/post/create"
            element={
              <ProtectedRoute element={
                <Suspense fallback={<div>Loading...</div>}>
                  <CreatePostView />
                </Suspense> 
              } />
            }
          />

          <Route path="api/post/:postId/delete" element={<ProtectedRoute />} />

          <Route
            path="api/admin/userlist"
            element={
              <ProtectedRoute element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AdminPage />
                </Suspense>
              } 
              />
            }
          />

          <Route
            path="api/policies/termsAndCondition"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <TermsAndConditionsOfUsePage />
              </Suspense>
            }
          />

          <Route
            path="api/policies/personalInfoPolicy"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PersonalInformationProcessingPolicyPage />
              </Suspense>
            }
          />

          <Route
            path="api/policies/operationalPolicy"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <OperationalPolicyPage />
              </Suspense>
            }
          />

          <Route path="*" element={<h1> 404 Not Found </h1>} />

        </Routes>
      </AppLayout>

  );
}

export default App;
