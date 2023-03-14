import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import NotFound from "./screens/NotFound";
import AddPost from "./screens/AddPost";
import UpdatePost from "./screens/UpdatePost";
import ViewPost from "./screens/ViewPost";
import Layout from "./components/Layout/Layout";
import Profile from "./screens/Profile";
import { BlogProvider } from "./BlogContext";
import Posts from "./screens/Posts";

const Routers = () => {
  const { currentUser } = useContext(BlogProvider);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={!currentUser ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!currentUser ? <Register /> : <Navigate to="/" />}
      />
      <Route
        path="/addPost"
        element={
          <RequireAuth>
            <Layout>
              <AddPost />
            </Layout>
          </RequireAuth>
        }
      />
      <Route
        path="/update/:id"
        element={
          <RequireAuth>
            <Layout>
              <UpdatePost />
            </Layout>
          </RequireAuth>
        }
      />
      <Route
        path="/view/:id"
        element={
          <Layout>
            <ViewPost />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <Layout>
              <Profile />
            </Layout>
          </RequireAuth>
        }
      />

      <Route
        path="/posts"
        element={
          <RequireAuth>
            <Layout>
              <Posts />
            </Layout>
          </RequireAuth>
        }
      />

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default Routers;
